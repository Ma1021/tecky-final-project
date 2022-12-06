import {
  IonRefresher,
  IonRefresherContent,
  IonSpinner,
  IonText,
  IonSearchbar,
  RefresherEventDetail,
} from "@ionic/react";
import React, { useMemo } from "react";
import { useEffect, useState } from "react";
import { fetchChatroomsAll } from "../../redux/chatroomAdd/actions";
import { ChatroomAdd } from "../../redux/chatroomAdd/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LoadingScreen, QuestionContainer } from "../discuss/Allquestion";
import ChatroomAddCard from "./ChatroomAddCard";

const ChatroomAll: React.FC = () => {
  const dispatch = useAppDispatch();
  const [wordSearch, setWordSearch] = useState("");
  const { chatInfo, loading, error } = useAppSelector(
    (state) => state.chatroomAdd
  );
  const [filteredChat, setFilteredChat] = useState<ChatroomAdd[]>([]);
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    dispatch(fetchChatroomsAll(userId as number));
  }, [dispatch]);

  const result = useMemo(() => {
    if (wordSearch.length > 0) {
      console.log("wordSearch, ", wordSearch);
      const chatFilter = chatInfo.filter((chat) => {
        console.log("filtering", chat);
        return (
          chat.name.replace(/\s/g, "").toLowerCase().includes(wordSearch) ||
          chat.introduction
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(wordSearch)
        );
      });

      setFilteredChat((chat) => {
        console.log("chatFiltered", chatFilter);
        console.log("chat", chat);
        return chatFilter;
      });
    } else {
      setFilteredChat(chatInfo);
    }
  }, [wordSearch]);

  const handleRefresh = (e: CustomEvent<RefresherEventDetail>) => {
    dispatch(fetchChatroomsAll(userId as number));
    if (!loading) {
      e.detail.complete();
    }
  };

  const searchChatroom = (e: any) => {
    let word = e.target.value.replace(/\s/g, "").toLowerCase();
    setWordSearch(word);
  };

  return (
    <>
      <IonSearchbar onIonChange={searchChatroom}></IonSearchbar>
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
        ) : chatInfo.length > 0 ? (
          // if have filter
          // if can load and without filter
          <>
            {filteredChat.map((chatroom: ChatroomAdd) => (
              <ChatroomAddCard key={chatroom.id} props={chatroom} />
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

export default React.memo(ChatroomAll);
