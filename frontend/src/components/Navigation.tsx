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
  wallet,
  chatbubbles,
  walletOutline,
  chatboxEllipsesOutline,
  chatbubblesOutline,
  flame,
  flameOutline,
} from "ionicons/icons";
import "./Navigation.css";

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
import IndividualStockInfo from "../pages/stock/IndividualStockInfo";
import StockList from "../pages/stock/StockList";
import ChatroomForm from "../pages/chatroom/ChatroomForm";

//KOL ranking pages
import KOL from "../pages/ranking/Ranking";

// User Analysis pages
import Analytics from "../pages/analytics/Analytics";
import ChatroomPage from "../pages/chatroom/ChatroomPage";

import PaperTradeAccountOverview from "../pages/stock/PaperTradeAccountOverview";
import IndividualAccount from "../pages/stock/IndividualAccount";
import PaperTradePanel from "../pages/stock/PaperTradePanel";
import PaperTradeRecords from "../pages/stock/PaperTradeRecords";
import PaperTradeAnalysis from "../pages/stock/PaperTradeAnalysis";

const Navigation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("discuss");

  return (
    <IonReactRouter>
      {/* <Menu /> */}
      <IonRouterOutlet>
        <Route exact path="/register" component={Register}></Route>
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/home" component={Home}></Route>
        <Route exact path="/user/:id/info/" component={UserInfo}></Route>
        <Route exact path="/user/:id/edit/" component={UserEdit}></Route>
        <Route exact path="/question/:id" component={QuestionDetail}></Route>
        <Route exact path="/inbox/:id" component={Inbox}></Route>
        <Route exact path="/chatroom/:id" component={ChatroomPage}></Route>
        <Route exact path="/analysis/:id" component={Analytics}></Route>
        <Route
          exact
          path="/user/subscription/:id"
          component={Subscription}
        ></Route>
        <Route exact path="/chatroom/create" component={ChatroomForm}></Route>
        <Route
          exact
          path="/individualStockInfo/:symbol"
          component={IndividualStockInfo}
        ></Route>
        <Route
          exact
          path="/paperTradePanel"
          component={PaperTradePanel}
        ></Route>
        <Route
          exact
          path="/paperTradeRecords/:userID"
          component={PaperTradeRecords}
        ></Route>
        <Route
          exact
          path="/paperTradeAnalysis/:userID"
          component={PaperTradeAnalysis}
        ></Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/redirect">
          <Redirect to="/discuss" />
        </Route>

        <IonTabs>
          <IonRouterOutlet>
            <Route
              exact
              path="/paperTrade"
              component={PaperTradeAccountOverview}
            ></Route>
            <Route
              exact
              path="/individualAccount/:category"
              component={IndividualAccount}
            ></Route>
            <Route exact path="/stockList" component={StockList}></Route>
            <Route exact path="/chatroomList" component={ChatroomList}></Route>
            <Route exact path="/discuss" component={Discuss}></Route>
            <Route exact path="/kol" component={KOL}></Route>
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
            selectedTab="discuss"
            slot="bottom"
            className="tabBar"
            onIonTabsWillChange={(e) => setSelectedTab(e.detail.tab)}
          >
            <IonTabButton
              tab="paperTrade"
              href="/paperTrade"
              className="tabButton"
            >
              <IonIcon
                icon={selectedTab === "paperTrade" ? wallet : walletOutline}
              />
              <IonLabel>模擬交易</IonLabel>
            </IonTabButton>
            <IonTabButton
              tab="stockList"
              href="/stockList"
              className="tabButton"
            >
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
            <IonTabButton tab="tab5" href="/kol" className="tabButton">
              <IonIcon icon={selectedTab === "tab5" ? flame : flameOutline} />
              <IonLabel>排行榜</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonRouterOutlet>
    </IonReactRouter>
  );
};

export default Navigation;
