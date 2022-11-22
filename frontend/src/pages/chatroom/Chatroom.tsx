import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { searchOutline } from "ionicons/icons";
import img from "../../img/animal_stand_ookami.png";

const Chatroom: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-between align-items-center w100 ">
              <IonButtons>
                <IonBackButton defaultHref="/home"></IonBackButton>
              </IonButtons>
              Group name here
              <IonButton>
                <IonIcon icon={searchOutline}></IonIcon>
              </IonButton>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="d-flex">
          <div className="d-flex flex-column ion-margin">
            <IonAvatar
              style={{
                backgroundColor: "pink",
              }}
            >
              <img
                src={img}
                alt="user icon"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </IonAvatar>
          </div>
          <IonCard style={{ maxWidth: "75%" }}>
            <IonCardHeader className="pt-1 pb-1">
              <IonCardSubtitle style={{ textTransform: "none" }}>
                User name
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="pb-1">
              This is the content of the user
              <p className="pt-1" style={{ fontSize: "0.7rem" }}>
                內容只供參考, 不構成投資建議
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Chatroom;
