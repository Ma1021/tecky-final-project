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
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import AccountOverviewModule from "../../components/paperTradeAccount/AccountOverviewModule";
import PaperTradeForum from "../../components/paperTradeAccount/PaperTradeForum";
import PaperTradeNavigator from "../../components/paperTradeAccount/PaperTradeNavigator";
import PaperTradeRankList from "../../components/paperTradeAccount/PaperTradeRankList";
import PositionAndOrderModule from "../../components/paperTradeAccount/PositionAndOrderModule";

export interface AccountDetailType {
  totalAmount: number;
  todayProfit: number;
  todayProfitPercentage: number;
  marketValue: number;
  rank: number;
  buyingPower: number;
  totalProfit: number;
  totalProfitPercentage: number;
}

const IndividualAccount: React.FC = () => {
  const location = useLocation();
  const [currentAccount, setCurrentAccount] = useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );

  const [accountDetail, setAccountDetail] = useState<AccountDetailType>({
    totalAmount: 0,
    todayProfit: 0,
    todayProfitPercentage: 0,
    marketValue: 0,
    buyingPower: 0,
    rank: 0,
    totalProfit: 0,
    totalProfitPercentage: 0,
  });

  useEffect(() => {
    if (currentAccount === "US") {
      setAccountDetail({
        totalAmount: 1000000,
        todayProfit: 0,
        todayProfitPercentage: 0,
        marketValue: 0,
        buyingPower: 1000000,
        rank: 0,
        totalProfit: 0,
        totalProfitPercentage: 0,
      });
    } else if (currentAccount === "HK") {
      setAccountDetail({
        totalAmount: 2000000,
        todayProfit: 1000,
        todayProfitPercentage: 10,
        marketValue: 1000000,
        buyingPower: 1000000,
        rank: 1,
        totalProfit: 1000000,
        totalProfitPercentage: 100,
      });
    } else {
      setAccountDetail({
        totalAmount: 10000,
        todayProfit: -8000,
        todayProfitPercentage: -80,
        marketValue: 10000,
        buyingPower: 0,
        rank: 9999,
        totalProfit: -9000,
        totalProfitPercentage: -90,
      });
    }
  }, [currentAccount]);

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

          <AccountOverviewModule accountDetail={accountDetail} />
          <PaperTradeNavigator currentAccount={currentAccount} />
          <div style={{ height: "10px" }}></div>
          <PositionAndOrderModule currentAccount={currentAccount} />
          {/* <div style={{ height: "10px" }}></div>
          <PaperTradeForum />
          <div style={{ height: "10px" }}></div>
          <PaperTradeRankList /> */}
        </IonContent>
      </IonPage>
    </>
  );
};

export default IndividualAccount;
