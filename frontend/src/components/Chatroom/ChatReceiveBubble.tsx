import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonText,
} from "@ionic/react";
import React, { createRef } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { ChatBubbleProps } from "./ChatSendBubble";

const ChatReceiveBubble: React.FC<ChatBubbleProps> = (props) => {
  const history = useHistory();
  const contentRef = createRef<HTMLIonContentElement>();

  // go the the user profile
  const getProfile = (e: any) => {
    let userInfoId = e.currentTarget.dataset.userid;
    // console.log("userInfoId", e.currentTarget);
    history.push(`/user/${+userInfoId}/info`);
  };

  return (
    <>
      <div className="d-flex" data-message={props.props.recordid}>
        <div className="d-flex flex-row ion-margin mr-0">
          <IonAvatar
            style={{
              backgroundColor: "pink",
            }}
            onClick={getProfile}
            data-userId={props.props.userid}
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
              borderTopLeftRadius: "0px",
            }}
          >
            <BubbleContent>
              <p>{props.props.record}</p>
              <span
                className="pt-1 pb-0"
                style={{ fontSize: "0.6rem", color: "#999999" }}
              >
                內容只供參考, 不構成投資建議
              </span>
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
export default React.memo(ChatReceiveBubble);

export const DateIonText = styled(IonText)`
  text-align: end;
  padding-right: calc(1rem);
  font-size: 0.7rem;
  color: #808080;
  );
`;

export const BubbleSpeaker = styled(IonText)`
  color: #a6a6a6;
  font-size: 0.8rem;
  font-weight: bold;
  padding-top: 1rem;
  padding-left: 1rem;
  padding-bottom: 0rem;
  margin-bottom: 0.2rem;
  color: #b3b3b3;
`;

export const BubbleContent = styled(IonCardContent)`
  padding-bottom: calc(1rem * 0.25);
  padding-top: calc(1rem * 0.5);
  padding-left: calc(1rem * 0.5);
  padding-right: calc(1rem * 0.5);
  background-color: #404040;
  color: white;
`;
