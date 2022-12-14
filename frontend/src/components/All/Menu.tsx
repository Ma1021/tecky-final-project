import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonMenu,
  IonMenuToggle,
  IonAvatar,
  IonItem,
  IonLabel,
  IonGrid,
  IonIcon,
  IonText,
  IonAccordion,
  IonAccordionGroup,
  IonList,
  useIonAlert,
} from "@ionic/react";
import { Redirect, useHistory } from "react-router";
import {
  pencilOutline,
  settingsOutline,
  logoWhatsapp,
  logOutOutline,
  trashOutline,
  statsChart,
  people,
} from "ionicons/icons";
import "./Menu.css";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { logout, deleteAcc } from "../../redux/auth/actions";

interface MenuProps {}

const Menu: React.FC<MenuProps> = () => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const selector = useAppSelector((state) => state.auth.user);
  const [presentAlert] = useIonAlert();

  const logoutPage = () => {
    // phone version
    // async () => {
    //   await Preferences.set({ key: "auth_stockoverflow", value: "" });
    // };

    // delete push notification token
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/notification/push_token/${selector?.id}`,
      {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      }
    );

    dispatch(logout());

    // web version
    localStorage.removeItem("auth_stockoverflow");

    // console.log(
    //   "after useEffect and set localStorage",
    //   localStorage.getItem("auth_stockoverflow")
    // );
    history.push("/home", "root");
  };

  const confirmDeleteAccount = () =>
    presentAlert({
      header: "確認刪除?",
      subHeader: "一經刪除, 不可回復帳號",
      buttons: [
        {
          text: "刪除",
          role: "confirm",
          handler: async () => {
            await deleteAccount();
          },
        },
        { text: "取消", role: "cancel" },
      ],
    });
  const deleteAccount = async () => {
    // phone version
    // async () => {
    //   await Preferences.set({ key: "auth_stockoverflow", value: "" });
    // };
    // deleteAccount in backend
    console.log("enter deleteAccount", selector);
    await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/${selector?.id}/delete`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ user: selector?.id }),
      }
    );
    dispatch(deleteAcc());
    // web version
    localStorage.removeItem("auth_stockoverflow");
    // console.log(
    //   "after useEffect and set localStorage",
    //   localStorage.getItem("auth_stockoverflow")
    // );
    history.push("/home", "root");
    // <Navigate to="/home" replace={true} />;
    // history.push("/home");
    // router.push("/home", "forward", "push");
  };

  const servicePending = () => {
    presentAlert({
      cssClass: "alert",
      header: "提示",
      message: "功能開發中敬請期待",
      buttons: ["確定"],
    });
  };

  const toEdit = (e: any) => {
    e?.stopPropagation();
    console.log("toEdit");
    history.push(`/user/${selector?.id}/edit`);
  };

  const toInfo = () => {
    console.log("toInfo");
    history.push(`/user/${selector?.id}/info`, "forward");
  };

  return (
    <IonMenu disabled={false} contentId="main-content">
      <IonHeader className="menu" onClick={toInfo}>
        <IonToolbar>
          <IonMenuToggle className="w100">
            <div className="pr-1 pt-3">
              {/* username id edit and name */}
              <IonItem lines="none" className="menu-username menu">
                <div className="d-flex">
                  <IonAvatar
                    style={{
                      backgroundColor: "pink",
                      cursor: "pointer",
                    }}
                  >
                    <img
                      src={selector?.avatar}
                      alt="user icon"
                      style={{
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </IonAvatar>
                  <div className="flex-column pl-3 pb-3">
                    <div className="w100">
                      <IonLabel>{selector?.username}</IonLabel>
                    </div>
                    <div className="w100">
                      <IonLabel className="grey" onClick={toEdit}>
                        編輯帳號<IonIcon icon={pencilOutline}></IonIcon>
                      </IonLabel>
                    </div>
                  </div>
                </div>
              </IonItem>
              {/* username edit and name */}
              {/* user id */}
              <IonItem lines="none" className="menu-userId menu ">
                <div className="d-flex w100 justify-content-between align-items-center ">
                  <IonText>用戶碼: {selector?.id}</IonText>
                  {/* <IonButton color="primary">複製</IonButton> */}
                </div>
              </IonItem>
              {/* user id */}
              {/* user number and email*/}
              <IonItem lines="none" className="menu-userInfo menu pt-0">
                <IonGrid>
                  <div className="w100">
                    <IonText className="grey">
                      {selector?.email
                        .toString()
                        .split("@")[0]
                        .slice(
                          0,
                          selector?.email.toString().split("@")[0].length - 4
                        ) +
                        "****" +
                        selector?.email.toString().split("@")[1]}
                    </IonText>
                  </div>
                </IonGrid>
              </IonItem>
              {/* user number and email*/}
            </div>
          </IonMenuToggle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-no-padding">
        <div className="w100">
          <IonList className="w100">
            <IonAccordionGroup className="menu">
              <IonAccordion value="first">
                <IonItem className="menu" slot="header" color="primary">
                  <IonLabel>
                    <IonIcon icon={logoWhatsapp}></IonIcon> 客戶服務
                  </IonLabel>
                </IonItem>
                <div
                  className="ion-padding"
                  slot="content"
                  onClick={()=>{
                    presentAlert({
                      cssClass: "alert",
                      header: "提示",
                      message: "未夠積分",
                      buttons: ["確定"],
                    })
                  }}
                >
                  <IonMenuToggle>
                    <div className="w100">申請成為KOL</div>
                  </IonMenuToggle>
                </div>
                <div
                  className="ion-padding"
                  slot="content"
                  onClick={servicePending}
                >
                  <IonMenuToggle>
                    <div className="w100">其他查詢</div>
                  </IonMenuToggle>
                </div>
              </IonAccordion>
            </IonAccordionGroup>
            <IonMenuToggle>
              <IonItem className="menu" lines="none" onClick={servicePending}>
                <IonLabel>
                  <IonIcon icon={settingsOutline}></IonIcon> 系統設定
                </IonLabel>
              </IonItem>
              {selector?.user_type === "kol" && (
                <IonItem
                  className="menu"
                  lines="none"
                  onClick={() =>
                    history.push(`/analysis/${selector!.id}`, "forward")
                  }
                >
                  <IonLabel>
                    <IonIcon icon={statsChart}></IonIcon> 數據分析
                  </IonLabel>
                </IonItem>
              )}
              {selector?.user_type === "admin" && (
                <IonItem
                  className="menu"
                  lines="none"
                  onClick={() => {
                    history.push(`/admin`, "forward");
                  }}
                >
                  <IonLabel>
                    <IonIcon icon={people}></IonIcon> 用戶管理
                  </IonLabel>
                </IonItem>
              )}
              <IonItem className="menu" lines="none">
                <IonLabel onClick={logoutPage}>
                  <IonIcon icon={logOutOutline}></IonIcon>
                  用戶登出
                </IonLabel>
              </IonItem>
              <IonItem className="menu" lines="none">
                <IonLabel onClick={confirmDeleteAccount}>
                  <IonIcon icon={trashOutline}></IonIcon>
                  刪除帳號
                </IonLabel>
              </IonItem>
            </IonMenuToggle>
          </IonList>
        </div>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
