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
} from "@ionic/react";
import { useState } from "react";
import Title from "../../components/All/Title";

const IndividualAccount: React.FC = () => {
  const [currentAccount, setCurrentAccount] = useState("us");

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
                <IonSelectOption value="us">美股模擬賬戶</IonSelectOption>
                <IonSelectOption value="hk">港股模擬賬戶</IonSelectOption>
                <IonSelectOption value="crypto">
                  加密貨幣模擬賬戶
                </IonSelectOption>
              </IonSelect>
            </IonItem>
          </IonList>

          <h1>Paper Trade Account Page</h1>
          {currentAccount === "us"}
          {currentAccount === "hk"}
          {currentAccount === "crypto"}
        </IonContent>
      </IonPage>
    </>
  );
};

export default IndividualAccount;
