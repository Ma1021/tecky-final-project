import { useState, useEffect } from "react";
import { useAppSelector } from "../../redux/store";
import { IonIcon } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import { useLocation } from "react-router";

interface StockInfoProps {
  symbol: string;
  refresh: boolean;
}

interface NewStockInfoType {
  status: string;
  symbol: string;
  name: string;
  chineseName: string;
  yesterdayPrice: number;
  currentPrice: number;
  priceDifference: number;
  priceDifferencePercentage: number;
  todayOpen: number;
  todayHigh: number;
  todayLow: number;
  historyHigh: number;
  historyLow: number;
  volume: number;
  turnover: number;
}

const StockInfo: React.FC<StockInfoProps> = ({ symbol, refresh }) => {
  const [newStockInfo, setNewStockInfo] = useState<NewStockInfoType>({
    status: "",
    symbol: "",
    name: "",
    chineseName: "",
    yesterdayPrice: 0,
    currentPrice: 0,
    priceDifference: 0,
    priceDifferencePercentage: 0,
    todayOpen: 0,
    todayHigh: 0,
    todayLow: 0,
    historyHigh: 0,
    historyLow: 0,
    volume: 0,
    turnover: 0,
  });
  const [isSubscribed, setIsSubscribed] = useState<boolean>(false);
  const isChinese = useAppSelector((state) => state.theme.isChinese);
  const userID = useAppSelector((state) => state.auth.user!.id);
  const location = useLocation();

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/stock/checkSubscription?userID=${userID}&symbol=${symbol}`
    )
      .then((res) => res.json())
      .then((result) => {
        setIsSubscribed(result.subscribed);
      });
  }, []);

  useEffect(() => {
    if (location.pathname.endsWith("USDT")) {
      fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/stock/getCryptoAllDataFromMongoAPI?symbol=${symbol}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          result["status"] = new Date().toLocaleString("en-US");
          setNewStockInfo(result);
        });
    } else {
      fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/stock/getHighLowFromMongoAPI?symbol=${symbol}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);
          result["status"] = new Date().toLocaleString("en-US");
          setNewStockInfo(result);
        });
    }
  }, [refresh, symbol]);

  return (
    <>
      <div className="stock-info">
        <section className="stock-info">
          <div className="row-1">
            <div className="basic-info">
              <div className="basic-info-row-1">
                <div className="stock-symbol">{newStockInfo.symbol}</div>
                <div className="stock-name">{newStockInfo.chineseName}</div>
              </div>
              <div className="status">{`${newStockInfo.status}`}</div>
            </div>
            <div className="subscribe-button-container">
              <button
                className="subscribe-button"
                style={{
                  fontSize: "35px",
                  background: "transparent",
                  color: "#ffa73c",
                }}
                onClickCapture={() => {
                  subscribe(userID, symbol);
                  setIsSubscribed(!isSubscribed);
                }}
              >
                {isSubscribed ? (
                  <IonIcon icon={heart} />
                ) : (
                  <IonIcon icon={heartOutline} />
                )}
              </button>
            </div>
          </div>

          <div
            className={
              "detail-info-row-large " +
              (newStockInfo.priceDifference > 0 ? "positive" : "negative")
            }
          >
            {newStockInfo.currentPrice.toFixed(3)}
          </div>
          <div className="detail-info-row-price">
            <div
              className={
                "detail-info-column " +
                (newStockInfo.priceDifference > 0 ? "positive" : "negative")
              }
            >
              {newStockInfo.priceDifference > 0
                ? `+${newStockInfo.priceDifference.toFixed(3)}`
                : newStockInfo.priceDifference.toFixed(3)}
            </div>
            <div
              className={
                "detail-info-column " +
                (newStockInfo.priceDifference > 0 ? "positive" : "negative")
              }
            >
              {newStockInfo.priceDifference > 0
                ? `+${newStockInfo.priceDifferencePercentage.toFixed(2)}%`
                : `${newStockInfo.priceDifferencePercentage.toFixed(2)}%`}
            </div>
          </div>

          <div className="detail-info-row">
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "今 開" : "Open"}
              </div>
              <div
                className={
                  "detail-info-column " +
                  (newStockInfo.todayOpen > newStockInfo.yesterdayPrice
                    ? "positive"
                    : "negative")
                }
              >
                {newStockInfo.todayOpen.toFixed(2)}
              </div>
            </div>
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "昨 收" : "Close"}
              </div>
              <div className="detail-info-column value">
                {newStockInfo.yesterdayPrice.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "最 高" : "High"}
              </div>
              <div
                className={
                  "detail-info-column " +
                  (newStockInfo.todayHigh > newStockInfo.yesterdayPrice
                    ? "positive"
                    : "negative")
                }
              >
                {newStockInfo.todayHigh.toFixed(2)}
              </div>
            </div>
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "最 低" : "Low"}
              </div>
              <div
                className={
                  "detail-info-column " +
                  (newStockInfo.todayLow > newStockInfo.yesterdayPrice
                    ? "positive"
                    : "negative")
                }
              >
                {newStockInfo.todayLow.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "歷史最高" : "Historical High"}
              </div>
              <div
                className={
                  "detail-info-column value " +
                  (newStockInfo.historyHigh > newStockInfo.yesterdayPrice
                    ? "positive"
                    : "negative")
                }
              >
                {newStockInfo.historyHigh.toFixed(2)}
              </div>
            </div>
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "歷史最低" : "Historical Low"}
              </div>
              <div
                className={
                  "detail-info-column value " +
                  (newStockInfo.historyLow > newStockInfo.yesterdayPrice
                    ? "positive"
                    : "negative")
                }
              >
                {newStockInfo.historyLow.toFixed(2)}
              </div>
            </div>
          </div>

          <div className="detail-info-row">
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "成交額" : "Turnover"}
              </div>
              <div className="detail-info-column value">
                {newStockInfo.turnover / 100000000 > 1
                  ? `${(newStockInfo.turnover / 100000000).toFixed(2)}億`
                  : newStockInfo.turnover / 1000000 > 1
                  ? `${(newStockInfo.turnover / 1000000).toFixed(2)}百萬`
                  : newStockInfo.turnover / 1000 > 1
                  ? `${(newStockInfo.turnover / 1000).toFixed(2)}千`
                  : newStockInfo.turnover}
              </div>
            </div>
            <div className="column-container">
              <div className="detail-info-column">
                {isChinese ? "成交量" : "Volume"}
              </div>
              <div className="detail-info-column value">
                {newStockInfo.volume / 100000000 > 1
                  ? `${(newStockInfo.volume / 100000000).toFixed(2)}億`
                  : newStockInfo.volume / 1000000 > 1
                  ? `${(newStockInfo.volume / 1000000).toFixed(2)}百萬`
                  : newStockInfo.volume / 1000 > 1
                  ? `${(newStockInfo.volume / 1000).toFixed(2)}千`
                  : newStockInfo.volume}
                股
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default StockInfo;

async function subscribe(userID: number, symbol: string) {
  const data = { userID, symbol };
  const res = await fetch(
    `${process.env.REACT_APP_PUBLIC_URL}/stock/subscribeStock`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  console.log(result);
}
