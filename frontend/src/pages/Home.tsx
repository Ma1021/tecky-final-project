import { IonButton, IonContent, IonPage } from "@ionic/react";
import { Redirect, useHistory } from "react-router";
import styled from "styled-components";
import background from "../img/coverphoto.png";
import { useAppSelector } from "../redux/store";
// import { useEffect } from "react";
// import { Preferences } from "@capacitor/preferences";
// import Notification from "../components/All/Notification";

const Home: React.FC = () => {
  const history = useHistory();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  console.log("isAuthenticated", isAuthenticated);
  // isAuthenticated = null
  // !isAuthenticated = true
  if (!!isAuthenticated) {
    return <Redirect to={{ pathname: "/discuss" }} />;
  }

  return (
    <>
      <IonPage>
        <IonContent>
          <Container>
            <img
              src={background}
              alt="古惑狼的標誌"
              style={{ width: "75%"}}
            />
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
                  <IonButton onClick={() => history.push("/login")}>
                    登入
                  </IonButton>
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
  background-image: linear-gradient(
    to right bottom,
    #ffa930,
    #ff9d3f,
    #ff924d,
    #ff885b,
    #ff7f67
  );
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    object-fit: contain;
  }

  .loginCard {
    width: 100%;
    padding:5% 15%;

    .buttonContainer {
      flex-direction: column;
      gap: 0.5rem;
      margin-top: 1rem;
      
      ion-button {
        --background: #333;
        --background-activated: #222;
      }

      ion-button:nth-child(2) {
        --background: #fff;
        color: #222;
        --background-activated: #ddd;
      }
    }
  }
`;
