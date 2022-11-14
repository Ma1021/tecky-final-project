import { IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { memo, useEffect, useState } from 'react'
import styled from 'styled-components';
// import { RootState } from '../../redux/state'
// import { useSelector } from 'react-redux';
import QuestionCard from './QuestionCard'

export interface Questions {
    id: number
    content: string
    created_at: string
    asker_id: number
    asker_username: string
    asker_avatar: string
    stock: Array<{
        id: number,
        name: string,
        symbol: string,
        created_at: string,
        updated_at: string
    }>
    tag_id: number
}

// memo 防止父組件更新時子組件也更新的問題，改善效能 （只能用在純html的component）
const Allquestion: React.FC = memo(() => {
    const [questions, setQuestions ] = useState(Array<Questions>);
    const user_id = 1;

    const fetchData = async() => {
        try {
            const res = await fetch('http://localhost:8080/question', {
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

export default Allquestion;