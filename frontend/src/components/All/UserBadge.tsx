import { IonChip, IonAvatar, IonIcon, IonLabel } from "@ionic/react";
import { diamondOutline } from "ionicons/icons";

const UserBadge: React.FC = () => {
  return (
    <IonChip>
      <IonAvatar>
        <IonIcon icon={diamondOutline}></IonIcon>
      </IonAvatar>
      <IonLabel>超級股神</IonLabel>
    </IonChip>
  );
};

export default UserBadge;
