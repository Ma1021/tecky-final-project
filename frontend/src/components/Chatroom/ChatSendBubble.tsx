import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonToolbar,
} from "@ionic/react";
import React from "react";
import { ChatroomRecord } from "../../redux/chatroomRecord/state";

export interface ChatBubbleProps {
  props: ChatroomRecord;
}

const ChatSendBubble: React.FC<ChatBubbleProps> = (props) => {
  return (
    <>
      <div
        className="d-flex flex-row-reverse"
        data-message={props.props.recordid}
      >
        <div className="d-flex flex-row ion-margin ml-0">
          <IonAvatar
            style={{
              backgroundColor: "pink",
            }}
          >
            <img
              src={props.props.useravatar}
              alt="user icon"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </IonAvatar>
        </div>
        <div>
          <IonCard
            className="ion-margin pb-0"
            style={{
              maxWidth: "75vw",
              borderRadius: "10px",
              borderTopRightRadius: "0px",
            }}
          >
            <IonCardHeader className="pt-1 pb-1">
              <IonCardSubtitle style={{ textTransform: "none" }}>
                {props.props.username}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="pb-1">
              {props.props.record}

              <p className="pt-1 pb-0" style={{ fontSize: "0.7rem" }}>
                內容只供參考, 不構成投資建議
              </p>
            </IonCardContent>
          </IonCard>
          {new Date(props.props.created_at).toLocaleString([], {
            hour12: false,
            dateStyle: "medium",
            timeStyle: "short",
          })}
        </div>
      </div>
    </>
  );
};
export default React.memo(ChatSendBubble);
