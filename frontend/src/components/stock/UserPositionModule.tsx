import { IonContent, IonSegment, IonSegmentButton } from "@ionic/react";
import { useState } from "react";
import InProgressOrderModule from "./InProgressOrderModule";
import PositionModule from "./PositionModule";
import "./UserPositionModule.css";

const UserPositionModule: React.FC = () => {
  const [currentSegment, setCurrentSegment] = useState("position");

  function onSegmentChange(e: any) {
    setCurrentSegment(e.detail.value);
  }

  return (
    <>
      <IonContent>
        <div className="position-order-container">
          <IonSegment value={currentSegment} onIonChange={onSegmentChange}>
            <IonSegmentButton value="position">持倉</IonSegmentButton>
            <IonSegmentButton value="in-progress-order">
              未完成訂單
            </IonSegmentButton>
          </IonSegment>

          {currentSegment === "position" ? (
            <PositionModule />
          ) : (
            <InProgressOrderModule />
          )}
        </div>
      </IonContent>
    </>
  );
};

export default UserPositionModule;
