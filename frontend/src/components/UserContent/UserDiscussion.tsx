import {IonRouterLink, IonSpinner } from "@ionic/react";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import  QuestionCard  from '../../components/discuss/QuestionCard';

const UserDiscussion: React.FC = () => {
  const { askerQuestionList, loading } = useAppSelector((state) => state.question)

  return(
    <>
      {loading ? <LoadingScreen><IonSpinner name="crescent"/> 載入中...</LoadingScreen> : 
      <QuestionContainer>
          {askerQuestionList.length > 0 ? <QuestionCard questions={askerQuestionList} /> : 
          <div style={{marginTop:10, display:'flex', flexDirection:'column', alignItems:'center'}}>
            你似乎未問過問題
            <IonRouterLink href="/discuss">去問問題吧~</IonRouterLink>
          </div>}
      </QuestionContainer>}
    </>
  );
};

export default UserDiscussion;

const QuestionContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    ion-router-link {
      text-decoration: underline;
      margin-top: 1rem;
    }
`

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
