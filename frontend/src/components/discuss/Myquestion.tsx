import { IonText } from '@ionic/react';
import { memo } from 'react'


const MyQuestion: React.FC = memo(() => {
    return (
        <div>
            <IonText>My question</IonText>
        </div>
    );
  });
  
  export default MyQuestion;