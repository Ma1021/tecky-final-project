import {
  IonAvatar,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonIcon,
  useIonRouter,
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
  console.log("已進入", props);
  const router = useIonRouter();

  const directChatroom = (e: any) => {
    router.push(`/chatroom/${e.currentTarget.dataset.id}`, "forward", "push");
  };

  return (
    <>
      {props.list.map((room: ChatroomRecommendProps) => {
        return (
          <>
            <IonCard
              data-id={room.id}
              className="d-flex flex-row align-items-center"
              onClick={directChatroom}
            >
              <div className="d-flex flex-row">
                <div className="ion-padding d-flex flex-column align-items-center">
                  <IonAvatar
                    style={{
                      backgroundColor: "pink",
                    }}
                  >
                    <img
                      src={room.avatar}
                      alt="user icon"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </IonAvatar>
                  <div
                    className="d-flex flex-row align-items-center justify-content-end"
                    style={{
                      boxSizing: "border-box",
                      color: "var(--ion-color-primary)",
                      padding: "0.1rem 0.2rem",
                      marginTop: "0.5rem",
                      height: "1rem",
                      // backgroundColor: "red",
                    }}
                  >
                    <IonIcon
                      style={{ fontSize: "16px" }}
                      icon={people}
                      className="pr-1"
                    ></IonIcon>
                    <span
                      style={{
                        fontSize: "0.8rem",
                        width: "calc(48px - 1rem)",
                        textAlign: "center",
                      }}
                    >
                      {room.head_count}
                    </span>
                  </div>
                </div>
                <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
                  <IonCardHeader>
                    <IonCardTitle style={{ fontSize: "1.2rem" }}>
                      {room.name}
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent>
                    <IonCardSubtitle>{room.last_user}</IonCardSubtitle>
                    {room.last_msg}
                    <div
                      className="pr-3 pt-1"
                      style={{ textAlign: "start", fontSize: "0.6rem" }}
                    >
                      {room.last_time}
                    </div>
                  </IonCardContent>
                </div>
              </div>
            </IonCard>
          </>
        );
      })}
    </>
  );
};

export default ChatroomRecommend;
