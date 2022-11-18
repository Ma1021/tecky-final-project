import { IonRefresher, IonRefresherContent, RefresherEventDetail, IonSpinner } from '@ionic/react';
import { memo } from 'react'
import { useAppSelector } from "../../redux/store";
import styled from 'styled-components';
import QuestionCard from './QuestionCard';


interface QuestionProps {
    loadAnswererQuestion: Function
}

const MyAnswer: React.FC<QuestionProps> = memo((props:QuestionProps) => {
    const { answererQuestionList, loading } = useAppSelector((state) => state.question)
    const user_id = 2;

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        props.loadAnswererQuestion(user_id);
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
            {answererQuestionList.length > 0 ? <QuestionCard questions={answererQuestionList} user_id={user_id} /> : <div style={{marginTop:10}}>沒有問題</div>}
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
  
  export default MyAnswer;