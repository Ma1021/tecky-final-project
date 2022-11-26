import {
  IonAvatar,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonPage,
  IonSearchbar,
  IonText,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonChip,
  IonSegment,
  IonSegmentButton,
  useIonRouter,
} from "@ionic/react";
import "./UserInfo.css";
import {
  personOutline,
  paperPlaneOutline,
  diamondOutline,
  happyOutline,
} from "ionicons/icons";
import img from "../../img/animal_stand_ookami.png";
import Notification from "../../components/All/Notification";
import { useEffect, useState, useCallback } from "react";
import UserArticles from "../../components/UserContent/UserArticles";
import UserDiscussion from "../../components/UserContent/UserDiscussion";
import UserIntro from "../../components/UserContent/UserIntro";
import UserBadge from "../../components/All/UserBadge";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import { loadFollowings, loadFollowers } from "../../redux/subscription/subscriptionSlice";

const UserInfo: React.FC = () => {
  const userInfo = {
    username: "user",
    userId: 123,
    email: "user@gmail.com",
    phone: 12345678,
    following: 4,
    followed: 0,
    isKOL: true,
  };

  interface SegmentChangeEventDetail {
    value?: string;
  }

  interface IonSegmentCustomEvent extends CustomEvent {
    target: HTMLIonSegmentElement;
    detail: SegmentChangeEventDetail;
  }

  let [userSegment, setUserSegment] = useState("userIntro");
  const segmentChangeAction = (event: IonSegmentCustomEvent) => {
    setUserSegment(event.detail.value || "userIntro");
  };

  const { user } = JSON.parse(localStorage.getItem("auth_stockoverflow") as string)
  const user_id = +user.id;

  const dispatch = useAppDispatch();

  // get user followers and following
  const initFollowings = useCallback(async () => {
    await dispatch(loadFollowings());
  }, [dispatch]);

  const initFollowers = useCallback(async () => {
    await dispatch(loadFollowers());
  }, [dispatch]);

  useEffect(() => {
    initFollowings();
    initFollowers();
  }, [])

  const { followerList, followingList } = useAppSelector(
    (state: RootState) => state.subscription
  );

  const router = useIonRouter();

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-round align-items-center w100 h100">
              <IonButtons>
                <IonBackButton defaultHref="/"></IonBackButton>
              </IonButtons>
              <IonSearchbar className="pt-0 pb-0 ion-margin"></IonSearchbar>
              <Notification />
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* user information below */}
        <IonItem lines="full">
          <div className="d-flex flex-column justify-content-center align-items-center w100 pt-3 pb-3">
            <IonAvatar
              style={{
                backgroundColor: "pink",
                cursor: "pointer",
                width: "5rem",
                height: "5rem",
              }}
            >
              <img
                src={user.avatar}
                alt="user icon"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}   
              />
            </IonAvatar>
            <div className="d-flex flex-row  align-items-center">
              <IonText>{user.username}</IonText>
            </div>
            <UserBadge isKOL={user.user_type === 'kol'} />
            <div className="flex-row pt-1 pb-1">
              <IonButton className="userInfo-button" size="small" shape="round">
                <IonIcon slot="start" icon={personOutline}></IonIcon>
                帳戶
              </IonButton>
              <IonButton className="userInfo-button" size="small" shape="round">
                <IonIcon slot="start" icon={paperPlaneOutline}></IonIcon>
                分享
              </IonButton>
            </div>
            <div className="d-flex flex-row pt-1 pb-1">
              <div className="flex-column text-align-center p-1 pr-2 border-right" onClick={() => { router.push(`/user/subscription/${user_id}`) }}>
                <div>{followingList.length}</div>
                <div>關注中</div>
              </div>
              <div className="flex-column text-align-center p-1 pl-2" onClick={() => { router.push(`/user/subscription/${user_id}`) }}>
                <div>{followerList.length}</div>
                <div>粉絲數</div>
              </div>
            </div>
          </div>
        </IonItem>
        {/* user information above */}
        {/* user history below */}
        <div style={{padding:"0.5rem 1rem"}}>
          <IonSegment onIonChange={segmentChangeAction}>
            <IonSegmentButton value="userIntro">
              <IonLabel>自我介紹</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="userArticle">
              <IonLabel>文章</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="userDiscuss">
              <IonLabel>討論</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>

        {userSegment === "userIntro" ? (
          <UserIntro />
        ) : userSegment === "userArticle" ? (
          <UserArticles />
        ) : (
          <UserDiscussion />
        )}
        {/* user history above */}
      </IonContent>
    </IonPage>
  );
};

export default UserInfo;
 
