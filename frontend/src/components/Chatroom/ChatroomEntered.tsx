import {
  IonButton,
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  RefresherEventDetail,
  useIonRouter,
} from "@ionic/react";
import { people } from "ionicons/icons";
import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { fetchChatroomsEntered } from "../../redux/chatroomList/actions";
import {
  ChatroomList,
  ChatroomListState,
} from "../../redux/chatroomList/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LoadingScreen, QuestionContainer } from "../discuss/Allquestion";
import ChatroomAddCard from "./ChatroomAddCard";
import ChatroomDisplayCard from "./ChatroomDisplayCard";

const ChatroomEntered: React.FC = () => {
  const dispatch = useAppDispatch();

  const { chatroomInfo, loading, error } = useAppSelector(
    (state) => state.chatroomList
  );

  const userId = useAppSelector((state) => {
    return state.auth.user?.id;
  });

  // useEffect(() => {
  //   dispatch(fetchChatroomsEntered(userId as number));
  // }, [dispatch]);

  const handleRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    dispatch(fetchChatroomsEntered(userId as number));
    if (!loading) {
      e.detail.complete();
    }
  };

  return (
    <>
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

export default React.memo(ChatroomEntered);
