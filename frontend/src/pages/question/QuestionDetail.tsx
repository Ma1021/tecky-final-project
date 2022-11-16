import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent, IonItem, IonImg, IonText, IonButton, IonIcon, IonInput, IonFooter, IonSpinner, useIonToast } from '@ionic/react';
import { memo, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { heartCircle, chatboxEllipses, shareSocial, trash } from 'ionicons/icons';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { loadQuestion } from '../../redux/questions/question'
import { deleteQuestion } from '../../redux/questions/question';

const QuestionDetail: React.FC = memo(() => {
  const { question, loading } = useAppSelector((state) => state.question);
  let location = useLocation();
  const question_id = location.pathname.slice(10)  
  const [present, dismiss] = useIonToast();
  const history = useHistory();
  const dispatch = useAppDispatch();
  const user_id = 1;

  useEffect(()=>{
    if(!question_id) return;
    dispatch(loadQuestion(+question_id));
  },[question_id]);

  function formatDate(date:string) {
    return date.slice(0,10) + ' ' + date.slice(11,16)
  }

  async function handleDelete(e: any) {
    e.preventDefault();

    let obj = {
      question_id: question.id,
      user_id
    }

    dispatch(deleteQuestion(obj));
    present('刪除問題成功', 1500)
    history.replace("/discuss")
  }

  if(question.id == undefined) {
    return <></>
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
          <IonButton className='subscribeBtn'>
            <IonIcon icon={heartCircle}/>
            <IonText>關注</IonText>
          </IonButton>
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
              <IonText style={{fontSize:14}} >1</IonText>
            </div>
            <IonIcon icon={shareSocial}></IonIcon>
          </div>
        </ContentContainer>

        <AnswerContainer>
          <IonText>回答</IonText>
          <div className='answerCard'>
              <div className='answererAvatar'>
                <IonImg src='https://wallpapercave.com/wp/wp8960168.jpg' />
                <IonButton>關注</IonButton>
              </div>
              <div className='answerContent'>
                <IonText className='username'>Username</IonText>
                <IonText className='content'>ContentContentContentContentContentContentContentContentContentContent</IonText>
                <div className='answerInfo'>
                  <IonText className='answerDate'>2022-11-15</IonText>
                  <IonText className='reportBtn'>檢舉</IonText>
                </div>
              </div>
          </div>
          
        </AnswerContainer></>}
      </IonContent>
      <IonFooter>
          <ReplyContainer>
            <IonInput placeholder='發表回應' maxlength={100}></IonInput>
            <IonText>發送</IonText>
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

      .username {
        font-size: 17px;
        font-weight: 600;
      }

      .content {
        font-size: 15px;
      }

      .answerInfo {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 14px;
        color: #9e9e9e;

        .reportBtn {
          font-weight: 600;
        }
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