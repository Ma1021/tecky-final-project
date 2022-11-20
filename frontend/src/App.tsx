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
import { useAppDispatch } from "./redux/store";
import { login } from "./redux/auth/actions";

setupIonicReact();

const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // const auth = async () => {
    //   await Preferences.get({ key: "auth_stockoverflow" });
    // };
    const auth = localStorage.getItem("auth_stockoverflow");
    let isAuth: null | boolean = null;
    if (auth) {
      const authJson = JSON.parse(auth);
      isAuth = authJson.isAuthenticated;
      if (isAuth) {
        console.log("authJson at App", authJson);
        fetch(
          `${process.env.REACT_APP_PUBLIC_URL}/user/${authJson.user.id}`
        ).then((res) => {
          console.log("res at App", res);
          res.json().then((json) => {
            dispatch(login(json.user, json.token));
          });
        });
      }
    }
  });

  return (
    <IonApp>
      <Navigation />
    </IonApp>
  );
};

export default App;
