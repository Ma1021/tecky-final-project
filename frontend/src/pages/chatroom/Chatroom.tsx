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
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { searchOutline, send } from "ionicons/icons";
import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import ChatReceiveBubble from "../../components/Chatroom/ChatReceiveBubble";
import ChatSendBubble from "../../components/Chatroom/ChatSendBubble";
import {
  LoadingScreen,
  QuestionContainer,
} from "../../components/discuss/Allquestion";
import { useSocket } from "../../helper/use-socket";
import img from "../../img/animal_stand_ookami.png";
import {
  fetchChatroomsRecord,
  loadChatroomsRecord,
  loadChatroomsRecordStart,
} from "../../redux/chatroomRecord/actions";
import { ChatroomRecord } from "../../redux/chatroomRecord/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const Chatroom: React.FC = () => {
  // get the new message
  const [message, setMessage] = useState("");
  const [newMessageId, setNewMessageId] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const [present] = useIonToast();

  const userId = useAppSelector((state) => {
    return state?.auth?.user?.id;
  });
  const { chatRecord, loading, error } = useAppSelector(
    (state) => state.chatroomRecord
  );

  // 拎 url 嘅 param
  let url = useRouteMatch<{ id: string }>();
  let roomId = url.params.id;

  // take previous chat record and display
  useEffect(() => {
    dispatch(fetchChatroomsRecord(userId!, +roomId));
  }, [dispatch]);

  // 開新socket
  useSocket(
    // why: prevent join room multiple times.
    useCallback(
      (socket: Socket) => {
        // join the room
        socket.emit("join-room", roomId);
        // event listener listening on the socket
        socket.on("new-message", (bubble) => {
          let newMessage: ChatroomRecord = bubble;
          console.log("newMessage", newMessage);
          if (!!newMessage) {
            if (newMessage.chatroomid !== +roomId) {
              return;
            }
          }

          // update the list of chats
          console.log("before dispatch", chatRecord);

          if (JSON.stringify(newMessage) === JSON.stringify(chatRecord)) {
            console.log("they equal");
            return;
          }
          dispatch(loadChatroomsRecord([...chatRecord, newMessage]));
          setNewMessageId(newMessage.recordid);
        });
        return () => {
          console.log("leave room:", roomId);
          socket.emit("leave-room", roomId);
        };
      },
      [roomId]
    )
  );

  useLayoutEffect(() => {
    if (!newMessageId) return;
    let ionCard = document.querySelector(`[data-message='${newMessageId}']`);

    console.log({ newMessageId, ionCard });
    if (ionCard) {
      ionCard.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [newMessageId]);

  // check if host is speaker
  // if user is host

  // take now typing record
  const handleMessage = (e: any) => {
    let msg = e.target.value;
    setMessage(msg);
  };

  const sendMessage = async (e: any) => {
    let res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/chatroom/${roomId}/message`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          message,
          userId,
          chatroomId: +roomId,
        }),
      }
    );
    if (!res.ok) {
      console.log(await res.json());
      present({
        message: "發送失敗",
        duration: 1000,
        position: "bottom",
      });
    }
    setMessage((latestMsg) => {
      if (latestMsg == message) {
        return "";
      }
      return latestMsg;
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-between align-items-center w100 ">
              <IonButtons>
                <IonBackButton defaultHref="/chatroomList"></IonBackButton>
              </IonButtons>
              <span>{chatRecord[0] ? chatRecord[0].chatroomname : null}</span>
              <IonIcon className="pr-2" icon={searchOutline}></IonIcon>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          // if loading
          loading ? (
            <LoadingScreen>
              <IonSpinner name="crescent" /> 載入中...
            </LoadingScreen>
          ) : //if error
          error ? (
            //if error = 未加入聊天室
            error.message.includes("未加入") ? (
              <QuestionContainer>
                <div style={{ marginTop: 10 }}>{error.message}</div>
              </QuestionContainer>
            ) : (
              // 其他 error
              <QuestionContainer>
                <div style={{ marginTop: 10 }}>載入失敗</div>
              </QuestionContainer>
            )
          ) : chatRecord.length > 0 ? (
            // if can load
            <>
              {chatRecord.map((record: ChatroomRecord) =>
                record.userid === (userId as number) ? (
                  <ChatSendBubble key={record.recordid} props={record} />
                ) : (
                  <ChatReceiveBubble key={record.recordid} props={record} />
                )
              )}
            </>
          ) : (
            // if no chatroom yet
            <QuestionContainer>
              <div style={{ marginTop: 10 }}>未有對話</div>
            </QuestionContainer>
          )
        }
      </IonContent>
      {error ? null : (
        <IonFooter>
          <ChatReplyContainer>
            <IonInput
              value={message}
              placeholder="發表回應"
              maxlength={255}
              onIonChange={handleMessage}
            ></IonInput>
            <IonButton onClick={sendMessage}>
              <IonIcon icon={send}></IonIcon>
            </IonButton>
          </ChatReplyContainer>
        </IonFooter>
      )}
    </IonPage>
  );
};

export default Chatroom;

const ChatReplyContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: #222;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0rem 0.8rem;

  ion-input {
    width: 90%;
    background-color: #444;
    color: #fff;
    border-radius: 1rem;
    --padding-start: 1rem;
  }

  ion-button {
    --border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    color: #ddd;
    font-weight: 600;
    --padding: 0;
    position: relative;
  }

  ion-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 1rem;
  }
`;

const SearchBtn = styled.div`
  ion-button {
    --border-radius: 50%;
    width: 2.2rem;
    height: 2.2rem;
    color: #ddd;
    font-weight: 600;
    --padding: 0;
    position: relative;
  }

  ion-icon {
    font-size: 2rem;
  }
`;
