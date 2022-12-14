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
import { useHistory } from "react-router";

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

  const history = useHistory();
  const userIdUrl = history.location.pathname.slice(19)

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  const dispatch = useAppDispatch();

  const initFollowings = useCallback(async () => {
    await dispatch(loadFollowings(+userIdUrl));
  }, [dispatch]);

  const initFollowingsId = useCallback(async () => {
    await dispatch(loadFollowingsId(+userIdUrl));
  }, [dispatch]);

  const initFollowers = useCallback(async () => {
    await dispatch(loadFollowers(+userIdUrl));
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
            <IonBackButton defaultHref="/discuss"  text='返回'/>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <Container>
          <div style={{position:'sticky', top:0, zIndex:5, backgroundColor:'#111', width:'100%', display:'flex', flexDirection:'column', alignItems:'center'}}>
            <IonSegment value={segment} onIonChange={onSegmentChange}>
              <IonSegmentButton value="follower">
                <IonLabel>粉絲</IonLabel>
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
          </div>

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
