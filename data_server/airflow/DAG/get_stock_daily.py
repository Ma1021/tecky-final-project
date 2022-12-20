import yfinance as yf
import pandas as pd
import time
import redis
from datetime import datetime, timedelta
from airflow import DAG
from airflow.operators.python import PythonOperator
from airflow.decorators import dag, task
import pendulum
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from cassandra.query import dict_factory
from airflow.operators.empty import EmptyOperator


@dag(
    dag_id="get_stock_daily",
    start_date=pendulum.datetime(2021, 1, 1, tz="EST"),
    catchup=False,
    tags=['stock'],
    schedule='0 16 * * *',
    default_args={'retries': 2},
)
def get_stock_daily():

    task_start = EmptyOperator(task_id="task_start")
    task_end = EmptyOperator(task_id="task_end")

    def connect_cassandra(database):
        auth_provider = PlainTextAuthProvider(
            username='cassandra', password='cassandra')
        cluster = Cluster(['10.148.0.3'], port=9042,
                          auth_provider=auth_provider)
        session = cluster.connect(database)
        return session

    def connect_redis(hash):
        pool = redis.ConnectionPool(
            host='10.148.0.3', port=6379, decode_responses=True)
        r = redis.Redis(connection_pool=pool)
        all_stock_list = r.hkeys(hash)
        return all_stock_list

    def dl_data_to_cassandra(dl_list, dl_step, session):
        symbol_count = len(dl_list)
        print("Total stock symbol: " + str(symbol_count))
        error_list = []
        inserted_stock = 0

        pre_datas = session.prepare(
            'insert into day_list (symbol,timestamp,close,high,low,open,volume) values (?,?,?,?,?,?,?)')

        for i in range(0, symbol_count, dl_step):
            download_list = dl_list[i:i+dl_step]
            print("numbers of stock pending to download: " +
                  str(len(download_list)))

            yfinance_download_string = ""
            for symbol in download_list:
                yfinance_download_string = yfinance_download_string + \
                    ' ' + str(symbol)
            print("yfinance_list: " + yfinance_download_string)

            stock_data_raw = yf.download(
                yfinance_download_string, period="5d", interval="1d", threads=True, group_by='tickers')
            symbol_columns = stock_data_raw.columns.get_level_values(0)
            symbol_list = set(symbol_columns)
            print("get number of stock: " + str(len(symbol_list)))

            for symbol in symbol_list:
                datalist = []
                print(symbol)
                df = stock_data_raw[symbol]
                newdf = df[(pd.isna(df.Close) != True)]

                try:
                    for i, row in newdf.iterrows():
                        data = row.to_dict()
                        data['timestamp'] = i.timestamp()
                        session.execute(pre_datas, [
                                        symbol, data['timestamp']*1000, data['Close'], data['High'], data['Low'], data['Open'], data['Volume']])
                    inserted_stock = inserted_stock + 1
                    print("Inserted Stock: " + str(inserted_stock))
                except Exception as e:
                    print(e)
                    error_list.append(symbol)
            print(error_list)

    cassandra_session = task(task_id="cassandra_session")(
        connect_cassandra)(database='stocks_data')
    all_stock_list = task(task_id="all_stock_list")(
        connect_redis)(hash="us_stock_ticker")

    write_cassandra = task(task_id="write_cassandra")(dl_data_to_cassandra)(
        dl_list=all_stock_list, dl_step=500, session=cassandra_session)

    task_start >> all_stock_list >> cassandra_session >> write_cassandra >> task_end

    # dl_data_to_cassandra()


get_stock_daily = get_stock_daily()
