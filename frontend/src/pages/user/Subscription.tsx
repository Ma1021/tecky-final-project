import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonContent,
  IonButtons,
  IonBackButton,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";

import styled from "styled-components";
import { useEffect, useState, useCallback } from "react";
import { useAppDispatch } from "../../redux/store";
import Following from "../../components/Subscription/Following";
import Follower from "../../components/Subscription/Follower";
import {
  loadFollowings,
  loadFollowingsId,
  loadFollowers,
} from "../../redux/subscription/subscriptionSlice";

export interface User {
  id: number;
  user_id: number;
  username: string;
  avatar: string;
  introduction: string;
}

const Subscription: React.FC = () => {
  const [segment, setSegment] = useState("follower");
  const [keyword, setKeyword] = useState("");

  const { user } = JSON.parse(
    localStorage.getItem("auth_stockoverflow") as string
  );
  const user_id = +user.id;

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  const dispatch = useAppDispatch();

  const initFollowings = useCallback(async () => {
    await dispatch(loadFollowings(user_id));
  }, [dispatch]);

  const initFollowingsId = useCallback(async () => {
    await dispatch(loadFollowingsId(user_id));
  }, [dispatch]);

  const initFollowers = useCallback(async () => {
    await dispatch(loadFollowers(user_id));
  }, [dispatch]);

  useEffect(() => {
    initFollowings();
    initFollowers();
    initFollowingsId();
  }, []);

  function handleKeywordChange(e: any) {
    setKeyword(e.target.value);
  }

  return (
    <IonPage>
      <IonHeader translucent={true} collapse="fade">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/discuss" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container>
          <IonSegment value={segment} onIonChange={onSegmentChange}>
            <IonSegmentButton value="follower">
              <IonLabel>我的粉絲</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="following">
              <IonLabel>關注中</IonLabel>
            </IonSegmentButton>
          </IonSegment>

          <IonSearchbar
            value={keyword}
            placeholder="搜索用戶"
            onIonChange={handleKeywordChange}
          ></IonSearchbar>

          {segment === "follower" ? (
            <Follower keyword={keyword} />
          ) : (
            <Following keyword={keyword} />
          )}
        </Container>
      </IonContent>
    </IonPage>
  );
};

export default Subscription;

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  ion-segment {
    width: 90%;
    margin-top: 0.5rem;
    color: #dedede;

    ion-segment-button {
      --indicator-color: linear-gradient(
        to right bottom,
        #ffa930,
        #ff9d3f,
        #ff924d,
        #ff885b,
        #ff7f67
      );
      --color-checked: #fff;
      font-weight: 800;
    }
  }

  ion-searchbar {
    width: 90%;
    padding: 0px;
  }
`;
