import {
  IonAvatar,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonItemDivider,
  IonLabel,
  IonList,
  IonPage,
  IonSegment,
  IonSegmentButton,
  IonToolbar,
} from "@ionic/react";
import { useEffect, useState } from "react";
import Title from "../../components/All/Title";
import img from "src/img/animal_stand_ookami.png";
import { people } from "ionicons/icons";
import ChatroomRecommend from "../../components/Chatroom/ChatroomRecommend";
import ChatroomAll from "../../components/Chatroom/ChatroomAll";
import ChatroomEntered from "../../components/Chatroom/ChatroomEntered";
import Menu from "../../components/All/Menu";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styled from "styled-components";
import ChatroomHosted from "../../components/Chatroom/ChatroomHosted";

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
          style={{ height: 50 }}
          className="d-flex align-items-center"
        >
          <IonToolbar>
            <Title title="聊天室" />
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <SegmentOrganizer>
            <IonItemDivider sticky={true}>
              <IonSegment value={chatroomSegment} onIonChange={onSegmentChange}>
                <IonSegmentButton value="hosted">
                  <IonLabel>我的</IonLabel>
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
