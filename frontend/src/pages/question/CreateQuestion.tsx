import React, { useEffect, useRef, useState } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonImg, IonText, IonItem, IonLabel, IonInput, IonIcon, IonTextarea, IonButton, useIonToast } from '@ionic/react';
import styled from 'styled-components';
import { useHistory, useLocation } from 'react-router-dom';
import { addCircleOutline, closeCircleOutline } from 'ionicons/icons';

type TagValues = {
    stock_id: number;
    stock_symbol: string;
}

const CreateQuestion: React.FC = () => {
    const [ selectTags, setSelectTags] = useState(Array<TagValues>);
    const [ content, setContent ] = useState('');

    const { state } = useLocation();
    const [present, dismiss] = useIonToast();

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

    function handleContent(e: any) {
        setContent((e.target as HTMLInputElement).value)
    }

    async function submit() {
        const stock_id:number[] = []
        let obj = {}

        if(selectTags.length > 0) {
            for(let tag of selectTags) {
                stock_id.push(tag.stock_id)
            }

            obj = {
                stock_id,
                content,
                asker_id:1,
            }
        } else {
            obj = {
                content,
                asker_id:1
            }
        }

        const res = await fetch('http://localhost:8080/question', {
            method: 'POST',
            headers:{'Content-Type': 'application/json'},
            body:JSON.stringify(obj)
        })

        if(!res.ok) {
            const message = await res.text()
            console.log(message);
            if(message === '{"statusCode":400,"message":"Missing content"}') {
                present('請輸入內容', 1500)
            }
            return
        } 

        present('成功提出問題', 1500)
        history.replace("/discuss")
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
                <div>

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
                    <IonTextarea value={content} onIonChange={handleContent}/>
                </IonItem>
                <IonButton onClick={submit}>Submit</IonButton>
                </div>
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