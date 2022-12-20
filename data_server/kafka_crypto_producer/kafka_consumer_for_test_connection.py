from kafka import KafkaConsumer
import json
from pprint import pprint

consumer = KafkaConsumer(bootstrap_servers=['10.148.0.3:19092', '10.148.0.3:29092', '10.148.0.3:39093'],
                         value_deserializer=lambda m: json.loads(
                             m.decode('utf-8')),
                         auto_offset_reset='latest',
                         #  group_id='stocker',
                         #  client_id='stocker1',
                         max_poll_records=10)
consumer.subscribe(topics='crypto')

for message in consumer:
    print("%s:%d:%d: key=%s value=%s" % (message.topic, message.partition,
                                         message.offset, message.key,
                                         message.value))
