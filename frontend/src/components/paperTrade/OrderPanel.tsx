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
import { paperTradeUpdate } from "../../redux/paperTrade/paperTrade.action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./OrderPanel.css";

interface OrderPanelProps {
  currentAccount: string;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ currentAccount }) => {
  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [orderDirection, setOrderDirection] = useState("long");
  const [orderType, setOrderType] = useState("fix");
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const isUpdate = useAppSelector((state) => state.paperTrade.isUpdate);
  const dispatch = useAppDispatch();
  const userID = 1;
  const principal = 1000000;
  const ownedTickets = 100;
  const stockPrice = 300;

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
          {/* <IonButton>熱門股票</IonButton> */}
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">方向</IonLabel>
          {/* <IonButtons> */}
          <IonButton
            color={orderDirection === "long" ? "success" : "undefined"}
            // className={orderDirection === "long" ? "long" : ""}
            onClick={() => setOrderDirection("long")}
          >
            模擬買入
          </IonButton>
          <IonButton
            color={orderDirection === "short" ? "danger" : "undefined"}
            // className={orderDirection === "short" ? "short" : ""}
            onClick={() => setOrderDirection("short")}
          >
            模擬賣出
          </IonButton>
          {/* </IonButtons> */}
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">類型</IonLabel>
          <IonSelect
            interface="popover"
            value={orderType}
            onIonChange={(e: any) => setOrderType(e.detail.value)}
          >
            <IonSelectOption value="fix">限價單</IonSelectOption>
            {/* <IonSelectOption value="current">市價單</IonSelectOption> */}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">價格</IonLabel>
          <IonInput
            value={
              orderType === "fix"
                ? isNaN(orderPrice)
                  ? ""
                  : orderPrice <= 0
                  ? ""
                  : orderPrice
                : stockPrice
            }
            onIonChange={(e: any) => {
              setOrderPrice(parseFloat(e.detail.value));
            }}
          ></IonInput>
          <IonButtons>
            <IonButton
              onClick={() => {
                setOrderPrice(parseFloat((orderPrice - 0.1).toFixed(3)));
              }}
            >
              -
            </IonButton>
            <IonButton
              onClick={() => {
                setOrderPrice(parseFloat((orderPrice + 0.1).toFixed(3)));
              }}
            >
              +
            </IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">數量</IonLabel>
          <IonInput
            value={isNaN(quantity) ? "" : quantity <= 0 ? "" : quantity}
            onIonChange={(e: any) => {
              setQuantity(parseInt(e.detail.value));
            }}
          ></IonInput>
          <IonButtons>
            <IonButton
              onClick={() => {
                setQuantity(quantity - 1);
              }}
            >
              -
            </IonButton>
            <IonButton
              onClick={() => {
                setQuantity(quantity + 1);
              }}
            >
              +
            </IonButton>
          </IonButtons>
        </IonItem>

        <IonItem>
          {orderDirection === "long" ? (
            <IonLabel>{`最大可買 ${
              orderPrice <= 0
                ? ""
                : isNaN(Math.floor(principal / orderPrice))
                ? ""
                : Math.floor(principal / orderPrice)
            }`}</IonLabel>
          ) : (
            <IonLabel>{`最大可賣 ${
              ownedTickets <= 0
                ? ""
                : quantity > ownedTickets
                ? `${ownedTickets} 超過持倉數量`
                : ownedTickets
            }`}</IonLabel>
          )}
        </IonItem>

        <IonItem>
          <IonLabel>{`金額 ${
            isNaN(orderPrice * quantity)
              ? ""
              : quantity > Math.floor(principal / orderPrice)
              ? "購買力不足"
              : orderPrice * quantity
          }`}</IonLabel>
        </IonItem>

        <IonButton
          className="order-confirm-button"
          onClick={() => {
            dispatch(paperTradeUpdate(isUpdate));
            // dispatch(
            //   placeOrder(
            //     userID,
            //     currentTicker.toUpperCase(),
            //     orderDirection,
            //     orderPrice,
            //     quantity,
            //     currentAccount
            //   )
            // );
            placeOrder(
              userID,
              currentTicker.toUpperCase(),
              orderDirection,
              orderPrice,
              quantity,
              currentAccount
            );
          }}
        >
          {orderDirection === "long" ? "模擬買入" : "模擬賣出"}
        </IonButton>
      </IonList>
    </>
  );
};

export default OrderPanel;

async function placeOrder(
  userID: number,
  symbol: string,
  orderDirection: string,
  price: number,
  quantity: number,
  account: string
) {
  const data = {
    userID,
    symbol,
    orderDirection,
    price,
    quantity,
    account,
  };
  const res = await fetch(
    `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/placeOrder3`,
    {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(data),
    }
  );
  const result = await res.json();
  console.log(result);
}
