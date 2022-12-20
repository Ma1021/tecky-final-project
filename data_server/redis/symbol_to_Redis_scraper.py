import yfinance as yf
from pprint import pprint
import time
import pandas as pd
import pymongo
from pymongo import MongoClient
import requests
import json
import redis

pool = redis.ConnectionPool(host='localhost', port=6379, decode_responses=True)
r = redis.Redis(connection_pool=pool)

most_active_stock = 'https://finance.yahoo.com/screener/predefined/most_actives'
# small_cap_all_stock = 'https://finance.yahoo.com/screener/0e5d4c2f-b034-4429-906f-2250a3444a20'
# mega_cap_all_stock = 'https://finance.yahoo.com/screener/fafd84d0-575a-445a-a10e-7e99a746beb4'
# hk_all_stock = 'https://hk.finance.yahoo.com/screener/1f41de58-e14b-423a-97ff-6b95a0b82d55'
cookie = """B=6pclejhhlafbo&b=3&s=e5; OTH=v=1&d=eyJraWQiOiIwMTY0MGY5MDNhMjRlMWMxZjA5N2ViZGEyZDA5YjE5NmM5ZGUzZWQ5IiwiYWxnIjoiUlMyNTYifQ.eyJjdSI6eyJndWlkIjoiM1RSQUszRUNHQlBFMkgzRlJBM0tWNlRPNE0iLCJwZXJzaXN0ZW50Ijp0cnVlLCJzaWQiOiJ1YTRpS1Y3QzdnRUMifX0.mP0e_uvi15dIM2gupvZ3xLJRTw3LzZPq6Uzh_TvBa4fvRjsFTmwyqsf75pdiwvndfjBPKQaEZZvIrxx-LdjECMmZtBBWNRa1sAilEbTnuZdx_vnIH6CzhfN3b0SMIQNUQN1dj-Px97so8BAtqibQ8rBkvX4Gv9PgccO7dSONNJ4; T=af=JnRzPTE2Njg5NTg2NTYmcHM9MGs0N1g5UGhtblowWWtzZGNULmFpZy0t&d=bnMBeWFob28BZwEzVFJBSzNFQ0dCUEUySDNGUkEzS1Y2VE80TQFhYwFBTWNNczNuQwFhbAFpb25naGluMjAwMQFzYwFkZXNrdG9wX3dlYgFmcwFxUFFITFZaamVrbkEBenoBQW5rZWpCQTdFAWEBUUFFAWxhdAFBbmtlakIBbnUBMA--&kt=EAA2XYIsL8liNrK28OxgH0W_g--~I&ku=FAAFdIulHottBz172TXEyu9121.Vbj9cHOEZfRLuctH6O7aMoFWquqdFihK0lavJX7laIseY58FBL73WzGAKSThKZs3.rtpZvgjGwQFJQrTQElJA0PVvfkJ1O_5.O1PO.YP25YyUvp7fas8XoK.ZC0Ib3zITo_8W_A_c5YbMfVTYXc-~E; F=d=hgqcWAs9vDEWkjS8MKxl6_dLQ.RHyCvz4z7xK3OZIw--; PH=l=zh-Hant-HK; Y=v=1&n=7scqnpo2u74uo&l=8ed678dsqqr/o&p=m2gvvhk00000000&r=8i&intl=hk; GUCS=Ac8HZZMN; GUC=AQEACAJje5RjqEIirgUZ&s=AQAAAMMT1yZF&g=Y3pJyw; A1=d=AQABBHg9VWMCEAHE8KKxiEpmmcN16pyusmwFEgEACAKUe2OoY1iia3sB_eMBAAcIeD1VY5yusmwID300sdtGDn9kplu0V25eNAkBBwoB5Q&S=AQAAAounjhKY1mKjiK3lio2KZlA; A3=d=AQABBHg9VWMCEAHE8KKxiEpmmcN16pyusmwFEgEACAKUe2OoY1iia3sB_eMBAAcIeD1VY5yusmwID300sdtGDn9kplu0V25eNAkBBwoB5Q&S=AQAAAounjhKY1mKjiK3lio2KZlA; A1S=d=AQABBHg9VWMCEAHE8KKxiEpmmcN16pyusmwFEgEACAKUe2OoY1iia3sB_eMBAAcIeD1VY5yusmwID300sdtGDn9kplu0V25eNAkBBwoB5Q&S=AQAAAounjhKY1mKjiK3lio2KZlA&j=WORLD; cmp=t=1668958657&j=0&u=1---; maex=%7B%22v2%22%3A%7B%7D%7D"""


def get_symbol(yahoo_link: str, cookie_use: str, Max_range: int, redis_hash_name: str):
    for i in range(0, Max_range, 100):
        url = f'{yahoo_link}?offset={i}&count=100'
        pprint(url)
        headers = {
            "User-Agent": 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36', "cookie": cookie_use}
        request = requests.get(url, headers=headers)
        data = pd.read_html(request.text, keep_default_na=False)[0]
        print(data[['Symbol', 'Name']])
        df = data[['Symbol', 'Name']]
        for i, row in df.iterrows():
            Symbol = row['Symbol']
            Name = row['Name']
            r.hset(redis_hash_name, Symbol, Name)
        time.sleep(1)


get_symbol(most_active_stock, cookie, 1000, 'symbol_list')
# get_symbol(mega_cap_all_stock, cookie, 4000, 'symbol_list')
# get_symbol(small_cap_all_stock, cookie, 4000, 'symbol_list')


print(r.hkeys("symbol_list"))
print(r.hvals("symbol_list"))
