import React, { useEffect, useRef, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonImg, IonText, IonItem, IonLabel, IonInput, IonIcon, IonTextarea, IonButton } from '@ionic/react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { addCircleOutline, closeCircleOutline } from 'ionicons/icons';

type FormValues = {
    tags: string[];
    content: string;
}

type TagValues = {
    stock_id: number;
    stock_symbol: string;
}

const CreateQuestion: React.FC = () => {
    const [ selectTags, setSelectTags] = useState(Array<TagValues>);

    const { state } = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<FormValues>();

    const history = useHistory();

    useEffect(()=>{
        if(state) {
            const { stock_id, stock_symbol } = state as TagValues
        
            if(selectTags.filter(tag => tag.stock_id === stock_id).length <= 0) {
                setSelectTags([...selectTags, {stock_id, stock_symbol}])
            }
        }
    }, [state])

    function removeTag(e: any, key?:number) {
        setSelectTags(selectTags.filter(tag => tag.stock_id !== key))
    }

    return (
        <IonPage>
            <IonHeader translucent={true} collapse="fade">
                <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/discuss"/>
                        </IonButtons>
                    <IonTitle>提出問題</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <UserInfo lines='full'>
                    <UserIcon src="https://ionicframework.com/docs/img/demos/avatar.svg"/>
                    <IonText>Username</IonText>
                </UserInfo>
                <form onSubmit={handleSubmit((data) => {
                console.log(data);
            })}>
                <IonItem lines='full'>
                    <IonText>標籤</IonText>
                    <TagContainer>
                        {selectTags.map((tag) => {
                            return <StockTag key={tag?.stock_id}>
                                        <IonText>{tag?.stock_symbol}</IonText>
                                        <DeleteTagButton icon={closeCircleOutline} onClick={e => removeTag(e, tag?.stock_id)}/>
                                    </StockTag>
                        })}
                    </TagContainer>
                    <TagButton icon={addCircleOutline} onClick={() => { history.push("/discuss/createQuestion/selectTag") }} />
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

const StockTag = styled.div`
    margin: 0px 3px;
    height: 2rem;
    line-height: 2rem;
    background-color: #F2B950;
    border-radius: 0.9rem;
    padding: 0.5rem;
    color: #fff;
    font-size: 0.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TagContainer = styled.div`
    width: 73%;
    margin: 0px 20px;
    display: flex;
    overflow-x: scroll;
    &::-webkit-scrollbar {
        display: none;
    }
`

const TagButton = styled(IonIcon)`
    position: absolute;
    right: 3%;
`

const DeleteTagButton = styled(IonIcon)`
    margin-left: 0.7rem;
    font-size: 1.2rem;
`

export default CreateQuestion;