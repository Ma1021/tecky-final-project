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

import { SegmentTab, SegmentButton } from "../question/Discuss";
import {
  fetchChatroomsAll,
  fetchChatroomsRecommend,
} from "../../redux/chatroomAdd/actions";
import {
  fetchChatroomsHost,
  fetchChatroomsEntered,
} from "../../redux/chatroomList/actions";

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
    switch (chatroomSegment) {
      case "hosted":
        dispatch(fetchChatroomsHost(userId as number));
        return;
      case "entered":
        dispatch(fetchChatroomsEntered(userId as number));
        return;
      case "recommendation":
        dispatch(fetchChatroomsRecommend(userId as number));
        return;
      case "all":
        dispatch(fetchChatroomsAll(userId as number));
        return;
      default:
        dispatch(fetchChatroomsHost(userId as number));
        return;
    }
  }, [dispatch, chatroomSegment]);

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
        <IonContent>
          <div className="d-flex justify-content-center">
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
          </div>
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
