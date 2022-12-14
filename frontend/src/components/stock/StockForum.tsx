import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loadStockQuestion } from "../../redux/questions/questionSlice";
import QuestionCard from "../discuss/QuestionCard";
import {IonSpinner, IonText, IonRouterLink} from "@ionic/react";
import { Questions } from "../discuss/Allquestion";

const StockForum: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const stock_symbol = history.location.pathname.slice(21)
  const { blockedUserList } = useAppSelector((state)=> state.block);
  const { stockQuestionList, loading } = useAppSelector(
    (state) => state.question
  );
  const [filteredQuestions, setFilteredQuestions] = useState(Array<Questions>);

  const initStockQuestion = useCallback(async () => {
    await dispatch(loadStockQuestion(stock_symbol));
  }, [dispatch]);

  useEffect(()=>{
    initStockQuestion();
  },[])

  useEffect(()=>{
    setFilteredQuestions(
      stockQuestionList.filter((question)=>{
        return !blockedUserList.includes(question.asker_id)
      })
    )
  },[stockQuestionList])

  return (
    <QuestionContainer>
      {loading ? 
      <div className="d-flex  align-items-center justify-content-center" style={{gap:10, marginTop:"80%"}}>
        <IonSpinner name="crescent" />
        <IonText>加載中...</IonText>
      </div>
      : <QuestionCard questions={filteredQuestions}/>
      }
      {stockQuestionList.length === 0 && 
      <div className="d-flex flex-column align-items-center" style={{marginTop:"70%"}}>
        <div>未有相關問題</div>
        <IonRouterLink href="/discuss/createQuestion">去問問題吧~</IonRouterLink>
      </div>
      }
    </QuestionContainer>
  );
};

export default StockForum;

export const QuestionContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 0.5rem;
  
  ion-router-link {
    text-decoration: underline;
    margin-top: 1rem;
  }
`;
