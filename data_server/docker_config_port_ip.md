Local_IP
10.148.0.3
FastAPI
8000:8000

-----------------------------------

MongoDB
    Port - 27017:27017
    IP: 172.1.0.31

Redis
    Port - 6379:6379
    IP: 172.1.0.41

Cassandra
    Port - 7000:7000
    Port - 9042:9042
    IP: 172.1.0.51
    
Airflow
    Port - 8081:8080
    
PostgreSQL
    Port - 5432:5432
    IP: 172.1.0.61
    adminer: 8100:8080
    
Spark - master / worker1 / worker2 / worker3
    Port - 8077:8080
    Port - 7077:7077
    IP: 172.1.0.20
    IP: 172.1.0.21
    IP: 172.1.0.22
    IP: 172.1.0.23
    
Kafka - 1/2/3
    Port - 19092:9092
    Port - 19093:9093
    Port - 29092:9092
    Port - 29093:9093
    Port - 39092:9092
    Port - 39093:9093
    IP: 172.1.0.11
    IP: 172.1.0.12
    IP: 172.1.0.13
    
-----------------------------------
# in postgresql
networks:
  dae:
    driver: bridge
    ipam:
      driver: default
      config:
        - subnet: 172.1.0.0/24

networks:
  dev_dae:
    external:
      name: dev_dae