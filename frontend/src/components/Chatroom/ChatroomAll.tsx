import {
  IonCard,
  IonAvatar,
  IonIcon,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonCardSubtitle,
  useIonLoading,
  IonSpinner,
  IonText,
} from "@ionic/react";
import { idCard, people } from "ionicons/icons";
import { useEffect } from "react";
import { fetchChatroomsAll } from "../../redux/chatroomAdd/actions";
import { ChatroomAdd } from "../../redux/chatroomAdd/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LoadingScreen } from "../discuss/Allquestion";
import ChatroomAddCard from "./ChatroomAddCard";

const ChatroomAll: React.FC = () => {
  const [present, dismiss] = useIonLoading();

  const dispatch = useAppDispatch();
  const { chatInfo, loading, error } = useAppSelector(
    (state) => state.chatroomAdd
  );
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    dispatch(fetchChatroomsAll(userId as number));
  }, [dispatch]);

  return (
    <>
      {
        // if loading
        loading ? (
          <LoadingScreen>
            <IonSpinner name="crescent" /> 載入中...
          </LoadingScreen>
        ) : //if error
        error ? (
          <IonText>載入失敗</IonText>
        ) : chatInfo.length > 0 ? (
          // if can load
          <>
            {chatInfo.map((chatroom: ChatroomAdd) => (
              <>
                <ChatroomAddCard props={chatroom} />
              </>
            ))}
          </>
        ) : (
          // if no chatroom yet
          <div style={{ marginTop: 10 }}>沒有聊天室</div>
        )
      }
    </>
  );
};

export default ChatroomAll;
