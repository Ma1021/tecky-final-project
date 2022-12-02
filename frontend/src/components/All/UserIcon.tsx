import { IonButton, IonMenuToggle, IonButtons } from "@ionic/react";
import React from "react";
import { useAppSelector } from "../../redux/store";
import "./UserIcon.css";

interface UserIconProps {}

const UserIcon: React.FC<UserIconProps> = () => {
  const avatar = useAppSelector((state) => {
    return state.auth.user?.avatar;
  });

  return (
    <>
      <IonButtons className="pl-1" slot="start">
        <IonMenuToggle
          autoHide={false}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
          }}
          className="d-flex align-items-center justify-content-center"
        >
          {avatar !== undefined ? (
            <img
              src={avatar}
              alt="user icon"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                objectFit: "cover",
                borderRadius: "50%",
                overflow: "hidden",
              }}
            />
          ) : null}
        </IonMenuToggle>
      </IonButtons>
    </>
  );
};

export default UserIcon;
