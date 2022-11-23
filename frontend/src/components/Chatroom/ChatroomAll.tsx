import {
  IonCard,
  IonAvatar,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonCardSubtitle,
} from "@ionic/react";
import { idCard, people } from "ionicons/icons";
import ChatroomAddCard from "./ChatroomAddCard";

interface ChatroomRecommendList {
  list: ChatroomRecommendProps[];
}

export interface ChatroomRecommendProps {
  id: number;
  host: string;
  name: string;
  last_msg: string;
  last_time: string;
  avatar: string;
  head_count: number;
  introduction: string;
  last_user: string;
}

const ChatroomRecommend: React.FC<ChatroomRecommendList> = (props) => {
  console.log(props);
  return (
    <>
      {props.list.map((room: ChatroomRecommendProps) => {
        return <ChatroomAddCard props={room} />;
      })}
    </>
  );
};

export default ChatroomRecommend;
