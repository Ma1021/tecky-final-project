import { IonChip, IonAvatar, IonIcon, IonLabel } from "@ionic/react";
import { diamond, happy } from "ionicons/icons";

interface UserBadgeProps {
  isKOL: boolean;
}

const UserBadge: React.FC<UserBadgeProps> = (props) => {
  return (
    <>
      {props.isKOL === true ? (
        <IonChip className="userBadge d-flex align-items-center justify-content-center" style={{backgroundColor:"#536878", margin:0}}>
          <IonIcon style={{ color: "#A7F9F9", marginLeft:1 }} icon={diamond}></IonIcon>
          <IonLabel style={{ fontSize: "0.8rem", fontWeight:400 }}>超級股神</IonLabel>
        </IonChip>
      ) : (
        <IonChip className="userBadge d-flex align-items-center justify-content-center" style={{backgroundColor: '#646F67', margin:0}} >
          <IonIcon icon={happy} style={{ color: "#C5D932", marginLeft:1 }}></IonIcon>
          <IonLabel style={{ fontSize: "0.8rem", fontWeight:400 }}>精明股民</IonLabel>
        </IonChip>
      )}
    </>
  );
};

export default UserBadge;
