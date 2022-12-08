import { IonButtons, IonButton } from "@ionic/react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../redux/store";
import "./PaperTradeNavigator.css";

interface PaperTradeNavigatorProps {
  currentAccount: string;
}

const PaperTradeNavigator: React.FC<PaperTradeNavigatorProps> = ({
  currentAccount,
}) => {
  const history = useHistory();
  const userID = useAppSelector((state) => state.auth.user!.id);

  return (
    <>
      <div className="navigation-button-container">
        <IonButtons>
          <IonButton
            className="navigation-button"
            onClick={() => {
              history.push(`/paperOrderPanel/${currentAccount}`);
            }}
          >
            交易
          </IonButton>
          <IonButton
            className="navigation-button"
            onClick={() => {
              history.push(`/paperTradeRecords/${currentAccount}/${userID}`);
            }}
          >
            訂單紀錄
          </IonButton>
          {/* <IonButton
            className="navigation-button"
            onClick={() => {
              history.push(`/paperTradeAnalysis/${currentAccount}/${userID}`);
            }}
          >
            資產分析
          </IonButton> */}
        </IonButtons>
      </div>
    </>
  );
};

export default PaperTradeNavigator;
