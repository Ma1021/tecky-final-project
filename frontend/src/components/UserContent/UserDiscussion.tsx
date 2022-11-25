import { IonItem, IonSpinner } from "@ionic/react";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import  QuestionCard  from '../../components/discuss/QuestionCard';

const UserDiscussion: React.FC = () => {
  const { askerQuestionList, loading } = useAppSelector((state) => state.question)




  return(
    <>
      {loading ? <LoadingScreen><IonSpinner name="crescent"/> 載入中...</LoadingScreen> : 
      <QuestionContainer>
          {askerQuestionList.length > 0 ? <QuestionCard questions={askerQuestionList} /> : <div style={{marginTop:10}}>沒有問題</div>}
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
`

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`
