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
  IonLoading,
} from "@ionic/react";
import { useState, useEffect } from "react";
import { useLocation } from "react-router";
import AccountOverviewModule from "../../components/paperTradeAccount/AccountOverviewModule";
import PaperTradeNavigator from "../../components/paperTradeAccount/PaperTradeNavigator";
import PositionAndOrderModule from "../../components/paperTradeAccount/PositionAndOrderModule";
import { useAppSelector } from "../../redux/store";

export interface AccountDetailType {
  principal: number;
  marketValue: number;
  buyingPower: number;
  totalProfit: number;
  totalProfitPercentage: number;
}

const IndividualAccount: React.FC = () => {
  const location = useLocation();
  const [currentAccount, setCurrentAccount] = useState(
    location.pathname.split("/")[location.pathname.split("/").length - 1]
  );
  const [isLoading, setIsLoading] = useState(true);
  const isUpdate = useAppSelector((state) => state.paperTrade.isUpdate);
  const userID = useAppSelector((state) => state.auth.user!.id);

  const [accountDetail, setAccountDetail] = useState<AccountDetailType>({
    principal: 0,
    marketValue: 0,
    buyingPower: 0,
    totalProfit: 0,
    totalProfitPercentage: 0,
  });

  // useEffect(() => {
  //   fetch(
  //     `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getIndividualAccountDetail?userID=${userID}&account=${currentAccount}`
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       const principal = result[0].market_value + result[0].buying_power;
  //       const totalProfit = principal - 1000000;
  //       const totalProfitPercentage = (totalProfit / 1000000) * 100;

  //       setAccountDetail({
  //         principal: principal,
  //         marketValue: result[0].market_value,
  //         buyingPower: result[0].buying_power,
  //         totalProfit: totalProfit,
  //         totalProfitPercentage: totalProfitPercentage,
  //       });
  //     });
  // }, [currentAccount, isUpdate]);

  // new approach
  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getFullOrderList2?userID=${userID}&account=${currentAccount}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setAccountDetail(result.accountDetail);
        setIsLoading(false);
      });
  }, [currentAccount, isUpdate]);

  return isLoading ? (
    <IonLoading isOpen={isLoading} message={"載入中..."}></IonLoading>
  ) : (
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

          <PositionAndOrderModule currentAccount={currentAccount} />
        </IonContent>
      </IonPage>
    </>
  );
};

export default IndividualAccount;
