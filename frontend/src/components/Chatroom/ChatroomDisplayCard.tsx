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
import { useHistory } from "react-router";
import { ChatroomList } from "../../redux/chatroomList/state";
import defaultGroupIcon from "src/img/logo.jpeg";

interface ChatroomDisplayCardProps {
  props: ChatroomList;
}

const ChatroomDisplayCard: React.FC<ChatroomDisplayCardProps> = (props) => {
  const history = useHistory();

  const directChatroom = (e: any) => {
    history.push(`/chatroom/${e.currentTarget.dataset.id}`, "forward");
  };

  return (
    <>
      <IonCard
        data-id={props.props.chatroomid}
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
                src={
                  props.props.chatroomicon
                    ? props.props.chatroomicon
                    : defaultGroupIcon
                }
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
          <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: "1.2rem" }}>
                {props.props.chatroomname}
              </IonCardTitle>
            </IonCardHeader>
            <IonCardContent>
              <IonCardSubtitle>{props.props.username}</IonCardSubtitle>
              {props.props.record}
              <div
                className="pr-3 pt-1"
                style={{ textAlign: "start", fontSize: "0.6rem" }}
              >
                {props.props.record_created_at}
              </div>
            </IonCardContent>
          </div>
        </div>
      </IonCard>
    </>
  );
};

export default React.memo(ChatroomDisplayCard);
