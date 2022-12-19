import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSpinner,
  IonRouterLink
} from "@ionic/react";
import { memo, useEffect, useState } from "react";
import QuestionCard from "./QuestionCard";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/store";
import { Questions } from "./Allquestion";
import { loadAskerQuestions } from "../../redux/questions/questionSlice";

interface QuestionProps {
  keyword: string;
}

const MyQuestion: React.FC<QuestionProps> = memo((props: QuestionProps) => {
  const { askerQuestionList, loading } = useAppSelector(
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
      dispatch(loadAskerQuestions(user_id));
    }
    if (!loading) {
      event.detail.complete();
    }
  }  

  useEffect(() => {
    const word = props.keyword.replace(/\s/g, "").toLowerCase();
    if (askerQuestionList.length > 0) {
      setFilteredQuestions(
        askerQuestionList.filter(
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
  }, [props.keyword, askerQuestionList]);

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
          {askerQuestionList.length > 0 ? (
            <QuestionCard
              questions={
                filteredQuestions.length > 0
                  ? filteredQuestions
                  : askerQuestionList
              }
            />
          ) : (
            <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              fontSize:16
            }}
          >
            你似乎未問過問題
            <IonRouterLink href="/discuss/createQuestion">去問問題吧~</IonRouterLink>
          </div>
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

  ion-router-link {
    text-decoration: underline;
    margin-top: 1rem;
  }
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default MyQuestion;
