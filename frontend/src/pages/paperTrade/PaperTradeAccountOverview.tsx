import { IonPage, IonHeader, IonToolbar, IonContent, IonText } from "@ionic/react";
import { useEffect, useState } from "react";
import PaperTradeAccountModule from "../../components/paperTradeAccount/PaperTradeAccountModule";
import Title from "../../components/All/Title";
import "./PaperTradeAccountOverview.css";

interface UserAccountType {
  region: string;
  amount: number;
  profit: number;
  profitPercentage: number;
}

const PaperTradeAccountOverview: React.FC = () => {
  const [userAccountList, setUserAccountList] = useState<UserAccountType[]>([]);

  useEffect(() => {
    const exampleList = [
      { region: "US", amount: 185307.25, profit: 0, profitPercentage: 0 },
      { region: "HK", amount: 100100, profit: 100, profitPercentage: 0.1 },
      {
        region: "crypto",
        amount: 1110000,
        profit: 10000,
        profitPercentage: 100,
      },
    ];
    setUserAccountList(exampleList);
  }, []);
  
  return (
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
        <div style={{padding:'5%'}}>
          <IonText style={{fontWeight:600, marginLeft:5}}>股票賬戶</IonText>
          <div className="modules-container">
            {userAccountList.map((obj) => (
              <PaperTradeAccountModule
                region={obj.region}
                amount={obj.amount}
                profit={obj.profit}
                profitPercentage={obj.profitPercentage}
              />
            ))}
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default PaperTradeAccountOverview;
