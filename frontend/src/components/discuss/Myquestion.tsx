import { IonRefresher, IonRefresherContent, RefresherEventDetail, IonSpinner } from '@ionic/react';
import { memo } from 'react'
import QuestionCard from './QuestionCard';
import styled from 'styled-components';
import { useAppSelector } from "../../redux/store";

interface QuestionProps {
    loadAskerQuestion: Function
}

const MyQuestion: React.FC<QuestionProps> = memo((props: QuestionProps) => {
    const { askerQuestionList, loading } = useAppSelector((state) => state.question)
    const user_id = 1;

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        props.loadAskerQuestion();
        if(!loading) {
            event.detail.complete();
        }
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent pullingText="下拉更新"></IonRefresherContent>
            </IonRefresher>
            {loading ? <LoadingScreen><IonSpinner name="circles"/> 載入中...</LoadingScreen> : 
            <QuestionContainer>
                {askerQuestionList.length > 0 ? <QuestionCard questions={askerQuestionList} user_id={user_id} /> : <div style={{marginTop:10}}>沒有問題</div>}
            </QuestionContainer>}
        </>
    );
  });

const QuestionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
  
export default MyQuestion