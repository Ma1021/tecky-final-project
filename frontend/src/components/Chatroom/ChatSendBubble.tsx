import { IonAvatar, IonCard } from "@ionic/react";
import React, { createRef } from "react";
import { ChatroomRecord } from "../../redux/chatroomRecord/state";
import { BubbleContent, BubbleSpeaker, DateIonText } from "./ChatReceiveBubble";

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
        <div className="d-flex flex-column">
          <BubbleSpeaker>{props.props.username}</BubbleSpeaker>
          <IonCard
            className="ion-margin pb-0 mb-0 pt-0 mt-0"
            style={{
              maxWidth: "75vw",
              borderRadius: "10px",
              borderTopRightRadius: "0px",
            }}
          >
            <BubbleContent>
              <p>{props.props.record}</p>
              <p
                className="pt-1 pb-0"
                style={{ fontSize: "0.6rem", color: "#999999" }}
              >
                內容只供參考, 不構成投資建議
              </p>
            </BubbleContent>
          </IonCard>
          <DateIonText>
            {new Date(props.props.created_at).toLocaleString("zh-HK", {
              hour12: true,
              // dateStyle: "medium",
              // timeStyle: "short",
              minute: "2-digit",
              hour: "2-digit",
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </DateIonText>
        </div>
      </div>
    </>
  );
};
export default React.memo(ChatSendBubble);
