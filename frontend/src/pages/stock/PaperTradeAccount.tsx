import {
  IonButton,
  IonPage,
  IonHeader,
  IonContent,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import { useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/store";
import "./PaperTradeAccount.css";

const PaperTradeAccount: React.FC = () => {
  const isChinese = useAppSelector((state) => state.theme.isChinese);
  const [segment, setSegment] = useState("Overview");

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  return (
    <IonPage>
      <IonHeader></IonHeader>

      <IonContent>
        <SegmentTab value={segment} onChange={onSegmentChange}>
          <SegmentButton>{isChinese ? "總覽" : "Overview"}</SegmentButton>
          <SegmentButton>{isChinese ? "交易" : "Trade"}</SegmentButton>
        </SegmentTab>

        {segment === "Overview" ? <div>Overview</div> : <div>Trade</div>}
      </IonContent>
    </IonPage>
  );
};

export default PaperTradeAccount;

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
