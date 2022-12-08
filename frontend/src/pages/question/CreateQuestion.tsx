import React, { useEffect, useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonBackButton,
  IonButtons,
  IonImg,
  IonText,
  IonItem,
  IonLabel,
  IonIcon,
  IonTextarea,
  IonButton,
  useIonToast,
} from "@ionic/react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router-dom";
import { addCircleOutline, closeCircleOutline } from "ionicons/icons";
import { createQuestion } from "../../redux/questions/questionSlice";
import { useAppDispatch } from "../../redux/store";

type TagValues = {
  stock_id: number;
  stock_symbol: string;
};

const CreateQuestion: React.FC = () => {
  const [selectTags, setSelectTags] = useState(Array<TagValues>);
  const [content, setContent] = useState("");
  let userData: any;
  let user_id: number;

  if (localStorage.getItem("auth_stockoverflow")) {
    const { user } = JSON.parse(
      localStorage.getItem("auth_stockoverflow") as string
    );
    userData = user;
    user_id = user.id;
  }

  const { state } = useLocation();
  const [present] = useIonToast();

  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (state) {
      const { stock_id, stock_symbol } = state as TagValues;
      
      if (selectTags.filter((tag) => tag.stock_id === stock_id).length <= 0) {
        setSelectTags([...selectTags, { stock_id, stock_symbol }]);
      }
    }
  }, []);

  function removeTag(e: any, key?: number) {
    setSelectTags(selectTags.filter((tag) => tag.stock_id !== key));
  }

  function handleContent(e: any) {
    setContent((e.target as HTMLInputElement).value);
  }

  async function submit(e: any) {
    e.preventDefault();
    const stock_id: number[] = [];
    let obj: {
      stock_id?: number | number[]
      content: string
      asker_id: number
      asker_username: string
    };

    if (content === "") {
      present("請輸入內容", 1500);
      return;
    }

    if (selectTags.length > 0) {
      for (let tag of selectTags) {
        stock_id.push(tag.stock_id);
      }

      obj = {
        stock_id,
        content,
        asker_id: user_id,
        asker_username: userData.username 
      };
    } else {
      obj = {
        content,
        asker_id: user_id,
        asker_username: userData.username 
      };
    }

    if(obj) {
      dispatch(createQuestion(obj)).then(()=>{
        present("成功提出問題", 1500);
        history.replace("/discuss");
      });
    }
  }

  return (
    <IonPage>
      <IonHeader translucent={true} collapse="fade">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discuss" text="返回"/>
          </IonButtons>
          <IonTitle>提出問題</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <UserInfo lines="full">
          <IonImg src={userData.avatar} />
          <IonText>{userData.username}</IonText>
        </UserInfo>
        <Container>
          <IonItem lines="full">
            <IonText>標籤</IonText>
            <TagContainer>
              {selectTags.map((tag) => {
                return (
                  <StockTag key={tag?.stock_id}>
                    <IonText>{tag?.stock_symbol}</IonText>
                    <DeleteTagButton
                      icon={closeCircleOutline}
                      onClick={(e) => removeTag(e, tag?.stock_id)}
                    />
                  </StockTag>
                );
              })}
            </TagContainer>
            <TagButton
              icon={addCircleOutline}
              onClick={() => {
                history.push("/discuss/createQuestion/selectTag");
              }}
            />
          </IonItem>
          <IonItem lines="full">
            <IonLabel>內容</IonLabel>
            <IonTextarea
              typeof="text"
              rows={15}
              value={content}
              onIonChange={handleContent}
            />
          </IonItem>
          <IonButton onClick={submit}>提出問題</IonButton>
        </Container>
      </IonContent>
    </IonPage>
  );
};

const UserInfo = styled(IonItem)`
  ion-text {
    height: 3.5rem;
    line-height: 3.5rem;
  }

  ion-img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    margin-right: 10px;
    object-fit: cover;
  }
`;

const StockTag = styled.div`
  margin: 0px 3px;
  height: 2rem;
  line-height: 2rem;
  background-image: linear-gradient(
    to right bottom,
    #ffc748,
    #ffba53,
    #ffae5e,
    #ffa46a,
    #ff9b75
  );
  border-radius: 0.9rem;
  padding: 0.5rem;
  color: #fff;
  font-size: 0.9rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const TagContainer = styled.div`
  width: 73%;
  margin: 10px 20px;
  display: flex;
  overflow-x: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const TagButton = styled(IonIcon)`
  position: absolute;
  right: 3%;
`;

const DeleteTagButton = styled(IonIcon)`
  margin-left: 0.7rem;
  font-size: 1.2rem;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  ion-item {
    width: 100%;
  }

  ion-item:nth-child(2) {
  }

  ion-button {
    width: 90%;
    height: 2.3rem;
    margin-top: 1rem;
  }

  ion-textarea {
    padding: 1rem;
  }
`;

export default CreateQuestion;
