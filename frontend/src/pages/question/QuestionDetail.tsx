import { IonButtons, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonContent, IonItem, IonImg, IonText, IonButton, IonIcon } from '@ionic/react';
import { memo, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { Questions } from '../../components/discuss/Allquestion'
import styled from 'styled-components';
import { heartCircle } from 'ionicons/icons';

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
          <AskerAvatar src={`${question[0].asker_avatar}`}></AskerAvatar>
          <AskerInfo>
            <IonText>{question[0].asker_username}</IonText>
            <IonText style={{fontSize:10}}>{formatDate(question[0].created_at)}</IonText>
          </AskerInfo>
          <SubscribeBtn>
            <IonIcon icon={heartCircle}/>
            <IonText>關注</IonText>
          </SubscribeBtn>
        </AskerContainer>
      </IonContent>
    </IonPage>
    : null }
    </>
  )
});

export default QuestionDetail;

const AskerContainer = styled(IonItem)`
  width: 100%;
`

const AskerAvatar = styled(IonImg)`
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
  object-fit: cover;
  margin: 0.3rem 0rem;
`

const AskerInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 0.5rem;
`

const SubscribeBtn = styled(IonButton)`
  width: 3.8rem;
  height: 1.7rem;
  line-height: 1.7rem;
  display:flex;
  align-items: center;
  position:absolute;
  right: 1rem;
`