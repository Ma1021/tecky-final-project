import { IonText, IonCard, IonCardHeader, IonCardContent, IonImg, IonIcon } from '@ionic/react';
import { memo } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Questions } from './Allquestion'
import { chatboxEllipses } from 'ionicons/icons';

interface QuestionsProps {
    questions: Questions[]
    user_id: number
}

const QuestionCard: React.FC<QuestionsProps> = memo((props:QuestionsProps)=>{
    const history = useHistory();
    let reverseAnswer: Array<{
        id: number,
        answers:{
            id: number,
            avatar: string,
            username: string
        },
        content: string,
        created_at: string,
        likes_user_id: Number[]
    }> = [];
    
    function formatDate(date:string) {
        const time = new Date(date).toLocaleString([],{hour12: false, dateStyle:'medium', timeStyle:'short'})
        return time
    }

    return (
        <>
            {props.questions.map((question) => {
                if(Array.isArray(question.answer)) {
                    reverseAnswer = [...question.answer].reverse()
                } else {
                    reverseAnswer.push(question.answer)
                }
                
                return <QuestionContainer key={question.id} onClick={() => {history.push(`/question/${question.id}`)}}>
                    <QuestionHeader >
                        <AskerInfo>
                            <AskerAvatar src={question.asker_avatar}></AskerAvatar>
                            <IonText>{question.asker_username}</IonText>
                        </AskerInfo>
                        <IonText style={{fontSize:12}}>{formatDate(question.created_at)}</IonText>
                    </QuestionHeader>
                    <QuestionContent>
                        <AskerContent>
                            <IonText>{question.content}</IonText>
                            <TagContainer>
                                {question.stock.map((stock) => {
                                    if(stock) {
                                        return <StockTag key={stock.id}>#{stock.symbol}</StockTag>
                                    }
                                })}
                            </TagContainer>
                        </AskerContent>

                        {reverseAnswer.length > 0 && 
                        <>                          
                            <AnswererInfo>
                                <AnswererAvatar src={reverseAnswer[0].answers.avatar}></AnswererAvatar>
                                <IonText>{reverseAnswer[0].answers.username}</IonText>
                            </AnswererInfo>
                            <AnswererContent>{reverseAnswer[0].content}</AnswererContent>    
                        </>
                        }
                        
                        <AnswerAmount>
                            <IonIcon icon={chatboxEllipses}/>
                            <IonText>{reverseAnswer.length}</IonText>
                        </AnswerAmount>
                    </QuestionContent>
                </QuestionContainer>
            })}
        </>
    )
})

const QuestionContainer = styled(IonCard)`
    width: 95%;
    margin: 6px;
`

const QuestionHeader = styled(IonCardHeader)`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    color: #dedede;
`

const QuestionContent = styled(IonCardContent)`
    width: 70%;
    float:right;
    position: relative;
    margin: -2rem 1.8rem 1rem 0rem;
    background-color: #efefef;
    text-align: start;
    padding: 10px;
    display: flex;
    flex-direction: column;
    font-size: 14px;
    background-color:#333;
    color: #dedede;
`

const TagContainer = styled.div`
    display:flex;
    gap:10px;
    flex-wrap: wrap;
    margin-top:0.8rem;
`

const StockTag = styled(IonText)`
    height: 1.8rem;
    line-height:1.8rem;
    padding: 0rem 0.5rem;
    border-radius: 0.9rem;
    text-align: center;
    color: #fff;
    font-weight: 600;
    background-image: linear-gradient(to right bottom, #ffc748, #ffba53, #ffae5e, #ffa46a, #ff9b75);
    `

const AskerContent = styled.div`
    display:flex ;
    flex-direction: column;
    margin-top:10px;
`

const AskerInfo = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 10px;
`

const AskerAvatar = styled(IonImg)`
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
`

const AnswererInfo = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top:10px
`

const AnswererAvatar = styled(IonImg)`
    width: 40px;
    height: 40px;
    object-fit: cover;
    border-radius: 50%;
    overflow: hidden;
    align-self: flex-end;
`

const AnswererContent = styled(IonText)`
    width:90%;
    margin-left:21%;
`
const AnswerAmount = styled.div`
    height: 2rem;
    margin-top:2rem;
    margin-right: 0.4rem;
    align-self: flex-end;
    display: flex;
    align-items: center;
    gap:0.5rem;
    
    ion-icon {
        font-size: 18px;
    }
`

export default QuestionCard;