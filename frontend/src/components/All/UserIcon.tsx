import { IonButton, IonMenuToggle, IonButtons } from "@ionic/react";
import React from "react";
import "./UserIcon.css";

interface UserIconProps {}

const UserIcon: React.FC<UserIconProps> = () => {
  let user

  if(localStorage.getItem("auth_stockoverflow") !== null) {
    user = JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
  }

  return (
    <>
      <IonButtons className="pl-1" slot="start">
        <IonMenuToggle
          autoHide={false}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
        >
          {/* autoHide={false} */}
          {/* <IonButton
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "pink",
            }}
          >

          </IonButton> */}
          {user && 
          <img
              src={user.avatar}
              alt="user icon"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                objectFit: "cover",
                borderRadius: "50%",
                overflow:"hidden",
              }}
          />}
        </IonMenuToggle>
      </IonButtons>
    </>
  );
};

export default UserIcon;
