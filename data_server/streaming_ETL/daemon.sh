set -e
while true; do
  echo start $(date)
  python kafka_spark_cassandra.py
  sleep 30
done