import {
  IonList,
  IonItem,
  IonLabel,
  IonInput,
  IonButtons,
  IonButton,
  IonSelect,
  IonSelectOption,
  IonSearchbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { paperTradeUpdate } from "../../redux/paperTrade/paperTrade.action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./OrderPanel.css";

interface OrderPanelProps {
  currentAccount: string;
}

interface PositionType {
  id: number;
  name: string;
  chineseName: string;
  symbol: string;
  currentMarketValue: number;
  currentPrice: number;
  quantity: number;
  cost: number;
  profit: number;
  profitPercentage: number;
  ratio: number;
}

const OrderPanel: React.FC<OrderPanelProps> = ({ currentAccount }) => {
  const [currentTicker, setCurrentTicker] = useState<string>("");
  const [currentPrice, setCurrentPrice] = useState(0);
  const [orderDirection, setOrderDirection] = useState("long");
  const [orderType, setOrderType] = useState("fix");
  const [orderPrice, setOrderPrice] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);
  const [principal, setPrincipal] = useState(1000000);
  const [positions, setPositions] = useState<PositionType[]>([]);
  const isUpdate = useAppSelector((state) => state.paperTrade.isUpdate);
  const userID = useAppSelector((state) => state.auth.user!.id);
  const dispatch = useAppDispatch();
  let ownedTickets = 0;

  for (const position of positions) {
    position.symbol === currentTicker
      ? (ownedTickets = position.quantity)
      : (ownedTickets = 0);
  }

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getFullOrderList2?userID=${userID}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setPrincipal(result.accountDetail.principal);
        setPositions(result.positions);
      });
  }, []);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_PUBLIC_URL
      }/paperTrade/getCurrentPrice?symbol=${currentTicker.toUpperCase()}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setCurrentPrice(result);
      });
  }, [currentTicker]);

  return (
    <>
      <IonList>
        <IonItem>
          {/* <IonLabel className="order-panel-label">??????</IonLabel> */}
          <IonSearchbar
            searchIcon="undefined"
            placeholder="??????"
            debounce={2000}
            onIonChange={(e: any) => {
              setCurrentTicker(e.detail.value);
            }}
          />
          {/* <IonInput
            onIonChange={(e: any) => {
              setTimeout(() => {
                setCurrentTicker(e.detail.value);
              }, 5000);
            }}
          ></IonInput> */}
          {/* <IonButton>????????????</IonButton> */}
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">??????</IonLabel>
          {/* <IonButtons> */}
          <IonButton
            color={orderDirection === "long" ? "success" : "undefined"}
            // className={orderDirection === "long" ? "long" : ""}
            onClick={() => setOrderDirection("long")}
          >
            ????????????
          </IonButton>
          {/* <IonButton
            color={orderDirection === "short" ? "danger" : "undefined"}
            // className={orderDirection === "short" ? "short" : ""}
            onClick={() => setOrderDirection("short")}
          >
            ????????????
          </IonButton> */}
          {/* </IonButtons> */}
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">??????</IonLabel>
          <IonSelect
            interface="popover"
            value={orderType}
            onIonChange={(e: any) => setOrderType(e.detail.value)}
          >
            <IonSelectOption value="fix">?????????</IonSelectOption>
            <IonSelectOption value="current">?????????</IonSelectOption>
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel className="order-panel-label">??????</IonLabel>
          <IonInput
            value={
              orderType === "fix"
                ? isNaN(orderPrice)
                  ? ""
                  : orderPrice <= 0
                  ? ""
                  : orderPrice
                : currentPrice
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
          <IonLabel className="order-panel-label">??????</IonLabel>
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
            <IonLabel>{`???????????? ${
              orderPrice <= 0 || principal === undefined
                ? ""
                : isNaN(Math.floor(principal / orderPrice))
                ? ""
                : Math.floor(principal / orderPrice)
            }`}</IonLabel>
          ) : (
            <IonLabel>{`???????????? ${
              ownedTickets <= 0
                ? ""
                : quantity > ownedTickets
                ? `${ownedTickets} ??????????????????`
                : ownedTickets
            }`}</IonLabel>
          )}
        </IonItem>

        <IonItem>
          <IonLabel>{`?????? ${
            isNaN(orderPrice * quantity) || principal === undefined
              ? ""
              : quantity > Math.floor(principal / orderPrice)
              ? "???????????????"
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
          {orderDirection === "long" ? "????????????" : "????????????"}
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
