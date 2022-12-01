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
import IndividualAccountModule from "../../components/stock/IndividualAccountModule";

const IndividualAccount: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState("US");

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

          {currentAccount === "US" && (
            <IndividualAccountModule category={currentAccount} />
          )}
          {currentAccount === "HK" && (
            <IndividualAccountModule category={currentAccount} />
          )}
          {currentAccount === "crypto" && (
            <IndividualAccountModule category={currentAccount} />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

export default IndividualAccount;
