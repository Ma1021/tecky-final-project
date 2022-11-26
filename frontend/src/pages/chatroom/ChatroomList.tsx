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
import img from "../../img/animal_stand_ookami.png";
import { people } from "ionicons/icons";
import ChatroomRecommend from "../../components/Chatroom/ChatroomRecommend";
import ChatroomAll from "../../components/Chatroom/ChatroomAll";
import ChatroomEntered from "../../components/Chatroom/ChatroomEntered";
import Menu from "../../components/All/Menu";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import styled from "styled-components";
import ChatroomHosted from "../../components/Chatroom/ChatroomHosted";

const ChatroomList: React.FC = () => {
  const [chatroomSegment, setChatroomSegment] = useState("entered");
  const user = useAppSelector((state) => state.auth.user);

  interface SegmentChangeEventDetail {
    value?: string;
  }

  interface IonSegmentCustomEvent extends CustomEvent {
    target: HTMLIonSegmentElement;
    detail: SegmentChangeEventDetail;
  }
  const list = [
    {
      id: 1,
      host: "金牌豹姐",
      name: "豹姐炒股達人組",
      last_msg: "好彩無賭錢",
      last_time: "23:23",
      last_user: "最後的人",
      avatar: img,
      head_count: 5124,
      introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
      is_entered: true,
    },
    {
      id: 2,
      host: "金牌cat姐",
      name: "個名起得唔夠長就做唔到testing",
      last_msg: "好彩無賭錢",
      last_time: "10:44",
      avatar: img,
      head_count: 1170,
      introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
      last_user: "最後的人",
      is_entered: true,
    },
    {
      id: 3,
      host: "金牌dog姐",
      name: "dog姐炒股達人組",
      last_msg: "好彩有賭錢",
      last_time: "23:23",
      avatar: img,
      head_count: 4,
      introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
      last_user: "最後的人",
      is_entered: false,
    },
    {
      id: 4,
      host: "金牌豹姐",
      name: "豹姐炒股達人組",
      last_msg: "好彩無賭錢",
      last_time: "23:23",
      avatar: img,
      head_count: 154,
      introduction: "助大家發堀投資機會",
      last_user: "最後的人",
      is_entered: false,
    },
    {
      id: 5,
      host: "金牌豹姐",
      name: "豹姐炒股達人組",
      last_msg: "好彩無賭錢",
      last_time: "23:23",
      avatar: img,
      head_count: 8124,
      introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
      last_user: "最後的人",
      is_entered: false,
    },
  ];

  // const dispatch = useAppDispatch();
  // const selector = useAppSelector(() => {
  //   list;
  // });

  const onSegmentChange = (event: IonSegmentCustomEvent) => {
    let value = event.detail.value;
    setChatroomSegment(value || "userIntro");
  };
  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader translucent={true} collapse="fade">
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
            {/* {chatroomSegment === "entered" ? (
              <ChatroomEntered list={list} />
            ) : chatroomSegment === "recommendation" ? (
              <ChatroomRecommend list={list} />
            ) : chatroomSegment === "hosted" ? (
              <ChatroomHosted />
            ) : null
            // <ChatroomAll list={hosted as any} />
            } */}
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
