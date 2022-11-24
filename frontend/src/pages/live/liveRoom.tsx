import { IonPage, IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent } from "@ionic/react"
import React, { useEffect, useState } from "react";
import styled from "styled-components";

// const APP_ID = 'bcb5dfaf86dc4590807013be716e1ba6'
// const TOKEN = '007eJxTYJB+9qXVL/ndpdyvynZvedIuHFnL+n9H9BHtsuLpwgyait0KDEnJSaYpaYlpFmYpySamlgYWBuYGhsZJqeaGZqmGSYlmRk9qkxsCGRlmXjjPxMgAgSA+L0NxSX5ydn5ZalFaTn45AwMA3t8klQ=='
// const CHANNEL = 'stockoverflow';


const LiveRoom: React.FC = () => {

    return (
        <IonPage>
            <IonHeader translucent={true} collapse="fade">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/discuss" />
                    </IonButtons>
                    <IonTitle>xx的直播間</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <VideoContainer id="videos">

                </VideoContainer>
            </IonContent>
        </IonPage>
    )
}

export default LiveRoom;

const VideoContainer = styled.div`
    width: 100%;
    height: 100%;
    border: 1px solid red;

`