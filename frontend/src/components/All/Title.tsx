import { IonTitle } from "@ionic/react";
import UserIcon from "./UserIcon";
import Notification from "./Notification";

interface TitleProps {
  title: string | "";
}

const Title: React.FC<TitleProps> = (TitleProps) => {
  return (
    <>
      <IonTitle className="p-0">
        <section className=" d-flex justify-content-between align-items-center w100 h100">
          <UserIcon />
          {TitleProps.title}
          <Notification />
        </section>
      </IonTitle>
    </>
  );
};

export default Title;
