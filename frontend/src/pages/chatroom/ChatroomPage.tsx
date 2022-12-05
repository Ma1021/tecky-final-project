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
  IonItem,
  IonModal,
  IonPage,
  IonSpinner,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonToast,
} from "@ionic/react";
import { ellipsisVertical, send } from "ionicons/icons";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useState,
  createRef,
  useRef,
} from "react";
import { useHistory, useRouteMatch } from "react-router";
import { Socket } from "socket.io-client";
import styled from "styled-components";
import ChatReceiveBubble from "../../components/Chatroom/ChatReceiveBubble";
import ChatSendBubble from "../../components/Chatroom/ChatSendBubble";
import {
  LoadingScreen,
  QuestionContainer,
} from "../../components/discuss/Allquestion";
import { useSocket } from "../../helper/use-socket";
import {
  fetchChatroomsRecord,
  loadChatroomsRecord,
  loadChatroomsRecordStart,
} from "../../redux/chatroomRecord/actions";
import { alertCircleOutline, exitOutline, readerOutline } from "ionicons/icons";
import { ChatroomRecord } from "../../redux/chatroomRecord/state";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { ModalItem } from "../Inbox";
import { useCounter } from "../../hooks/use-counter";

const ChatroomPage: React.FC = () => {
  useCounter();

  // get the new message
  const [message, setMessage] = useState("");
  const [chatroomName, setChatroomName] = useState("");
  const [messageList, setMessageList] = useState<ChatroomRecord[]>([]);
  // const dispatch = useAppDispatch();
  const [presentToast] = useIonToast();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  const contentRef = createRef<HTMLIonContentElement>();

  // for scroll
  const bottomRef = useRef<HTMLDivElement>(null);
  function scrollToBottom() {
    setTimeout(() => {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }, 500);
  }

  const userId = useAppSelector((state) => {
    return state?.auth?.user?.id;
  });
  const userName = useAppSelector((state) => {
    return state?.auth?.user?.username;
  });

  // 拎 url 嘅 param
  let url = useRouteMatch<{ id: string }>();
  let roomId = url.url.replace("/chatroom/", "");

  // take previous chat record and display
  useEffect(() => {
    // console.log("do use effect");
    if (!userId) {
      presentToast({
        message: "請登入",
        duration: 1000,
        position: "bottom",
      });
    }

    // take chatroom name
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/${+roomId}/name`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, chatroomId: roomId }),
    })
      .then((res) => {
        res.json().then((json) => {
          setChatroomName(json.name);
        });
      })
      .catch((error) => {
        console.log(`failed to load chatroom name, ${error}`);
        presentToast({
          message: String(error),
          duration: 15000,
          color: "danger",
          position: "bottom",
        });
      });

    // take chatroom record
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/${+roomId}`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId, chatroomId: roomId }),
    })
      .then((res) => {
        res.json().then((json) => {
          setMessageList(json);
          setLoading(false);
        });
      })
      .catch((error) => {
        console.log(`failed to load, ${error}`);
        presentToast({
          message: String(error),
          duration: 15000,
          color: "danger",
          position: "bottom",
        });
      });
  }, [setMessageList, setLoading, roomId, userId]);

  // 開新socket
  let count = 0;
  useSocket(
    // why: prevent join room multiple times.
    useCallback(
      (socket: Socket) => {
        // join the room
        socket.emit("join-room", roomId);
        // event listener listening on the socket
        const onNewMessage = (newMessage: ChatroomRecord) => {
          if (!!newMessage) {
            if (newMessage.chatroomid !== +roomId) {
              return;
            }
          }

          if (
            JSON.stringify(newMessage) ===
            JSON.stringify(messageList[messageList.length - 1])
          ) {
            return;
          }
          console.log("socket times", count++);
          pushChatroom();
          setMessageList((msg) => {
            console.log("newMessage", newMessage);
            console.log("message list", msg);
            return [...msg, newMessage];
          });
          scrollToBottom();
          return;
        };
        socket.on("new-message", onNewMessage);
        return () => {
          socket.off("new-message", onNewMessage);
          console.log("leave room:", roomId);
          socket.emit("leave-room", roomId);
        };
      },
      [roomId]
    )
  );

  const sendMessage = async () => {
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
      presentToast({
        message: "發送失敗",
        duration: 1000,
        position: "bottom",
      });
      return;
    }
    setMessage((latestMsg) => {
      if (latestMsg == message) {
        return "";
      }
      return latestMsg;
    });
  };

  const handleMessage = (e: any) => {
    let msg = e.target.value;
    setMessage(msg);
  };

  // report
  const report = () => {
    setIsOpen(false);
    presentAlert({
      header: "舉報",
      subHeader: "已接收舉報, 會在24小時內檢視此聊天室並處理",
      buttons: ["了解"],
    });
  };

  // find name list
  const findNameList = () => {
    setIsOpen(false);
    history.push(`/chatroom/${roomId}/namelist`);
  };

  // quit chatroom
  const quit = () => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom/${roomId}/quit`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId: userId, chatroomId: roomId }),
    }).then((res) => {
      if (res.ok) {
        setIsOpen(false);
        presentToast({
          message: "已退出聊天室",
          duration: 1000,
          position: "bottom",
          color: "success",
        });
        history.replace("/chatroomList");
        return;
      }
      presentToast({
        message: "未能退出聊天室﹐請重試",
        duration: 1000,
        position: "bottom",
        color: "danger",
      });
      return;
    });
  };

  // push notifications function
  const pushChatroom = async () => {
    const chatroomMember = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/chatroom/${roomId}/namelist/push`
    );
    const chatroomMemberJson = await chatroomMember.json();
    const notifier_token = [];

    for (let member of chatroomMemberJson) {
      if (member.push_notification_token) {
        notifier_token.push(member.push_notification_token);
      }
    }

    // push notification
    if (notifier_token.length > 0) {
      await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/notification/push_notification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            notification_type_id: 4,
            actor_id: userId,
            actor_username: userName,
            notifiers: notifier_token,
            content: `${chatroomName}: ${messageList[messageList.length - 1]}`,
          }),
        }
      );
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-between align-items-center w100 ">
              <IonButtons>
                <IonBackButton
                  defaultHref="/chatroomList"
                  text="返回"
                ></IonBackButton>
              </IonButtons>
              <span>{chatroomName}</span>
              <IconContainer>
                <IonButton
                  // id="open-chat-modal"
                  onClick={() => {
                    setIsOpen(true);
                  }}
                >
                  <IonText>...</IonText>
                </IonButton>
              </IconContainer>
              {/* // modal */}
              <IonModal
                // trigger="open-chat-modal"
                initialBreakpoint={0.3}
                breakpoints={[0, 0.25, 0.5, 0.75]}
                handleBehavior="cycle"
                isOpen={isOpen}
              >
                <IonContent ref={contentRef} className="ion-padding-top">
                  <div className="ion-margin-top">
                    <ModalItem lines="full" onClick={findNameList}>
                      <IonIcon icon={readerOutline}></IonIcon>
                      <IonText style={{ marginLeft: 10 }}>
                        檢視聊天室名單
                      </IonText>
                    </ModalItem>
                    <ModalItem lines="full" onClick={quit}>
                      <IonIcon icon={exitOutline}></IonIcon>
                      <IonText style={{ marginLeft: 10 }}>退出聊天室</IonText>
                    </ModalItem>
                    <ModalItem lines="full" onClick={report}>
                      <IonIcon icon={alertCircleOutline}></IonIcon>
                      <IonText style={{ marginLeft: 10 }}>舉報此聊天室</IonText>
                    </ModalItem>
                  </div>
                </IonContent>
              </IonModal>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {
          // if loading
          loading === true ? (
            <LoadingScreen>
              <IonSpinner name="crescent" /> 載入中...
            </LoadingScreen>
          ) : //if error
          err !== "" ? (
            //if error = 未加入聊天室
            err.includes("未加入") ? (
              <QuestionContainer>
                <div style={{ marginTop: 10 }}>{err}</div>
              </QuestionContainer>
            ) : (
              // 其他 error
              <QuestionContainer>
                <div style={{ marginTop: 10 }}>載入失敗</div>
              </QuestionContainer>
            )
          ) : (messageList as ChatroomRecord[]).length > 0 ? (
            // if can load
            <>
              {(messageList as ChatroomRecord[]).map((record: ChatroomRecord) =>
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
        <div
          id="contentBottom"
          style={{ height: "1px", display: "inline-block" }}
          ref={bottomRef}
        ></div>
      </IonContent>
      <IonFooter style={{ minHeight: "1.5rem" }}>
        {/* {err !== "" ? null : ( */}
        <ChatReplyContainer>
          <IonInput
            value={message}
            placeholder="發表回應"
            maxlength={255}
            onIonChange={handleMessage}
            onKeyDown={(e) => e.key == "Enter" && sendMessage()}
          ></IonInput>
          <IonButton onClick={sendMessage}>
            <IonIcon icon={send}></IonIcon>
          </IonButton>
        </ChatReplyContainer>
        {/* )} */}
      </IonFooter>
    </IonPage>
  );
};

export default ChatroomPage;

const ChatReplyContainer = styled.div/* css */ `
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

const IconContainer = styled.div/* css */ `
padding-right: 0.5rem;

ion-button {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  overflow: hidden;

  ion-text {
    width: 2rem;
    height: 2rem;
    font-size: 20px;
    font-weight: 800;
    color: white;
  }
`;
