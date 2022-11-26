import { IonButton, IonMenuToggle, IonButtons } from "@ionic/react";
import React from "react";
import "./UserIcon.css";
import img from "../../img/animal_stand_ookami.png";

interface UserIconProps {}

const UserIcon: React.FC<UserIconProps> = () => {
  const { user } = JSON.parse(localStorage.getItem("auth_stockoverflow") as string)

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
          <img
              src={user.avatar}
              alt="user icon"
              style={{
                width: "2.5rem",
                height: "2.5rem",
                objectFit: "cover",
                borderRadius: "50%",
                overflow:"hidden",
                marginTop:"0.5rem"
              }}
            />
        </IonMenuToggle>
      </IonButtons>
    </>
  );
};

export default UserIcon;
