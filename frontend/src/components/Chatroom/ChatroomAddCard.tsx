import {
  IonCard,
  IonAvatar,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  useIonToast,
} from "@ionic/react";
import { people } from "ionicons/icons";
import React from "react";
import { ChatroomAdd, ChatroomAddState } from "../../redux/chatroomAdd/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import defaultGroupIcon from "../../img/logo.jpeg";
import { fetchChatroomsEntered } from "../../redux/chatroomList/actions";
import QuestionCard, { QuestionContainer } from "../discuss/QuestionCard";

interface ChatroomAddCardProps {
  props: ChatroomAdd;
}

const ChatroomAddCard: React.FC<ChatroomAddCardProps> = (props) => {
  const [present] = useIonToast();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => {
    return state.auth.user?.id;
  });

  const joinChat = async (e: any) => {
    let res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/join`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, chatroomId: e.target.dataset.id }),
    });

    if (res.ok) {
      dispatch(fetchChatroomsEntered(userId as number));
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
      <QuestionContainer>
        <div className="d-flex flex-row justify-content-center">
          <div className="ion-padding d-flex flex-column align-items-center">
            <IonAvatar
              style={{
                backgroundColor: "pink",
              }}
            >
              <img
                src={props.props.icon ? props.props.icon : defaultGroupIcon}
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
                {(props.props.member_count as number) + 1}
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
      </QuestionContainer>
    </>
  );
};

export default React.memo(ChatroomAddCard);
