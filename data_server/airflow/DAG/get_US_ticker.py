import time
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.decorators import dag, task
import pendulum
import pandas as pd
import requests
import json
import redis


@dag(
    dag_id="get_US_ticker",
    start_date=pendulum.datetime(2021, 1, 1, tz="EST"),
    catchup=False,
    tags=['stock'],
    schedule='0 9 * * *',
    default_args={'retries': 2},
)
def get_US_ticker():

    def get_ticker(ticker_target: str):
        # fetch yahoo
        small_cap_all_stock = 'https://finance.yahoo.com/screener/0e5d4c2f-b034-4429-906f-2250a3444a20'
        mega_cap_all_stock = 'https://finance.yahoo.com/screener/fafd84d0-575a-445a-a10e-7e99a746beb4'
        etf = 'https://finance.yahoo.com/screener/1f898720-563f-4559-9cf6-adae0994a1a4'
        cookie = """maex=%7B%22v2%22%3A%7B%7D%7D; F=d=hgqcWAs9vDEWkjS8MKxl6_dLQ.RHyCvz4z7xK3OZIw--; PH=l=zh-Hant-HK; Y=v=1&n=7scqnpo2u74uo&l=8ed678dsqqr/o&p=m2gvvhk00000000&r=8i&intl=hk; GUC=AQEACAJjc0tjo0IejgSa&s=AQAAAH4mHQ4u&g=Y3H9Mw; A1=d=AQABBD_uUGMCEEr3sLnPaiBjK-B0ySYEtjsFEgEACAJLc2OjY1iia3sB_eMBAAcIP-5QYyYEtjsID7PYG6BrKq92lZOKm1B4ogkBBwoBJA&S=AQAAAjwx-VSFHsBoNRqRXO_kX6E; A3=d=AQABBD_uUGMCEEr3sLnPaiBjK-B0ySYEtjsFEgEACAJLc2OjY1iia3sB_eMBAAcIP-5QYyYEtjsID7PYG6BrKq92lZOKm1B4ogkBBwoBJA&S=AQAAAjwx-VSFHsBoNRqRXO_kX6E; PRF=t%3DAAPL%252BAFAC%252BHSFI%252BAFIIQ%252BPCG-PB%252BMNMRF%252BMKTDF%252BSCMA.JK%252B0700.HK%252B3913.HK; ucs=tr=1670404362000; A1S=d=AQABBD_uUGMCEEr3sLnPaiBjK-B0ySYEtjsFEgEACAJLc2OjY1iia3sB_eMBAAcIP-5QYyYEtjsID7PYG6BrKq92lZOKm1B4ogkBBwoBJA&S=AQAAAjwx-VSFHsBoNRqRXO_kX6E&j=WORLD; OTH=v=1&d=eyJraWQiOiIwMTY0MGY5MDNhMjRlMWMxZjA5N2ViZGEyZDA5YjE5NmM5ZGUzZWQ5IiwiYWxnIjoiUlMyNTYifQ.eyJjdSI6eyJndWlkIjoiM1RSQUszRUNHQlBFMkgzRlJBM0tWNlRPNE0iLCJwZXJzaXN0ZW50Ijp0cnVlLCJzaWQiOiJDaUdrM3BobzQxUTkifX0.O2oCmE9-CZ36RVIS0E6h4cenaGUxj2e1TP2Dc65VdW_YZzpGgOd4MZeuq2WSOPHJ-sd8JN1Gt2mL8mieOAGNx7gtiFwo1jrpENb8OKNvVL9hr-eIrutTYw9huaQKKK4XFXJIAm-sTk_ctmkkZNezgWykzBYMLUS92o8pMugfXIY; T=af=JnRzPTE2NzAzMTc5NjImcHM9ZTd5TkhISkVjRWprVUZBYlZLRDBDQS0t&d=bnMBeWFob28BZwEzVFJBSzNFQ0dCUEUySDNGUkEzS1Y2VE80TQFhYwFBRmdJbnZRcgFhbAFpb25naGluMjAwMQFzYwFkZXNrdG9wX3dlYgFmcwFDVEUxdWo1amNmMGsBenoBS2V3ampCQTdFAWEBUUFFAWxhdAFrMGZjakIBbnUBMA--&kt=EAAONCO7zDJRWhthGFSpaeEUg--~I&ku=FAAhcFoMcf11gRhwukotFf5jLQUD64C6seYKXzNfTy5HVqt_LtoA3Clc84u56E0HC38jblV.P0WOV8XXaWngd.K97SHJcy276XU4SWEYrFjJ2gYRfarw12ojMlCmqHGf_dpfNDCueW3e.Si81fzy93jx70LvXN4oH6ervf3aM7Myns-~E; cmp=t=1670317966&j=0&u=1---"""
        symbol_list = {}

        def get_symbol(yahoo_link: str, cookie_use: str, Max_range: int):
            for i in range(0, Max_range, 100):
                url = f'{yahoo_link}?offset={i}&count=100'
                print(url)
                headers = {
                    "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', "cookie": cookie_use}
                request = requests.get(url, headers=headers)
                data = pd.read_html(request.text, keep_default_na=False)[0]
                print(data[['Symbol', 'Name']])
                df = data[['Symbol', 'Name']]
                for i, row in df.iterrows():
                    Symbol = row['Symbol']
                    Name = row['Name']
                    symbol_list[Symbol] = Name
                time.sleep(1)
        if ticker_target == "stock":
            get_symbol(small_cap_all_stock, cookie, 10000)
            get_symbol(mega_cap_all_stock, cookie, 4000)
        elif ticker_target == "etf":
            get_symbol(etf, cookie, 3600)
        return symbol_list

    def clean_redis(clean_target: str):
        pool = redis.ConnectionPool(
            host='10.148.0.3', port=6379, decode_responses=True)
        r = redis.Redis(connection_pool=pool)
        r.delete(clean_target)

    def write_to_redis(symbol_list: dict, clean_target: str):
        pool = redis.ConnectionPool(
            host='10.148.0.3', port=6379, decode_responses=True)
        r = redis.Redis(connection_pool=pool)
        for symbol, stock in symbol_list.items():
            r.hset(clean_target, symbol, stock)

    etf_list = task(task_id="get_etf_list")(get_ticker)(ticker_target="etf")
    stock_list = task(task_id="get_stock_list")(
        get_ticker)(ticker_target="stock")

    redis_clean_etf = task(task_id="redis_clean_etf")(
        clean_redis)(clean_target="us_etf_ticker")
    redis_clean_stock = task(task_id="redis_clean_stock")(
        clean_redis)(clean_target="us_stock_ticker")

    redis_write_etf = task(task_id="redis_write_etf")(write_to_redis)(
        symbol_list=etf_list, clean_target='us_etf_ticker')
    redis_write_stock = task(task_id="redis_write_stock")(write_to_redis)(
        symbol_list=stock_list, clean_target='us_stock_ticker')

    etf_list >> redis_clean_etf >> redis_write_etf
    stock_list >> redis_clean_stock >> redis_write_stock


get_US_ticker = get_US_ticker()
