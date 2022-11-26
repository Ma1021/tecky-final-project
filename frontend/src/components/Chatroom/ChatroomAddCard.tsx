import {
  IonCard,
  IonAvatar,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  useIonRouter,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { people } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";
import { ChatroomAdd, ChatroomAddState } from "../../redux/chatroomAdd/state";
import { useAppSelector } from "../../redux/store";
// import { useAppDispatch } from "../../redux/store";

interface ChatroomAddCardProps {
  props: ChatroomAdd;
}

const ChatroomAddCard: React.FC<ChatroomAddCardProps> = (props) => {
  const [present] = useIonToast();
  const userId = useAppSelector((state) => {
    state.auth.user?.id;
  });

  const joinChat = async (e: any) => {
    let res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/join`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, chatroomId: e.target.data.id }),
    });

    if (res.ok) {
      present({
        message: "成功加入聊天室！",
        duration: 1500,
        position: "bottom",
      });
    } else {
      present({
        message: "再試一次！",
        duration: 1500,
        position: "bottom",
      });
    }
  };

  return (
    <>
      <IonCard>
        <div className="d-flex flex-row">
          <div className="ion-padding d-flex flex-column align-items-center">
            <IonAvatar
              style={{
                backgroundColor: "pink",
              }}
            >
              <img
                src={props.props.icon}
                alt="user icon"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </IonAvatar>
            <div
              className="d-flex flex-row align-items-center justify-content-end"
              style={{
                boxSizing: "border-box",
                color: "var(--ion-color-primary)",
                padding: "0.1rem 0.2rem",
                marginTop: "0.5rem",
                height: "1rem",
                // backgroundColor: "red",
              }}
            >
              <IonIcon
                style={{ fontSize: "16px" }}
                icon={people}
                className="pr-1"
              ></IonIcon>
              <span
                style={{
                  fontSize: "0.8rem",
                  width: "calc(48px - 1rem)",
                  textAlign: "center",
                }}
              >
                {props.props.member_count}
              </span>
            </div>
          </div>
          <div style={{ flexGrow: 1 }}>
            <IonCardHeader className="d-flex flex-row align-items-center">
              <IonCardTitle style={{ fontSize: "1.2rem" }}>
                {props.props.name}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <div className="d-flex flex-row">{props.props.introduction}</div>
              <div style={{ textAlign: "end" }}>
                <IonButton data-id={props.props.id} onClick={joinChat}>
                  加入
                </IonButton>
              </div>
            </IonCardContent>
          </div>
        </div>
      </IonCard>
    </>
  );
};

export default React.memo(ChatroomAddCard);
