import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent, IonItem, IonImg, IonText, IonButton, IonIcon, IonInput } from '@ionic/react';
import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Questions } from '../../components/discuss/Allquestion'
import styled from 'styled-components';
import { heartCircle, chatboxEllipses, shareSocial } from 'ionicons/icons';

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
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <AskerContainer lines='full'>
          <IonImg className='askerAvatar' src={`${question[0].asker_avatar}`}/>
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

        <ReplyContainer>
          <IonInput className='replyInput' placeholder='發表回應' maxlength={100}></IonInput>
          <IonText className='replySend'>發送</IonText>
        </ReplyContainer>
      </IonContent>
    </IonPage>
    : null }
    </>
  )
});

export default QuestionDetail;

const AskerContainer = styled(IonItem)`
  width: 100%;

  .askerAvatar {
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

const ReplyContainer = styled.div`
  width: 100%;
  height: 3.5rem;
  background-color: #222;
  margin-top: 0.8rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0rem 0.8rem;


  .replyInput {
    width: 90%;
    background-color: #444;
    border-radius: 1rem;
    --padding-start: 1rem;
  }

  .replySend{
    width: 10%;
  }
`