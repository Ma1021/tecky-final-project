import React from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons } from '@ionic/react';

export default function SelectTags() {
  return (
      <IonPage>
        <IonHeader translucent={true} collapse="fade">
            <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="discuss"/>
                    </IonButtons>
                <IonTitle>選擇標籤</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <div>Select Tags</div>
        </IonContent>
      </IonPage>
  )
}
