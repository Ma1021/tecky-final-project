FROM python:3.8

WORKDIR /usr/src/app

COPY requirements.txt ./

RUN pip install --no-cache-dir -r requirements.txt

RUN pip install "uvicorn[standard]"

RUN apt-get update && \
    apt-get install -y openjdk-11-jre-headless && \
    apt-get clean;

COPY . .

CMD ["uvicorn", "main:app","--host","0.0.0.0","--port","8000"]

EXPOSE 8000