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
  IonInfiniteScroll,
  IonInfiniteScrollContent,
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
import { alertCircleOutline, exitOutline, readerOutline } from "ionicons/icons";
import { ChatroomRecord } from "../../redux/chatroomRecord/state";
import { useAppSelector } from "../../redux/store";
import { ModalItem } from "../Inbox";
import { useCounter } from "../../hooks/use-counter";

const ChatroomPage: React.FC = () => {
  // get the new message
  const [message, setMessage] = useState("");
  const [chatroomName, setChatroomName] = useState("");
  const [messageList, setMessageList] = useState<ChatroomRecord[]>([]);
  const [presentToast] = useIonToast();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [presentAlert] = useIonAlert();
  const history = useHistory();
  const [isOpen, setIsOpen] = useState(false);

  // for scroll with new nsg
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

  // ??? url ??? param
  let url = useRouteMatch<{ id: string }>();
  let roomId = url.url.replace("/chatroom/", "");

  // take previous chat record and display
  useEffect(() => {
    if (!userId) {
      presentToast({
        message: "?????????",
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
        // console.log(`failed to load, ${error}`);
        presentToast({
          message: String(error),
          duration: 15000,
          color: "danger",
          position: "bottom",
        });
      });
  }, [setMessageList, setLoading, roomId, userId]);

  useEffect(() => {
    setIsTop(false);
    if (messageList.length > 0) {
      generateItems();
    }
  }, [messageList]);

  // for infinite scroll
  const [is_top, setIsTop] = useState(false);
  const [items, setItems] = useState<ChatroomRecord[]>([]);
  const generateItems = () => {
    const newItems = [] as any;
    let length = messageList.length - 1;
    if (items.length === 0) {
      for (let i = 10; i > 0; i--) {
        if (messageList[length - (10 - i)]) {
          newItems.unshift(messageList[length - (10 - i)]);
        }
      }
      setItems([...newItems, ...items]);
      setTimeout(() => {
        scrollToBottom();
      }, 500);
    } else {
      for (let i = 0; i < 10; i++) {
        if (messageList[length - (items.length + i)] !== undefined) {
          newItems.unshift(messageList[length - (items.length + i)]);
        } else {
          continue;
        }
      }
      setTimeout(() => {
        setItems([...newItems, ...items]);
      }, 500);
    }
  };

  // ??????socket
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
          // pushChatroom();
          // setMessageList((msg) => {
          //   return [...msg, newMessage];
          // });
          setItems((items) => [...items, newMessage]);
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
    console.log("messagelist", messageList);
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
        message: "????????????",
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
      header: "??????",
      subHeader: "???????????????, ??????24????????????????????????????????????",
      buttons: ["??????"],
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
          message: "??????????????????",
          duration: 1000,
          position: "bottom",
          color: "success",
        });
        history.replace("/chatroomList");
        return;
      }
      presentToast({
        message: "?????????????????????????????????",
        duration: 1000,
        position: "bottom",
        color: "danger",
      });
      return;
    });
  };

  // push notifications function
  // const pushChatroom = async () => {
  //   const chatroomMember = await fetch(
  //     `${process.env.REACT_APP_PUBLIC_URL}/chatroom/${roomId}/namelist/push`
  //   );
  //   const chatroomMemberJson = await chatroomMember.json();
  //   const notifier_token = [];
  //   if (chatroomMemberJson.length > 0) {
  //     for (let member of chatroomMemberJson) {
  //       if (member.push_notification_token) {
  //         notifier_token.push(member.push_notification_token);
  //       }
  //     }
  //   }

  //   // push notification
  //   if (notifier_token.length > 0) {
  //     await fetch(
  //       `${process.env.REACT_APP_PUBLIC_URL}/notification/push_notification`,
  //       {
  //         method: "POST",
  //         headers: { "Content-Type": "application/json" },
  //         body: JSON.stringify({
  //           notification_type_id: 4,
  //           actor_id: userId,
  //           actor_username: userName,
  //           notifiers: notifier_token,
  //           content: `${chatroomName}: ${messageList[messageList.length - 1]}`,
  //         }),
  //       }
  //     );
  //   }
  // };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-between align-items-center w100 ">
              <IonButtons>
                <IonBackButton
                  defaultHref="/chatroomList"
                  text="??????"
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
                <IonContent className="ion-padding-top">
                  <div className="ion-margin-top">
                    <ModalItem lines="full" onClick={findNameList}>
                      <IonIcon icon={readerOutline}></IonIcon>
                      <IonText style={{ marginLeft: 10 }}>
                        ?????????????????????
                      </IonText>
                    </ModalItem>
                    <ModalItem lines="full" onClick={quit}>
                      <IonIcon icon={exitOutline}></IonIcon>
                      <IonText style={{ marginLeft: 10 }}>???????????????</IonText>
                    </ModalItem>
                    <ModalItem lines="full" onClick={report}>
                      <IonIcon icon={alertCircleOutline}></IonIcon>
                      <IonText style={{ marginLeft: 10 }}>??????????????????</IonText>
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
              <IonSpinner name="crescent" /> ?????????...
            </LoadingScreen>
          ) : //if error
          err !== "" ? (
            //if error = ??????????????????
            err.includes("?????????") ? (
              <QuestionContainer>
                <div style={{ marginTop: 10 }}>{err}</div>
              </QuestionContainer>
            ) : (
              // ?????? error
              <QuestionContainer>
                <div style={{ marginTop: 10 }}>????????????</div>
              </QuestionContainer>
            )
          ) : (messageList as ChatroomRecord[]).length > 0 ? (
            // if can load
            <>
              <IonInfiniteScroll
                position="top"
                onIonInfinite={(ev) => {
                  if (messageList.length <= items.length) {
                    setIsTop(true);
                    ev.target.complete();
                  } else {
                    generateItems();
                    setTimeout(() => ev.target.complete(), 500);
                  }
                }}
              >
                <IonInfiniteScrollContent></IonInfiniteScrollContent>
              </IonInfiniteScroll>
              {is_top && (
                <IonText style={{ display: "block", textAlign: "center" }}>
                  ?????????~
                </IonText>
              )}
              {/* {(messageList as ChatroomRecord[]).map((record: ChatroomRecord) => */}
              {(items as ChatroomRecord[]).map((record: ChatroomRecord) =>
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
              <div style={{ marginTop: 10 }}>????????????</div>
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
            placeholder="????????????"
            maxlength={255}
            onIonChange={handleMessage}
            onKeyDown={(e) => e.key == "Enter" && sendMessage()}
          ></IonInput>
          <IonButton onClick={sendMessage}>
            <IonIcon icon={send}></IonIcon>
          </IonButton>
        </ChatReplyContainer>
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
