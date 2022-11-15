import { IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { memo, useEffect, useState } from 'react'
import { Questions } from './Allquestion';
import QuestionCard from './QuestionCard';
import styled from 'styled-components';

const MyQuestion: React.FC = memo(() => {
    const [questions, setQuestions ] = useState(Array<Questions>);
    const user_id = 1;

    const fetchData = async() => {
        try {
            const res = await fetch(`http://localhost:8080/question/user/${user_id}`, {
                method:'GET',
                headers:{'Content-Type': 'application/json'}
            })
            const json = await res.json();
            setQuestions(json);
        } catch(err) {
            console.log("error", err);
        }
    }

    useEffect(()=>{
        fetchData();
    },[])

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {
            fetchData();
            event.detail.complete();
        }, 1000);
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <QuestionContainer>
                <QuestionCard questions={questions} user_id={user_id}/>
            </QuestionContainer>
        </>
    );
  });

  const QuestionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
  
export default MyQuestion;