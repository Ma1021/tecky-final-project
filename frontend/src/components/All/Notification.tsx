import {
  IonButtons,
  IonButton,
  IonIcon,
  IonBadge,
  useIonRouter,
} from "@ionic/react";
import { notificationsOutline } from "ionicons/icons";
import { useHistory } from "react-router";
import { useEffect, useState, memo } from "react";
import styled from "styled-components";

const Notification: React.FC = memo(() => {
  const history = useHistory();
  const [amount, setAmount] = useState(0);

  let user_id: number;

  if (localStorage.getItem("auth_stockoverflow") !== null) {
    const user =
      JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user ||
      undefined;
    user_id = +user.id;
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/${user_id}`)
      .then((response) => response.json())
      .then((data) =>
        setAmount(
          data.filter((notification: any) => !notification.is_read).length
        )
      );
  }, []);

  return (
    <>
      <IonButtons
        className="pr-1 pt-1"
        onClick={() => history.push(`/inbox/${user_id}`, "forward")}
      >
        <IonButton>
          {amount > 0 && <AmountTag>{amount}</AmountTag>}
          <IonIcon
            style={{ color: "#fff" }}
            icon={notificationsOutline}
          ></IonIcon>
        </IonButton>
      </IonButtons>
    </>
  );
});

export default Notification;

const AmountTag = styled(IonBadge)`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8px;
  position: absolute;
  right: -4px;
  top: 0px;
  z-index: 1;
`;
