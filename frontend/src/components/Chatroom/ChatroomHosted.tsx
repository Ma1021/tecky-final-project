import {
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  RefresherEventDetail,
} from "@ionic/react";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { fetchChatroomsHost } from "../../redux/chatroomList/actions";
import {
  ChatroomList,
  ChatroomListState,
} from "../../redux/chatroomList/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LoadingScreen, QuestionContainer } from "../discuss/Allquestion";
import ChatroomDisplayCard from "./ChatroomDisplayCard";

interface ChatroomEnteredProps {
  props: ChatroomListState;
}

const ChatroomHosted: React.FC = () => {
  const dispatch = useAppDispatch();

  const { chatroomInfo, loading, error } = useAppSelector(
    (state) => state.chatroomList
  );
  const userId = useAppSelector((state) => {
    return state.auth.user?.id;
  });
  // useEffect(() => {
  //   dispatch(fetchChatroomsHost(userId as number));
  // }, [dispatch]);

  const history = useHistory();

  const createChat = () => {
    history.push("/chatroom/create", "forward");
  };

  const handleRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    dispatch(fetchChatroomsHost(userId as number));
    if (!loading) {
      e.detail.complete();
    }
  };

  return (
    <>
      <IonButton expand="block" className="ion-margin" onClick={createChat}>
        開設聊天室
      </IonButton>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent pullingText="下拉更新"></IonRefresherContent>
      </IonRefresher>
      {
        // if loading
        loading ? (
          <LoadingScreen>
            <IonSpinner name="crescent" /> 載入中...
          </LoadingScreen>
        ) : //if error
        error ? (
          <QuestionContainer>
            <div style={{ marginTop: 10 }}>載入失敗</div>
          </QuestionContainer>
        ) : chatroomInfo.length > 0 ? (
          // if can load
          <>
            {chatroomInfo.map((chatroom: ChatroomList) => (
              <ChatroomDisplayCard key={chatroom.chatroomid} props={chatroom} />
            ))}
          </>
        ) : (
          // if no chatroom yet
          <QuestionContainer>
            <div className="ion-padding" style={{ textAlign: "center" }}>
              未有聊天室
            </div>
          </QuestionContainer>
        )
      }
    </>
  );
};

export default ChatroomHosted;
