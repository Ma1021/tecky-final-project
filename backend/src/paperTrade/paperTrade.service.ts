import { InjectModel } from 'nest-knexjs';
import { Injectable } from '@nestjs/common';
import { Knex } from 'knex';

@Injectable()
export class PaperTradeService {
  constructor(@InjectModel() private readonly knex: Knex) {}

  async getAccountList(userID: number) {
    const result = await this.knex
      .select(['id', 'market_value', 'buying_power', 'account'])
      .from('user_paper_trade_accounts')
      .where({ user_id: userID })
      .orderBy('id', 'asc');

    const newResult = result.map((obj) => {
      const principal = obj.market_value + obj.buying_power;
      const total_profit = principal - 1000000;
      const total_profit_percentage = (total_profit / 1000000) * 100;

      return {
        id: obj.id,
        account: obj.account,
        principal: principal,
        total_profit: total_profit,
        total_profit_percentage: total_profit_percentage,
      };
    });

    return newResult;
  }

  async getIndividualAccountDetail(userID: number, account: string) {
    try {
      const result = await this.knex
        .select('*')
        .from('user_paper_trade_accounts')
        .where({ user_id: userID, account: account });

      return result;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async placeOrder(
    userID: number,
    symbol: string,
    orderType: string,
    price: number,
    quantity: number,
    account: string,
  ) {
    let isLong = undefined;
    orderType === 'long' ? (isLong = true) : (isLong = false);
    try {
      await this.insertUserTradeRecord(
        userID,
        symbol,
        isLong,
        price,
        quantity,
        account,
      );

      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power;

      const currentTransaction = quantity * price;
      let newBuyingPower = 0;
      if (isLong) {
        newBuyingPower = buyingPower - currentTransaction;
      } else {
        newBuyingPower = buyingPower + currentTransaction;
      }

      // this.completeOrder(userID, symbol, isLong, price, quantity, account);

      return { message: 'Place order succeed.' };
    } catch (error) {
      console.log(error);
      throw new Error('Place order failed.');
    }
  }

  async closePosition(
    id: number,
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: isLong,
          order_price: price,
          quantity: quantity,
          order_place_time: new Date(),
          order_status: 1,
          account: account,
        })
        .into('user_trades');

      await this.knex.delete('*').from('user_positions').where({ id: id });

      await this.updateAccountDetailAfterOrder(
        userID,
        isLong,
        price,
        quantity,
        account,
      );

      return { message: 'Position closed.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getRecentOrderList(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'user_trades.symbol',
        'name',
        'chinese_name',
        'long',
        'order_price',
        'quantity',
        'order_place_time',
        'order_status',
        'order_complete_time',
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
      .where({ user_id: userID, account: account })
      .orderBy('order_place_time', 'desc')
      .limit(5);

    return result;
  }

  async getFullOrderList(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'user_trades.symbol',
        'name',
        'chinese_name',
        'long',
        'order_price',
        'quantity',
        'order_place_time',
        'order_status',
        'order_complete_time',
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
      .where({ user_id: userID, account: account })
      .orderBy('order_place_time', 'desc');

    return result;
  }

  async getPositionList(userID: number, account: string) {
    try {
      const result = await this.knex
        .select([
          'user_positions.id',
          'user_positions.symbol',
          'long',
          'name',
          'user_positions.current_price',
          'chinese_name',
          'cost',
          'quantity',
        ])
        .from('user_positions')
        .join('stock_info', 'user_positions.symbol', 'stock_info.symbol')
        .where({ user_id: userID, account: account });

      const resultArray = [];
      let totalMarketValue = 0;
      for (const obj of result) {
        const currentPrice = await this.getCurrentPrice(obj.symbol);
        totalMarketValue += obj.quantity * currentPrice;
      }

      for (const obj of result) {
        const currentPrice = await this.getCurrentPrice(obj.symbol);
        const marketValue = obj.quantity * currentPrice;
        const profit = (currentPrice - parseFloat(obj.cost)) * obj.quantity;
        const profitPercentage =
          (profit / parseFloat(obj.cost) / obj.quantity) * 100;
        const ratio = (marketValue / totalMarketValue) * 100;

        resultArray.push({
          id: obj.id,
          symbol: obj.symbol,
          long: obj.long,
          name: obj.name,
          chineseName: obj.chinese_name,
          cost: parseFloat(obj.cost),
          marketValue: marketValue,
          currentPrice: currentPrice,
          quantity: obj.quantity,
          profit: profit,
          profitPercentage: profitPercentage,
          ratio: ratio,
        });
      }

      return resultArray;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async insertUserTradeRecord(
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: isLong,
          order_price: price,
          quantity: quantity,
          order_place_time: new Date(),
          order_status: 1,
          account: account,
        })
        .into('user_trades');

      return { message: 'User trade record inserted.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async insertOrUpdateUserPosition(
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    const positionResult = await this.knex
      .select('*')
      .from('user_positions')
      .where({ symbol: symbol, account: account });

    if (positionResult.length === 0) {
      await this.knex
        .insert({
          user_id: userID,
          symbol: symbol,
          long: isLong,
          cost: price,
          current_price: price,
          quantity: quantity,
          account: account,
        })
        .into('user_positions');

      return { message: 'User position inserted.' };
    } else {
      let newQuantity = 0;
      let newCost = 0;
      newQuantity = positionResult[0].quantity + quantity;
      newCost =
        (parseFloat(positionResult[0].cost) * positionResult[0].quantity +
          price * quantity) /
        newQuantity;

      await this.knex
        .update({ cost: newCost, quantity: newQuantity })
        .from('user_positions')
        .where({ symbol: symbol });

      return { message: 'User position updated.' };
    }
  }

  async updateAccountDetailAfterOrder(
    userID: number,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );
      let newMarketValue = 0,
        newBuyingPower = 0;

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power;

      const currentTransaction = quantity * price;

      if (isLong) {
        newMarketValue = marketValue + currentTransaction;
        newBuyingPower = buyingPower - currentTransaction;
      } else {
        newMarketValue = marketValue - currentTransaction;
        newBuyingPower = buyingPower + currentTransaction;
      }

      await this.knex
        .update({
          market_value: newMarketValue,
          buying_power: newBuyingPower,
        })
        .from('user_paper_trade_accounts')
        .where({ user_id: userID, account: account });

      return { message: 'Account detail updated.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async placeOrder2(
    userID: number,
    symbol: string,
    orderType: string,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      let isLong = undefined;
      orderType === 'long' ? (isLong = true) : (isLong = false);
      await this.insertUserTradeRecord(
        userID,
        symbol,
        isLong,
        price,
        quantity,
        account,
      );

      await this.insertOrUpdateUserPosition(
        userID,
        symbol,
        isLong,
        price,
        quantity,
        account,
      );

      await this.updateAccountDetailAfterOrder(
        userID,
        isLong,
        price,
        quantity,
        account,
      );

      await this.updateAccountDetailBasedOnCurrentPrice(
        userID,
        symbol,
        account,
      );
      return { message: 'Order placed.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateAccountDetailBasedOnCurrentPrice(
    userID: number,
    symbol: string,
    account: string,
  ) {
    const currentPrice = await this.getCurrentPrice(symbol);
    await this.knex
      .update({ market_value: currentPrice })
      .from('user_paper_trade_accounts')
      .where({ user_id: userID, account: account });
    return { message: 'Account updated.' };
  }

  async getCurrentPriceAndUpdatePostgres(userID: number) {
    const selectResult = await this.knex
      .select('symbol')
      .from('user_positions')
      .where({ user_id: userID });

    selectResult.map(async (symbol) => {
      console.log(symbol);

      const res = await fetch(
        `http://35.213.167.63/mongo/${symbol.symbol}?period=day`,
      );

      const result = await res.json();
      await this.knex
        .update({ current_price: result[result.length - 1].close })
        .from('user_positions')
        .where({ symbol: symbol.symbol });
    });

    return { message: 'Postgres updated.' };
  }

  async getCurrentPrice(symbol: string) {
    try {
      const res = await fetch(
        `http://35.213.167.63/mongo/${symbol}?period=day`,
      );
      const result = await res.json();

      let currentPrice = undefined;

      result['detail'] === 'Not Found'
        ? (currentPrice = 0)
        : (currentPrice = result[result.length - 1].close);

      return currentPrice;
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async getStockName(symbol: string) {
    const result = await this.knex
      .select(['name', 'chinese_name'])
      .from('stock_info')
      .where({ symbol: symbol });

    console.log(result);
    return result;
  }

  // not using
  async getPositionList2notUsing(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_positions.id',
        'user_positions.symbol',
        'long',
        'name',
        'chinese_name',
        'cost',
        'quantity',
      ])
      .from('user_positions')
      .join('stock_info', 'user_positions.symbol', 'stock_info.symbol')
      .where({ user_id: userID, account: account });

    const totalMarketValueArray = await Promise.all(
      result.map(async (obj) => {
        const currentPrice = await this.getCurrentPrice(obj.symbol);
        return obj.quantity * currentPrice;
      }),
    );
    const totalMarketValue = totalMarketValueArray.reduce(
      (acc, cur) => acc + cur,
      0,
    );

    const resultArray = await this.middleFunctionNotUsing(
      result,
      totalMarketValue,
    );

    console.log('resultArray: ', resultArray);
    return resultArray;
  }

  async middleFunctionNotUsing(result, totalMarketValue) {
    return await Promise.all(
      result.map(async (obj) => {
        const currentPrice = await this.getCurrentPrice(obj.symbol);
        const marketValue = obj.quantity * currentPrice;
        const profit = (currentPrice - parseFloat(obj.cost)) * obj.quantity;
        const profitPercentage =
          (profit / parseFloat(obj.cost) / obj.quantity) * 100;
        const ratio = (marketValue / totalMarketValue) * 100;
        console.log('marketValue: ', marketValue);
        console.log('totalMarketValue: ', totalMarketValue);
        console.log(ratio);

        return {
          id: obj.id,
          symbol: obj.symbol,
          long: obj.long,
          name: obj.name,
          chineseName: obj.chinese_name,
          cost: parseFloat(obj.cost),
          marketValue: marketValue,
          currentPrice: currentPrice,
          quantity: obj.quantity,
          profit: profit,
          profitPercentage: profitPercentage,
          ratio: ratio,
        };
      }),
    );
  }

  async getInProgressOrderList(userID: number, account: string) {
    const result = await this.knex
      .select([
        'user_trades.id',
        'user_trades.symbol',
        'name',
        'chinese_name',
        'long',
        'order_price',
        'quantity',
        'order_place_time',
        'order_status',
      ])
      .from('user_trades')
      .join('stock_info', 'user_trades.symbol', 'stock_info.symbol')
      .where({ user_id: userID, order_complete_time: null, account: account })
      .orderBy('order_place_time', 'desc');

    return result;
  }

  async cancelOrder(orderID: number, userID: number, account: string) {
    try {
      const { order_price, quantity } = (
        await this.knex
          .update({ order_status: 2, order_complete_time: new Date() })
          .from('user_trades')
          .where({ id: orderID })
          .returning(['order_price', 'quantity'])
      )[0];

      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power;

      const currentTransaction = quantity * order_price;

      const newBuyingPower = buyingPower + currentTransaction;

      return { message: 'Order cancelled.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async completeOrder(
    userID: number,
    symbol: string,
    isLong: boolean,
    price: number,
    quantity: number,
    account: string,
  ) {
    try {
      await this.updateUserTradeRecord(symbol);

      await this.insertOrUpdateUserPosition(
        userID,
        symbol,
        isLong,
        price,
        quantity,
        account,
      );

      const selectResult = await this.getIndividualAccountDetail(
        userID,
        account,
      );

      const marketValue = selectResult[0].market_value,
        buyingPower = selectResult[0].buying_power,
        totalProfit = selectResult[0].total_profit;

      const currentTransaction = quantity * price;
      let newMarketValue = 0;
      if (isLong) {
        newMarketValue = marketValue + currentTransaction;
      } else {
        newMarketValue = marketValue - currentTransaction;
      }

      return { message: 'Order completed.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async updateUserTradeRecord(symbol: string) {
    try {
      // fetch to get current price of specific stock
      const currentPrice = 100;

      await this.knex
        .update({ order_status: 1, order_complete_time: new Date() })
        .from('user_trades')
        .where({ symbol: symbol })
        .andWhere('order_price', '<=', currentPrice);

      return { message: 'User trade records updated.' };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  // new
  async getFullOrderList2(userID: number, account: string) {
    try {
      console.log('userID', userID, 'account', account);
      const initPrincipal = 1000000;
      const positions = [];

      const result = await this.knex
        .select(
          'trade_records.id',
          'account',
          'name',
          'chinese_name',
          'order_place_time',
          'order_price',
          'order_status',
          'trade_records.symbol',
          'quantity',
          'order_market_value',
        )
        .from('trade_records')
        .join('stock_info', 'trade_records.symbol', 'stock_info.symbol')
        .where({ user_id: userID, account: account })
        .orderBy('order_place_time', 'desc');

      if (result.length === 0) {
        return {
          accountDetail: {
            principal: initPrincipal,
            marketValue: 0,
            buyingPower: initPrincipal,
            totalProfit: 0,
            totalProfitPercentage: 0,
          },
          positions,
          trades: result,
        };
      }

      const symbolMap = new Map();
      for (const obj of result) {
        symbolMap.set(obj.symbol, true);
      }

      let currentTotalMarketValue = 0,
        buyingPower = initPrincipal;

      for (const symbol of symbolMap.keys()) {
        const currentPrice = await this.getCurrentPrice(symbol);
        const quantity = (
          await this.knex
            .select(this.knex.raw('SUM(quantity)'))
            .from('trade_records')
            .where({ symbol: symbol })
        )[0];

        currentTotalMarketValue += currentPrice * quantity.sum;
      }

      for (const symbol of symbolMap.keys()) {
        let id = 0,
          cost = 0,
          quantity = 0,
          name = '',
          chineseName = '',
          currentStockMarketValue = 0,
          orderStockMarketValue = 0,
          currentPrice = 0,
          profit = 0,
          profitPercentage = 0,
          ratio = 0,
          totalQuantity = 0,
          stockOrderMarketValue = 0;

        for (const obj of result) {
          if (obj.symbol === symbol) {
            id = obj.id;
            name = obj.name;
            chineseName = obj.chinese_name;
            currentPrice = await this.getCurrentPrice(symbol);
            totalQuantity += obj.quantity;
            stockOrderMarketValue += obj.order_market_value;
          }
        }

        buyingPower -= stockOrderMarketValue;
        cost = stockOrderMarketValue / totalQuantity;

        quantity = totalQuantity;
        orderStockMarketValue = cost * quantity;
        currentStockMarketValue = currentPrice * quantity;
        profit = currentStockMarketValue - orderStockMarketValue;
        profitPercentage = (profit / orderStockMarketValue) * 100;
        ratio = (currentStockMarketValue / currentTotalMarketValue) * 100;

        if (quantity === 0) {
          continue;
        }

        positions.push({
          id,
          name,
          chineseName,
          symbol,
          currentMarketValue: currentStockMarketValue,
          currentPrice,
          quantity,
          cost,
          profit,
          profitPercentage,
          ratio,
        });
      }

      return {
        accountDetail: {
          principal: currentTotalMarketValue + buyingPower,
          marketValue: currentTotalMarketValue,
          buyingPower,
          totalProfit: currentTotalMarketValue + buyingPower - initPrincipal,
          totalProfitPercentage:
            ((currentTotalMarketValue + buyingPower - initPrincipal) /
              initPrincipal) *
            100,
        },
        positions,
        trades: result,
      };
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  }

  async placeOrder3(
    userID: number,
    symbol: string,
    orderDirection: string,
    price: number,
    quantity: number,
    account: string,
  ) {
    orderDirection === 'long' ? (quantity = quantity) : (quantity = -quantity);
    if (orderDirection !== 'long') {
      const ownedTickets = await this.knex
        .select(this.knex.raw('SUM(trade_records.quantity)'))
        .from('trade_records')
        .where({ symbol: symbol });

      if (ownedTickets[0] < quantity) {
        return { message: 'You do not have enough tickets to sell. ' };
      }
    }

    await this.knex
      .insert({
        user_id: userID,
        symbol: symbol,
        order_price: price,
        quantity: quantity,
        order_market_value: price * quantity,
        order_status: 1,
        account: account,
      })
      .into('trade_records');

    return { message: 'Order placed.' };
  }

  async getAccountList2(userID: number) {
    const USAccount = (await this.getFullOrderList2(userID, 'US'))
      .accountDetail;
    // const HKAccount = (await this.getFullOrderList2(userID, 'HK'))
    //   .accountDetail;
    const cryptoAccount = (await this.getFullOrderList2(userID, 'crypto'))
      .accountDetail;

    USAccount['id'] = 1;
    // HKAccount['id'] = 2;
    cryptoAccount['id'] = 3;
    USAccount['account'] = 'US';
    // HKAccount['account'] = 'HK';
    cryptoAccount['account'] = 'crypto';

    return [USAccount, cryptoAccount];
  }
}
