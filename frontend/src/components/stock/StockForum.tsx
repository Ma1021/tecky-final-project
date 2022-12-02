import React from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCallback, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import { loadStockQuestion } from "../../redux/questions/questionSlice";
import QuestionCard from "../discuss/QuestionCard";
import {IonSpinner, IonText} from "@ionic/react";

const StockForum: React.FC = () => {
  const dispatch = useAppDispatch();
  const history = useHistory();
  const stock_symbol = history.location.pathname.slice(21)

  const { stockQuestionList, loading } = useAppSelector(
    (state) => state.question
  );

  const initStockQuestion = useCallback(async () => {
    await dispatch(loadStockQuestion(stock_symbol));
  }, [dispatch]);

  useEffect(()=>{
    initStockQuestion();
  },[])

  return (
    <QuestionContainer>
      {loading ? 
      <div className="d-flex  align-items-center justify-content-center" style={{gap:10, marginTop:"80%"}}>
        <IonSpinner name="crescent" />
        <IonText>加載中...</IonText>
      </div>
      : <QuestionCard questions={stockQuestionList}/>
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
`;
