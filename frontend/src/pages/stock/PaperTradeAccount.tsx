import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import { useState } from "react";
import PaperTradeAccountModule from "../../components/stock/PaperTradeAccountModule";
import styled from "styled-components";
import Title from "../../components/All/Title";
import "src/pages/stock/PaperTradeAccount.css";

const PaperTradeAccount: React.FC = () => {
  const [segment, setSegment] = useState("stock");

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  return (
    <IonPage>
      <IonHeader
        translucent={true}
        collapse="fade"
        style={{ height: 50 }}
        className="d-flex align-items-center"
      >
        <IonToolbar>
          <Title title="模擬交易" />
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <SegmentTab value={segment} onIonChange={onSegmentChange}>
          <SegmentButton value="stock">
            <IonLabel>股票</IonLabel>
          </SegmentButton>
          <SegmentButton value="crypto">
            <IonLabel>加密貨幣</IonLabel>
          </SegmentButton>
        </SegmentTab>

        <PaperTradeAccountModule filter={segment} />
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
