import { IonSpinner, IonText } from "@ionic/react";
import { useEffect } from "react";
import { fetchChatroomsAll } from "../../redux/chatroomAdd/actions";
import { ChatroomAdd } from "../../redux/chatroomAdd/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { LoadingScreen, QuestionContainer } from "../discuss/Allquestion";
import ChatroomAddCard from "./ChatroomAddCard";

const ChatroomAll: React.FC = () => {
  const dispatch = useAppDispatch();
  const { chatInfo, loading, error } = useAppSelector(
    (state) => state.chatroomAdd
  );
  const userId = useAppSelector((state) => state?.auth?.user?.id);

  useEffect(() => {
    dispatch(fetchChatroomsAll(userId as number));
  }, [dispatch]);

  console.log("loading", loading);
  console.log("data", chatInfo);

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
          <QuestionContainer>
            <div style={{ marginTop: 10 }}>載入失敗</div>
          </QuestionContainer>
        ) : chatInfo.length > 0 ? (
          // if can load
          <>
            {chatInfo.map((chatroom: ChatroomAdd) => (
              <ChatroomAddCard key={chatroom.id} props={chatroom} />
            ))}
          </>
        ) : (
          // if no chatroom yet
          <div style={{ marginTop: 10 }}>未有聊天室</div>
        )
      }
    </>
  );
};

export default ChatroomAll;
