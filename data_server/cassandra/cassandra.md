create KEYSPACE test_stock with replication = {'class': 'SimpleStrategy', 'replication_factor': 1 };
CREATE TABLE test (name text, age smallint, primary key(name));

create KEYSPACE stocks_data with replication = {'class': 'SimpleStrategy', 'replication_factor': 1 };

CREATE TABLE day_list (symbol text, timestamp timestamp, open double, close double, high double, low double, volume double, adj_close double, primary key(symbol, timestamp));

CREATE TABLE week_list (symbol text, timestamp timestamp, open double, close double, high double, low double, volume double, adj_close double, primary key(symbol, timestamp));

CREATE TABLE month_list (symbol text, timestamp timestamp, open double, close double, high double, low double, volume double, adj_close double, primary key(symbol, timestamp));

CREATE TABLE quarter_list (symbol text, timestamp timestamp, open double, close double, high double, low double, volume double, adj_close double, primary key(symbol, timestamp));

CREATE TABLE year_list (symbol text, timestamp timestamp, open double, close double, high double, low double, volume double, adj_close double, primary key(symbol, timestamp));

------------------

cqlsh -u cassandra -p cassandra ;

CREATE TABLE test_list (symbol text, timestamp timestamp, open double, close double, high double, low double, volume double, primary key(symbol, timestamp));

SELECT * FROM system_schema.keyspaces;

SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'test_stock';

SELECT table_name FROM system_schema.tables WHERE keyspace_name = 'stocks_data';

TRUNCATE test_list;

nohup python kafka_spark_cassandra.py > output10.log &

ps -ef | grep kafka_spark_cassandra.py

kill 36597