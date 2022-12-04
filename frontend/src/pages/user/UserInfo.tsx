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
  useIonToast,
  useIonAlert,
} from "@ionic/react";
import "./UserInfo.css";
import {
  personOutline,
  paperPlaneOutline,
  alertCircleOutline,
  lockOpenOutline,
} from "ionicons/icons";
import Notification from "../../components/All/Notification";
import { useEffect, useState, useCallback } from "react";
import UserPoints from "../../components/UserContent/UserPoints";
import UserDiscussion from "../../components/UserContent/UserDiscussion";
import UserIntro from "../../components/UserContent/UserIntro";
import UserBadge from "../../components/All/UserBadge";
import { RootState, useAppSelector, useAppDispatch } from "../../redux/store";
import {
  loadFollowings,
  loadFollowers,
} from "../../redux/subscription/subscriptionSlice";
import { loadUserQuestions } from "../../redux/questions/questionSlice";
import { useHistory } from "react-router";
import { UserPort } from "../../redux/auth/state";
import { fetchBlockList, fetchUnblockList } from "../../redux/block/actions";

const UserInfo: React.FC = () => {
  interface SegmentChangeEventDetail {
    value?: string;
  }

  interface IonSegmentCustomEvent extends CustomEvent {
    target: HTMLIonSegmentElement;
    detail: SegmentChangeEventDetail;
  }

  let [userSegment, setUserSegment] = useState("userIntro");
  const [presentAlert] = useIonAlert();
  const blockList = useAppSelector((state) => state.block.blockedUserList);

  const segmentChangeAction = (event: IonSegmentCustomEvent) => {
    setUserSegment(event.detail.value || "userIntro");
  };

  // user id should be gained from params
  const history = useHistory();
  const [present] = useIonToast();
  const [userData, setUserData] = useState<UserPort | null>(null);
  const userIdUrl = history.location.pathname
    .replace("/user/", "")
    .replace("/info", "");

  // console.log("userIdUrl", userIdUrl);
  // console.log("blockList initiate in userInfo", blockList);
  // console.log(
  //   "blockList initiate, block true false",
  //   blockList.includes(+userIdUrl)
  // );

  const user_id = useAppSelector((state) => {
    return state.auth?.user?.id;
  });

  const dispatch = useAppDispatch();

  // get user followers and following
  const initFollowings = useCallback(async () => {
    await dispatch(loadFollowings(+userIdUrl));
  }, [dispatch]);

  const initFollowers = useCallback(async () => {
    await dispatch(loadFollowers(+userIdUrl));
  }, [dispatch]);

  const initQuestion = useCallback(async () => {
    await dispatch(loadUserQuestions(+userIdUrl));
  }, [dispatch]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/${+userIdUrl}`).then(
      (res) => {
        console.log(res);
        return res
          .json()
          .then((data) => {
            setUserData(data);
          })
          .catch((err) => {
            present({
              message: err.message,
              position: "bottom",
              color: "danger",
            });
          });
      }
    );
    console.log("leaveuserEffect ");
    initFollowings();
    initFollowers();
    initQuestion();
  }, [setUserData]);

  const { followerList, followingList } = useAppSelector(
    (state: RootState) => state.subscription
  );

  const router = useIonRouter();

  const toEdit = (e: any) => {
    e?.stopPropagation();
    history.push(`/user/${user_id as number}/edit`);
  };

  // block user
  const toBlock = (e: any) => {
    e?.stopPropagation();
    presentAlert({
      cssClass: "alert",
      header: "確認封鎖?",
      subHeader: "一經封鎖, 不能檢視用戶發言",
      buttons: [
        {
          text: "封鎖",
          handler: async () => {
            await blockAccount();
          },
        },
        { text: "取消", role: "cancel" },
      ],
    });
  };

  // block user
  const blockAccount = async () => {
    dispatch(
      fetchBlockList({ userId: user_id as number, blockedUserId: +userIdUrl })
    );
  };

  // unblock user
  const toUnblock = (e: any) => {
    e?.stopPropagation();
    presentAlert({
      header: "確認解封?",
      subHeader: "一經解封, 即可檢視用戶發言",
      buttons: [
        {
          text: "解封",
          handler: async () => {
            await unblockAccount();
          },
        },
        { text: "取消", role: "cancel" },
      ],
    });
  };
  const unblockAccount = async () => {
    dispatch(
      fetchUnblockList({
        userId: user_id as number,
        unblockedUserId: +userIdUrl,
      })
    );
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-round align-items-center w100 h100">
              <IonButtons>
                <IonBackButton defaultHref="/discuss" text="返回"></IonBackButton>
              </IonButtons>
              <IonSearchbar className="pt-0 pb-0 ion-margin"></IonSearchbar>
              {+userIdUrl === (user_id as number) ? (
                <Notification />
              ) : (
                <div style={{ width: "3rem" }}></div>
              )}
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
                src={userData?.avatar}
                alt="user icon"
                style={{
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </IonAvatar>
            <div className="d-flex flex-row  align-items-center">
              <IonText>{userData?.username}</IonText>
            </div>
            <UserBadge isKOL={userData?.user_type === "kol"} />
            <div className="flex-row pt-1 pb-1">
              {+userIdUrl === (user_id as number) ? (
                <IonButton
                  className="userInfo-button"
                  size="small"
                  shape="round"
                >
                  <IonIcon
                    slot="start"
                    icon={personOutline}
                    onClick={toEdit}
                  ></IonIcon>
                  帳戶
                </IonButton>
              ) : blockList.includes(+userIdUrl) === true ? (
                <IonButton
                  className="userInfo-button"
                  size="small"
                  shape="round"
                  onClick={toUnblock}
                >
                  <IonIcon slot="start" icon={lockOpenOutline}></IonIcon>
                  解封
                </IonButton>
              ) : (
                <IonButton
                  className="userInfo-button"
                  size="small"
                  shape="round"
                  onClick={toBlock}
                >
                  <IonIcon slot="start" icon={alertCircleOutline}></IonIcon>
                  封鎖
                </IonButton>
              )}
              <IonButton className="userInfo-button" size="small" shape="round">
                <IonIcon slot="start" icon={paperPlaneOutline}></IonIcon>
                分享
              </IonButton>
            </div>
            <div className="d-flex flex-row pt-1 pb-1">
              <div
                className="flex-column text-align-center p-1 pr-2 border-right"
                onClick={() => {
                  router.push(`/user/subscription/${+userIdUrl}`);
                }}
              >
                <div>{followingList.length}</div>
                <div>關注中</div>
              </div>
              <div
                className="flex-column text-align-center p-1 pl-2"
                onClick={() => {
                  router.push(`/user/subscription/${+userIdUrl}`);
                }}
              >
                <div>{followerList.length}</div>
                <div>粉絲數</div>
              </div>
            </div>
          </div>
        </IonItem>
        {/* user information above */}
        {/* user history below */}
        <div style={{ padding: "0.5rem 1rem" }}>
          <IonSegment value={userSegment} onIonChange={segmentChangeAction}>
            <IonSegmentButton value="userIntro">
              <IonLabel>自我介紹</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="userPoints">
              <IonLabel>積分</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton value="userDiscuss">
              <IonLabel>問題</IonLabel>
            </IonSegmentButton>
          </IonSegment>
        </div>
        {userSegment === "userIntro" ? (
          <UserIntro userId={+userIdUrl} />
        ) : userSegment === "userPoints" ? (
          <UserPoints />
        ) : (
          <UserDiscussion userId={+userIdUrl} />
        )}
        {/* user history above */}
      </IonContent>
    </IonPage>
  );
};

export default UserInfo;
