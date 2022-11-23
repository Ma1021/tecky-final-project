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
} from "@ionic/react";
import { people } from "ionicons/icons";
import React from "react";
import { ChatroomRecommendProps } from "./ChatroomAll";
// import { useAppDispatch } from "../../redux/store";
interface ChatroomRecommendObjProps {
  props: ChatroomRecommendProps;
}

const ChatroomDisplayCard: React.FC<ChatroomRecommendObjProps> = (props) => {
  const router = useIonRouter();

  const directChatroom = (e: any) => {
    router.push(`/chatroom/${e.currentTarget.dataset.id}`, "forward", "push");
  };
  return (
    <>
      <IonCard
        data-id={props.props.id}
        className="d-flex flex-row align-items-center"
        onClick={directChatroom}
      >
        <div className="d-flex flex-row">
          <div className="ion-padding d-flex flex-column align-items-center">
            <IonAvatar
              style={{
                backgroundColor: "pink",
              }}
            >
              <img
                src={props.props.avatar}
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
                {props.props.head_count}
              </span>
            </div>
          </div>
          <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: "1.2rem" }}>
                {props.props.name}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>{props.props.last_user}</IonCardSubtitle>
              {props.props.last_msg}
              <div
                className="pr-3 pt-1"
                style={{ textAlign: "start", fontSize: "0.6rem" }}
              >
                {props.props.last_time}
              </div>
            </IonCardContent>
          </div>
        </div>
      </IonCard>
    </>
  );
};

export default React.memo(ChatroomDisplayCard);
