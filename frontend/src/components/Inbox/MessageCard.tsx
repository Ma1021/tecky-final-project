import { IonImg, IonText, IonItemSliding, IonItem, IonItemOptions, IonItemOption } from "@ionic/react";
import styled from "styled-components";

interface MessageStyled {
    isRead: boolean;
}

interface MessageProps {
    notification: {
        id: number,
        created_at: string,
        is_read: boolean,
        notification_type_id: number,
        actor:{
            id: number,
            username: string,
            avatar: string
        },
        target:{
            answer_content?: string,
            answer_id?: number,
            question_content?: string,
            question_id?: number,
            subscription_id?: number
        }
    },
    handleRead: Function
    handleDeleteOne: Function
}

const MessageCard: React.FC<MessageProps> = (props: MessageProps) => {
    const handleRead  = props.handleRead
    
    let obj = {
        notification_id: props.notification.id,
        notification_type: props.notification.notification_type_id,
        target_id: props.notification.target.answer_id || props.notification.target.question_id || props.notification.target.subscription_id,
        is_read: props.notification.is_read 
    }

    function formatDate(date:string) {
        const time = new Date(date).toLocaleString([],{hour12: false, dateStyle:'medium', timeStyle:'short'})
        return time
    }
    
    return (
        <IonItemSliding>
            <Item lines="full" class="ion-no-padding">
                <MessageCardContainer isRead={props.notification.is_read} onClick={()=>{handleRead(obj)}}>
                    <IonImg src={props.notification.actor.avatar}/>
                    <div className="cardBody">
                        <div className="header">
                            <IonText>{props.notification.actor.username}</IonText>
                            <IonText>{formatDate(props.notification.created_at)}</IonText>
                        </div>
                        {props.notification.target.answer_content && <IonText>回覆了你: {props.notification.target.answer_content}</IonText>} 
                        {props.notification.target.question_content && <IonText>提出了問題: {props.notification.target.question_content}</IonText>} 
                        {props.notification.target.subscription_id && <IonText>追蹤了你</IonText>} 
                    </div>
                </MessageCardContainer>
            </Item>
            <IonItemOptions side="end">
                <IonItemOption onClick={()=> {
                    props.handleDeleteOne(obj.notification_type, obj.target_id)

                }}>刪除</IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}

export default MessageCard;

const Item = styled(IonItem)`
    --padding-end: 0px;
    --inner-padding-end: 0px;
`

const MessageCardContainer = styled.div<MessageStyled>`
    width: 100%;
    height: 80px;
    padding: 0.5rem;
    padding-left: 4%;
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 14px;
    
    ion-img {
        width: 2.8rem;
        height: 2.8rem;
        border-radius: 50%;
        overflow: hidden;
        object-fit: cover;
    }

    .cardBody {
        width: 100%;

        .header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 0.3rem;

            ion-text:nth-child(1) {
                font-weight: 600;
            }

            ion-text:nth-child(2) {
                color: #9e9e9e;
                font-size: 12px;
                margin-right: 0.5rem;
            }
        }

        ion-text:nth-child(2) {
            color: #9e9e9e;
        }
    }

    background-color: ${props => props.isRead ? '#222' : '#333'}
`