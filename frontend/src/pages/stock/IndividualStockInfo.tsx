import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router";
import "./IndividualStockInfo.css";
import { MultipleSeriesChart } from "./MultipleSeriesChart";
import { useAppSelector } from "../../redux/store";
import StockPageNavigationBar from "./StockPageNavigationBar";

interface StockInfo {
  symbol: string;
  name: string;
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

export interface StockSymbol {
  symbol: string;
}

export default function IndividualStockInfo() {
  const stockSymbol = useParams<StockSymbol>();
  const [extendStockInfo, setExtendStockInfo] = useState(false);
  const [stockInfo, setStockInfo] = useState<StockInfo>({
    symbol: "",
    name: "",
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
  const isDark = useAppSelector((state) => state.theme.isDark);
  const isChinese = useAppSelector((state) => state.theme.isChinese);

  useEffect(() => {
    // get stock data from database
    fetch(
      `http://localhost:4000/getAllDataFromStockInfo?symbol=${stockSymbol.symbol}`
    )
      .then((res) => res.json())
      .then((result) => {
        setStockInfo({
          symbol: result[0].symbol,
          name: result[0].name,
          status: "收盤價 11/04 16:00:00 美東",
          icons: [],
          currentPrice: result[0].currentprice,
          high: 27.03,
          low: 25.34,
          open: 26.6,
          close: result[0].yesterdayprice,
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
  }, [stockInfo, stockSymbol.symbol]);

  const priceDifference = useMemo(
    () => stockInfo.currentPrice - stockInfo.close,
    [stockInfo]
  );

  return (
    <>
      <div className="top-section">
        <nav>
          <div className="nav-top"></div>
          <div className="nav-bottom"></div>
        </nav>
        <StockPageNavigationBar symbol={`${stockSymbol.symbol}`} />
        {/* <SortingRow /> */}
        <section className="stock-info">
          <div className="row-1">
            <div className="basic-info">
              <div className="basic-info-row-1">
                <div className="stock-symbol">{stockInfo.symbol}</div>
                <div className="stock-name">{stockInfo.name}</div>
              </div>
              <div className="status">{stockInfo.status}</div>
            </div>
            <div className="icons-container">{stockInfo.icons}</div>
          </div>
          <div
            className={"row-2 " + (extendStockInfo ? "extended" : "collapsed")}
          >
            <div className="detail-info-section">
              <div
                className={
                  "detail-info-row-large " +
                  (priceDifference > 0 ? "positive" : "negative")
                }
              >
                {stockInfo.currentPrice.toFixed(3)}
              </div>
              <div className="detail-info-row-price">
                <div
                  className={
                    "detail-info-column " +
                    (priceDifference > 0 ? "positive" : "negative")
                  }
                >
                  {priceDifference > 0
                    ? `+${priceDifference.toFixed(3)}`
                    : priceDifference.toFixed(3)}
                </div>
                <div
                  className={
                    "detail-info-column " +
                    (priceDifference > 0 ? "positive" : "negative")
                  }
                >
                  {priceDifference > 0
                    ? `+${((priceDifference / stockInfo.close) * 100).toFixed(
                        2
                      )}%`
                    : `${((priceDifference / stockInfo.close) * 100).toFixed(
                        2
                      )}%`}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">成交額</div>
                <div className="detail-info-column value">
                  {stockInfo.turnover}億
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">成交量</div>
                <div className="detail-info-column value">
                  {stockInfo.volume}萬股
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">換手率</div>
                <div className="detail-info-column value">
                  {stockInfo.turnoverRatio}%
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">52周最高</div>
                <div className="detail-info-column value">
                  {stockInfo.high52week}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">52周最低</div>
                <div className="detail-info-column value">
                  {stockInfo.low52week}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">歷史最高</div>
                <div className="detail-info-column value">
                  {stockInfo.historicalHigh}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">歷史最低</div>
                <div className="detail-info-column value">
                  {stockInfo.historicalLow}
                </div>
              </div>
            </div>
            <div className="detail-info-section">
              <div className="detail-info-row">
                <div className="detail-info-column">最 高</div>
                <div className="detail-info-column positive">
                  {stockInfo.high}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">最 低</div>
                <div className="detail-info-column negative">
                  {stockInfo.low}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">市盈率TTM</div>
                <div className="detail-info-column value">
                  {stockInfo.peTTM}虧損
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">市盈率(靜)</div>
                <div className="detail-info-column value">
                  {stockInfo.peStatic}虧損
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">市淨率</div>
                <div className="detail-info-column value">{stockInfo.pb}</div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">委 比</div>
                <div className="detail-info-column value">
                  {stockInfo.bidAsk.toFixed(2)}%
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">量 比</div>
                <div className="detail-info-column value">
                  {stockInfo.volumePercentage}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">股息TTM</div>
                <div className="detail-info-column value">
                  {stockInfo.dividendTTM}--
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">股息率TTM</div>
                <div className="detail-info-column value">
                  {stockInfo.divYieldTTM}--
                </div>
              </div>
            </div>
            <div className="detail-info-section">
              <div className="detail-info-row">
                <div className="detail-info-column">今 開</div>
                <div className="detail-info-column positive">
                  {stockInfo.open}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">昨 收</div>
                <div className="detail-info-column negative">
                  {stockInfo.close.toFixed(2)}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">總市值</div>
                <div className="detail-info-column value">
                  {stockInfo.marketCap}億
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">總股本</div>
                <div className="detail-info-column value">
                  {stockInfo.sharesOutstanding}億
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">流通值</div>
                <div className="detail-info-column value">
                  {stockInfo.floatCap}億
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">流通股</div>
                <div className="detail-info-column value">
                  {stockInfo.shsFloat}億
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">振 幅</div>
                <div className="detail-info-column value">
                  {stockInfo.amplitude}%
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">平均價</div>
                <div className="detail-info-column value">
                  {stockInfo.averagePrice}
                </div>
              </div>
              <div className="detail-info-row">
                <div className="detail-info-column">每 手</div>
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
        <MultipleSeriesChart dark={isDark} symbol={stockSymbol.symbol!} />
      </div>
      <h1>{`isChinese: ${isChinese}`}</h1>
    </>
  );
}
