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
import styled from "styled-components";
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
  }, []);

  useEffect(() => {
    setFilteredChat(chatInfo);
    console.log(chatInfo);
  }, [chatInfo]);

  const result = useMemo(() => {
    if (wordSearch.length > 0) {
      const chatFilter = chatInfo.filter((chat) => {
        return (
          chat.name.replace(/\s/g, "").toLowerCase().includes(wordSearch) ||
          chat.introduction
            .replace(/\s/g, "")
            .toLowerCase()
            .includes(wordSearch)
        );
      });

      setFilteredChat((chat) => {
        // console.log("chatFiltered", chatFilter);
        // console.log("chat", chat);
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
      <SearchResponsive onIonChange={searchChatroom}></SearchResponsive>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent pullingText="????????????"></IonRefresherContent>
      </IonRefresher>
      {
        // if loading
        loading ? (
          <LoadingScreen>
            <IonSpinner name="crescent" /> ?????????...
          </LoadingScreen>
        ) : //if error
        error ? (
          <QuestionContainer>
            <div style={{ marginTop: 10 }}>????????????</div>
          </QuestionContainer>
        ) : chatInfo.length > 0 ? (
          // if have filter
          // if can load and without filter
          <>
            {(filteredChat.length < 0 ? chatInfo : filteredChat).map(
              (chatroom: ChatroomAdd) => (
                <ChatroomAddCard key={chatroom.id} props={chatroom} />
              )
            )}
          </>
        ) : (
          // if no chatroom yet
          <QuestionContainer>
            <div className="ion-padding" style={{ textAlign: "center" }}>
              ???????????????
            </div>
          </QuestionContainer>
        )
      }
    </>
  );
};

export default React.memo(ChatroomAll);

const SearchResponsive = styled(IonSearchbar)`
  width: 100%;
  @media (min-width: 768px) {
    width: 85%;
  }
`;
