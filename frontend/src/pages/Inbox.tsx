import { IonPage, IonHeader, IonToolbar, IonButtons, IonBadge, IonBackButton, IonTitle, IonContent, IonSearchbar, IonText, IonFab, IonFabButton, IonFabList, IonIcon } from "@ionic/react"
import MessageCard from "../components/Inbox/MessageCard";
import styled from "styled-components";
import { ellipsisHorizontal } from 'ionicons/icons';
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";

interface Notification {
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
}

const Inbox: React.FC = () => {
    const [ notificationList, setNotificationList ] = useState(Array<Notification>);
    const user_id = 1;
    const amount = (notificationList.filter(notification => !notification.is_read)).length

    const history = useHistory();

    function fetchData() {
        fetch(`http://localhost:8080/notification/${user_id}`)
        .then(response => response.json())
        .then(data => setNotificationList(data));
    }

    useEffect(()=>{
        fetchData()
    }, [])

    const handleRead = useCallback((obj:{notification_id: number, notification_type: number, target_id: number, is_read: boolean})=>{
        console.log('enter handle read function', obj.notification_id);
        if(!obj.is_read) {
            fetch(`http://localhost:8080/notification/${obj.notification_id}`, {
                method:'PUT',
                headers:{'Content-Type': 'application/json'}
            })
            .then(response => {
                if(response.ok) {
                    fetchData()
                    if(obj.notification_type === 1 || 2) {
                        history.push(`/question/${obj.target_id}`);
                    }
                }
            })
        } else {
            if(obj.notification_type === 1 || 2) {
                history.push(`/question/${obj.target_id}`);
            }
        }

    }, [notificationList])

    return (
        <IonPage id="main-content">
            <IonHeader translucent={true} collapse="fade">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/discuss" />
                    </IonButtons>
                    <IonTitle>訊息</IonTitle>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonSearchbar placeholder="搜索 用戶名稱/ 內容"></IonSearchbar>

                <TodayContainer>
                    <div className="todayHeader">
                        <IonText>今日訊息</IonText>
                        {amount > 0 && <IonBadge>未讀: {amount}</IonBadge>}
                        <IonFab horizontal="end"> 
                            <IonFabButton size="small">
                                <IonIcon icon={ellipsisHorizontal}></IonIcon>
                            </IonFabButton>
                            <IonFabList side="start">
                                <IonFabButton color="primary">
                                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M44 24C44 35.0457 35.0457 44 24 44C18.0265 44 4 44 4 44C4 44 4 29.0722 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M13.9999 26L20 32L33 19" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    <IonText>標記全部已讀</IonText>
                                </IonFabButton>
                                <IonFabButton color="primary">
                                    <svg width="18" height="18" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M20 5.91406H28V13.9141H43V21.9141H5V13.9141H20V5.91406Z" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M8 40H40V22H8V40Z" fill="none" stroke="#fff" stroke-width="3" stroke-linejoin="round"/><path d="M16 39.8976V33.9141" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M24 39.8977V33.8977" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M32 39.8976V33.9141" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 40H36" stroke="#fff" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                                    <IonText>清除全部訊息</IonText>
                                </IonFabButton>
                            </IonFabList>
                        </IonFab>
                    </div>
                    <InboxMessageContainer>
                        { notificationList.length > 0 ? 
                        notificationList.map((notification:Notification)=> <MessageCard key={notification.id} notification={notification} handleRead={handleRead}/>) 
                        : <div>沒有訊息</div> }
                    </InboxMessageContainer>
                </TodayContainer>

            </IonContent>
        </IonPage>
    )
}

export default Inbox;

const InboxMessageContainer = styled.div`
    width: 100%;
    margin-top: 0.7rem;
`

const TodayContainer = styled.div`
    border-radius: 1.5rem 1.5rem 0rem 0rem;
    background-color: #222;
    min-height: 93%;
    padding-top: 1rem;

    .todayHeader {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 1rem;

        ion-badge {
            position: absolute;
            left: 5.5rem;
        }

        ion-fab-button {
            width: 1.8rem;
            height: 1.8rem;
            
            ion-icon {
                font-size: 18px;
            }
        }

        ion-fab-list {
            display: flex;
            flex-direction: column;
            gap:0.5rem;
            position: absolute;
            top:50px;
            left:-115px;            

            ion-fab-button {
                width: 120px;
                --border-radius: 5%;
            }
        }

    }
`