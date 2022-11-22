import { IonImg, IonText } from "@ionic/react";
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
            question_id?: number
        }
    },
    handleRead: Function
}

const MessageCard: React.FC<MessageProps> = (props: MessageProps) => {
    const handleRead  = props.handleRead
    
    let obj = {
        notification_id: props.notification.id,
        notification_type: props.notification.notification_type_id,
        target_id: props.notification.target.answer_id || props.notification.target.question_id,
        is_read: props.notification.is_read 
    }

    function formatDate(date:string) {
        const time = new Date(date).toLocaleString([],{hour12: false, dateStyle:'medium', timeStyle:'short'})
        return time
    }
    
    return (
       <MessageCardContainer isRead={props.notification.is_read} onClick={()=>{handleRead(obj)}}>
        <IonImg src={props.notification.actor.avatar}/>
        <div className="cardBody">
            <div className="header">
                <IonText>{props.notification.actor.username}</IonText>
                <IonText>{formatDate(props.notification.created_at)}</IonText>
            </div>
            {props.notification.target.answer_content && <IonText>回覆了你: {props.notification.target.answer_content}</IonText>} 
            {props.notification.target.question_content && <IonText>提出了問題: {props.notification.target.question_content}</IonText>} 
        </div>
       </MessageCardContainer> 
    )
}

export default MessageCard;

const MessageCardContainer = styled.div<MessageStyled>`
    width: 100%;
    border-bottom: 1px solid rgba(255,255,255,0.1);
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