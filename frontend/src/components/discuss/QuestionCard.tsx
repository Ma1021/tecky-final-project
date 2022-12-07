import {
  IonText,
  IonCard,
  IonCardHeader,
  IonCardContent,
  IonImg,
  IonIcon,
  IonChip
} from "@ionic/react";
import { memo } from "react";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Questions } from "./Allquestion";
import { chatboxEllipses } from "ionicons/icons";
import UserBadge from "../All/UserBadge";
import { useAppSelector } from "../../redux/store";

interface QuestionsProps {
  questions: Questions[];
}

const QuestionCard: React.FC<QuestionsProps> = memo((props: QuestionsProps) => {
  const history = useHistory();
  let reverseAnswer: Array<{
    id: number;
    answers: {
      id: number;
      avatar: string;
      username: string;
      type: string;
    };
    content: string;
    created_at: string;
    likes_user_id: Number[];
  }> = [];

  function formatDate(date: string) {
    const time = new Date(date).toLocaleString([], {
      hour12: false,
      dateStyle: "medium",
      timeStyle: "short",
    });
    return time;
  }

  const { blockedUserList } = useAppSelector((state)=> state.block);

  return (
    <>
      {props.questions.map((question) => {
          reverseAnswer = [...question.answer].reverse();
          reverseAnswer = reverseAnswer.filter((answer)=>{
            return !blockedUserList.includes(answer.answers.id)
          })
        
        return (
          <QuestionContainer
            key={question.id}
            onClick={() => {
              history.push(`/question/${question.id}`);
            }}
          >
            <QuestionHeader>
              <AskerInfo>
                <AskerAvatar src={question.asker_avatar}></AskerAvatar>
                <div className="username">
                  <IonText>{question.asker_username}</IonText>
                  <UserBadge isKOL={question.user_type === "kol"} />
                </div>
              </AskerInfo>
              <IonText style={{ fontSize: 12, color:'#999'}}>
                {formatDate(question.created_at)}
              </IonText>
            </QuestionHeader>
            <QuestionContent>
              <AskerContent>
                <IonText>{question.content}</IonText>
                <TagContainer>
                  {question.stock.map((stock) => {
                    if (stock) {
                      return (
                        <StockTag key={stock.id} data-symbol={stock.symbol}>#{stock.symbol}</StockTag>
                      );
                    }
                  })}
                </TagContainer>
              </AskerContent>

              {reverseAnswer.length > 0 && (
                <AnswererContainer>
                  <AnswererInfo>
                    <AnswererAvatar
                      src={reverseAnswer[0].answers.avatar}
                    ></AnswererAvatar>
                    <IonText>{reverseAnswer[0].answers.username}</IonText>
                    <UserBadge
                      isKOL={reverseAnswer[0].answers.type === "kol"}
                    />
                  </AnswererInfo>
                  <AnswererContent>{reverseAnswer[0].content}</AnswererContent>
                </AnswererContainer>
              )}

              <AnswerAmount>
                <IonText style={{fontSize:12, color:'#999', marginRight:10}}>舉報</IonText>
                <IonIcon icon={chatboxEllipses} />
                <IonText>{reverseAnswer.length}</IonText>
              </AnswerAmount>
            </QuestionContent>
          </QuestionContainer>
        );
      })}
    </>
  );
});

export const QuestionContainer = styled(IonCard)`
  width: 95%;
  margin: 6px;

  @media (min-width: 768px) {
    width: 85%;
  }
`;

const QuestionHeader = styled(IonCardHeader)`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  color: #dedede;
`;

const QuestionContent = styled(IonCardContent)`
  width: 70%;
  float: right;
  position: relative;
  margin: -2rem 8% 1rem 0rem;
  background-color: #efefef;
  text-align: start;
  padding: 10px;
  display: flex;
  flex-direction: column;
  font-size: 14px;
  background-color: #333;
  color: #dedede;

  @media (min-width: 768px) {
    width: 80%;
    padding: 20px;
    font-size: 15px;
  }
`;

const TagContainer = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-top: 1rem;
`;

const StockTag = styled(IonChip)`
  margin: 0;
  height: 1.8rem;
  line-height: 1.8rem;
  padding: 0rem 0.5rem;
  border-radius: 0.9rem;
  text-align: center;
  color: #fff;
  font-weight: 500;
  background-image: linear-gradient(
    to right bottom,
    #ffc748,
    #ffba53,
    #ffae5e,
    #ffa46a,
    #ff9b75
  );
`;

const AskerContent = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
`;

const AskerInfo = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;

  .username {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    font-size: 15px;
  }
`;

const AskerAvatar = styled(IonImg)`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
`;

const AnswererContainer = styled.div`
  position: relative;
  margin-top: 1rem;
`;

const AnswererInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 10px;
`;

const AnswererAvatar = styled(IonImg)`
  width: 40px;
  height: 40px;
  object-fit: cover;
  border-radius: 50%;
  overflow: hidden;
  align-self: flex-end;
`;

const AnswererContent = styled(IonText)`
  width: 80%;
  position: absolute;
  left: 3.1rem;
  top: 3.2rem;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const AnswerAmount = styled.div`
  height: 2rem;
  margin-top: 3rem;
  margin-right: 0.4rem;
  align-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  ion-icon {
    font-size: 18px;
  }
`;

export default QuestionCard;
