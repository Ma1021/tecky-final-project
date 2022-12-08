import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonText,
} from "@ionic/react";
import { useEffect, useState } from "react";
import PaperTradeAccountModule from "../../components/paperTradeAccount/PaperTradeAccountModule";
import Title from "../../components/All/Title";
import Menu from "../../components/All/Menu";
import "./PaperTradeAccountOverview.css";

interface UserAccountType {
  id: number;
  account: string;
  principal: number;
  totalProfit: number;
  totalProfitPercentage: number;
}

const PaperTradeAccountOverview: React.FC = () => {
  const [userAccountList, setUserAccountList] = useState<UserAccountType[]>([]);
  const userID = 1;

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
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/paperTrade/getAccountList2?userID=${userID}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log(result);

        setUserAccountList(result);
      });
  }, []);

  return (
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
