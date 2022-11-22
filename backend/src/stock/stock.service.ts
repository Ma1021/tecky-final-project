import { Injectable } from '@nestjs/common';
import { InjectKnex, Knex } from 'nestjs-knex';
import { MongoClient } from 'mongodb';
import { ResultObj } from './stock.interface';

async function connectMongoDB() {
  const url =
    'mongodb://03b083fd0aadc8883198881ba88111ab:f9023000f29773649f3850298becb9544b5fd6a9@35.213.167.63/?authMechanism=DEFAULT';
  // const url =
  //   'mongodb://f49435c5b2f88a8729256406cd4967d1:54b8ebfd1f120adb69b1be060c270de2aa3407f5@localhost:27017/?authMechanism=DEFAULT';
  const mongoClient = new MongoClient(url);
  await mongoClient.connect();
  console.log('MongoDB connected...........');

  return mongoClient;
}

@Injectable()
export class AppService {
  constructor(@InjectKnex() private readonly knex: Knex) {}
  getHello(): string {
    return 'Hello World';
  }

  async getMyList(userID: string) {
    const result = await this.knex
      .select(['user_stock.id', 'user_id', 'stock_id', 'symbol'])
      .from('user_stock')
      .join('stockinfo', 'user_stock.stock_id', 'stockinfo.id')
      .where({ user_id: userID });

    return result;
  }

  async getAllDataFromStockInfo(stockSymbol: string) {
    const result = await this.knex
      .select('*')
      .from('stockinfo')
      .where({ symbol: stockSymbol });

    return result;
  }

  async getSomeDataFromStockInfo(stockID: string) {
    const result = await this.knex
      .select(['id', 'name', 'symbol', 'currentprice', 'yesterdayprice'])
      .from('stockinfo')
      .where({ id: stockID });

    return result;
  }

  async getDataFromIntraDay(stockID: string) {
    const result = await this.knex
      .select('*')
      .from('intradayprices')
      .where({ stock_id: stockID });

    return result;
  }

  async getIntraDayDataFromMongoDB(symbol: string) {
    const MongoDB = await connectMongoDB();
    const result = await MongoDB.db('stocks_price_data')
      .collection(symbol)
      .find({})
      .toArray();
    let resultArray: ResultObj[] = [];
    const resultObj: ResultObj = {
      histogramData: { time: 0, value: 0, color: '' },
      areaData: { time: 0, value: 0 },
      barData: { time: 0, open: 0, high: 0, close: 0, low: 0 },
      candleStickData: { time: 0, open: 0, high: 0, close: 0, low: 0 },
      lineData: { time: 0, value: 0 },
      volume: { time: 0, value: 0, color: '' },
    };

    result.forEach((element) => {
      resultObj.histogramData.time =
        resultObj.areaData.time =
        resultObj.barData.time =
        resultObj.candleStickData.time =
        resultObj.lineData.time =
        resultObj.volume.time =
          element.timestamp;

      resultObj.barData.open = resultObj.candleStickData.open = parseFloat(
        element.Open.toFixed(2),
      );

      resultObj.barData.high = resultObj.candleStickData.high = parseFloat(
        element.High.toFixed(2),
      );

      resultObj.barData.low = resultObj.candleStickData.low = parseFloat(
        element.Low.toFixed(2),
      );

      resultObj.barData.close = resultObj.candleStickData.close = parseFloat(
        element.Close.toFixed(2),
      );

      resultObj.areaData.value =
        resultObj.histogramData.value =
        resultObj.lineData.value =
          parseFloat(element.Close.toFixed(2));

      resultObj.volume.value = element.Volume;
      resultObj.volume.color = resultObj.histogramData.color = '#00ff00';

      resultArray.push(JSON.parse(JSON.stringify(resultObj)));
    });
    resultArray = resultArray.slice(0, 389);

    return resultArray;
  }

  async getDataFromMongoDB(symbol: string) {
    const MongoDB = await connectMongoDB();
    const result = await MongoDB.db('stocks_price_data')
      .collection(symbol)
      .find({})
      .toArray();
    const resultArray: ResultObj[] = [];
    const resultObj: ResultObj = {
      histogramData: { time: 0, value: 0, color: '' },
      areaData: { time: 0, value: 0 },
      barData: { time: 0, open: 0, high: 0, close: 0, low: 0 },
      candleStickData: { time: 0, open: 0, high: 0, close: 0, low: 0 },
      lineData: { time: 0, value: 0 },
      volume: { time: 0, value: 0, color: '' },
    };

    result.forEach((element) => {
      resultObj.histogramData.time =
        resultObj.areaData.time =
        resultObj.barData.time =
        resultObj.candleStickData.time =
        resultObj.lineData.time =
        resultObj.volume.time =
          element.timestamp;

      resultObj.barData.open = resultObj.candleStickData.open = parseFloat(
        element.Open.toFixed(2),
      );

      resultObj.barData.high = resultObj.candleStickData.high = parseFloat(
        element.High.toFixed(2),
      );

      resultObj.barData.low = resultObj.candleStickData.low = parseFloat(
        element.Low.toFixed(2),
      );

      resultObj.barData.close = resultObj.candleStickData.close = parseFloat(
        element.Close.toFixed(2),
      );

      resultObj.areaData.value =
        resultObj.histogramData.value =
        resultObj.lineData.value =
          parseFloat(element.Close.toFixed(2));

      resultObj.volume.value = element.Volume;
      resultObj.volume.color = resultObj.histogramData.color = '#00ff00';

      resultArray.push(JSON.parse(JSON.stringify(resultObj)));
    });
    console.log('fetching getDataFromMongoDB');

    return resultArray;
  }

  async getEveryDayDataFromMongoDB(symbol: string) {
    const MongoDB = await connectMongoDB();
    const result = await MongoDB.db('for_gary_test')
      .collection(symbol)
      .find({})
      .toArray();
    const resultArray: ResultObj[] = [];
    const resultObj: ResultObj = {
      histogramData: { time: 0, value: 0, color: '' },
      areaData: { time: 0, value: 0 },
      barData: { time: 0, open: 0, high: 0, close: 0, low: 0 },
      candleStickData: { time: 0, open: 0, high: 0, close: 0, low: 0 },
      lineData: { time: 0, value: 0 },
      volume: { time: 0, value: 0, color: '' },
    };

    result.forEach((element) => {
      resultObj.histogramData.time =
        resultObj.areaData.time =
        resultObj.barData.time =
        resultObj.candleStickData.time =
        resultObj.lineData.time =
        resultObj.volume.time =
          element.timestamp;

      resultObj.barData.open = resultObj.candleStickData.open = parseFloat(
        element.Open.toFixed(2),
      );

      resultObj.barData.high = resultObj.candleStickData.high = parseFloat(
        element.High.toFixed(2),
      );

      resultObj.barData.low = resultObj.candleStickData.low = parseFloat(
        element.Low.toFixed(2),
      );

      resultObj.barData.close = resultObj.candleStickData.close = parseFloat(
        element.Close.toFixed(2),
      );

      resultObj.areaData.value =
        resultObj.histogramData.value =
        resultObj.lineData.value =
          parseFloat(element.Close.toFixed(2));

      resultObj.volume.value = element.Volume;
      resultObj.volume.color = resultObj.histogramData.color = '#00ff00';

      resultArray.push(JSON.parse(JSON.stringify(resultObj)));
    });

    console.log('fetching getEveryDayDataFromMongoDB');

    return resultArray;
  }
}
