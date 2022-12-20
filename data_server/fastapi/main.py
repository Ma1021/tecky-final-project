from typing import Union
from fastapi import FastAPI, HTTPException
import os
from dotenv import load_dotenv
from pymongo import MongoClient
from json import dumps
from json import loads
import urllib.request
import urllib.error
import redis
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from cassandra.query import dict_factory
import json

app = FastAPI()
load_dotenv()

# mongo
MONGO_URI = os.getenv('MONGO_URI')
client = MongoClient(MONGO_URI)
db = client["alltime_us_stock_datas"]

# redis
REDIS_HOST = os.getenv('REDIS_HOST')
REDIS_PORT = os.getenv('REDIS_PORT')
pool = redis.ConnectionPool(
    host=REDIS_HOST, port=REDIS_PORT, decode_responses=True)
r = redis.Redis(connection_pool=pool)

# cassandra
auth_provider = PlainTextAuthProvider(
    username='cassandra', password='cassandra')
cluster = Cluster(['10.148.0.3'], port=9042, auth_provider=auth_provider)
session = cluster.connect('stocks_data')
session.row_factory = dict_factory


class DatetimeEncoder(json.JSONEncoder):
    def default(self, obj):
        try:
            return super().default(obj)
        except TypeError:
            return str(obj)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/mongo/{stock_symbol}")
def get_stock(stock_symbol: str, period: Union[str, None] = None):
    stock_symbol = stock_symbol.upper()
    if ('USDT' in stock_symbol or 'BTC' in stock_symbol or 'BUSD' in stock_symbol or 'ETH' in stock_symbol):
        try:
            pre_datas = session.prepare(
                f'select TOUNIXTIMESTAMP(timestamp)/1000+28800 as time,close,high,low,open,volume from crypto_list where symbol = ? ORDER BY timestamp DESC LIMIT 1000')
            datas = session.execute(pre_datas, [f'{stock_symbol}'])
            data_list = list(datas)
            stock_json = loads(dumps(data_list))
            if len(stock_json) == 0:
                raise HTTPException(status_code=404, detail="crypto not found")
            return stock_json
        except urllib.error.HTTPError as err:
            return (err.code)
    elif period == None:
        try:
            db_2 = client["minutes_database"]
            stock_price = db_2[stock_symbol].aggregate([
                {"$project":
                    {
                        '_id': 0,
                        "time": "$timestamp",
                        "open": "$Open",
                        "high": "$High",
                        "low": "$Low",
                        "close": "$Close",
                        "volume": "$Volume",
                    }
                 },
            ])
            stock_json = json.loads(json.dumps(
                list(stock_price), cls=DatetimeEncoder))
            if len(stock_json) == 0:
                raise HTTPException(status_code=404, detail="stock not found")
            return stock_json
        except urllib.error.HTTPError as err:
            return (err.code)
    else:
        try:
            pre_datas = session.prepare(
                f'select timestamp as time,close,high,low,open,volume from {period}_list where symbol = ?')
            datas = session.execute(pre_datas, [f'{stock_symbol}'])
            data_list = list(datas)
            stock_json = loads(dumps(data_list, cls=DatetimeEncoder))
            if len(stock_json) == 0:
                raise HTTPException(status_code=404, detail="stock not found")
            return stock_json
        except urllib.error.HTTPError as err:
            return (err.code)


@ app.get("/redis/{symbol}")
def get_symbol(symbol: str):
    try:
        symbol_match = f"*{symbol}*"
        result = r.hscan_iter('us_stock_ticker', symbol_match, 10)
        result_list = dict(list(result))
        result_json = loads(dumps(result_list))
        if len(result_json) == 0:
            raise HTTPException(status_code=404, detail="stock not found")
        return result_json
    except urllib.error.HTTPError as err:
        return (err.code)

# run server
# uvicorn main:app --host 0.0.0.0 --port 8000
