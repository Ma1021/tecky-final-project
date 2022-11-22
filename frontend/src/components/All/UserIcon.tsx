import { IonButton, IonMenuToggle, IonButtons } from "@ionic/react";
import React from "react";
import "./UserIcon.css";
import img from "../../img/animal_stand_ookami.png";

interface UserIconProps {}

const UserIcon: React.FC<UserIconProps> = () => {
  return (
    <>
      <IonButtons className="pl-1" slot="start">
        <IonMenuToggle
          autoHide={false}
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          {/* autoHide={false} */}
          <IonButton
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              overflow: "hidden",
              backgroundColor: "pink",
            }}
          >
            <img
              src={img}
              alt="user icon"
              style={{
                width: "100%",
                objectFit: "cover",
              }}
            />
          </IonButton>
        </IonMenuToggle>
      </IonButtons>
    </>
  );
};

export default UserIcon;
