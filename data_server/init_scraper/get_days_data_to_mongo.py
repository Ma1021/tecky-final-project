import pymongo
from pymongo import MongoClient
import redis
import yfinance as yf
import pandas as pd
import json
from datetime import date

today = date.today()
print("Today date is: " + str(today))

uri = "mongodb://f49435c5b2f88a8729256406cd4967d1:54b8ebfd1f120adb69b1be060c270de2aa3407f5@10.148.0.3:27017/?authMechanism=DEFAULT"
client = MongoClient(uri)
db = client["days_database"]

pool = redis.ConnectionPool(
    host='10.148.0.3', port=6379, decode_responses=True)
r = redis.Redis(connection_pool=pool)


def dl_data_to_mongo(dl_list, dl_step):
    symbol_count = len(dl_list)
    print("Total stock symbol: " + str(symbol_count))
    error_list = []
    inserted_stock = 0

    for i in range(0, symbol_count, dl_step):
        download_list = dl_list[i:i+dl_step]
        print("numbers of stock pending to download: " + str(len(download_list)))

        yfinance_download_string = ""
        for symbol in download_list:
            yfinance_download_string = yfinance_download_string + \
                ' ' + str(symbol)
        print("yfinance_list: " + yfinance_download_string)

        stock_data_raw = yf.download(
            yfinance_download_string, period="max", interval="1d", threads=True, group_by='tickers')
        symbol_columns = stock_data_raw.columns.get_level_values(0)
        symbol_list = set(symbol_columns)
        print("get number of stock: " + str(len(symbol_list)))

        for symbol in symbol_list:
            datalist = []
            print(symbol)
            df = stock_data_raw[symbol]
            newdf = df[(pd.isna(df.Close) != True)]

            for i, row in newdf.iterrows():
                data = row.to_dict()
                data['timestamp'] = i.timestamp()
                dataJson = json.dumps(data)
                datalist.append(data)

            if len(datalist) == 0:
                print('no data skip insert: ' + str(symbol))
                continue

            collection = db[symbol]
            try:
                collection.insert_many(datalist)
                inserted_stock = inserted_stock + 1
                print("Inserted Stock: " + str(inserted_stock))
            except Exception as e:
                print(e)
                error_list.append(symbol)

    print(error_list)
    # if len(error_list) > 0:
    #     dl_data_to_mongo(dl_list=error_list, dl_step=10)


all_stock_list = r.hkeys("us_stock_ticker")
dl_data_to_mongo(dl_list=all_stock_list, dl_step=500)
# all_etf_list = r.hkeys("us_etf_ticker")
# dl_data_to_mongo(dl_list=all_etf_list, dl_step=500)
