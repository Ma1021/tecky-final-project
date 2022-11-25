import React, { useEffect, useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route } from "react-router-dom";
import {
  IonTabs,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonIcon,
  IonLabel,
  IonSplitPane,
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
import Tab2 from "../pages/Tab2";

// discuss pages
import Discuss from "../pages/question/Discuss";
import CreateQuestion from "../pages/question/CreateQuestion";
import SelectTags from "../pages/question/SelectTags";
import QuestionDetail from "../pages/question/QuestionDetail";

// user pages
import UserInfo from "../pages/user/UserInfo";
import Login from "../pages/Login";
import Register from "../pages/Register";
import UserEdit from "../pages/user/UserEdit";
import ChatroomList from "../pages/chatroom/ChatroomList";
import Subscription from "../pages/user/Subscription";

//common pages
import Menu from "./All/Menu";
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import Chatroom from "../pages/chatroom/Chatroom";
import IndividualStockInfo from "../../stock/IndividualStockInfo";
import StockList from "../../stock/StockList";
import ChatroomForm from "../pages/chatroom/ChatroomForm";

//live pages
import Live from "../pages/live/live";
import LiveRoom from "../pages/live/liveRoom";

const Navigation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("tab1");

  return (
    <IonReactRouter>
      {/* <Menu /> */}
      <IonRouterOutlet>
        <Route exact path="/user/info/" component={UserInfo}></Route>
        <Route exact path="/user/edit/" component={UserEdit}></Route>
        <Route exact path="/question/:id" component={QuestionDetail}></Route>
        <Route exact path="/inbox/:id" component={Inbox}></Route>
        <Route exact path="/chatroom/:id" component={Chatroom}></Route>
        <Route
          exact
          path="/user/subscription/:id"
          component={Subscription}
        ></Route>
        <Route exact path="/chatroom/create" component={ChatroomForm}></Route>
        {/* <Route exact path="/stockList" component={StockList}></Route> */}
        {/* <Route
          exact
          path="/individualStockInfo/:id"
          component={IndividualStockInfo}
        ></Route> */}
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/redirect">
          <Redirect to="/discuss" />
        </Route>

        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/register" component={Register}></Route>
            <Route exact path="/login" component={Login}></Route>
            <Route exact path="/home" component={Home}></Route>
            <Route exact path="/tab1" component={Tab1}></Route>
            <Route exact path="/chatroomList" component={ChatroomList}></Route>
            <Route exact path="/discuss" component={Discuss}></Route>
            <Route exact path="/live" component={Live}></Route>
            <Route exact path="/live/:id" component={LiveRoom}></Route>
            <Route
              exact
              path="/discuss/createQuestion"
              component={CreateQuestion}
            ></Route>
            <Route
              exact
              path="/discuss/createQuestion/selectTag"
              component={SelectTags}
            ></Route>
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
            <IonTabButton
              tab="chatroomList"
              href="/chatroomList"
              className="tabButton"
            >
              <IonIcon
                icon={
                  selectedTab === "chatroomList"
                    ? chatbubbles
                    : chatbubblesOutline
                }
              />
              <IonLabel>聊天室</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/live" className="tabButton">
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
