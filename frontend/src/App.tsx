import { IonApp, setupIonicReact } from "@ionic/react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

// import component
import Navigation from "./components/Navigation";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux/store";
import { login } from "./redux/auth/actions";
import { AuthState } from "./redux/auth/state";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth);

  useEffect(() => {
    // const auth = async () => {
    //   await Preferences.get({ key: "auth_stockoverflow" });
    // };
    const localAuthString = localStorage.getItem("auth_stockoverflow");
    if (!!localAuthString) {
      const localAuthJson: AuthState = JSON.parse(localAuthString);
      console.log("Navigation: authJson after parse", localAuthJson);
      if (!localAuthJson.user || !localAuthJson.token) {
        console.log("not logged in");
        return;
      }
      dispatch(login(localAuthJson.user, localAuthJson.token));
    }
  }, []);

  return (
    <IonApp>
      <Navigation />
    </IonApp>
  );
};

export default App;
