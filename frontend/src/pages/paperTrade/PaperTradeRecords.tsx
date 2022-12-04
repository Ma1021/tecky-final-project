import {
  IonPage,
  IonHeader,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonContent,
  IonList,
  IonItem,
  IonSelect,
  IonSelectOption,
} from "@ionic/react";
import { useState } from "react";
import { useLocation } from "react-router";
import PaperTradeRecordsModule from "../../components/paperTrade/PaperTradeRecordsModule";

const PaperTradeRecords: React.FC = () => {
  const location = useLocation();
  const account =
    location.pathname.split("/")[location.pathname.split("/").length - 2];
  const userID =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [currentAccount, setCurrentAccount] = useState(account);

  return (
    <>
      <IonPage>
        <IonHeader
          translucent={true}
          collapse="fade"
          style={{ height: 50 }}
          className="d-flex align-items-center"
        >
          <IonButtons>
            <IonBackButton>Back</IonBackButton>
          </IonButtons>
          <IonTitle>訂單紀錄</IonTitle>
        </IonHeader>

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

          <PaperTradeRecordsModule
            userID={userID}
            currentAccount={currentAccount}
          />
        </IonContent>
      </IonPage>
    </>
  );
};

export default PaperTradeRecords;
