import { IonText, IonCard, IonCardHeader, IonCardContent, IonButton, IonImg, IonRefresher, IonRefresherContent, RefresherEventDetail } from '@ionic/react';
import { memo } from 'react'
import styled from 'styled-components';
import { RootState } from '../../redux/state'
import { useSelector } from 'react-redux';

// memo 防止父組件更新時子組件也更新的問題，改善效能 （只能用在純html的component）
const Allquestion: React.FC = memo(() => {
    let questions = useSelector((state: RootState) => state.questionList)

    function handleRefresh(event: CustomEvent<RefresherEventDetail>) {
        setTimeout(() => {

            event.detail.complete();
        }, 2000);
    }

    return (
        <>
            <IonRefresher slot="fixed" onIonRefresh={handleRefresh}>
                <IonRefresherContent></IonRefresherContent>
            </IonRefresher>
            <AllQuestionPage>
                {questions.map((question) => {
                    return <QuestionContainer key={question.id}>
                        <QuestionHeader>
                            <AskerInfo>
                                <AskerAvatar src={question.asker_avatar}></AskerAvatar>
                                <IonText>{question.asker_username}</IonText>
                            </AskerInfo>
                            <IonText>{question.created_time}</IonText>
                        </QuestionHeader>

                        <QuestionContent>
                            <AskerContent>
                                <IonText>{question.asker_content}</IonText>
                                <QuestionTag>
                                    {question.tags.map((tag) => {
                                        return <IonText key={tag.tag_id}>{tag.tag_name}</IonText>
                                    })}
                                </QuestionTag>
                            </AskerContent>

                            <AnswererInfo>
                                <IonText>{question.answerer_username}</IonText>
                                <AnswererAvatar src={question.answerer_avatar}></AnswererAvatar>
                            </AnswererInfo>
                            <AnswererContent>{question.answerer_content}</AnswererContent>
                        </QuestionContent>

                        <AnswerBtn>答問題</AnswerBtn>
                    </QuestionContainer>
                })}
            </AllQuestionPage>
        </>
    );
});

const AllQuestionPage = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 11px;
`

const QuestionContainer = styled(IonCard)`
    padding: 5px;
    height:260px;
    width: 100%;
    margin: 10px;
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

const QuestionTag = styled.div`
    display:flex;
    gap:10px;
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

export default Allquestion;