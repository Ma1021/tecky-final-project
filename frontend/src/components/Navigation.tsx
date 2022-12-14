import React, { useState } from "react";
import { IonReactRouter } from "@ionic/react-router";
import { Redirect, Route, Switch } from "react-router-dom";
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
import Subscription from "../pages/user/Subscription";

//common pages
import Home from "../pages/Home";
import Inbox from "../pages/Inbox";
import IndividualStockInfo from "../pages/stock/IndividualStockInfo";
import StockList from "../pages/stock/StockList";

// chat pages
import ChatroomForm from "../pages/chatroom/ChatroomForm";
import ChatroomPage from "../pages/chatroom/ChatroomPage";
import ChatroomList from "../pages/chatroom/ChatroomList";
import ChatroomNamelist from "../pages/chatroom/ChatroomNamelist";

//KOL ranking pages
import KOL from "../pages/ranking/Ranking";

// User Analysis pages
import Analytics from "../pages/analytics/Analytics";

// admin panel
import AdminPanel from "../pages/adminPanel/AdminPanel";

import PaperTradeAccountOverview from "../pages/paperTrade/PaperTradeAccountOverview";
import IndividualAccount from "../pages/paperTrade/IndividualAccount";
import PaperTradeOrder from "../pages/paperTrade/PaperTradeOrder";
import PaperTradeRecords from "../pages/paperTrade/PaperTradeRecords";
import PaperTradeAnalysis from "../pages/paperTrade/PaperTradeAnalysis";
import SearchPage from "../pages/Search";
import { useAppSelector } from "../redux/store";

const Navigation: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("discuss");
  const userToken = useAppSelector(state=>state.auth.token)
  // if(userToken)


  return (
    // userToken !== null ?
    <IonReactRouter>
      <Switch>
        <IonRouterOutlet animated={false}>
          <Route exact={true} path="/register" component={Register}></Route>
          <Route exact={true} path="/login" component={Login}></Route>
          <Route exact={true} path="/home" component={Home}></Route>
          <Route exact={true} path="/search" component={SearchPage}></Route>
          <Route
            exact={true}
            path="/user/:id/info/"
            component={UserInfo}
          ></Route>
          <Route
            exact={true}
            path="/user/:id/edit/"
            component={UserEdit}
          ></Route>
          <Route
            exact={true}
            path="/question/:id"
            component={QuestionDetail}
          ></Route>
          <Route exact={true} path="/inbox/:id" component={Inbox}></Route>
          <Route
            exact={true}
            path="/chatroom/:id"
            component={ChatroomPage}
          ></Route>
          <Route
            exact={true}
            path="/analysis/:id"
            component={Analytics}
          ></Route>
          <Route exact={true} path="/admin" component={AdminPanel}></Route>
          <Route
            exact={true}
            path="/chatroom/:id/namelist"
            component={ChatroomNamelist}
          ></Route>
          <Route
            exact={true}
            path="/user/subscription/:id"
            component={Subscription}
          ></Route>
          <Route
            exact={true}
            path="/chatroom/create"
            component={ChatroomForm}
          ></Route>
          <Route
            exact={true}
            path="/individualStockInfo/:symbol"
            component={IndividualStockInfo}
          ></Route>
          <Route
            exact={true}
            path="/paperOrderPanel/:account"
            component={PaperTradeOrder}
          ></Route>
          <Route
            exact={true}
            path="/paperTradeRecords/:account/:userID"
            component={PaperTradeRecords}
          ></Route>
          <Route
            exact={true}
            path="/paperTradeAnalysis/:account/:userID"
            component={PaperTradeAnalysis}
          ></Route>
          <Route exact={true} path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact={true} path="/redirect">
            <Redirect to="/discuss" />
          </Route>
          <Route
            exact={true}
            path="/discuss/createQuestion"
            component={CreateQuestion}
          ></Route>
          <Route
            exact={true}
            path="/discuss/createQuestion/selectTag"
            component={SelectTags}
          ></Route>
          <Route
            exact={true}
            path="/individualAccount/:account"
            component={IndividualAccount}
          ></Route>

          <IonTabs>
            <IonRouterOutlet animated={false} ionPage>
              <Route
                exact={true}
                path="/paperTrade"
                component={PaperTradeAccountOverview}
              ></Route>
              <Route
                exact={true}
                path="/stockList"
                component={StockList}
              ></Route>
              <Route
                exact={true}
                path="/chatroomList"
                component={ChatroomList}
              ></Route>
              <Route exact={true} path="/discuss" component={Discuss}></Route>
              <Route exact={true} path="/kol" component={KOL}></Route>
              <Route exact={true} path="/">
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
                <IonLabel>????????????</IonLabel>
              </IonTabButton>
              <IonTabButton
                tab="stockList"
                href="/stockList"
                className="tabButton"
              >
                <IonIcon icon={trendingUp} />
                <IonLabel>??????</IonLabel>
              </IonTabButton>
              <IonTabButton tab="discuss" href="/discuss" className="tabButton">
                <IonIcon
                  icon={
                    selectedTab === "discuss"
                      ? chatboxEllipses
                      : chatboxEllipsesOutline
                  }
                />
                <IonLabel>?????????</IonLabel>
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
                <IonLabel>?????????</IonLabel>
              </IonTabButton>
              <IonTabButton tab="tab5" href="/kol" className="tabButton">
                <IonIcon icon={selectedTab === "tab5" ? flame : flameOutline} />
                <IonLabel>?????????</IonLabel>
              </IonTabButton>
            </IonTabBar>
          </IonTabs>
        </IonRouterOutlet>
      </Switch>
    </IonReactRouter>
    // :
    // <IonReactRouter>
    //   <Switch>
    //     <IonRouterOutlet animated={false}>
    //       <Route exact={true} path="/register" component={Register}></Route>
    //       <Route exact={true} path="/login" component={Login}></Route>
    //       <Route exact={true} path="/home" component={Home}></Route>
    //       <Route path="/" component={Home}></Route>
    //     </IonRouterOutlet>
    //   </Switch>
    // </IonReactRouter>
  );
};

export default Navigation;
