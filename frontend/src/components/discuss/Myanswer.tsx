import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSpinner,
} from "@ionic/react";
import { memo, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import { Questions } from "./Allquestion";
import { loadAnswererQuestions } from "../../redux/questions/questionSlice";

interface QuestionProps {
  keyword: string;
}

const MyAnswer: React.FC<QuestionProps> = memo((props: QuestionProps) => {
  const { answererQuestionList, loading } = useAppSelector(
    (state) => state.question
  );
  const [filteredQuestions, setFilteredQuestions] = useState(Array<Questions>);
  let user_id: number;

  if (localStorage.getItem("auth_stockoverflow")) {
    const { user } = JSON.parse(
      localStorage.getItem("auth_stockoverflow") as string
    );
    user_id = user.id;
  }

  const dispatch = useAppDispatch();

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    if(user_id) {
      dispatch(loadAnswererQuestions(user_id));
    }
    if (!loading) {
      event.detail.complete();
    }
  }

  useEffect(() => {
    const word = props.keyword.replace(/\s/g, "").toLowerCase();
    if (answererQuestionList.length > 0) {
      setFilteredQuestions(
        answererQuestionList.filter(
          (question) =>
            question.stock.some(
              (stock) =>
                stock.name.replace(/\s/g, "").toLowerCase().includes(word) ||
                stock.symbol.toLowerCase().includes(word)
            ) ||
            question.content.replace(/\s/g, "").toLowerCase().includes(word)
        )
      );
    }
  }, [props.keyword]);

  return (
    <>
      <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent pullingText="下拉更新"></IonRefresherContent>
      </IonRefresher>
      {loading ? (
        <LoadingScreen>
          <IonSpinner name="crescent" /> 載入中...
        </LoadingScreen>
      ) : (
        <QuestionContainer>
          {answererQuestionList.length > 0 ? (
            <QuestionCard
              questions={
                filteredQuestions.length > 0
                  ? filteredQuestions
                  : answererQuestionList
              }
            />
          ) : (
            <div style={{ marginTop: 10 }}>沒有答過問題</div>
          )}
        </QuestionContainer>
      )}
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
`;

export default MyAnswer;
