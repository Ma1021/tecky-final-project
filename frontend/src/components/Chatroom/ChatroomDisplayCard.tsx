import {
  IonCard,
  IonAvatar,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
} from "@ionic/react";
import { people } from "ionicons/icons";
import React from "react";
import { useHistory } from "react-router";
import { ChatroomList } from "../../redux/chatroomList/state";
import defaultGroupIcon from "../../img/logo.jpeg";
import { QuestionContainer } from "../discuss/QuestionCard";

interface ChatroomDisplayCardProps {
  props: ChatroomList;
}

const ChatroomDisplayCard: React.FC<ChatroomDisplayCardProps> = (props) => {
  const history = useHistory();

  const directChatroom = (e: any) => {
    let id = +e.currentTarget.dataset.id;
    history.push(`/chatroom/${id}`);
  };

  return (
    <>
      <QuestionContainer
        data-id={props.props.chatroomid}
        className="d-flex flex-row align-items-center "
        onClick={directChatroom}
      >
        <div className="d-flex flex-row justify-content-center">
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
              {/* <IonIcon
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
              </span> */}
            </div>
          </div>
          <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
            <IonCardHeader>
              <IonCardTitle style={{ fontSize: "1.2rem" }}>
                {props.props.chatroomname}
              </IonCardTitle>
            </IonCardHeader>
            {props.props.record == null &&
            props.props.record_created_at == null &&
            props.props.recordid == null &&
            props.props.userid == null &&
            props.props.username == null &&
            props.props.record_created_at == null ? (
              // if no record yet
              <IonCardContent>
                <IonCardSubtitle>{props.props.username}</IonCardSubtitle>
                未有聊天記錄
              </IonCardContent>
            ) : (
              <>
                <IonCardContent>
                  <IonCardSubtitle>{props.props.username}</IonCardSubtitle>
                  {props.props.record}
                  <div
                    className="pr-3 pt-1"
                    style={{ textAlign: "start", fontSize: "0.6rem" }}
                  >
                    {new Date(
                      props.props.record_created_at as string
                    ).toLocaleString([], {
                      hour12: false,
                      dateStyle: "medium",
                      timeStyle: "short",
                    })}
                  </div>
                </IonCardContent>
              </>
            )}
          </div>
        </div>
      </QuestionContainer>
    </>
  );
};

export default React.memo(ChatroomDisplayCard);
