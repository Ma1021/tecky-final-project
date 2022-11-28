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
import { useCallback, useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import { useSocket } from "../../helper/use-socket";
import img from "../../img/animal_stand_ookami.png";

const Chatroom: React.FC = () => {
  const [reply, setReply] = useState("");

  // 拎 url 嘅 param
  let url = useRouteMatch<{ id: string }>();
  let roomId = url.params.id;

  // 開新socket
  const socket = useSocket(
    // why: prevent join room multiple times.
    useCallback(
      (socket: Socket) => {
        console.log("join room:", roomId);
        socket.emit("join-room", roomId);
        return () => {
          console.log("leave room:", roomId);
          socket.emit("leave-room", roomId);
        };
      },
      [roomId]
    )
  );
  // useEffect(() => {
  //   // 會係 socket connect之前 emit 咗
  //   socket.emit("join-room", roomId);
  // }, [socket, roomId]);

  console.log("rendering, socket", socket);

  const handleReply = (e: any) => {
    setReply(e.target.value);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-between align-items-center w100 ">
              <IonButtons>
                <IonBackButton defaultHref="/chatroomList"></IonBackButton>
              </IonButtons>
              Group name here
              <IonIcon className="pr-2" icon={searchOutline}></IonIcon>
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
        <ChatReplyContainer>
          <IonInput
            value={reply}
            placeholder="發表回應"
            maxlength={255}
            onIonChange={handleReply}
          ></IonInput>
          <IonButton>
            <IonIcon icon={send}></IonIcon>
          </IonButton>
        </ChatReplyContainer>
      </IonFooter>
    </IonPage>
  );
};

export default Chatroom;

const ChatReplyContainer = styled.div`
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

  ion-button {
    --border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    color: #ddd;
    font-weight: 600;
    --padding: 0;
    position: relative;
  }

  ion-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
  }
`;

const SearchBtn = styled.div`
  ion-button {
    --border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    color: #ddd;
    font-weight: 600;
    --padding: 0;
    position: relative;
  }

  ion-icon {
    font-size: 2rem;
  }
`;
