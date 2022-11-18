import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent, IonItem, IonImg, IonText, IonButton, IonIcon, IonInput, IonFooter, IonSpinner, useIonToast, useIonAlert } from '@ionic/react';
import { memo, useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { heartCircle, chatboxEllipses, shareSocial, trash, heartOutline } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loadQuestion, createAnswer, deleteQuestion, deleteAnswer  } from '../../redux/questions/questionSlice';

const QuestionDetail: React.FC = memo(() => {
  const { question, loading } = useAppSelector((state) => state.question);
  let location = useLocation();
  const question_id = location.pathname.slice(10)  
  const [toastPresent] = useIonToast();
  const [alertPresent] = useIonAlert();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const [ replyContent, setReplyContent ] = useState('');
  const user_id = 2;
  let reverseAnswer = [];
  
  useEffect(()=>{
    if(!question_id) return;
    dispatch(loadQuestion(+question_id));
  },[question_id]);


  function formatDate(date:string) {
    const time = new Date(date).toLocaleString([],{hour12: false, dateStyle:'medium', timeStyle:'short'})
    return time
  }

  function handleInput(e: any) {
    setReplyContent(e.target.value)
  }

  function handleDelete(e: any) {
    e.preventDefault();
    const obj = {
      question_id: question.id,
      user_id
    }

    alertPresent({
              cssClass: 'my-css',
              header: '提示',
              message: '確定要刪除問題嗎？',
              buttons: ['取消', { text: '確定', handler: () => dispatch(deleteQuestion(obj))
              .then(()=> {
                toastPresent('刪除問題成功', 1500)
                history.replace("/discuss")
              })}],
    });
  }

  function handleReplyDelete(e: any) {
    e.preventDefault();
    const obj = {
      question_id: question.id,
      answer_id: e.target.parentNode.parentNode.parentNode.dataset.answer_id
    }
    alertPresent({
      cssClass: 'alert',
      header: '提示',
      message: '確定要刪除回應嗎？',
      buttons: ['取消', { text: '確定', handler: () => dispatch(deleteAnswer(obj))
      .then(()=> {
        toastPresent('刪除回應成功', 1500)
      })}],
    });
  }

  function handleReplySubmit(e: any) {
    e.preventDefault();
    const obj = {
      answerer_id: user_id,
      question_id: question.id,
      content: replyContent
    }
    dispatch(createAnswer(obj)).then(()=>{
      toastPresent('發表回應成功', 1500)
      setReplyContent('');
    })
  }

  if(question.id === undefined) {
    return <></>
  } else {
    reverseAnswer = [...question.answer].reverse();
  }

  return (
    <IonPage id="main-content">
      <IonHeader >
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discuss"/>
          </IonButtons>
           <IonTitle>{question.asker_username}的問題</IonTitle>
           {question.asker_id === user_id && <IonIcon slot='end' className='pr-3' style={{fontSize:19}} icon={trash} onClick={handleDelete}/>}
        </IonToolbar>
      </IonHeader>
      <IonContent>
      {loading ? <LoadingScreen><IonSpinner name="circles"/> 載入中...</LoadingScreen> : <>
        <AskerContainer lines='full'>
          <IonImg src={`${question.asker_avatar}`}/>
          <div className='askerInfo'>
            <IonText>{question.asker_username}</IonText>
            <IonText style={{fontSize:10}}>{formatDate(question.created_at)}</IonText>
          </div>
          { question.asker_id !== user_id &&
            <IonButton className='subscribeBtn'>
              <IonIcon icon={heartCircle}/>
              <IonText>關注</IonText>
            </IonButton>
          }
        </AskerContainer>
        <ContentContainer>
          <div>
            <IonText>{question.content}</IonText>
            <div className='tagContainer'>
              {question.stock.map((stock)=>{
                if(stock) {
                  return <IonText className='stockTag' key={stock.id}>#{stock.symbol}</IonText>
                }
              })}
            </div>
          </div>
          <div className='buttonContainer'>
            <div style={{display:'flex', alignItems:'center', gap:5}}>
              <IonIcon icon={chatboxEllipses}/>
              <IonText style={{fontSize:14}} >{reverseAnswer.length}</IonText>
            </div>
            <IonIcon icon={shareSocial}></IonIcon>
          </div>
        </ContentContainer>

        {reverseAnswer.length > 0 &&  
          <AnswerContainer>
            <IonText>回答</IonText>
          {reverseAnswer.map((answer: any)=>{
            return <div className='answerCard' key={answer.id} data-answer_id = {answer.id}>
                      <div className='answererAvatar'>
                        <IonImg src={answer.answers.avatar} />
                        <IonButton>關注</IonButton>
                      </div>
                      <div className='answerContent'>
                        <IonText className='username'>{answer.answers.username}</IonText>
                        <IonText className='content'>{answer.content}</IonText>
                        <div className='answerInfo' data-user_id={answer.answers.id}>
                          <IonText className='answerDate'>{new Date(answer.created_at).toLocaleString([],{hour12: false, dateStyle:'medium', timeStyle:'short'})}</IonText>
                          <IonText style={{fontWeight:600}}>檢舉</IonText>
                          {answer.answers.id === user_id && <IonText style={{fontWeight:600}} onClick={handleReplyDelete}>刪除</IonText>}
                        </div>
                        <div className='answerLikes'>
                          {answer.likes_user_id.includes(user_id) ? 
                          <IonIcon icon={heartOutline}/> 
                          : 
                          <IonIcon icon={heartOutline}/>}
                          <IonText>{answer.likes_user_id.length}</IonText>
                        </div>
                      </div>
                  </div>
          })} 
          </AnswerContainer>
        }
        
        </>}
      </IonContent>
      <IonFooter>
          <ReplyContainer>
            <IonInput value={replyContent} placeholder='發表回應' maxlength={100} onIonChange={handleInput}></IonInput>
            <IonText onClick={handleReplySubmit}>發送</IonText>
          </ReplyContainer>
        </IonFooter>
    </IonPage>
  )
});

export default QuestionDetail;

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AskerContainer = styled(IonItem)`
  width: 100%;

  ion-img {
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
    margin: 0.3rem 0rem;
  }

  .askerInfo {
    display: flex;
    flex-direction: column;
    margin-left: 0.5rem;
  }

  .subscribeBtn {
    width: 3.8rem;
    height: 1.7rem;
    line-height: 1.7rem;
    display:flex;
    align-items: center;
    position:absolute;
    right: 1rem;
  }
`

const ContentContainer = styled.div`
  width: 100%;
  height: 14rem;
  background-color: #222;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .tagContainer {
    width: 100%;
    display:flex;
    align-items: center;
    gap:0.5rem;
    margin-top: 1rem;

    .stockTag {
      padding: 0.3rem 0.6rem;
      border-radius: 0.9rem;
      text-align: center;
      background-color: #F2B950;
      color: #fff;
    }
  }

  .buttonContainer {
    font-size: 24px;
    color: #ddd;
    display: flex;
    justify-content: space-around;
  }

`

const AnswerContainer = styled.div`
  width: 100%;
  margin-top: 0.5rem;
  background-color: #222;
  padding: 1rem;

  .answerCard {
    width: 100%;
    border-bottom: 1px solid rgba(225,225,225,0.2);
    display: flex;
    padding: 1rem 0rem;

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
        width: 3rem;
        height: 1.5rem;
        font-size: 14px;
      }
    }

    .answerContent {
      width: 80%;
      height: 100%;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
      padding-left: 0.5rem;
      margin-top: 0.3rem;

      .username {
        font-size: 16px;
        font-weight: 600;
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
        align-self: flex-end;
        display: flex;
        align-items: center;
        gap:0.5rem;
        font-size: 16px;
      }
    }
  }
`

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

  ion-text {
    width: 10%;
    color: #ddd;
    font-weight: 600;
  }
`