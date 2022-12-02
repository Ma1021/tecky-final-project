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
import React, { useState } from "react";

const OrderPanel: React.FC = () => {
  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [orderType, setOrderType] = useState("current");

  return (
    <>
      <IonList>
        <IonItem>
          <IonLabel>代碼</IonLabel>
          <IonInput
            onIonChange={(e: any) => {
              setCurrentTicker(e.detail.value);
            }}
          ></IonInput>
          <IonButton>熱門股票</IonButton>
        </IonItem>

        <IonItem>
          <IonLabel>方向</IonLabel>
          <IonButtons>
            <IonButton>模擬買入</IonButton>
            <IonButton>模擬賣出</IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel>類型</IonLabel>
          <IonSelect interface="popover" value={orderType} onIonChange={(e: any) => setOrderType(e.detail.value)}>
            <IonSelectOption value="current">市價單</IonSelectOption>
            <IonSelectOption value="fix">限價單</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>價格</IonLabel>
          <IonInput></IonInput>
          <IonButtons>
            <IonButton>-</IonButton>
            <IonButton>+</IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel>數量</IonLabel>
          <IonInput></IonInput>
          <IonButtons>
            <IonButton>-</IonButton>
            <IonButton>+</IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel>最大可買</IonLabel>
          <IonLabel>100</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel>金額</IonLabel>
          <IonLabel>10000</IonLabel>
        </IonItem>

        <IonButton>模擬買入</IonButton>
      </IonList>
      <h1>{currentTicker}</h1>
    </>
  );
};

export default OrderPanel;
