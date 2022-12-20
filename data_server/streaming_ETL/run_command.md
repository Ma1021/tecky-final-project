nohup python kafka_spark_cassandra.py > ./log/output1.log &

ps -ef | grep kafka_spark_cassandra.py

kill 36597