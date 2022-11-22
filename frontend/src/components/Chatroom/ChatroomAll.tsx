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
import { people } from "ionicons/icons";

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
  console.log(props);
  return (
    <>
      {props.list.map((room: ChatroomRecommendProps) => {
        return (
          <IonCard data-id={room.id} className="d-flex align-items-center  ">
            <div className="d-flex flex-column ion-padding">
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
                className="head-count d-flex justify-content-between align-content-center"
                style={{
                  backgroundColor: "white",
                  borderRadius: "5px",
                  padding: "0.1rem 0.2rem",
                  marginTop: "0.8rem",
                }}
              >
                <IonIcon icon={people} className="pr-1"></IonIcon>
                <span style={{ flexGrow: 1, textAlign: "center" }}>
                  {room.head_count}
                </span>
              </div>
            </div>

            <div className="d-flex flex-column" style={{ flexGrow: 1 }}>
              <IonCardHeader>
                <IonCardTitle>{room.name}</IonCardTitle>
              </IonCardHeader>
              <IonCardContent>
                {room.introduction}
                <div style={{ textAlign: "end" }}>
                  <IonButton fill="outline" size="small">
                    加入
                  </IonButton>
                </div>
              </IonCardContent>
            </div>
          </IonCard>
        );
      })}
    </>
  );
};

export default ChatroomRecommend;
