import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonText,
  IonLoading,
} from "@ionic/react";
import { useEffect, useState } from "react";
import PaperTradeAccountModule from "../../components/paperTradeAccount/PaperTradeAccountModule";
import Title from "../../components/All/Title";
import Menu from "../../components/All/Menu";
import "./PaperTradeAccountOverview.css";
import { useAppSelector } from "../../redux/store";

interface UserAccountType {
  id: number;
  account: string;
  principal: number;
  totalProfit: number;
  totalProfitPercentage: number;
}

const PaperTradeAccountOverview: React.FC = () => {
  const [userAccountList, setUserAccountList] = useState<UserAccountType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const userID = useAppSelector((state) => state.auth.user!.id);

  // useEffect(() => {
  //   fetch(
  //     `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getAccountList?userID=${userID}`
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       setUserAccountList(result);
  //     });
  // }, []);

  useEffect(() => {
    setIsLoading(true);
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getAccountList2?userID=${userID}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setUserAccountList(result);
        setIsLoading(false);
      });
  }, []);

  return isLoading ? (
    <IonLoading isOpen={isLoading} message={"載入中..."} />
  ) : (
    <>
      <Menu />
      <IonPage>
        <IonHeader
          translucent={true}
          collapse="fade"
          style={{ height: 50 }}
          className="d-flex align-items-center"
        >
          <IonToolbar>
            <Title title="模擬交易" />
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div style={{ padding: "5%" }}>
            <IonText style={{ fontWeight: 600, marginLeft: 5 }}>
              股票賬戶
            </IonText>
            <div className="modules-container">
              {userAccountList.map((obj) => (
                <PaperTradeAccountModule
                  key={obj.id}
                  account={obj.account}
                  principal={obj.principal}
                  totalProfit={obj.totalProfit}
                  totalProfitPercentage={obj.totalProfitPercentage}
                />
              ))}
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default PaperTradeAccountOverview;
