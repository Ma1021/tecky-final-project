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
import { useState } from "react";
import Title from "../../components/All/Title";
import img from "../../img/animal_stand_ookami.png";
import { people } from "ionicons/icons";
import ChatroomRecommend from "../../components/Chatroom/ChatroomRecommend";
import ChatroomAll from "../../components/Chatroom/ChatroomAll";
import ChatroomUser from "../../components/Chatroom/ChatroomUser";
import Menu from "../../components/All/Menu";

const ChatroomList: React.FC = () => {
  const [chatroomSegment, setChatroomSegment] = useState("entered");

  interface SegmentChangeEventDetail {
    value?: string;
  }

  interface IonSegmentCustomEvent extends CustomEvent {
    target: HTMLIonSegmentElement;
    detail: SegmentChangeEventDetail;
  }
  const onSegmentChange = (event: IonSegmentCustomEvent) => {
    setChatroomSegment(event.detail.value || "userIntro");
  };

  // data
  const chatroomEntered = [
    {
      id: 1,
      host: "金牌豹姐",
      name: "豹姐炒股達人組",
      last_msg: "好彩無賭錢",
      last_time: "23:23",
      avatar: img,
      head_count: 5124,
      introduction: "助大家發堀短﹑中﹑長線投資機會﹐一步步踏上財務自由之路",
      last_user: "最後的人",
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
    },
    {
      id: 4,
      host: "金牌豹姐",
      name: "豹姐炒股達人組",
      last_msg: "好彩無賭錢",
      last_time: "23:23",
      avatar: img,
      head_count: 8124,
      introduction: "助大家發堀投資機會",
      last_user: "最後的人",
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
    },
  ];

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader translucent={true} collapse="fade">
          <IonToolbar>
            <Title title="聊天室" />
          </IonToolbar>
        </IonHeader>
        <IonItemDivider sticky={true}>
          <IonSegment value={chatroomSegment} onIonChange={onSegmentChange}>
            <IonSegmentButton value="entered">
              <IonLabel>我的聊天室</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="recommendation">
              <IonLabel>推薦</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="all">
              <IonLabel>所有聊天室</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </IonItemDivider>
        <IonContent>
          <IonList>
            {chatroomSegment === "entered" ? (
              <ChatroomUser list={chatroomEntered} />
            ) : chatroomSegment === "recommendation" ? (
              <ChatroomRecommend list={chatroomEntered} />
            ) : (
              <ChatroomAll list={chatroomEntered} />
            )}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ChatroomList;
