import { IonText, IonCard, IonCardHeader, IonCardContent, IonButton, IonImg } from '@ionic/react';
import { memo } from 'react'
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { Questions } from './Allquestion'

interface QuestionsProps {
    questions: Questions[]
    user_id: number
}

const QuestionCard: React.FC<QuestionsProps> = memo((props:QuestionsProps)=>{
    const history = useHistory();

    return (
        <>
            {props.questions.map((question) => {
                return <QuestionContainer key={question.id} onClick={() => {history.push(`/question/${question.id}`)}}>
                    <QuestionHeader>
                        <AskerInfo>
                            <AskerAvatar src={question.asker_avatar}></AskerAvatar>
                            <IonText>{question.asker_username}</IonText>
                        </AskerInfo>
                        <IonText style={{fontSize:12}}>{question.created_at.slice(0,10) + ' ' + question.created_at.slice(11,16)}</IonText>
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
                        {/* <AnswererInfo>
                            <IonText>{question.answerer_username}</IonText>
                            <AnswererAvatar src={question.answerer_avatar}></AnswererAvatar>
                        </AnswererInfo>
                        <AnswererContent>{question.answerer_content}</AnswererContent> */}
                    </QuestionContent>
                    
                    {question.asker_id !== props.user_id && <AnswerBtn>答問題</AnswerBtn>}
                </QuestionContainer>
            })}
        </>
    )
})

const QuestionContainer = styled(IonCard)`
    height:260px;
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
    position: absolute;
    top: 55px;
    left: 90px;
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
    margin-top:0.8rem;
`

const StockTag = styled(IonText)`
    height: 1.8rem;
    line-height:1.8rem;
    padding: 0rem 0.5rem;
    border-radius: 0.9rem;
    text-align: center;
    background-color: #F2B950;
    color: #fff;
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
    justify-content: flex-end;
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
    width:100%;
    text-align: end;
    margin-top: 10px;
    padding-right: 3rem;
`
const AnswerBtn = styled(IonButton)`
    position: absolute;
    bottom: 0;
    right: 1.2rem;
    height: 2.5rem;
    margin-bottom:1rem;
    font-size:14px;
`

const DeleteBtn = styled(IonButton)`
    position: absolute;
    bottom: 0;
    right: 6rem;
    height: 2.5rem;
    margin-bottom:1rem;
    font-size:14px;
`

export default QuestionCard;