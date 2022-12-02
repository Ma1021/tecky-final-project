import {
  IonPage,
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonTitle,
} from "@ionic/react";
import { useState } from "react";
import { useLocation } from "react-router";
import IndividualAccountModule from "../../components/stock/IndividualAccountModule";

const IndividualAccount: React.FC = () => {
  const location = useLocation();
  const [currentAccount, setCurrentAccount] = useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );

  const onListChange = (e: any) => {
    setCurrentAccount(e.detail.value);
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/paperTrade"></IonBackButton>
            </IonButtons>
            <IonTitle>模擬交易</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <IonList>
            <IonItem>
              <IonSelect
                interface="action-sheet"
                value={currentAccount}
                onIonChange={onListChange}
              >
                <IonSelectOption value="US">美股模擬賬戶</IonSelectOption>
                <IonSelectOption value="HK">港股模擬賬戶</IonSelectOption>
                <IonSelectOption value="crypto">
                  加密貨幣模擬賬戶
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <IndividualAccountModule category={currentAccount} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default IndividualAccount;
