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
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { searchOutline, send } from "ionicons/icons";
import styled from "styled-components";
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
          <div className="d-flex flex-row ion-margin mr-0">
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
          <IonCard
            className="ion-margin pb-0"
            style={{
              maxWidth: "75%",
              borderRadius: "10px",
              borderTopLeftRadius: "0px",
            }}
          >
            <IonCardHeader className="pt-1 pb-1">
              <IonCardSubtitle style={{ textTransform: "none" }}>
                User name
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="pb-1">
              This is the content of the user
              <p className="pt-1 pb-0" style={{ fontSize: "0.7rem" }}>
                內容只供參考, 不構成投資建議
              </p>
            </IonCardContent>
          </IonCard>
        </div>
        <div className="d-flex flex-row-reverse">
          <div className="d-flex flex-row ion-margin ml-0">
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
          <IonCard
            className="ion-margin pb-0"
            style={{
              maxWidth: "75%",
              borderRadius: "10px",
              borderTopRightRadius: "0px",
            }}
          >
            <IonCardHeader className="pt-1 pb-1">
              <IonCardSubtitle style={{ textTransform: "none" }}>
                User name
              </IonCardSubtitle>
            </IonCardHeader>

            <IonCardContent className="pb-1">
              This is the content of the user
              <p className="pt-1 pb-0" style={{ fontSize: "0.7rem" }}>
                內容只供參考, 不構成投資建議
              </p>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
      <IonFooter>
        <ReplyContainer>
          <IonInput
            // value={replyContent}
            placeholder="發表回應"
            maxlength={100}
            // onIonChange={handleInput}
          ></IonInput>
          <IonText>發送</IonText>
        </ReplyContainer>
      </IonFooter>
    </IonPage>
  );
};

export default Chatroom;

const ReplyContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: #222;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0rem 0.8rem;

  ion-input {
    width: 90%;
    background-color: #444;
    color: #fff;
    border-radius: 1rem;
    --padding-start: 1rem;
  }

  ion-text {
    width: 10%;
    color: #ddd;
    font-weight: 600;
  }
`;
