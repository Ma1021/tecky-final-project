import {
  IonRefresher,
  IonRefresherContent,
  RefresherEventDetail,
  IonSpinner,
  IonProgressBar,
} from "@ionic/react";
import { memo, useEffect, useState } from "react";
import styled from "styled-components";
import QuestionCard from "./QuestionCard";
import { useAppSelector, useAppDispatch } from "../../redux/store";

import { loadQuestions } from "../../redux/questions/questionSlice";
import { API_ORIGIN } from "../../helper/api";
import { useGet } from "../../hooks/use-get";
import { Question } from "../../redux/questions/state";

export interface Questions {
  id: number;
  content: string;
  created_at: string;
  asker_id: number;
  user_type: string;
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
  answer: Array<{
    id: number;
    answers: {
      id: number;
      type: string;
      avatar: string;
      username: string;
    };
    content: string;
    created_at: string;
    likes_user_id: Array<Number>;
  }>;
}

interface QuestionProps {
  keyword: string;
}

// memo 防止父組件更新時子組件也更新的問題，改善效能 （只能用在純html的component）
const Allquestion: React.FC<QuestionProps> = memo((props: QuestionProps) => {
  const { state: questionList, loading } = useGet<Question[]>("/question", []);

  // const { questionList, loading } = useAppSelector((state) => state.question);
  // const { blockedUserList } = useAppSelector((state)=> state.block);
  let user_id: number;

  if (localStorage.getItem("auth_stockoverflow")) {
    const { user } = JSON.parse(
      localStorage.getItem("auth_stockoverflow") as string
    );
    user_id = user.id;
  }

  // const [filteredQuestions, setFilteredQuestions] = useState(Array<Questions>);
  const [keywordFilter, setKeywordFilter] = useState<Array<Questions>>([]);
  const dispatch = useAppDispatch();

  function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
    console.log("loading");
    dispatch(loadQuestions());

    if (!loading) {
      event.detail.complete();
    }
  }

  useEffect(() => {
    const word = props.keyword.replace(/\s/g, "").toLowerCase();

    setKeywordFilter(
      questionList.filter(
        (question) =>
          question.stock.some(
            (stock) =>
              stock.name.replace(/\s/g, "").toLowerCase().includes(word) ||
              stock.symbol.toLowerCase().includes(word)
          ) || question.content.replace(/\s/g, "").toLowerCase().includes(word)
      )
    );
  }, [props.keyword, questionList]);

  return (
    <>
      <IonRefresher disabled={false} slot="fixed" onIonRefresh={handleRefresh}>
        <IonRefresherContent pullingText="下拉更新"></IonRefresherContent>
      </IonRefresher>
      {loading ? <IonProgressBar type="indeterminate"></IonProgressBar> : null}
      <div>len: {questionList.length}</div>
      {loading && questionList.length == 0 ? (
        <LoadingScreen>
          <IonSpinner name="crescent" /> 載入中...
        </LoadingScreen>
      ) : (
        <QuestionContainer>
          {questionList.length > 0 ? (
            <QuestionCard
              questions={
                keywordFilter.length > 0 ? keywordFilter : questionList
              }
            />
          ) : (
            <div style={{ marginTop: 10 }}>未有問題</div>
          )}
        </QuestionContainer>
      )}
    </>
  );
});

export const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Allquestion;
