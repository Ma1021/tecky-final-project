from pyspark.sql import SparkSession
from pyspark.sql import functions as FN
from pyspark.sql import DataFrame
import redis

pool = redis.ConnectionPool(host='10.148.0.3', port=6379, decode_responses=True)
r = redis.Redis(connection_pool=pool)
all_stock_list = r.hkeys("us_stock_ticker")

packages = [
    "org.mongodb.spark:mongo-spark-connector_2.12:3.0.1",
    'com.datastax.spark:spark-cassandra-connector_2.12:3.2.0'
    ]

spark = SparkSession \
    .builder \
    .appName("mongo_spark_cassandra") \
    .master("spark://localhost:7077")\
    .config("spark.jars.packages",",".join(packages))\
    .getOrCreate()

mongoConnUri = 'mongodb://f49435c5b2f88a8729256406cd4967d1:54b8ebfd1f120adb69b1be060c270de2aa3407f5@10.148.0.3:27017/'
mongoDB = "alltime_us_stock_datas"


def resample_setup(df=DataFrame):
    setup_df = df \
        .withColumn('timestamp',FN.col('timestamp').cast('timestamp')) \
        .withColumn('year', FN.date_trunc('Year','timestamp')) \
        .withColumn('quarter', FN.date_trunc('quarter','timestamp')) \
        .withColumn('month', FN.date_trunc('month','timestamp')) \
        .withColumn('week', FN.date_trunc('week','timestamp')) \
        .withColumn('adj_close', FN.col('Adj Close')) \
        .drop('_id') \
        .orderBy(FN.desc('timestamp'))
    return setup_df

def resampling(df=DataFrame,period=str):
    resample_df = df \
        .orderBy(FN.desc('Timestamp')) \
        .groupBy(period).agg(
            FN.expr(f'CONCAT("{symbol}")').alias('symbol'),
            FN.expr("collect_list(Open)[count(Open)-1]").alias('open'),
            FN.expr("collect_list(Close)[0]").alias('close'),
            FN.expr("collect_list(adj_close)[0]").alias('adj_close'),
            FN.expr('max(High)').alias('high'),
            FN.expr('min(Low)').alias('low'),
            FN.expr('sum(Volume)').alias('volume'),
        ) \
        .withColumnRenamed(period, 'timestamp') \
        .orderBy(FN.desc(period))
    return resample_df

def write_cassandra(df:DataFrame, cassandraKeyspace:str, cassandraTable:str):
    df.write\
        .format("org.apache.spark.sql.cassandra")\
        .mode('append')\
        .option("spark.cassandra.connection.host", "10.148.0.3")\
        .option("spark.cassandra.connection.port", "9042")\
        .option("spark.cassandra.auth.password", "cassandra")\
        .option("spark.cassandra.auth.username", "cassandra")\
        .option("keyspace",cassandraKeyspace)\
        .option("table", cassandraTable)\
        .save()

stock_count = 0
for symbol in all_stock_list:
    print(symbol)
    collection = symbol
    df = spark.read \
        .format("mongo") \
        .option("uri", mongoConnUri) \
        .option("database", mongoDB) \
        .option("collection", collection) \
        .load()
    if df.count() == 0:
        print(f'{symbol} no record')
    if df.count() > 0:
        daily_df = df \
            .withColumn('symbol', FN.lit(str(symbol))) \
            .withColumn('timestamp', FN.col('timestamp').cast('timestamp')) \
            .withColumn('close', FN.col('close').cast('double')) \
            .withColumn('high', FN.col('high').cast('double')) \
            .withColumn('low', FN.col('low').cast('double')) \
            .withColumn('open', FN.col('open').cast('double')) \
            .withColumn('volume', FN.col('volume').cast('double')) \
            .withColumn('adj_close', FN.col('Adj Close').cast('double')) \
            .drop('_id','Adj Close')
        
        write_cassandra(daily_df, "stocks_data", "day_list")
        resampled_df = resample_setup(df)

        year_df = resampling(resampled_df,'year')
        write_cassandra(year_df,"stocks_data", 'year_list')

        quarter_df = resampling(resampled_df,'quarter')
        write_cassandra(quarter_df,"stocks_data", 'quarter_list')

        month_df = resampling(resampled_df,'month')
        write_cassandra(month_df,"stocks_data", 'month_list')

        week_df = resampling(resampled_df,'week')
        write_cassandra(week_df,"stocks_data", 'week_list')
        
    stock_count = stock_count + 1
    print(f"{symbol} is inserted, total stock inserted: {stock_count}")
