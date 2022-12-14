import {
  CandlestickData,
  HistogramData,
  LineData,
  VolumeData,
} from './stock.interface';
import { Injectable } from '@nestjs/common';
import { InjectModel } from 'nest-knexjs';
import { Knex } from 'knex';
import fetch from 'node-fetch';

@Injectable()
export class StockService {
  constructor(@InjectModel() private readonly knex: Knex) {}
  getHello(): string {
    return 'Hello World';
  }

  async getCurrentAndYesterdayStockPrice(symbol: string) {
    try {
      const yesterdayRes = await fetch(
        `http://35.213.167.63/mongo/${symbol}?period=day`,
      );
      const yesterdayResult = await yesterdayRes.json();

      const currentRes = await fetch(`http://35.213.167.63/mongo/${symbol}`);
      const currentResult = await currentRes.json();

      return {
        yesterdayPrice: yesterdayResult[yesterdayResult.length - 1].close,
        currentPrice: currentResult[currentResult.length - 1].close,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getCurrentAndYesterdayCryptoPrice(symbol: string) {
    try {
      const res = await fetch(`http://35.213.167.63/mongo/${symbol}`);
      const result = await res.json();

      return {
        currentPrice: result[0].close,
        yesterdayPrice: result[1].close,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getUserList(userID: string) {
    console.log('getUserList');

    try {
      const stockResult = await this.knex
        .select(['stock_info.id', 'user_stocks.symbol', 'name', 'chinese_name'])
        .from('user_stocks')
        .join('stock_info', 'user_stocks.symbol', 'stock_info.symbol')
        .where({ user_id: userID });

      for (const obj of stockResult) {
        const { currentPrice, yesterdayPrice } =
          await this.getCurrentAndYesterdayStockPrice(obj.symbol);
        obj['current_price'] = currentPrice;
        obj['yesterday_price'] = yesterdayPrice;
        obj['price_difference'] = currentPrice - yesterdayPrice;
      }

      const cryptoResult = await this.knex
        .select('id', 'symbol', 'name', 'chinese_name')
        .from('user_cryptos')
        .where({ user_id: userID });

      for (const obj of cryptoResult) {
        const { currentPrice, yesterdayPrice } =
          await this.getCurrentAndYesterdayCryptoPrice(obj.symbol);

        obj['current_price'] = currentPrice;
        obj['yesterday_price'] = yesterdayPrice;
        obj['price_difference'] = currentPrice - yesterdayPrice;
      }
      return { stockResult, cryptoResult };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getAllDataFromStockInfo(symbol: string) {
    const result = await this.knex
      .select('*')
      .from('stock_info')
      .where({ symbol: symbol });

    const { currentPrice, yesterdayPrice } =
      await this.getCurrentAndYesterdayStockPrice(symbol);
    console.log(result);

    return result;
  }

  async getIntraDayDataFromMongoDB(symbol: string) {
    const valueArray: number[] = [];

    const res = await fetch(`http://35.213.167.63/mongo/${symbol}`);
    const result = await res.json();
    const today = `${new Date().getFullYear()}-${
      new Date().getMonth() + 1
    }-${new Date().getDate()}`;

    if (symbol.endsWith('USDT')) {
      result
        .filter((element) => {
          return element.time >= new Date(today).getTime() / 1000;
        })
        .reverse()
        .slice(0, 389)
        .forEach((element) => {
          valueArray.push(element.close);
        });
    } else {
      if (
        result.filter((element) => {
          return element.time >= new Date(today).getTime() / 1000;
        }).length > 0
      ) {
        result
          .filter((element) => element.time >= new Date().getTime() / 1000)
          .slice(result.length - 390, result.length - 1)
          .forEach((element) => {
            valueArray.push(element.close);
          });
      } else {
        result
          .slice(result.length - 390, result.length - 1)
          .forEach((element) => {
            valueArray.push(element.close);
          });
      }
    }

    return valueArray;
  }

  async getMinuteDataFromMongoAPI(symbol: string, timeFrame: string) {
    const candlestickDataArray: CandlestickData[] = [];
    const lineDataArray: LineData[] = [];
    const volumeDataArray: VolumeData[] = [];

    const res = await fetch(`http://35.213.167.63/mongo/${symbol}`);
    const oldresult = await res.json();
    const result = oldresult.slice(0, 500);
    console.log(result.length);

    result.forEach((element) => {
      const volumeColor =
        element.close - element.open > 0
          ? 'rgba(38, 166, 155, 0.5)'
          : 'rgba(239, 83, 80, 0.5)';
      candlestickDataArray.push({
        time: element.time,
        open: element.open,
        high: element.high,
        low: element.low,
        close: element.close,
      });
      lineDataArray.push({ time: element.time, value: element.close });
      volumeDataArray.push({
        time: element.time,
        value: element.volume,
        color: volumeColor,
      });
    });

    const {
      convertedLineDataArray,
      convertedCandlestickDataArray,
      convertedVolumeDataArray,
    } = changeTimeFrame(
      timeFrame,
      lineDataArray,
      candlestickDataArray,
      volumeDataArray,
    );

    const lineSMA20Array = calculateSMA(convertedLineDataArray, 20);
    const lineSMA50Array = calculateSMA(convertedLineDataArray, 50);
    const lineSMA100Array = calculateSMA(convertedLineDataArray, 100);
    const lineSMA250Array = calculateSMA(convertedLineDataArray, 250);

    const lineEMA20Array = calculateEMA(
      convertedLineDataArray,
      20,
      lineSMA20Array,
      2 / 21,
    );
    const lineEMA50Array = calculateEMA(
      convertedLineDataArray,
      50,
      lineSMA50Array,
      2 / 51,
    );
    const lineEMA100Array = calculateEMA(
      convertedLineDataArray,
      100,
      lineSMA100Array,
      2 / 101,
    );
    const lineEMA250Array = calculateEMA(
      convertedLineDataArray,
      250,
      lineSMA250Array,
      2 / 251,
    );

    const lineRSI7Array = calculateRSI(convertedLineDataArray, 7);
    const lineRSI14Array = calculateRSI(convertedLineDataArray, 14);

    const counterDaySMA12 = calculateSMA(convertedLineDataArray, 12);
    const K12 = 2 / (12 + 1);
    const lineEMA12Array = calculateEMA(
      convertedLineDataArray,
      12,
      counterDaySMA12,
      K12,
    );
    const counterDaySMA26 = calculateSMA(convertedLineDataArray, 26);
    const K26 = 2 / (26 + 1);
    const lineEMA26Array = calculateEMA(
      convertedLineDataArray,
      26,
      counterDaySMA26,
      K26,
    );
    const { fastLineResultArray, slowLineResultArray, histogramResultArray } =
      calculateMACD(lineEMA12Array, lineEMA26Array);

    console.log('fetching getMinuteDataFromMongoDB');

    return {
      convertedLineDataArray,
      convertedCandlestickDataArray,
      convertedVolumeDataArray,
      lineSMA20Array,
      lineSMA50Array,
      lineSMA100Array,
      lineSMA250Array,
      lineEMA20Array,
      lineEMA50Array,
      lineEMA100Array,
      lineEMA250Array,
      lineRSI7Array,
      lineRSI14Array,
      fastLineResultArray,
      slowLineResultArray,
      histogramResultArray,
    };
  }

  async getDayDataFromMongoAPI(symbol: string, timeFrame: string) {
    const candlestickDataArray: CandlestickData[] = [];
    const lineDataArray: LineData[] = [];
    const volumeDataArray: VolumeData[] = [];

    let period = undefined;
    switch (timeFrame) {
      case '1W':
        period = 'week';
        break;
      case '1M':
        period = 'month';
        break;
      case '4M':
        period = 'quarter';
        break;
      case '1Y':
        period = 'year';
        break;
      default:
        period = 'day';
        break;
    }

    const res = await fetch(
      `http://35.213.167.63/mongo/${symbol}?period=${period}`,
    );
    const result = await res.json();

    console.log(result.length);

    result.forEach((element) => {
      const volumeColor =
        element.close - element.open > 0
          ? 'rgba(38, 166, 155, 0.5)'
          : 'rgba(239, 83, 80, 0.5)';
      candlestickDataArray.push({
        time: element.time,
        high: element.high,
        open: element.open,
        low: element.low,
        close: element.close,
      });
      lineDataArray.push({ time: element.time, value: element.close });
      volumeDataArray.push({
        time: element.time,
        value: element.volume,
        color: volumeColor,
      });
    });

    const {
      convertedLineDataArray,
      convertedCandlestickDataArray,
      convertedVolumeDataArray,
    } = changeTimeFrame(
      timeFrame,
      lineDataArray,
      candlestickDataArray,
      volumeDataArray,
    );

    const lineSMA20Array = calculateSMA(convertedLineDataArray, 20);
    const lineSMA50Array = calculateSMA(convertedLineDataArray, 50);
    const lineSMA100Array = calculateSMA(convertedLineDataArray, 100);
    const lineSMA250Array = calculateSMA(convertedLineDataArray, 250);

    const lineEMA20Array = calculateEMA(
      convertedLineDataArray,
      20,
      lineSMA20Array,
      2 / 21,
    );
    const lineEMA50Array = calculateEMA(
      convertedLineDataArray,
      50,
      lineSMA50Array,
      2 / 51,
    );
    const lineEMA100Array = calculateEMA(
      convertedLineDataArray,
      100,
      lineSMA100Array,
      2 / 101,
    );
    const lineEMA250Array = calculateEMA(
      convertedLineDataArray,
      250,
      lineSMA250Array,
      2 / 251,
    );

    const lineRSI7Array = calculateRSI(convertedLineDataArray, 7);
    const lineRSI14Array = calculateRSI(convertedLineDataArray, 14);

    const counterDaySMA12 = calculateSMA(convertedLineDataArray, 12);
    const K12 = 2 / (12 + 1);
    const lineEMA12Array = calculateEMA(
      convertedLineDataArray,
      12,
      counterDaySMA12,
      K12,
    );
    const counterDaySMA26 = calculateSMA(convertedLineDataArray, 26);
    const K26 = 2 / (26 + 1);
    const lineEMA26Array = calculateEMA(
      convertedLineDataArray,
      26,
      counterDaySMA26,
      K26,
    );
    const { fastLineResultArray, slowLineResultArray, histogramResultArray } =
      calculateMACD(lineEMA12Array, lineEMA26Array);

    console.log('fetching getDayDataFromMongoAPI');

    return {
      convertedLineDataArray,
      convertedCandlestickDataArray,
      convertedVolumeDataArray,
      lineSMA20Array,
      lineSMA50Array,
      lineSMA100Array,
      lineSMA250Array,
      lineEMA20Array,
      lineEMA50Array,
      lineEMA100Array,
      lineEMA250Array,
      lineRSI7Array,
      lineRSI14Array,
      fastLineResultArray,
      slowLineResultArray,
      histogramResultArray,
    };
  }

  async getNewsFromPostgres(symbol: string) {
    const result = await this.knex
      .select([
        'stock_news.id',
        'stock_id',
        'symbol',
        'name',
        'chinese_name',
        'title',
        'content',
        'time',
        'hyperlink',
        'current_price',
        'yesterday_price',
      ])
      .from('stock_news')
      .join('stock_info', 'stock_info.id', 'stock_news.stock_id')
      .where({ symbol: symbol });

    return result;
  }

  async subscribeStock(userID: number, symbol: string) {
    try {
      const isSubscribed = await this.checkUserStockSubscription(
        userID,
        symbol,
      );

      if (isSubscribed.subscribed) {
        await this.knex
          .delete('*')
          .from('user_stocks')
          .where({ user_id: userID, symbol: symbol });

        return { message: 'Stock unsubscribed.' };
      } else {
        await this.knex
          .insert({ user_id: userID, symbol: symbol })
          .into('user_stocks');

        return { message: 'Stock subscribed.' };
      }
    } catch (error) {
      throw new Error(error);
    }
  }

  async checkUserStockSubscription(userID: number, symbol: string) {
    try {
      const selectResult = await this.knex
        .select('*')
        .from('user_stocks')
        .where({ user_id: userID, symbol: symbol });
      console.log(selectResult);

      return { subscribed: selectResult.length > 0 };
    } catch (error) {
      throw new Error(error);
    }
  }

  async getCryptoDataFromMongoAPI(symbol: string, timeFrame: string) {
    const candlestickDataArray: CandlestickData[] = [];
    const lineDataArray: LineData[] = [];
    const volumeDataArray: VolumeData[] = [];
    const res = await fetch(`http://35.213.167.63/mongo/${symbol}`);
    const result = await res.json();
    result.reverse();

    result.forEach((element) => {
      const volumeColor =
        element.close - element.open > 0
          ? 'rgba(38, 166, 155, 0.5)'
          : 'rgba(239, 83, 80, 0.5)';
      candlestickDataArray.push({
        time: element.time,
        high: element.high,
        open: element.open,
        low: element.low,
        close: element.close,
      });
      lineDataArray.push({ time: element.time, value: element.close });
      volumeDataArray.push({
        time: element.time,
        value: element.volume,
        color: volumeColor,
      });
    });

    const {
      convertedLineDataArray,
      convertedCandlestickDataArray,
      convertedVolumeDataArray,
    } = changeTimeFrame(
      timeFrame,
      lineDataArray,
      candlestickDataArray,
      volumeDataArray,
    );

    const lineSMA20Array = calculateSMA(convertedLineDataArray, 20);
    const lineSMA50Array = calculateSMA(convertedLineDataArray, 50);
    const lineSMA100Array = calculateSMA(convertedLineDataArray, 100);
    const lineSMA250Array = calculateSMA(convertedLineDataArray, 250);

    const lineEMA20Array = calculateEMA(
      convertedLineDataArray,
      20,
      lineSMA20Array,
      2 / 21,
    );
    const lineEMA50Array = calculateEMA(
      convertedLineDataArray,
      50,
      lineSMA50Array,
      2 / 51,
    );
    const lineEMA100Array = calculateEMA(
      convertedLineDataArray,
      100,
      lineSMA100Array,
      2 / 101,
    );
    const lineEMA250Array = calculateEMA(
      convertedLineDataArray,
      250,
      lineSMA250Array,
      2 / 251,
    );

    const lineRSI7Array = calculateRSI(convertedLineDataArray, 7);
    const lineRSI14Array = calculateRSI(convertedLineDataArray, 14);

    const counterDaySMA12 = calculateSMA(convertedLineDataArray, 12);
    const K12 = 2 / (12 + 1);
    const lineEMA12Array = calculateEMA(
      convertedLineDataArray,
      12,
      counterDaySMA12,
      K12,
    );
    const counterDaySMA26 = calculateSMA(convertedLineDataArray, 26);
    const K26 = 2 / (26 + 1);
    const lineEMA26Array = calculateEMA(
      convertedLineDataArray,
      26,
      counterDaySMA26,
      K26,
    );
    const { fastLineResultArray, slowLineResultArray, histogramResultArray } =
      calculateMACD(lineEMA12Array, lineEMA26Array);

    console.log('fetching getDayDataFromMongoAPI');

    return {
      convertedLineDataArray,
      convertedCandlestickDataArray,
      convertedVolumeDataArray,
      lineSMA20Array,
      lineSMA50Array,
      lineSMA100Array,
      lineSMA250Array,
      lineEMA20Array,
      lineEMA50Array,
      lineEMA100Array,
      lineEMA250Array,
      lineRSI7Array,
      lineRSI14Array,
      fastLineResultArray,
      slowLineResultArray,
      histogramResultArray,
    };
  }

  async getHighLowFromMongoAPI(symbol: string) {
    const knexResult = await this.knex
      .select('*')
      .from('stock_info')
      .where({ symbol: symbol });

    const res = await fetch(`http://35.213.167.63/mongo/${symbol}?period=day`);
    const result = await res.json();

    let totalVolume = 0;
    const historyHigh = result.reduce((prev, current) => {
      if (prev > current.high) {
        return prev;
      }

      return current.high;
    }, -9999);

    const historyLow = result.reduce((prev, current) => {
      if (prev < current.low) {
        return prev;
      }

      return current.low;
    }, 999999999);

    const currentRes = await fetch(`http://35.213.167.63/mongo/${symbol}`);
    const currentResult = await currentRes.json();
    const todayOpen = currentResult[0].open;

    const todayHigh = currentResult.reduce((prev, current) => {
      if (prev > current.high) {
        return prev;
      }

      return current.high;
    }, -99999);

    const todayLow = currentResult.reduce((prev, current) => {
      if (prev < current.low) {
        return prev;
      }

      return current.low;
    }, 9999999);

    currentResult.forEach((obj) => {
      totalVolume += obj.volume;
    });

    return {
      symbol: symbol,
      name: knexResult[0].name,
      chineseName: knexResult[0].chinese_name,
      yesterdayPrice: result[result.length - 1].close,
      currentPrice: currentResult[currentResult.length - 1].close,
      priceDifference:
        currentResult[currentResult.length - 1].close -
        result[result.length - 1].close,
      priceDifferencePercentage:
        ((currentResult[currentResult.length - 1].close -
          result[result.length - 1].close) /
          result[result.length - 1].close) *
        100,
      todayOpen: todayOpen,
      todayHigh: todayHigh,
      todayLow: todayLow,
      historyHigh: historyHigh,
      historyLow: historyLow,
      volume: totalVolume,
      turnover: totalVolume * currentResult[currentResult.length - 1].close,
    };
  }

  async getCryptoAllDataFromMongoAPI(symbol: string) {
    const knexResult = await this.knex
      .select('*')
      .from('stock_info')
      .where({ symbol: symbol });

    const res = await fetch(`http://35.213.167.63/mongo/${symbol}`);
    const result = await res.json();
    const todayOpen = result[result.length - 1].open;

    let totalVolume = 0;
    const historyHigh = result.reduce((prev, current) => {
      if (prev > current.high) {
        return prev;
      }

      return current.high;
    }, -9999);

    const historyLow = result.reduce((prev, current) => {
      if (prev < current.low) {
        return prev;
      }

      return current.low;
    }, 999999999);

    const todayHigh = result.reduce((prev, current) => {
      if (prev > current.high) {
        return prev;
      }

      return current.high;
    }, -99999);

    const todayLow = result.reduce((prev, current) => {
      if (prev < current.low) {
        return prev;
      }

      return current.low;
    }, 9999999);

    result.forEach((obj) => {
      totalVolume += obj.volume;
    });

    return {
      symbol: symbol,
      name: knexResult[0].name,
      chineseName: knexResult[0].chinese_name,
      yesterdayPrice: result[result.length - 1].close,
      currentPrice: result[0].close,
      priceDifference: result[0].close - result[result.length - 1].close,
      priceDifferencePercentage:
        ((result[0].close - result[result.length - 1].close) /
          result[result.length - 1].close) *
        100,
      todayOpen: todayOpen,
      todayHigh: todayHigh,
      todayLow: todayLow,
      historyHigh: historyHigh,
      historyLow: historyLow,
      volume: totalVolume,
      turnover: totalVolume * result[result.length - 1].close,
    };
  }
}

function changeTimeFrame(
  timeFrame: string,
  lineDataArray: LineData[],
  candlestickDataArray: CandlestickData[],
  volumeArray: VolumeData[],
) {
  let convertedVolumeDataArray: VolumeData[] = [];
  let convertedLineDataArray: LineData[] = [];
  let convertedCandlestickDataArray: CandlestickData[] = [];
  switch (timeFrame) {
    case '5m':
      convertedLineDataArray = convertLineDataArray(5, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        5,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        5,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case '10m':
      convertedLineDataArray = convertLineDataArray(10, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        10,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        10,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case '15m':
      convertedLineDataArray = convertLineDataArray(15, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        15,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        15,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case '30m':
      convertedLineDataArray = convertLineDataArray(30, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        30,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        30,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case '1h':
      convertedLineDataArray = convertLineDataArray(60, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        60,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        60,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case '2h':
      convertedLineDataArray = convertLineDataArray(120, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        120,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        120,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case '4h':
      convertedLineDataArray = convertLineDataArray(240, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        240,
        candlestickDataArray,
      );
      convertedVolumeDataArray = convertVolumeDataArray(
        240,
        volumeArray,
        candlestickDataArray,
      );
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    default:
      return {
        convertedLineDataArray: lineDataArray,
        convertedCandlestickDataArray: candlestickDataArray,
        convertedVolumeDataArray: volumeArray,
      };
  }
}

function convertVolumeDataArray(
  timeFrame: number,
  volumeArray: VolumeData[],
  candelstickArray: CandlestickData[],
) {
  const newVolumeDataArray: VolumeData[] = [];
  if (timeFrame < 389) {
    for (let i = 0; i < volumeArray.length; i = i + 389) {
      const dayVolumeArray = volumeArray.slice(i, i + 389),
        dayCandlestickArray = candelstickArray.slice(i, i + 389);
      for (let i = 0; i < dayVolumeArray.length; i = i + timeFrame) {
        const slicedVolumeArray = dayVolumeArray.slice(i, i + timeFrame),
          sliceCandlestickArray = dayCandlestickArray.slice(i, i + timeFrame);
        let totalVolume = 0;
        for (const volumeObj of slicedVolumeArray) {
          totalVolume += volumeObj.value;
        }
        const color =
          sliceCandlestickArray[sliceCandlestickArray.length - 1].close -
            sliceCandlestickArray[0].open >
          0
            ? 'rgba(38, 166, 155, 0.5)'
            : 'rgba(239, 83, 80, 0.5)';

        newVolumeDataArray.push({
          time: slicedVolumeArray[0].time,
          value: totalVolume,
          color: color,
        });
      }
    }
    return newVolumeDataArray;
  }
  return volumeArray;
}

function convertLineDataArray(timeFrame: number, array: LineData[]) {
  const newLineDataArray: LineData[] = [];
  if (timeFrame < 389) {
    for (let i = 0; i < array.length; i = i + 389) {
      const dayArray = array.slice(i, i + 389);
      for (let i = 0; i < dayArray.length; i = i + timeFrame) {
        const slicedArray = dayArray.slice(i, i + timeFrame);
        newLineDataArray.push({
          time: slicedArray[0].time,
          value: slicedArray[slicedArray.length - 1].value,
        });
      }
    }
    return newLineDataArray;
  }
  return array;
}

function convertCandlestickDataArray(
  timeFrame: number,
  array: CandlestickData[],
) {
  const newCandlestickDataArray: CandlestickData[] = [];
  if (timeFrame < 389) {
    for (let i = 0; i < array.length; i = i + 389) {
      const dayArray = array.slice(i, i + 389);
      for (let i = 0; i < dayArray.length; i = i + timeFrame) {
        const slicedArray = dayArray.slice(i, i + timeFrame);
        const highest = slicedArray.reduce((prev, current) => {
          if (current.high > prev) {
            prev = current.high;
          }
          return prev;
        }, 0);
        const lowest = slicedArray.reduce((prev, current) => {
          if (current.low < prev) {
            prev = current.low;
          }
          return prev;
        }, 999999);

        newCandlestickDataArray.push({
          time: slicedArray[0].time,
          open: slicedArray[0].open,
          close: slicedArray[slicedArray.length - 1].close,
          high: highest,
          low: lowest,
        });
      }
    }
    return newCandlestickDataArray;
  }
  return array;
}

function calculateSMA(dataArray: LineData[], count: number) {
  const resultArray: LineData[] = [];
  const slicedArrayContainer = [];
  for (let i = count - 1; i < dataArray.length; i++) {
    slicedArrayContainer.push(dataArray.slice(i - (count - 1), i + 1));
  }
  slicedArrayContainer.map((array) => {
    let totalValue = 0;
    array.map((obj) => {
      totalValue += obj.value;
    });
    resultArray.push({
      time: array[array.length - 1].time,
      value: totalValue / array.length,
    });
  });

  return resultArray;
}

function calculateRSI(dataArray: LineData[], counter: number) {
  const resultArray: LineData[] = [];
  const slicedArrayContainer = [];
  for (let i = counter; i < dataArray.length; i++) {
    slicedArrayContainer.push(dataArray.slice(i - counter, i + 1));
  }
  slicedArrayContainer.map((array) => {
    const upArray = [];
    const downArray = [];
    for (let i = 1; i < array.length; i++) {
      const result = array[i].value - array[i - 1].value;
      if (result > 0) {
        upArray.push(result);
      } else {
        downArray.push(result);
      }
    }
    let totalUp = 0;
    for (const value of upArray) {
      totalUp += value;
    }

    let totalDown = 0;
    for (const value of downArray) {
      totalDown += -value;
    }

    const RSI =
      (totalUp / counter / (totalUp / counter + totalDown / counter)) * 100;

    resultArray.push({ time: array[array.length - 1].time, value: RSI });
  });

  return resultArray;
}

function calculateEMA(
  dataArray: LineData[],
  counter: number,
  SMAArray: LineData[],
  K: number,
) {
  const resultArray: LineData[] = [];
  if (SMAArray.length < counter) {
    return resultArray;
  }
  let lastDayEMA = SMAArray[0].value;
  resultArray.push({ time: dataArray[counter + 1].time, value: lastDayEMA });
  for (let i = counter + 2; i < dataArray.length; i++) {
    const todayEMA = K * (dataArray[i].value - lastDayEMA) + lastDayEMA;
    resultArray.push({ time: dataArray[i].time, value: todayEMA });
    lastDayEMA = todayEMA;
  }

  return resultArray;
}

function calculateMACD(EMA12Array: LineData[], EMA26Array: LineData[]) {
  const fastLineResultArray: LineData[] = [];
  for (let i = 0; i < EMA26Array.length; i++) {
    const fastLineResult = EMA12Array[i + 14].value - EMA26Array[i].value;
    fastLineResultArray.push({
      time: EMA26Array[i].time,
      value: fastLineResult,
    });
  }

  const counterDaySMA = calculateSMA(fastLineResultArray, 9);
  const slowLineResultArray = calculateEMA(
    fastLineResultArray,
    9,
    counterDaySMA,
    2 / 10,
  );

  const histogramResultArray: HistogramData[] = [];
  for (let i = 0; i < slowLineResultArray.length; i++) {
    const histogramValue =
      fastLineResultArray[i + 10].value - slowLineResultArray[i].value;

    let color = '';
    histogramValue > 0
      ? (color = 'rgb(38, 166, 155)')
      : (color = 'rgb(239, 83, 80)');

    histogramResultArray.push({
      time: fastLineResultArray[i].time,
      value: histogramValue,
      color: color,
    });
  }

  return { fastLineResultArray, slowLineResultArray, histogramResultArray };
}
