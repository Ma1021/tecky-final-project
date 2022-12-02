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
import { useEffect, useState } from "react";
import Title from "../../components/All/Title";
import ChatroomRecommend from "../../components/Chatroom/ChatroomRecommend";
import ChatroomAll from "../../components/Chatroom/ChatroomAll";
import ChatroomEntered from "../../components/Chatroom/ChatroomEntered";
import ChatroomHosted from "../../components/Chatroom/ChatroomHosted";
import Menu from "../../components/All/Menu";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styled from "styled-components";
import {
  fetchChatroomsAll,
  fetchChatroomsRecommend,
} from "../../redux/chatroomAdd/actions";
import {
  fetchChatroomsHost,
  fetchChatroomsEntered,
} from "../../redux/chatroomList/actions";
import { SegmentTab, SegmentButton } from "../question/Discuss";

const ChatroomList: React.FC = () => {
  const [chatroomSegment, setChatroomSegment] = useState("hosted");
  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.auth.user);
  const userId = user?.id;
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

  // get all data first
  useEffect(() => {
    dispatch(fetchChatroomsAll(userId as number));
    dispatch(fetchChatroomsRecommend(userId as number));
    dispatch(fetchChatroomsHost(userId as number));
    dispatch(fetchChatroomsEntered(userId as number));
  }, [dispatch]);

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
        <SegmentTab value={chatroomSegment} onIonChange={onSegmentChange}>
          <SegmentButton value="hosted">
            <IonLabel>主持中</IonLabel>
          </SegmentButton>
          <SegmentButton value="entered">
            <IonLabel>參與中</IonLabel>
          </SegmentButton>
          <SegmentButton value="recommendation">
            <IonLabel>推薦</IonLabel>
          </SegmentButton>
          <SegmentButton value="all">
            <IonLabel>所有</IonLabel>
          </SegmentButton>
        </SegmentTab>
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
