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
import styled from 'styled-components';
import './Navigation.css';

import Tab1 from '../pages/Tab1';
import Discuss from '../pages/Discuss';
import Tab2 from '../pages/Tab2';
import CreateQuestion from '../pages/CreateQuestion';
import SelectTags from '../pages/SelectTags';

const Navigation: React.FC = () => {
    return (
        <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/tab1" component={Tab1}></Route>
            <Route exact path="/tab2" component={Tab2}></Route>
            <Route exact path="/discuss" component={Discuss}></Route>
            <Route exact path="/discuss/createQuestion" component={CreateQuestion}></Route>
            <Route exact path="/discuss/createQuestion/selectTag" component={SelectTags}></Route>
            <Route exact path="/">
              <Redirect to="/tab1" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" className='tabBar'>
            <IonTabButton tab="tab1" href="/tab1" className='tabButton'>
              <IonIcon icon={newspaper} />
              <IonLabel>資訊</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab2" href="/tab2" className='tabButton'>
              <IonIcon icon={trendingUp} />
              <IonLabel>市場</IonLabel>
            </IonTabButton>
            <IonTabButton tab="discuss" href="/discuss" className='tabButton'>
              <IonIcon icon={chatboxEllipses} />
              <IonLabel>討論區</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab4" href="/tab4" className='tabButton'>
              <IonIcon icon={chatbubbles} />
              <IonLabel>聊天室</IonLabel>
            </IonTabButton>
            <IonTabButton tab="tab5" href="/tab5" className='tabButton'>
              <IonIcon icon={videocam} />
              <IonLabel>直播</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    )
}

export default Navigation