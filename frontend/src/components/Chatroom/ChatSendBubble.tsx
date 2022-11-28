import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
  IonCardTitle,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonInput,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import finalPropsSelectorFactory from "react-redux/es/connect/selectorFactory";
import img from "../../img/animal_stand_ookami.png";
import { ChatroomRecord } from "../../redux/chatroomRecord/state";

export interface ChatBubbleProps {
  props: ChatroomRecord;
}

const ChatSendBubble: React.FC<ChatBubbleProps> = (props) => {
  return (
    <>
      <div className="d-flex flex-row-reverse">
        <div className="d-flex flex-row ion-margin ml-0">
          <IonAvatar
            style={{
              backgroundColor: "pink",
            }}
          >
            <img
              src={props.props.useravatar}
              alt="user icon"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </IonAvatar>
        </div>
        <div>
          <IonCard
            className="ion-margin pb-0"
            style={{
              maxWidth: "75vw",
              borderRadius: "10px",
              borderTopRightRadius: "0px",
            }}
          >
            <IonCardHeader className="pt-1 pb-1">
              <IonCardSubtitle style={{ textTransform: "none" }}>
                {props.props.username}
              </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent className="pb-1">
              {props.props.record}

              <p className="pt-1 pb-0" style={{ fontSize: "0.7rem" }}>
                內容只供參考, 不構成投資建議
              </p>
            </IonCardContent>
          </IonCard>
          {new Date(props.props.created_at).toLocaleString()}
        </div>
      </div>
    </>
  );
};
export default ChatSendBubble;
