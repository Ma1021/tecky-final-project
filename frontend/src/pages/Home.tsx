import { IonButton, IonContent, IonPage, IonText, IonIcon } from "@ionic/react";
import logo from "../img/logo.jpeg";
import { logoApple } from "ionicons/icons";
import { Redirect, useHistory } from "react-router";
import styled from "styled-components";
import background from '../img/coverphoto.png'
// import { useEffect } from "react";
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
    if (authJson.isAuthenticated) {
      console.log("authJson", authJson);
      fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/user/${authJson.user.id}`
      ).then((res) => {
        console.log("res", res);
        res.json().then((json) => {
          console.log("json", json);
        });
      });

      return <Redirect to="/discuss" />;
    }
  }

  return (
    <>
      <IonPage>
        <IonContent>
          <Container>
           <img
              src={background}
              alt="古惑狼的標誌"
              style={{ width: "330px", height: "330px" }}
            />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#222" fill-opacity="1" d="M0,96L80,128C160,160,320,224,480,234.7C640,245,800,203,960,160C1120,117,1280,75,1360,53.3L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"></path></svg>
            <div className="loginCard">
              <div className="d-flex flex-column align-items-center w100">
                <h1 className="ion-margin">歡迎使用</h1>
                <p className="ion-margin">請先註冊/登入以繼續</p>
              </div>
              <div className="d-flex flex-column align-items-center w100">
                <div className="buttonContainer d-flex flex-row justify-content-center w100 pb-3">
                  <IonButton onClick={() => history.push("/register")}>
                    註冊
                  </IonButton>
                  <IonButton onClick={() => history.push("/login")}>登入</IonButton>
                </div>
              </div>
            </div>
            
          </Container>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Home;

const Container = styled.div`
  height: 100%;
  width: 100%;
  background-image: linear-gradient(to right bottom, #ffa930, #ff9d3f, #ff924d, #ff885b, #ff7f67);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  svg {
    display: block; 
    position: absolute;
    width: 100%;
    height: 100%;
    bottom: 0;
  }

  img {
    margin-top: 5.5rem;
    object-fit: contain;
  }

  .loginCard {
    width: 100%;
    height: 100%;
    background-color: #222;
    margin-top: 2.5rem;
    padding: 2rem;

    .buttonContainer {
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;

      ion-button {
        --background: #ffaf4d;
      }

      ion-button:nth-child(2) {
        --background: #fff;
        color:#222;
        --background-activated: #ddd;
      }
    }
  }
`
