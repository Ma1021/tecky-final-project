import { IonChip, IonAvatar, IonIcon, IonLabel } from "@ionic/react";
import { diamond, happyOutline } from "ionicons/icons";

interface UserBadgeProps {
  isKOL: boolean;
}

const UserBadge: React.FC<UserBadgeProps> = (props) => {
  return (
    <>
      {props.isKOL === true ? (
        <IonChip className="userBadge">
          <IonIcon style={{ color: "grey" }} icon={diamond}></IonIcon>
          <IonLabel style={{ fontSize: "0.8rem" }}>超級股神</IonLabel>
        </IonChip>
      ) : (
        <IonChip className="userBadge">
          <IonIcon icon={happyOutline}></IonIcon>
          <IonLabel>精明用家</IonLabel>
        </IonChip>
      )}
    </>
  );
};

export default UserBadge;
