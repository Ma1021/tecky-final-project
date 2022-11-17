import {
  IonContent,
  IonHeader,
  IonMenu,
  IonMenuToggle,
  IonAvatar,
  IonItem,
  IonLabel,
  IonGrid,
  IonIcon,
  IonButton,
  IonText,
  IonAccordion,
  IonAccordionGroup,
  IonList,
} from "@ionic/react";
import img from "../../img/animal_stand_ookami.png";
import { useHistory } from "react-router";
import { pencilOutline, settingsOutline, logoWhatsapp } from "ionicons/icons";
import "./Menu.css";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const history = useHistory();
  const userInfo = {
    username: "user",
    userId: 123,
    email: "user@gmail.com",
    phone: 12345678,
  };

  return (
    <IonMenu contentId="main-content">
      <IonHeader
        className="menu pt-3 pb-3"
        onClick={() => history.push("/userInfo")}
      >
        {/* <IonToolbar> */}
        <IonMenuToggle className="w100">
          <div className="pr-1">
            {/* username id edit and name */}
            <IonItem lines="none" className="menu-username menu">
              <div className="d-flex">
                <IonAvatar
                  style={{
                    backgroundColor: "pink",
                    cursor: "pointer",
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
                <div className="flex-column pl-3 pb-3">
                  <div className="w100">
                    <IonLabel>{userInfo.username}</IonLabel>
                  </div>
                  <div className="w100">
                    <IonLabel className="grey">
                      編輯帳號<IonIcon icon={pencilOutline}></IonIcon>
                    </IonLabel>
                  </div>
                </div>
              </div>
            </IonItem>
            {/* username edit and name */}
            {/* user id */}
            <IonItem lines="none" className="menu-userId menu ">
              <div className="d-flex w100 justify-content-between align-items-center ">
                <IonText>用戶碼: {userInfo.userId}</IonText>
                <IonButton>複製</IonButton>
              </div>
            </IonItem>
            {/* user id */}
            {/* user number and email*/}
            <IonItem lines="none" className="menu-userInfo menu pt-0">
              <IonGrid>
                <div className="w100">
                  <IonText className="grey">
                    {userInfo.phone.toString().slice(0, 2) +
                      "****" +
                      userInfo.phone.toString().slice(6)}
                  </IonText>
                </div>
                <div className="w100">
                  <IonText className="grey">
                    {userInfo.email
                      .toString()
                      .split("@")[0]
                      .slice(
                        0,
                        userInfo.email.toString().split("@")[0].length - 4
                      ) +
                      "****" +
                      userInfo.email.toString().split("@")[1]}
                  </IonText>
                </div>
              </IonGrid>
            </IonItem>
            {/* user number and email*/}
          </div>
        </IonMenuToggle>
        {/* </IonToolbar> */}
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="w100">
          <IonList className="w100">
            <IonAccordionGroup className="menu">
              <IonAccordion value="first">
                <IonItem className="menu" slot="header" color="light">
                  <IonLabel>
                    <IonIcon icon={logoWhatsapp}></IonIcon> 客戶服務
                  </IonLabel>
                </IonItem>
                <div className="ion-padding" slot="content">
                  申請成為KOL
                </div>
                <div className="ion-padding" slot="content">
                  其他查詢
                </div>
              </IonAccordion>
            </IonAccordionGroup>
            <IonItem className="menu" lines="none">
              <IonLabel>
                <IonIcon icon={settingsOutline}></IonIcon> 系統設定
              </IonLabel>
            </IonItem>
          </IonList>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
