import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonChip,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";
import "./UserInfo.css";
import {
  personOutline,
  paperPlaneOutline,
  diamondOutline,
  happyOutline,
} from "ionicons/icons";
import img from "../../img/animal_stand_ookami.png";
import Notification from "../../components/All/Notification";

const UserInfo: React.FC = () => {
  const userInfo = {
    username: "user",
    userId: 123,
    email: "user@gmail.com",
    phone: 12345678,
    following: 4,
    followed: 0,
    isKOL: false,
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-round align-items-center w100 h100">
              <IonButtons>
                <IonBackButton defaultHref="/"></IonBackButton>
              </IonButtons>
              <div style={{ flexGrow: 1, textAlign: "center" }}>編輯用戶</div>
              <Notification />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* user information below */}
        <IonItem lines="full">
          <div className="d-flex flex-column justify-content-center align-items-center w100 pt-3 pb-3">
            <IonAvatar
              style={{
                backgroundColor: "pink",
                cursor: "pointer",
                width: "5rem",
                height: "5rem",
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
            <div className="d-flex flex-row  align-items-center">
              <IonText>{userInfo.username}</IonText>
              {userInfo.isKOL === true ? (
                <IonChip className="userBadge">
                  <IonIcon icon={diamondOutline}></IonIcon>
                  <IonLabel style={{ fontSize: "0.8rem" }}>超級股神</IonLabel>
                </IonChip>
              ) : (
                <IonChip className="userBadge">
                  <IonIcon icon={happyOutline}></IonIcon>
                  <IonLabel>精明用家</IonLabel>
                </IonChip>
              )}
            </div>
            <div className="flex-row pt-1 pb-1">
              <IonButton className="userInfo-button" size="small" shape="round">
                <IonIcon slot="start" icon={personOutline}></IonIcon>
                帳戶
              </IonButton>
              <IonButton className="userInfo-button" size="small" shape="round">
                <IonIcon slot="start" icon={paperPlaneOutline}></IonIcon>
                分享
              </IonButton>
            </div>
            <div className="d-flex flex-row pt-1 pb-1">
              <div className="flex-column text-align-center p-1 pr-2 border-right">
                <div>{userInfo.following}</div>
                <div>關注中</div>
              </div>
              <div className="flex-column text-align-center p-1 pl-2">
                <div>{userInfo.followed}</div>
                <div>粉絲數</div>
              </div>
            </div>
          </div>
        </IonItem>
        {/* user information above */}
      </IonContent>
    </IonPage>
  );
};

export default UserInfo;
