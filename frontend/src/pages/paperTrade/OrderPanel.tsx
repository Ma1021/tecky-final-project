import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState } from "react";
import "./OrderPanel.css";

const OrderPanel: React.FC = () => {
  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState("long");
  const [orderType, setOrderType] = useState("current");

  return (
    <>
      <IonList>
        <IonItem>
          <IonLabel className="order-panel-label">代碼</IonLabel>
          <IonInput
            onIonChange={(e: any) => {
              setCurrentTicker(e.detail.value);
            }}
          ></IonInput>
          <IonButton>熱門股票</IonButton>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">方向</IonLabel>
          <IonButtons>
            <IonButton
              className={orderDirection === "long" ? "long" : ""}
              onClick={() => setOrderDirection("long")}
            >
              模擬買入
            </IonButton>
            <IonButton
              className={orderDirection === "short" ? "short" : ""}
              onClick={() => setOrderDirection("short")}
            >
              模擬賣出
            </IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">類型</IonLabel>
          <IonSelect
            interface="popover"
            value={orderType}
            onIonChange={(e: any) => setOrderType(e.detail.value)}
          >
            <IonSelectOption value="current">市價單</IonSelectOption>
            <IonSelectOption value="fix">限價單</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">價格</IonLabel>
          <IonInput></IonInput>
          <IonButtons>
            <IonButton>-</IonButton>
            <IonButton>+</IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">數量</IonLabel>
          <IonInput></IonInput>
          <IonButtons>
            <IonButton>-</IonButton>
            <IonButton>+</IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel>最大可買 100</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>金額 10000</IonLabel>
        </IonItem>

        <IonButton className="order-confirm-button">模擬買入</IonButton>
      </IonList>
      <h1>{currentTicker}</h1>
    </>
  );
};

export default OrderPanel;
