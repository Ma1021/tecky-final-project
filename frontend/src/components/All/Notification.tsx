import { IonButtons, IonButton, IonIcon, IonBadge } from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useEffect, useState, memo } from 'react';
import styled from "styled-components";

const Notification: React.FC = memo(() => {
  const history = useHistory();
  const [ amount, setAmount ] =useState(0);

  const user_id = 1;

  useEffect(()=>{
    fetch(`http://localhost:8080/notification/${user_id}`)
    .then(response => response.json())
    .then(data => setAmount((data.filter((notification: any) => !notification.is_read).length)));
}, [])

  return (
    <>
      <IonButtons className="pr-1 pt-1" onClick={() => history.push('/inbox/1')}>
        <IonButton>
          {amount > 0 && <AmountTag>{amount}</AmountTag>}
          <IonIcon style={{color:'#fff'}} icon={notificationsOutline}></IonIcon>
        </IonButton>
      </IonButtons>
    </>
  );
});

export default Notification;

const AmountTag = styled(IonBadge)`
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  position: absolute;
  right:-5px;
  top:0px;
  z-index:1;
`