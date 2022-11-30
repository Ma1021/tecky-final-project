import { IonContent, IonHeader, IonPage, IonToolbar } from "@ionic/react";
import Menu from "../components/All/Menu";
import Title from "../components/All/Title";
import ExploreContainer from "../components/ExploreContainer";
import "src/pages/Tab1.css";

const Tab1: React.FC = () => {
  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <Title title="Tab 1" />
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <ExploreContainer name="Tab 1 page" />
        </IonContent>
      </IonPage>
    </>
  );
};

export default Tab1;
