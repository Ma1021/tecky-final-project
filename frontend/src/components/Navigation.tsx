import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Redirect, Route } from 'react-router-dom';
import {
    IonTabs,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonIcon,
    IonLabel,
} from '@ionic/react';
import { chatboxEllipses, trendingUp, videocam, newspaper, chatbubbles } from 'ionicons/icons';

import Tab1 from '../pages/Tab1';
import Discuss from '../pages/Discuss';
import Tab2 from '../pages/Tab2';
import AskQuestion from '../pages/AskQuestion';
import SelectTags from '../pages/SelectTags';

const Navigation: React.FC = () => {

    return (
        <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1" component={Tab1}></Route>
            <Route exact path="/tab2" component={Tab2}></Route>
            <Route exact path="/discuss" component={Discuss}></Route>
            <Route exact path="/discuss/askQuestion" component={AskQuestion}></Route>
            <Route exact path="/discuss/askQuestion/selectTag" component={SelectTags}></Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="tab1" href="/tab1">
              <IonIcon icon={newspaper} />
              <IonLabel>資訊</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2">
              <IonIcon icon={trendingUp} />
              <IonLabel>市場</IonLabel>
            </IonTabButton>
            <IonTabButton tab="discuss" href="/discuss">
              <IonIcon icon={chatboxEllipses} />
              <IonLabel>討論區</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4">
              <IonIcon icon={chatbubbles} />
              <IonLabel>聊天室</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/tab5">
              <IonIcon icon={videocam} />
              <IonLabel>直播</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    )
}

export default Navigation