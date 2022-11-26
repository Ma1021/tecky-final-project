import { IonButton, useIonRouter } from "@ionic/react";
import { people } from "ionicons/icons";
import React from "react";
import ChatroomAddCard from "./ChatroomAddCard";
import ChatroomDisplayCard from "./ChatroomDisplayCard";

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

const ChatroomEntered: React.FC<ChatroomRecommendList> = (props) => {
  console.log("已進入", props);
  const router = useIonRouter();
  const createChat = () => {
    router.push("/chatroom/create", "forward", "push");
  };

  return (
    <>
      <IonButton expand="block" className="ion-margin" onClick={createChat}>
        開設聊天室
      </IonButton>
      {props.list.map((room: ChatroomRecommendProps) => {
        return <>{/* <ChatroomDisplayCard props={room} /> */}</>;
      })}
    </>
  );
};

export default React.memo(ChatroomEntered);
