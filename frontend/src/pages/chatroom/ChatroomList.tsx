import {
  IonContent,
  IonHeader,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import Title from "../../components/All/Title";
import ChatroomRecommend from "../../components/Chatroom/ChatroomRecommend";
import ChatroomAll from "../../components/Chatroom/ChatroomAll";
import ChatroomEntered from "../../components/Chatroom/ChatroomEntered";
import ChatroomHosted from "../../components/Chatroom/ChatroomHosted";
import Menu from "../../components/All/Menu";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";

const ChatroomList: React.FC = () => {
  const [chatroomSegment, setChatroomSegment] = useState("hosted");
  const user = useAppSelector((state) => state.auth.user);

  interface SegmentChangeEventDetail {
    value?: string;
  }

  interface IonSegmentCustomEvent extends CustomEvent {
    target: HTMLIonSegmentElement;
    detail: SegmentChangeEventDetail;
  }

  const onSegmentChange = (event: IonSegmentCustomEvent) => {
    let value = event.detail.value;
    setChatroomSegment(value || "userIntro");
  };
  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader
          translucent={true}
          collapse="fade"
          className="d-flex align-items-center"
        >
          <IonToolbar>
            <Title title="聊天室" />
          </IonToolbar>
        </IonHeader>
        <SegmentOrganizer>
          <IonItemDivider sticky={true}>
            <IonSegment value={chatroomSegment} onIonChange={onSegmentChange}>
              <IonSegmentButton value="hosted">
                <IonLabel>主持中</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="entered">
                <IonLabel>參與中</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="recommendation">
                <IonLabel>推薦</IonLabel>
              </IonSegmentButton>
              <IonSegmentButton value="all">
                <IonLabel>所有</IonLabel>
              </IonSegmentButton>
            </IonSegment>
          </IonItemDivider>
        </SegmentOrganizer>
        <IonContent>
          <IonList>
            {chatroomSegment === "entered" ? (
              <ChatroomEntered />
            ) : chatroomSegment === "recommendation" ? (
              <ChatroomRecommend />
            ) : chatroomSegment === "hosted" ? (
              <ChatroomHosted />
            ) : (
              <ChatroomAll />
            )}
            {/* {chatroomSegment === "entered" ? null : chatroomSegment === // <ChatroomEntered list={list} />
              "recommendation" ? (
              <ChatroomRecommend />
            ) : chatroomSegment === "hosted" ? null : ( // <ChatroomHosted />
              <ChatroomAll />
            )} */}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ChatroomList;

export const SegmentOrganizer = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  margin-top: 0rem;

  ion-item-divider {
    --inner-padding-start: 1rem;
    --inner-padding-end: 1rem;
    --padding-start: 0;
  }

  ion-segment {
    color: #dedede;
  }

  ion-segment-button {
    --indicator-color: linear-gradient(
      to right bottom,
      #ffa930,
      #ff9d3f,
      #ff924d,
      #ff885b,
      #ff7f67
    );
    --color-checked: #fff;
    font-weight: 800;
  }
`;
