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
import { useState } from "react";
import { useLocation } from "react-router";
import MainChart from "../../components/stock/MultipleSeriesChart";
import StockForum from "../../components/stock/StockForum";
import StockNews from "../../components/stock/StockNews";
import StockAnalysis from "../../components/stock/StockAnalysis";
import PaperTradeModule from "../../components/paperTrade/PaperTradePanel";
import styled from "styled-components";
import "./IndividualStockInfo.css";
import StockInfo from "../../components/stock/StockInfo";

const IndividualStockInfo: React.FC = () => {
  const location = useLocation();
  const symbol =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [segment, setSegment] = useState("stockInfo");

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

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
            <IonLabel>股票資訊</IonLabel>
          </SegmentButton>
          <SegmentButton value="stockForum">
            <IonLabel>問題</IonLabel>
          </SegmentButton>
          <SegmentButton value="stockNews">
            <IonLabel>新聞</IonLabel>
          </SegmentButton>
          <SegmentButton value="stockAnalysis">
            <IonLabel>分析</IonLabel>
          </SegmentButton>
        </SegmentTab>

        <IonContent>
          {segment === "stockInfo" && (
            <>
              <StockInfo symbol={symbol!} />
              <div className="chart-section">
                <MainChart symbol={symbol!} />
              </div>{" "}
            </>
          )}
          {segment === "stockForum" && <StockForum />}
          {segment === "stockNews" && <StockNews />}
          {segment === "stockAnalysis" && <StockAnalysis />}
          {segment === "paperTrade" && <PaperTradeModule />}
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
