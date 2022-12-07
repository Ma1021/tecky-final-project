import { IonSegment, IonSegmentButton } from "@ionic/react";
import { useState } from "react";
// import InProgressOrderModule from "./InProgressOrderModule";
import PositionModule from "./PositionModule";
import RecentOrderModule from "./RecentOrderModule";

interface PositionAndOrderModuleProps {
  currentAccount: string;
}

const PositionAndOrderModule: React.FC<PositionAndOrderModuleProps> = ({
  currentAccount,
}) => {
  const [currentSegment, setCurrentSegment] = useState("position");

  function onSegmentChange(e: any) {
    setCurrentSegment(e.detail.value);
  }

  return (
    <>
      <div className="position-order-container">
        <IonSegment value={currentSegment} onIonChange={onSegmentChange}>
          <IonSegmentButton value="position">持倉</IonSegmentButton>
          {/* <IonSegmentButton value="in-progress-order">
            未完成訂單
          </IonSegmentButton> */}
          <IonSegmentButton value="recent-order">最近5次訂單</IonSegmentButton>
        </IonSegment>

        {currentSegment === "position" ? (
          <PositionModule currentAccount={currentAccount} />
        ) : (
          // <InProgressOrderModule currentAccount={currentAccount} />
          <RecentOrderModule currentAccount={currentAccount} />
        )}
      </div>
    </>
  );
};

export default PositionAndOrderModule;
