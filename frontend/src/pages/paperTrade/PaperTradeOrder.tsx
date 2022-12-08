import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonButtons,
  IonButton,
  IonBackButton,
  IonIcon,
  IonTitle,
} from "@ionic/react";
import { chevronBackOutline } from "ionicons/icons";
import { useState } from "react";
import { useHistory, useLocation } from "react-router";
import OrderPanel from "../../components/paperTrade/OrderPanel";
import PositionAndOrderModule from "../../components/paperTradeAccount/PositionAndOrderModule";

const PaperTradeOrder: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const account =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [currentAccount, setCurrentAccount] = useState(account);
  console.log("account", account);
  console.log("currentAccount", currentAccount);

  return (
    <>
      <IonPage>
        <IonHeader
          translucent={true}
          collapse="fade"
          style={{ height: 50 }}
          className="d-flex align-items-center"
        >
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton
                onClick={() => {
                  history.replace(`/individualAccount/${currentAccount}`);
                }}
              >
                <IonIcon icon={chevronBackOutline} />
                Back
              </IonButton>
              {/* <IonBackButton
                defaultHref={`/individualAccount/${currentAccount}`}
              >
                Back
              </IonBackButton> */}
            </IonButtons>
            <IonTitle>模擬交易</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div style={{ height: "10px" }}></div>

        <IonContent>
          <IonList>
            <IonItem>
              <IonSelect
                interface="action-sheet"
                value={currentAccount}
                onIonChange={(e: any) => {
                  setCurrentAccount(e.detail.value);
                }}
              >
                <IonSelectOption value="US">美股模擬賬戶</IonSelectOption>
                <IonSelectOption value="HK">港股模擬賬戶</IonSelectOption>
                <IonSelectOption value="crypto">
                  加密貨幣模擬賬戶
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <div style={{ height: "10px" }}></div>

          <OrderPanel currentAccount={currentAccount} />

          <PositionAndOrderModule currentAccount={currentAccount} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default PaperTradeOrder;
