import { IonRouterLink, IonSpinner } from "@ionic/react";
import { useAppSelector } from "../../redux/store";
import styled from "styled-components";
import QuestionCard from "../discuss/QuestionCard";

const UserDiscussion: React.FC<{ userId: number }> = (props) => {
  const { userQuestionList, loading } = useAppSelector(
    (state) => state.question
  );

  let user;
  if (localStorage.getItem("auth_stockoverflow") !== null) {
    user = JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
  }

  return (
    <>
      {loading ? (
        <LoadingScreen>
          <IonSpinner name="crescent" /> 載入中...
        </LoadingScreen>
      ) : (
        <QuestionContainer>
          {userQuestionList.length > 0 ? (
            <QuestionCard questions={userQuestionList} />
          ) : user.id === props.userId ? (
            <div
              style={{
                marginTop: 10,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              你似乎未問過問題
              <IonRouterLink href="/discuss/createQuestion">去問問題吧~</IonRouterLink>
            </div>
          ) : (<div style={{
            marginTop: 10, display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}>此用戶沒有提出問題</div>)}
        </QuestionContainer>
      )}
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
`;

const LoadingScreen = styled.div`
  width: 100%;
  height: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
