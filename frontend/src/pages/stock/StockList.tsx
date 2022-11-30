import {
  IonPage,
  IonContent,
  IonButtons,
  IonButton,
  IonLabel,
  IonSegment,
  IonSegmentButton,
  IonHeader,
  IonToolbar,
  IonText,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  changeColorTheme,
  changeLanguage,
} from "../../redux/theme/theme.action";
import { StockInfo } from "../../type";
import StockRow from "../../components/stock/StockRow";
import Title from "../../components/All/Title";
import "./StockList.css";

const StockList: React.FC = () => {
  const userID = 1;
  const [stockList, setStockList] = useState<StockInfo[]>([]);
  const [stockList2, setStockList2] = useState<StockInfo[]>([]);
  const [initStockList, setInitStockList] = useState<StockInfo[]>([]);
  const [sortBySymbol, setSortBySymbol] = useState<0 | 1 | 2>(0);
  const [sortByPrice, setSortByPrice] = useState<0 | 1 | 2>(0);
  const [sortByChange, setSortByChange] = useState<0 | 1 | 2>(0);
  const [segment, setSegment] = useState("watchList");
  const isDark = useAppSelector((state) => state.theme.isDark);
  const isChinese = useAppSelector((state) => state.theme.isChinese);
  const dispatch = useAppDispatch();

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  useEffect(() => {
    fetch(`http://localhost:8080/stock/getUserList?userID=${userID}`)
      .then((response) => response.json())
      .then((result) => {
        setStockList(result);
        setInitStockList(JSON.parse(JSON.stringify(result)));
      });
    fetch(`http://localhost:8080/stock/getUserList?userID=2`)
      .then((response) => response.json())
      .then((result) => {
        setStockList2(result);
      });
  }, []);

  return (
    <IonPage>
      <IonHeader
        translucent={true}
        collapse="fade"
        className="d-flex align-items-center"
      >
        <IonToolbar>
          <Title title="市場" />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <SegmentTab value={segment} onIonChange={onSegmentChange}>
          <SegmentButton value="watchList">
            <IonLabel>自選</IonLabel>
          </SegmentButton>
          <SegmentButton value="all">
            <IonLabel>所有股票</IonLabel>
          </SegmentButton>
        </SegmentTab>

        <IonButtons
          className="d-flex align-items-center"
          style={{ padding: "0rem 0.5rem" }}
        >
          <IonButton
            onClick={() => {
              console.log("clicked");
              switch (sortBySymbol) {
                case 0:
                  setSortBySymbol(1);
                  setSortByPrice(0);
                  setSortByChange(0);
                  setStockList(stockList.sort(compareSymbolDescend));
                  break;
                case 1:
                  setSortBySymbol(2);
                  setSortByPrice(0);
                  setSortByChange(0);
                  setStockList(stockList.sort(compareSymbolAscend));

                  break;
                default:
                  setSortBySymbol(0);
                  setSortByPrice(0);
                  setSortByChange(0);
                  setStockList(initStockList);
                  break;
              }
            }}
          >
            {/* {isChinese ? "按名稱排序" : "Sort by Symbol"} */}
            <IonText style={{ fontSize: 14 }}>按名稱排序</IonText>
          </IonButton>
          <IonButton
            onClick={() => {
              switch (sortByPrice) {
                case 0:
                  setSortByPrice(1);
                  setSortBySymbol(0);
                  setSortByChange(0);
                  setStockList(stockList.sort(comparePriceAscend));
                  break;
                case 1:
                  setSortByPrice(2);
                  setSortBySymbol(0);
                  setSortByChange(0);
                  setStockList(stockList.sort(comparePriceDescend));
                  break;
                default:
                  setSortByPrice(0);
                  setSortBySymbol(0);
                  setSortByChange(0);
                  setStockList(initStockList);
                  break;
              }
            }}
          >
            {/* {isChinese ? "按價格排序" : "Sort by Price"} */}
            <IonText style={{ fontSize: 14 }}>按價格排序</IonText>
          </IonButton>
          <IonButton
            onClick={() => {
              switch (sortByChange) {
                case 0:
                  setSortByChange(1);
                  setSortBySymbol(0);
                  setSortByPrice(0);
                  setStockList(stockList.sort(compareChangeAscend));
                  break;
                case 1:
                  setSortByChange(2);
                  setSortBySymbol(0);
                  setSortByPrice(0);
                  setStockList(stockList.sort(compareChangeDescend));
                  break;
                default:
                  setSortByChange(0);
                  setSortBySymbol(0);
                  setSortByPrice(0);
                  setStockList(initStockList);
                  break;
              }
            }}
          >
            {/* {isChinese ? "按升跌幅排序" : "Sort by Change"} */}
            <IonText style={{ fontSize: 14 }}>按升跌幅排序</IonText>
          </IonButton>
          {/* <IonButton
            onClick={() => {
              dispatch(changeLanguage(isChinese));
            }}
          >
            {isChinese ? "English" : "中文"}
          </IonButton>
          <IonButton
            onClick={() => {
              dispatch(changeColorTheme(isDark));
            }}
          >
            {isDark ? "Light Theme" : "Dark Theme"}
          </IonButton> */}
        </IonButtons>

        {segment === "watchList"
          ? stockList.map((item) => (
              <StockRow
                key={item.stock_id}
                symbol={item.symbol}
                id={item.stock_id}
                name={item.name}
                chineseName={item.chinese_name}
                currentPrice={item.current_price}
                yesterdayPrice={item.yesterday_price}
                priceDifference={item.price_difference}
              />
            ))
          : stockList2.map((item) => (
              <StockRow
                key={item.stock_id}
                symbol={item.symbol}
                id={item.stock_id}
                name={item.name}
                chineseName={item.chinese_name}
                currentPrice={item.current_price}
                yesterdayPrice={item.yesterday_price}
                priceDifference={item.price_difference}
              />
            ))}
      </IonContent>
    </IonPage>
  );
};

export default StockList;

function compareSymbolAscend(a: StockInfo, b: StockInfo) {
  const symbolA = a.symbol.toUpperCase();
  const symbolB = b.symbol.toUpperCase();

  if (symbolA > symbolB) {
    return 1;
  }

  if (symbolA < symbolB) {
    return -1;
  }

  return 0;
}

function compareSymbolDescend(a: StockInfo, b: StockInfo) {
  const symbolA = a.symbol.toUpperCase();
  const symbolB = b.symbol.toUpperCase();

  if (symbolA > symbolB) {
    return -1;
  }

  if (symbolA < symbolB) {
    return 1;
  }

  return 0;
}

function comparePriceAscend(a: StockInfo, b: StockInfo) {
  return a.current_price - b.current_price;
}

function comparePriceDescend(a: StockInfo, b: StockInfo) {
  return b.current_price - a.current_price;
}

function compareChangeAscend(a: StockInfo, b: StockInfo) {
  return (
    a.price_difference / a.yesterday_price -
    b.price_difference / b.yesterday_price
  );
}

function compareChangeDescend(a: StockInfo, b: StockInfo) {
  return (
    b.current_price / b.yesterday_price - a.current_price / a.yesterday_price
  );
}

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
