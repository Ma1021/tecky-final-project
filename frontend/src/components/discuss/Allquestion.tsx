import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSpinner
} from "@ionic/react";
import { memo, useCallback, useEffect } from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import { RootState, useAppDispatch, useAppSelector } from "../../redux/store";
import { loadQuestions } from "../../redux/questions/question";

export interface Questions {
  id: number;
  content: string;
  created_at: string;
  asker_id: number;
  asker_username: string;
  asker_avatar: string;
  stock: Array<{
    id: number;
    name: string;
    symbol: string;
    created_at: string;
    updated_at: string;
  }>;
  tag_id: number;
}

interface QuestionProps {
  loadQuestion: Function
}

// memo 防止父組件更新時子組件也更新的問題，改善效能 （只能用在純html的component）
const Allquestion: React.FC<QuestionProps> = memo((props: QuestionProps) => {
  const { questionList, loading } = useAppSelector((state: RootState) => state.question)
  const user_id = 1;

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    setTimeout(() => {
      props.loadQuestion();
      if(!loading) {
        event.detail.complete();
      }
    });
  }

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent pullingText="下拉更新"></IonRefresherContent>
      </IonRefresher>
      {loading ? <LoadingScreen><IonSpinner name="circles"/> 載入中...</LoadingScreen> : 
      <QuestionContainer>
        { questionList.length > 0 ? <QuestionCard questions={questionList} user_id={user_id} /> : <div style={{marginTop:10}}>沒有問題</div> }
      </QuestionContainer>}
    </>
  );
});

const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`

export default Allquestion;
