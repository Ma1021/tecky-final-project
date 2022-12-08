import {
  IonButtons,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonContent,
  IonItem,
  IonImg,
  IonText,
  IonButton,
  IonIcon,
  IonInput,
  IonFooter,
  IonSpinner,
  useIonToast,
  useIonAlert,
  IonChip
} from "@ionic/react";
import { memo, useCallback, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import styled from "styled-components";
import {
  heartCircle,
  chatboxEllipses,
  shareSocial,
  trash,
  heartOutline,
  heart,
  send,
} from "ionicons/icons";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  loadQuestion,
  createAnswer,
  deleteQuestion,
  deleteAnswer,
  loadQuestions,
} from "../../redux/questions/questionSlice";
import { WhatsappShareButton } from "react-share";
import UserBadge from "../../components/All/UserBadge";

const QuestionDetail: React.FC = memo(() => {
  const { question } = useAppSelector((state) => state.question);
  let location = useLocation();
  const question_id = location.pathname.slice(10);
  const [toastPresent] = useIonToast();
  const [alertPresent] = useIonAlert();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [replyContent, setReplyContent] = useState("");
  const [followings_id, setFollowings_id] = useState(Array<number>);
  const { user } = JSON.parse(
    localStorage.getItem("auth_stockoverflow") as string
  );
  const user_id = +user.id;
  const { blockedUserList } = useAppSelector((state)=> state.block);
  const [answerFilter, setAnswerFilter] = useState([] as any)
  
  useEffect(() => {
    if (!question_id) return;
    dispatch(loadQuestion(+question_id));
  }, []);

  useEffect(()=>{
    filterAnswer();
  },[question])
  
  async function filterAnswer() {
    const answer = await question.answer
    if(answer) {
      setAnswerFilter(
        answer.filter((answer)=>{        
          return !blockedUserList.includes(answer.answers.id)
        })
      )
    }    
  }    

  const fetchFollowing = useCallback(async () => {
    const id_array: Array<number> = [];

    const res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/followings/${user_id}`
    );
    const data = await res.json();

    for (let following of data) {
      if (!id_array.includes(following.user_id)) {
        id_array.push(following.user_id);
      }
    }

    setFollowings_id(id_array);
  }, []);

  useEffect(() => {
    fetchFollowing();
  }, [followings_id.length]);

  function formatDate(date: string) {
    const time = new Date(date).toLocaleString([], {
      hour12: false,
      dateStyle: "medium",
      timeStyle: "short",
    });
    return time;
  }

  function handleInput(e: any) {
    setReplyContent(e.target.value);
  }

  function handleDelete(e: any) {
    e.preventDefault();
    const obj = {
      question_id: question.id,
      user_id,
    };

    alertPresent({
      cssClass: "alert",
      header: "提示",
      message: "確定要刪除問題嗎？",
      buttons: [
        "取消",
        {
          text: "確定",
          handler: () =>
            dispatch(deleteQuestion(obj)).then(() => {
              toastPresent("刪除問題成功", 1500);
              dispatch(loadQuestions()).then(() => {
                history.replace("/discuss");
              });
            }),
        },
      ],
    });
  }

  function handleReplyDelete(e: any) {
    e.preventDefault();
    const obj = {
      question_id: question.id,
      answer_id: e.target.parentNode.parentNode.parentNode.dataset.answer_id,
      user_id
    };
    alertPresent({
      cssClass: "alert",
      header: "提示",
      message: "確定要刪除回應嗎？",
      buttons: [
        "取消",
        {
          text: "確定",
          handler: () =>
            dispatch(deleteAnswer(obj)).then(() => {
              toastPresent("刪除回應成功", 1500)
              dispatch(loadQuestion(+question.id));
            }),
        },
      ],
    });
  }

  function handleReplySubmit(e: any) {
    e.preventDefault();

    if (replyContent === "") {
      toastPresent("請輸入回應內容", 1500);
      return;
    }

    const obj = {
      answerer_id: user_id,
      asker_id: question.asker_id,
      answerer_username: user.username,
      question_id: question.id,
      content: replyContent,
    };
    dispatch(createAnswer(obj)).then(() => {
      toastPresent("發表回應成功", 1500);
      setReplyContent("");
    });
  }

  async function handleSubscription(e: any) {
    e.preventDefault();

    const subscriptionRes = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/subscriptions`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id,
          following_id: +e.target.parentNode.parentNode.dataset.user_id,
        }),
      }
    );
    const subscription_json = await subscriptionRes.json();
    const subscription_id = await subscription_json[0].id;

    // create notification
    const notification = {
      notification_type_id: 3,
      notification_target_id: subscription_id,
      actor_id: user_id,
      notifiers: +e.target.parentNode.parentNode.dataset.user_id,
    };

    if (e.target.innerText === "取消關注") {
      setFollowings_id(
        followings_id.filter(
          (id) => id !== +e.target.parentNode.parentNode.dataset.user_id
        )
      );
      
      await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_id: subscription_id, target_type_id: 3 }),
      });
    } else {
      setFollowings_id((prevState) => [
        ...prevState,
        +e.target.parentNode.parentNode.dataset.user_id,
      ]);
      await fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notification),
      });
      await fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/notification/push_notification`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            notification_type_id: 3,
            actor_id: user_id,
            actor_username: user.username,
            notifiers: [e.target.parentNode.parentNode.dataset.user_id],
            content: "subscriptions",
          }),
        }
      );
    }
  }

  async function handleLike(e: any) {
    let obj = {
      answer_id: +e.target.parentNode.parentNode.parentNode.dataset.answer_id,
      user_id,
    };

    const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/answer/like`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (res.ok) {
      dispatch(loadQuestion(+question_id));
    }
  }

  const getProfile = (e: any) => {          
    history.push(`/user/${+e.target.dataset.userid}/info`);
  };

  function handleReport(url:string, status: string, obj:{reason: string}) {
    if(status === '舉報') {
      alertPresent({
        cssClass: "alert",
        header: "確定要舉報嗎？",
        message: "請選擇原因",
        inputs:[
          {
            label: '騷擾謾罵',
            type: 'radio',
            value: '騷擾謾罵',
          },
          {
            label: '虚假信息',
            type: 'radio',
            value: '虚假信息',
          },
          {
            label: '色情內容',
            type: 'radio',
            value: '色情內容',
          },
          {
            label: '仇恨言論',
            type: 'radio',
            value: '仇恨言論',
          },
          {
            label: '暴力威脅',
            type: 'radio',
            value: '暴力威脅',
          },
          {
            label: '其他',
            type: 'radio',
            value: '其他',
          }
        ],
        buttons: [
          "取消",
          {
            text: "確定",
            handler: (data: string) => {
              obj.reason = data;
              fetch(url, {
                method: 'POST',
                headers: {"Content-type":"application/json"},
                body:JSON.stringify(obj)
              }).then((response)=>{
                if(response.ok) {
                  toastPresent("舉報成功，請耐心等待，管理員將24小時內處理", 1500);
                } else {
                  toastPresent("舉報失敗", 1500);
                }
              })
            }
          },
        ],
    })} else if(status === "已舉報"){
      toastPresent("已舉報，請耐心等待，管理員將24小時內處理", 1500);
    }
  }
  
  function handleAnswerReport(e: any) {    
    const answer_id = +e.target.parentNode.parentNode.parentNode.dataset.answer_id;
    const status = e.target.innerText;
    const url = `${process.env.REACT_APP_PUBLIC_URL}/answer/report`;
    const obj = {
      from_user_id: user_id,
      to_user_id: +e.target.parentNode.parentNode.parentNode.dataset.user_id,
      reason: "",
      target_type:"answer",
      target_id: answer_id
    }
    handleReport(url, status, obj);
  }

  function handleQuestionReport(e: any) {
    const question_id = +e.target.parentNode.parentNode.parentNode.dataset.question_id;
    const status = e.target.innerText;
    const url = `${process.env.REACT_APP_PUBLIC_URL}/question/report`;
    const obj = {
      from_user_id: user_id,
      to_user_id: +e.target.parentNode.parentNode.parentNode.dataset.user_id,
      reason: "",
      target_type:"question",
      target_id: question_id
    }    
    handleReport(url, status, obj);
  }

  const path = history.location.pathname
  const url = `${process.env.REACT_APP_PUBLIC_URL}${path}`
  
  // export function showTabs() {
  //   const tabsEl = document.querySelector('ion-tab-bar');
  //   if (tabsEl) {
  //     tabsEl.hidden = false;
  //   }
  // }

  return (
    <IonPage id="main-content" className="no-tab-bar">
      {question.id &&
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discuss" text="返回"/>
          </IonButtons>
          <IonTitle>{question.asker_username}的問題</IonTitle>
          {question.asker_id === user_id && (
            <IonIcon
              slot="end"
              className="pr-3"
              style={{ fontSize: 19 }}
              icon={trash}
              onClick={handleDelete}
            />
          )}
        </IonToolbar>
      </IonHeader>
      }
      <IonContent>
        {question.id && <>
        <AskerContainer lines="full" data-user_id={question.asker_id} data-question_id={question.id}>
          <IonImg
            onClick={getProfile}
            data-userId={question.asker_id}
            src={`${question.asker_avatar}`}
          />
          <div className="askerInfo">
            <div className="username">
              <IonText>{question.asker_username}</IonText>
              <UserBadge isKOL={question.user_type === "kol"} />
            </div>
            <div>
              <IonText style={{ fontSize: 10, color:"#999" }}>
                {formatDate(question.created_at)}
              </IonText>
              {question.asker_id !== user_id ? !question.is_reported ? 
                <IonText style={{ fontSize: 10, color:"#999", marginLeft:10}} onClick={handleQuestionReport}>舉報</IonText>  
                :
                <IonText style={{ fontSize: 10, color:"#999", marginLeft:10}} onClick={handleQuestionReport}>已舉報</IonText> : <></>
              } 
            </div>
          </div>
          {question.asker_id !== user_id && (
            <IonButton className="subscribeBtn">
              <IonIcon icon={heartCircle} />
              {followings_id.length > 0 &&
              followings_id.includes(question.asker_id) ? (
                <IonText onClick={handleSubscription}>取消關注</IonText>
              ) : (
                <IonText onClick={handleSubscription}>關注</IonText>
              )}
            </IonButton>
          )}
        </AskerContainer>
        
        <ContentContainer>
          <div>
            <IonText>{question.content}</IonText>
            <div className="tagContainer">
              {question.stock.map((stock) => {
                if (stock) {
                  return (
                    <IonChip className="stockTag" key={stock.id}>
                      #{stock.symbol}
                    </IonChip>
                  );
                }
              })}
            </div>
          </div>
          <div className="buttonContainer">
            <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <IonIcon icon={chatboxEllipses} />
              <IonText style={{ fontSize: 14 }}>{question.answer !== null ? question.answer.length : 0}</IonText>
            </div>
            <WhatsappShareButton url={`分享問題： ${url}`}>
              <IonIcon icon={shareSocial}></IonIcon>
            </WhatsappShareButton>
          </div>
        </ContentContainer>
        </>}
        {answerFilter.length > 0 && (
          <AnswerContainer>
            <IonText>回答</IonText>
            {answerFilter.map((answer: any, index: number) => {
              return (
                <div
                  className="answerCard"
                  key={answer.id}
                  data-answer_id={answer.id}
                  data-user_id={answer.answers.id}
                >
                  <div className="answererAvatar">
                    <IonImg
                      src={answer.answers.avatar} 
                      onClick={getProfile}
                      data-userId={answer.answers.id}
                    />
                    {followings_id.includes(answer.answers.id) &&
                    user_id !== answer.answers.id ? (
                      <IonButton onClick={handleSubscription}>
                        取消關注
                      </IonButton>
                    ) : (
                      answer.answers.id !== user_id && (
                        <IonButton onClick={handleSubscription}>關注</IonButton>
                      )
                    )}
                  </div>
                  <div className="answerContent">
                    <div className="username">
                      <IonText>{answer.answers.username}</IonText>
                      <UserBadge isKOL={answer.answers.type === "kol"} />
                    </div>
                    <IonText className="content">{answer.content}</IonText>
                    <div className="answerInfo">
                      <IonText className="answerDate">
                        {new Date(answer.created_at).toLocaleString([], {
                          hour12: false,
                          dateStyle: "medium",
                          timeStyle: "short",
                        })}
                      </IonText>
                      {answer.answers.id !== user_id ? answer.is_reported ? (
                        <IonText style={{ fontWeight: 600 }} onClick={handleAnswerReport}>已舉報</IonText>
                      ) :
                        <IonText style={{ fontWeight: 600 }} onClick={handleAnswerReport}>舉報</IonText> : <></>
                      }
                      {answer.answers.id === user_id && (
                        <IonText
                          style={{ fontWeight: 600 }}
                          onClick={handleReplyDelete}
                        >
                          刪除
                        </IonText>
                      )}
                      
                    </div>
                    <div className="answerLikes">
                      {answer.likes_user_id.includes(user_id) ? (
                        <IonIcon icon={heart} onClick={handleLike} />
                      ) : (
                        <IonIcon icon={heartOutline} onClick={handleLike} />
                      )}
                      <IonText>{answer.likes_user_id.length}</IonText>
                    </div>
                  </div>
                </div>
              );
            })}
          </AnswerContainer>
        )}
      </IonContent>
      <IonFooter>
        <ReplyContainer>
          <IonInput
            value={replyContent}
            placeholder="發表回應"
            maxlength={100}
            onIonChange={handleInput}
          ></IonInput>
          <div onClick={handleReplySubmit}>
            <IonIcon icon={send} />
          </div>
        </ReplyContainer>
      </IonFooter>
    </IonPage>
  );
});

export default QuestionDetail;

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const AskerContainer = styled(IonItem)`
  width: 100%;

  ion-img {
    width: 2.7rem;
    height: 2.7rem;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin: 0.4rem 0rem;
  }

  .askerInfo {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
    gap: 0.3rem;

    .username {
      font-size: 16px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 0.3rem;
    }
  }

  .subscribeBtn {
    display: flex;
    height: 1.7rem;
    line-height: 1.7rem;
    display: flex;
    align-items: center;
    position: absolute;
    right: 1rem;
  }
`;

const ContentContainer = styled.div`
  width: 100%;
  min-height: 14rem;
  background-color: #222;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  @media (min-width: 768px) {
    min-height: 20rem;
    padding: 2rem;
  }

  .tagContainer {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;

    .stockTag {
      margin:0;
      padding: 0.3rem 0.6rem;
      height: 1.8rem;
      border-radius: 0.9rem;
      text-align: center;
      background-image: linear-gradient(
        to right bottom,
        #ffc748,
        #ffba53,
        #ffae5e,
        #ffa46a,
        #ff9b75
      );
      color: #fff;
      font-size: 14px;
    }
  }

  .buttonContainer {
    font-size: 24px;
    color: #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;

    @media (min-width: 768px) {
      padding: 0rem 5rem;
    }

    .react-share__ShareButton {
      display: flex;
      align-items: center;
    }
  }
`;

const AnswerContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  background-color: #222;
  padding: 1rem;
  padding-bottom: 0rem;

  .answerCard {
    width: 100%;
    border-bottom: 1px solid rgba(225, 225, 225, 0.2);
    display: flex;
    padding: 1rem 0.5rem 0.5rem 0.5rem;

    .answererAvatar {
      width: 20%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;

      ion-img {
        width: 3rem;
        height: 3rem;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
        margin: 0.3rem 0rem;
      }

      ion-button {
        max-width: 3.5rem;
        height: 1.5rem;
        font-size: 12px;
      }
    }

    .answerContent {
      width: 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-left: 0.5rem;
      padding-top: 0.3rem;

      .username {
        display: flex;
        align-items: center;
        gap: 0.3rem;

        ion-text {
          font-size: 16px;
          font-weight: 600;
        }
      }

      .content {
        font-size: 14px;
      }

      .answerInfo {
        display: flex;
        align-items: center;
        gap: 1.5rem;
        font-size: 10px;
        color: #9e9e9e;
      }

      .answerLikes {
        height: 1.5rem;
        align-self: flex-end;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 14px;
        line-height: 1.5rem;

        ion-icon {
          color: #ffa73c;
          font-size: 17px;
        }
      }
    }
  }
`;

const ReplyContainer = styled.div`
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

  div {
    height: 2.2rem;
    width: 2.2rem;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    color: #fff;
    font-weight: 600;
    background-color: #ffa73c;
    text-align: center;
  }
`;
