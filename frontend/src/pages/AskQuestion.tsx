import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonImg, IonText, IonItem } from '@ionic/react';
import QuestionForm from '../components/quesitonForm/QuestionForm';
import styled from 'styled-components';

export default function AskQuestion() {
    return (
        <IonPage>
            <IonHeader translucent={true} collapse="fade">
                <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="discuss"/>
                        </IonButtons>
                    <IonTitle>提出問題</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <UserInfo lines='full'>
                    <UserIcon src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                    <IonText>Username</IonText>
                </UserInfo>
                <QuestionForm />
            </IonContent>
        </IonPage>
    )
}

const UserInfo = styled(IonItem)`
    padding: 10px 0px;
`

const UserIcon = styled(IonImg)`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right:10px;
`
