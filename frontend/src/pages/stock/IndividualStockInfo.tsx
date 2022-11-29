import {
  IonPage,
  IonHeader,
  IonBackButton,
  IonToolbar,
  IonButtons,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router";
import "./IndividualStockInfo.css";
import { useAppSelector } from "../../redux/store";
import MainChart from "../../components/stock/MultipleSeriesChart";
import StockForum from "../../components/stock/StockForum";
import StockNews from "../../components/stock/StockNews";
import StockAnalysis from "../../components/stock/StockAnalysis";
import PaperTrade from "../../components/stock/PaperTrade";
import styled from "styled-components";

interface StockInfo {
  symbol: string;
  name: string;
  chineseName: string;
  status: string;
  icons: [];
  currentPrice: number;
  high: number;
  low: number;
  open: number;
  close: number;
  averagePrice: number;
  high52week: number;
  low52week: number;
  historicalHigh: number;
  historicalLow: number;
  bidAsk: number;
  volumePercentage: number;
  dividendTTM: number;
  divYieldTTM: number;
  floatCap: number;
  volume: number;
  turnover: number;
  turnoverRatio: number;
  marketCap: number;
  peTTM: boolean;
  peStatic: boolean;
  pb: number;
  amplitude: number;
  sharesOutstanding: number;
  shsFloat: number;
  minTradingUnit: number;
}

const IndividualStockInfo: React.FC = () => {
  const location = useLocation();
  const symbol =
    location.pathname.split("/")[location.pathname.split("/").length - 1];

  const [extendStockInfo, setExtendStockInfo] = useState(false);
  const [stockInfo, setStockInfo] = useState<StockInfo>({
    symbol: "",
    name: "",
    chineseName: "",
    status: "",
    icons: [],
    currentPrice: 0,
    high: 0,
    low: 0,
    open: 0,
    close: 0,
    averagePrice: 0,
    high52week: 0,
    low52week: 0,
    historicalHigh: 0,
    historicalLow: 0,
    bidAsk: 0,
    volumePercentage: 0,
    dividendTTM: 0,
    divYieldTTM: 0,
    floatCap: 0,
    volume: 0,
    turnover: 0,
    turnoverRatio: 0,
    marketCap: 0,
    peTTM: false,
    peStatic: false,
    pb: 0,
    amplitude: 0,
    sharesOutstanding: 0,
    shsFloat: 0,
    minTradingUnit: 0,
  });
  const [segment, setSegment] = useState("stockInfo");
  const isChinese = useAppSelector((state) => state.theme.isChinese);

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  useEffect(() => {
    // get stock data from database
    fetch(
      `http://localhost:8080/stock/getAllDataFromStockInfo?symbol=${symbol}`
    )
      .then((res) => res.json())
      .then((result) => {
        setStockInfo({
          symbol: result[0].symbol,
          name: result[0].name,
          chineseName: result[0].chinese_name,
          status: "收盤價 11/04 16:00:00 美東",
          icons: [],
          currentPrice: result[0].current_price,
          high: 27.03,
          low: 25.34,
          open: 26.6,
          close: result[0].yesterday_price,
          averagePrice: 26.053,
          high52week: 63.05,
          low52week: 19.395,
          historicalHigh: 120.75,
          historicalLow: 0.631,
          bidAsk: 0,
          volumePercentage: 0.46,
          dividendTTM: 0,
          divYieldTTM: 0,
          floatCap: 67.63,
          volume: 413.8,
          turnover: 1.08,
          turnoverRatio: 1.62,
          marketCap: 80.73,
          peTTM: false,
          peStatic: false,
          pb: 6.01,
          amplitude: 6.43,
          sharesOutstanding: 3.05,
          shsFloat: 2.55,
          minTradingUnit: 1,
        });
      });

    // setStockInfo({
    //   symbol: "GME",
    //   name: "遊戲驛站",
    //   status: "收盤價 11/04 16:00:00 美東",
    //   icons: [],
    //   currentPrice: 26.51,
    //   high: 27.03,
    //   low: 25.34,
    //   open: 26.6,
    //   close: 26.29,
    //   averagePrice: 26.053,
    //   high52week: 63.05,
    //   low52week: 19.395,
    //   historicalHigh: 120.75,
    //   historicalLow: 0.631,
    //   bidAsk: 0,
    //   volumePercentage: 0.46,
    //   dividendTTM: 0,
    //   divYieldTTM: 0,
    //   floatCap: 67.63,
    //   volume: 413.8,
    //   turnover: 1.08,
    //   turnoverRatio: 1.62,
    //   marketCap: 80.73,
    //   peTTM: false,
    //   peStatic: false,
    //   pb: 6.01,
    //   amplitude: 6.43,
    //   sharesOutstanding: 3.05,
    //   shsFloat: 2.55,
    //   minTradingUnit: 1,
    // });
  }, [stockInfo]);

  const currentPriceDifference = useMemo(
    () => stockInfo.currentPrice - stockInfo.close,
    [stockInfo]
  );

  function priceDifferenceToPreviousClose(
    target: number,
    previousClose: number
  ) {
    return target - previousClose > 0 ? true : false;
  }

  return (
    <>
      <IonPage id="stockInfo">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/stockList"></IonBackButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        <SegmentTab value={segment} onIonChange={onSegmentChange}>
          <SegmentButton value="stockInfo">
            <IonLabel>Stock Info</IonLabel>
          </SegmentButton>
          <SegmentButton value="stockForum">
            <IonLabel>Stock Forum</IonLabel>
          </SegmentButton>
          <SegmentButton value="stockNews">
            <IonLabel>Stock News</IonLabel>
          </SegmentButton>
          <SegmentButton value="stockAnalysis">
            <IonLabel>Stock Analysis</IonLabel>
          </SegmentButton>
          <SegmentButton value="paperTrade">
            <IonLabel>Paper Trade</IonLabel>
          </SegmentButton>
        </SegmentTab>

        <IonContent>
          {segment === "stockInfo" && (
            <>
              <div className="top-section">
                <nav>
                  <div className="nav-top"></div>
                  <div className="nav-bottom"></div>
                </nav>
                <section className="stock-info">
                  <div className="row-1">
                    <div className="basic-info">
                      <div className="basic-info-row-1">
                        <div className="stock-symbol">{stockInfo.symbol}</div>
                        <div className="stock-name">
                          {isChinese ? stockInfo.chineseName : stockInfo.name}
                        </div>
                      </div>
                      <div className="status">{stockInfo.status}</div>
                    </div>
                    <div className="icons-container">{stockInfo.icons}</div>
                  </div>
                  <div
                    className={
                      "row-2 " + (extendStockInfo ? "extended" : "collapsed")
                    }
                  >
                    <div className="detail-info-section">
                      <div
                        className={
                          "detail-info-row-large " +
                          (currentPriceDifference > 0 ? "positive" : "negative")
                        }
                      >
                        {stockInfo.currentPrice.toFixed(3)}
                      </div>
                      <div className="detail-info-row-price">
                        <div
                          className={
                            "detail-info-column " +
                            (currentPriceDifference > 0
                              ? "positive"
                              : "negative")
                          }
                        >
                          {currentPriceDifference > 0
                            ? `+${currentPriceDifference.toFixed(3)}`
                            : currentPriceDifference.toFixed(3)}
                        </div>
                        <div
                          className={
                            "detail-info-column " +
                            (currentPriceDifference > 0
                              ? "positive"
                              : "negative")
                          }
                        >
                          {currentPriceDifference > 0
                            ? `+${(
                                (currentPriceDifference / stockInfo.close) *
                                100
                              ).toFixed(2)}%`
                            : `${(
                                (currentPriceDifference / stockInfo.close) *
                                100
                              ).toFixed(2)}%`}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "成交額" : "Turnover"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.turnover}億
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "成交量" : "Volume"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.volume}萬股
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "換手率" : "Turnover Ratio"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.turnoverRatio}%
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "52周最高" : "52 week High"}
                        </div>
                        <div
                          className={
                            "detail-info-column value " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.high52week,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.high52week}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "52周最低" : "52 week Low"}
                        </div>
                        <div
                          className={
                            "detail-info-column value " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.low52week,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.low52week}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "歷史最高" : "Historical High"}
                        </div>
                        <div
                          className={
                            "detail-info-column value " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.historicalHigh,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.historicalHigh}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "歷史最低" : "Historical Low"}
                        </div>
                        <div
                          className={
                            "detail-info-column value " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.historicalLow,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.historicalLow}
                        </div>
                      </div>
                    </div>
                    <div className="detail-info-section">
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "最 高" : "High"}
                        </div>
                        <div
                          className={
                            "detail-info-column " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.high,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.high}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "最 低" : "Low"}
                        </div>
                        <div
                          className={
                            "detail-info-column " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.low,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.low}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "市盈率TTM" : "P/E(TTM)"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.peTTM}虧損
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "市盈率(靜)" : "P/E(Static)"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.peStatic}虧損
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "市淨率" : "P/B"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.pb}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "委 比" : "Bid/Ask"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.bidAsk.toFixed(2)}%
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "量 比" : "volume %"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.volumePercentage}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "股息TTM" : "Dividend TTM"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.dividendTTM}--
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "股息率TTM" : "Div Yield TTM"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.divYieldTTM}--
                        </div>
                      </div>
                    </div>
                    <div className="detail-info-section">
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "今 開" : "Open"}
                        </div>
                        <div
                          className={
                            "detail-info-column " +
                            (priceDifferenceToPreviousClose(
                              stockInfo.open,
                              stockInfo.close
                            )
                              ? "positive"
                              : "negative")
                          }
                        >
                          {stockInfo.open}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "昨 收" : "Close"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.close.toFixed(2)}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "總市值" : "Market Cap"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.marketCap}億
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "總股本" : "Shares Outstanding"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.sharesOutstanding}億
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "流通值" : "Float Cap"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.floatCap}億
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "流通股" : "SHS Float"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.shsFloat}億
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "振 幅" : "Amplitude"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.amplitude}%
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "平均價" : "Average Price"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.averagePrice}
                        </div>
                      </div>
                      <div className="detail-info-row">
                        <div className="detail-info-column">
                          {isChinese ? "每 手" : "Min Trading Unit"}
                        </div>
                        <div className="detail-info-column value">
                          {stockInfo.minTradingUnit}股
                        </div>
                      </div>
                    </div>
                  </div>
                </section>
                <button
                  className="show-more-or-less"
                  onClick={() => {
                    setExtendStockInfo(!extendStockInfo);
                  }}
                >
                  Arrow
                </button>
              </div>
              <div className="chart-section">
                <MainChart symbol={symbol!} />
              </div>{" "}
            </>
          )}
          {segment === "stockForum" && <StockForum />}
          {segment === "stockNews" && <StockNews />}
          {segment === "stockAnalysis" && <StockAnalysis />}
          {segment === "paperTrade" && <PaperTrade />}
        </IonContent>
      </IonPage>
    </>
  );
};

const SegmentTab = styled(IonSegment)`
  width: 95%;
  margin: 8px 10px;
  color: #dedede;
`;

const SegmentButton = styled(IonSegmentButton)`
  --indicator-color: linear-gradient(
    to right bottom,
    #ffa930,
    #ff9d3f,
    #ff924d,
    #ff885b,
    #ff7f67
  );
  --color-checked: #fff;
  font-weight: 800;
`;

export default IndividualStockInfo;
