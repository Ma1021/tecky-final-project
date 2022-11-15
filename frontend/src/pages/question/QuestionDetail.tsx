import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent, IonItem, IonImg, IonText, IonButton, IonIcon, IonInput, IonFooter } from '@ionic/react';
import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Questions } from '../../components/discuss/Allquestion'
import styled from 'styled-components';
import { heartCircle, chatboxEllipses, shareSocial, trash } from 'ionicons/icons';

const QuestionDetail: React.FC = memo(() => {
  const [question, setQuestion] = useState<Array<Questions>>([]);
  const fetchData = async (question_id: number) => {
    try {
      const res = await fetch(`http://localhost:8080/question/${question_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
      })
      const json = await res.json();
      setQuestion(json);
    } catch (err) {
      console.log("error", err);
    }
  }

  let location = useLocation();

  useEffect(() => {
    const question_id = location.pathname.slice(10)
    fetchData(+question_id);
  }, [])

  function formatDate(date:string) {
    return date.slice(0,10) + ' ' + date.slice(11,16)
  }

  return (
    <>
    {question.length > 0 ? 
    <IonPage id="main-content">
      <IonHeader >
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discuss"/>
          </IonButtons>
           <IonTitle>{question[0].asker_username}的問題</IonTitle>
           <IonIcon slot='end' className='pr-3' style={{fontSize:19}} icon={trash}/>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AskerContainer lines='full'>
          <IonImg src={`${question[0].asker_avatar}`}/>
          <div className='askerInfo'>
            <IonText>{question[0].asker_username}</IonText>
            <IonText style={{fontSize:10}}>{formatDate(question[0].created_at)}</IonText>
          </div>
          <IonButton className='subscribeBtn'>
            <IonIcon icon={heartCircle}/>
            <IonText>關注</IonText>
          </IonButton>
        </AskerContainer>
        <ContentContainer>
          <div>
            <IonText>{question[0].content}</IonText>
            <div className='tagContainer'>
              {question[0].stock.map((stock)=>{
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
          
        </AnswerContainer>
      </IonContent>
      <IonFooter>
          <ReplyContainer>
            <IonInput placeholder='發表回應' maxlength={100}></IonInput>
            <IonText>發送</IonText>
          </ReplyContainer>
        </IonFooter>
    </IonPage>
    : null }
    </>
  )
});

export default QuestionDetail;

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