import { IonButton, IonContent, IonPage, IonText, IonIcon } from "@ionic/react";
import logo from "../img/logo.jpeg";
import { logoApple } from "ionicons/icons";
import { useHistory } from "react-router";
// import { Preferences } from "@capacitor/preferences";
// import Notification from "../components/All/Notification";

const Home: React.FC = () => {
  const history = useHistory();
  // const auth = async () => {
  //   await Preferences.get({ key: "auth_stockoverflow" });
  // };
  const auth = localStorage.getItem("auth_stockoverflow");
  if (auth) {
    const authJson = JSON.parse(auth);
    if (authJson.isAuthenticated === true) {
      // history.replace("/discuss");
    }
  }

  return (
    <>
      <IonPage>
        {/* <IonHeader className="ion-no-border">
          <IonToolbar>
            <IonTitle></IonTitle>
          </IonToolbar>
        </IonHeader> */}

        <IonContent>
          <div className="d-flex flex-column align-items-center w100">
            <img
              src={logo}
              alt="古惑狼的標誌"
              style={{ width: "400px", height: "400px" }}
            />
            <h1 className="ion-margin">歡迎使用</h1>
            <p className="ion-margin">請先註冊/登入以繼續</p>
          </div>
          <div className="d-flex flex-column align-items-center w100">
            <div className="d-flex flex-row justify-content-center w100 pb-3">
              <IonButton onClick={() => history.push("/register")}>
                註冊
              </IonButton>
              <IonButton onClick={() => history.push("/login")}>登入</IonButton>
            </div>
            <IonText>或者透過Apple註冊</IonText>
            <IonButton
              shape="round"
              className="ion-padding"
              style={{
                "--background": "black",
                "--padding-start": "0.5rem",
                "--padding-end": "0.5rem",
              }}
            >
              <IonIcon icon={logoApple}></IonIcon>
            </IonButton>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;
