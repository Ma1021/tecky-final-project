import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";

const Notification: React.FC = () => {
  return (
    <>
      <IonButtons className="pr-1">
        <IonButton>
          <IonIcon icon={notificationsOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </>
  );
};

export default Notification;
