import React from 'react'
import { IonItem, IonInput, IonLabel, IonButton, IonTextarea, IonIcon } from '@ionic/react';
import { addCircleOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';

type FormValues = {
    tags: string;
    content: string;
}

export default function QuestionForm() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const history = useHistory();

    return (
        <>
            <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <IonItem lines='full'>
                    <IonLabel>標籤</IonLabel>
                    <IonInput
                        {...register('tags')}
                    />
                    <IonIcon icon={addCircleOutline} onClick={() => { history.push("/discuss/askQuestion/selectTag") }} />
                </IonItem>
                <IonItem lines='full'>
                    <IonLabel>內容</IonLabel>
                    <IonTextarea
                        {...register('content', { required: "請輸入問題內容！" })}
                    />
                </IonItem>
                {errors.content && <p>{errors.content.message}</p>}
                <IonButton type='submit'>Submit</IonButton>
            </form>
        </>
    )
}
