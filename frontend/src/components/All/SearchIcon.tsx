import { IonButtons, IonButton, IonIcon } from "@ionic/react";
import { search } from "ionicons/icons";
import { useHistory } from "react-router";

const SearchIcon: React.FC = () => {
  const history = useHistory();
  return (
    <>
      <IonButtons className="pr-1 pt-1" onClick={() => history.push("/search")}>
        <IonButton>
          <IonIcon style={{ color: "#fff" }} icon={search}></IonIcon>
        </IonButton>
      </IonButtons>
    </>
  );
};

export default SearchIcon;
