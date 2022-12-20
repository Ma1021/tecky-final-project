from pyspark.sql import SparkSession
from pyspark.sql import functions as FN
from pyspark.sql.window import Window
from pyspark.sql.functions import *
from pyspark.sql.types import *

packages = [
    'org.apache.spark:spark-sql-kafka-0-10_2.12:3.1.1',
    'com.datastax.spark:spark-cassandra-connector_2.12:3.2.0'
]

spark = SparkSession \
    .builder \
    .appName("kafka_crypto_streaming") \
    .master("spark://10.148.0.3:7077")\
    .config("spark.jars.packages", ",".join(packages))\
    .config("spark.task.maxFailures", 10)\
    .getOrCreate()
spark.sparkContext.setLogLevel("ERROR")

kafka_topic_name = 'crypto'
kafka_bootstarp_server = '10.148.0.3:19092,10.148.0.3:29092,10.148.0.3:39093'

streaming = (
    spark.readStream
    .format("kafka")
    .option("kafka.bootstrap.servers", kafka_bootstarp_server)
    .option("subscribe", kafka_topic_name)
    .option("startingOffsets", "latest")
    .load()
)

schema_1 = (
    StructType()
    .add("Symbol", StringType())
    .add("Close_price", DoubleType())
    .add("Open_price", DoubleType())
    .add("High_price", DoubleType())
    .add("Low_price", DoubleType())
    .add("Base_volume", DoubleType())
    .add("Quote_volume", DoubleType())
    .add("time", TimestampType())
)


def process_row(df, epoch_id):
    df.write \
        .mode('append')\
        .option("checkpointLocation", '/tmp/check_point/')\
        .format("org.apache.spark.sql.cassandra")\
        .option("spark.cassandra.connection.host", "10.148.0.3")\
        .option("spark.cassandra.connection.port", "9042")\
        .option("spark.cassandra.auth.password", "cassandra")\
        .option("spark.cassandra.auth.username", "cassandra")\
        .option("keyspace", 'stocks_data')\
        .option("table", 'crypto_list')\
        .save()
    print(f"inserted epoch_id: {epoch_id}")


base_df = streaming \
    .selectExpr("CAST(value as STRING)") \
    .select(from_json(col("value"), schema_1).alias("data")) \
    .select("data.*") \
    .groupBy(window(col("time"), "60 seconds"), col('Symbol')) \
    .agg(
        FN.expr("window.end").cast('timestamp').alias('timestamp'),
        FN.expr(
            "collect_list(Close_price)[count(Open_price)-1]").alias('open'),
        FN.expr("collect_list(Close_price)[0]").alias('close'),
        FN.expr('max(Close_price)').alias('high'),
        FN.expr('min(Close_price)').alias('low'),
        FN.expr('sum(Base_volume)').alias('volume'),
    ) \
    .drop('window') \
    .withColumnRenamed('Symbol', 'symbol')

base_df \
    .writeStream \
    .trigger(processingTime='30 seconds') \
    .foreachBatch(process_row) \
    .outputMode("update") \
    .start() \
    .awaitTermination()
