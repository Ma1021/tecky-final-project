import React, { useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
} from "@ionic/react";
import {
  chatboxEllipses,
  trendingUp,
  videocam,
  newspaper,
  chatbubbles,
  newspaperOutline,
  chatboxEllipsesOutline,
  chatbubblesOutline,
  videocamOutline,
} from "ionicons/icons";
import "./Navigation.css";

import Tab1 from "../pages/Tab1";
import Discuss from "../pages/question/Discuss";
import Tab2 from "../pages/Tab2";
import CreateQuestion from "../pages/question/CreateQuestion";
import SelectTags from "../pages/question/SelectTags";
import Menu from "./All/Menu";
import UserInfo from "../pages/UserInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Home from "../pages/Home";
import QuestionDetail from "../pages/question/QuestionDetail";

const Navigation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <IonReactRouter>
      <Menu />
      <IonRouterOutlet>
        <Route exact path="/userInfo" component={UserInfo}></Route>
        <Route exact path="/discuss/createQuestion" component={CreateQuestion}></Route>
        <Route exact path="/discuss/createQuestion/selectTag" component={SelectTags}></Route>
        <Route exact path="/question/:id" component={QuestionDetail}></Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/tab1" component={Tab1}></Route>
            <Route exact path="/tab2" component={Tab2}></Route>
            <Route exact path="/discuss" component={Discuss}></Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar
            slot="bottom"
            className="tabBar"
            onIonTabsWillChange={(e) => setSelectedTab(e.detail.tab)}
          >
            <IonTabButton tab="tab1" href="/tab1" className="tabButton">
              <IonIcon
                icon={selectedTab === "tab1" ? newspaper : newspaperOutline}
              />
              <IonLabel>資訊</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2" className="tabButton">
              <IonIcon icon={trendingUp} />
              <IonLabel>市場</IonLabel>
            </IonTabButton>
            <IonTabButton tab="discuss" href="/discuss" className="tabButton">
              <IonIcon
                icon={
                  selectedTab === "discuss"
                    ? chatboxEllipses
                    : chatboxEllipsesOutline
                }
              />
              <IonLabel>討論區</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4" className="tabButton">
              <IonIcon
                icon={selectedTab === "tab4" ? chatbubbles : chatbubblesOutline}
              />
              <IonLabel>聊天室</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/tab5" className="tabButton">
              <IonIcon
                icon={selectedTab === "tab5" ? videocam : videocamOutline}
              />
              <IonLabel>直播</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Navigation;
