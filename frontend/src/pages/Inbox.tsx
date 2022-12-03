import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonBadge,
  IonBackButton,
  IonTitle,
  IonContent,
  IonSearchbar,
  IonText,
  IonModal,
  useIonToast,
  IonList,
  IonButton,
  IonItem,
  IonImg,
} from "@ionic/react";
import MessageCard from "../components/Inbox/MessageCard";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router";
import Mailbox from '../img/mailbox.png'

interface Notification {
  id: number;
  created_at: string;
  is_read: boolean;
  notification_type_id: number;
  actor: {
    id: number;
    username: string;
    avatar: string;
  };
  target: {
    answer_content?: string;
    answer_id?: number;
    question_content?: string;
    question_id?: number;
  };
}

const Inbox: React.FC = () => {
  const [notificationList, setNotificationList] = useState(Array<Notification>);
  const amount = notificationList.filter(
    (notification) => !notification.is_read
  ).length;
  const { user } = JSON.parse(
    localStorage.getItem("auth_stockoverflow") as string
  );
  const user_id = +user.id;

  const history = useHistory();
  const [toastPresent] = useIonToast();

  function fetchData() {    
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/${user_id}`)
      .then((response) => response.json())
      .then((data) => setNotificationList(data));
  }

  useEffect(() => {
    fetchData();
  }, [notificationList.length]);

  const handleRead = useCallback(
    (obj: {
      notification_id: number;
      notification_type: number;
      target_id: number;
      is_read: boolean;
    }) => {
      if (!obj.is_read) {
        fetch(
          `${process.env.REACT_APP_PUBLIC_URL}/notification/${obj.notification_id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
          }
        ).then((response) => {
          if (response.ok) {
            fetchData();
            if (obj.notification_type === 1 || obj.notification_type === 2) {
              history.push(`/question/${obj.target_id}`);
            }
          }
        });
      } else {
        if (obj.notification_type === 1 || obj.notification_type === 2) {
          history.push(`/question/${obj.target_id}`);
        }
      }
    },
    [notificationList]
  );

  function handleReadAll() {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/readAll/${user_id}`, {
      method:'PUT',
      headers:{"Content-Type":"application/json"}
    }).then((response)=>{
      if(response.ok) {
        fetchData();
      }
    })
  }

  function handleDeleteAll() {
    setNotificationList([]);
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/notification/user/${user_id}`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }
    ).then((response)=>{
      if (response.status === 409) {
        toastPresent({
          message: "沒有訊息可刪除",
          duration: 1500,
          position: "bottom",
        });
        return
      }
      toastPresent({
        message: "刪除訊息成功",
        duration: 1500,
        position: "bottom",
      });
    })
  }

  function handleDeleteOne(target_type_id: number, target_id: number) {    
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification`,
      {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ target_type_id, target_id }),
      }
    ).then(response => {      
      if (response.status === 404) {
        toastPresent({
          message: "沒有訊息可刪除",
          duration: 1500,
          position: "bottom",
        });
        return
      }
      toastPresent({
        message: "刪除訊息成功",
        duration: 1500,
        position: "bottom",
      });
      fetchData();
    });    
  }  
  
  return (
    <IonPage id="main-content">
      <IonHeader translucent={true} collapse="fade">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discuss" text="返回"/>
          </IonButtons>
          <IonTitle>訊息</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonSearchbar placeholder="搜索 用戶名稱/ 內容"></IonSearchbar>
        <MessageContainer>
          <div className="todayHeader">
            <IonText>訊息</IonText>
            {amount > 0 && <IonBadge>未讀: {amount}</IonBadge>}
            <IonButton id="open-modal">
              <IonText>...</IonText>
            </IonButton>
            <IonModal
              trigger="open-modal"
              initialBreakpoint={0.3}
              breakpoints={[0, 0.25, 0.5, 0.75]}
              handleBehavior="cycle"
            >
              <IonContent className="ion-padding-top">
                <div className="ion-margin-top">
                  <ModalItem lines="full" onClick={handleReadAll}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M44 24C44 35.0457 35.0457 44 24 44C18.0265 44 4 44 4 44C4 44 4 29.0722 4 24C4 12.9543 12.9543 4 24 4C35.0457 4 44 12.9543 44 24Z"
                        fill="none"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.9999 26L20 32L33 19"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <IonText style={{ marginLeft: 10 }}>標記全部已讀</IonText>
                  </ModalItem>
                  <ModalItem lines="full" onClick={()=>{
                      handleDeleteAll();
                  }}>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 48 48"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M20 5.91406H28V13.9141H43V21.9141H5V13.9141H20V5.91406Z"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M8 40H40V22H8V40Z"
                        fill="none"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M16 39.8976V33.9141"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M24 39.8977V33.8977"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M32 39.8976V33.9141"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M12 40H36"
                        stroke="#fff"
                        stroke-width="3"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                    <IonText style={{ marginLeft: 10 }}>清除全部訊息</IonText>
                  </ModalItem>
                </div>
              </IonContent>
            </IonModal>
          </div>
          <InboxMessageContainer>
            {notificationList.length > 0 ? (
              <IonList class="ion-no-padding">
                {notificationList.map((notification: Notification) => (
                  <MessageCard
                    key={notification.id}
                    notification={notification}
                    handleRead={handleRead}
                    handleDeleteOne={handleDeleteOne}
                    fetchData={fetchData}
                  />
                ))}
              </IonList>
            ) : (
              <div style={{height:'40vh'}} className="d-flex flex-column align-items-center justify-content-center">
                <IonImg style={{width:150, height: 150}} src={Mailbox}></IonImg>
                <IonText>沒有訊息</IonText>
              </div>
            )}
          </InboxMessageContainer>
        </MessageContainer>
      </IonContent>
    </IonPage>
  );
};

export default Inbox;

const InboxMessageContainer = styled.div`
  width: 100%;
  margin-top: 0.7rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  ion-list {
    width: 100%;
  }
`;

const ModalItem = styled(IonItem)`
  margin: 0.5rem 1rem;
  --ion-item-background: #333;
  border-radius: 0.6rem;
  font-size: 15px;
  font-weight: 500;
`;

const MessageContainer = styled.div`
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
      left: 3.5rem;
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
      gap: 0.5rem;
      position: absolute;
      top: 50px;
      left: -115px;

      ion-fab-button {
        width: 120px;
        --border-radius: 5%;
      }
    }

    ion-button {
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      overflow: hidden;

      ion-text {
        width: 2rem;
        height: 2rem;
        font-size: 20px;
        font-weight: 800;
      }
    }
  }
`;
