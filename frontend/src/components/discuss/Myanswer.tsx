import { IonText } from '@ionic/react';
import { memo } from 'react'


const MyAnswer: React.FC = memo(() => {
    return (
        <div>
            <IonText>My question</IonText>
        </div>
    );
  });
  
  export default MyAnswer;