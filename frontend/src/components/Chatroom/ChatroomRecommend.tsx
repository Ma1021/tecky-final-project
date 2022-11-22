import {
  IonCard,
  IonAvatar,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
} from "@ionic/react";
import { people } from "ionicons/icons";
import ChatroomAddCard from "./ChatroomAddCard";

interface ChatroomRecommendList {
  list: ChatroomRecommendProps[];
}

interface ChatroomRecommendProps {
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
  console.log("推薦", props);

  return (
    <>
      {props.list.map((room: ChatroomRecommendProps) => {
        return <ChatroomAddCard props={room} />;
      })}
    </>
  );
};

export default ChatroomRecommend;
