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
  list: ChatroomDisplayProps[];
}

export interface ChatroomDisplayProps {
  id: number;
  host: string;
  name: string;
  type: "public" | "private";
  created_at: string;
  updated_at: string;
  member_count: number;
  introduction: string;
  icon: string;
}

const ChatroomRecommend: React.FC<ChatroomRecommendList> = (props) => {
  console.log(props);
  return (
    <>
      {props.list.map((room: ChatroomDisplayProps) => {
        return <ChatroomAddCard props={room} />;
      })}
    </>
  );
};

export default ChatroomRecommend;
