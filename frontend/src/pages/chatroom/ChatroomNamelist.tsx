import {
  IonAvatar,
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonImg,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { useAppSelector } from "../../redux/store";

interface Namelist {
  host_username: string;
  host_id: number;
  host_avatar: string;
  host_introduction: string;
  introduction: string;
  username: string;
  id: string;
  avatar: string;
}

const ChatroomNamelist: React.FC = () => {
  // set the name list
  const [namelist, setNamelist] = useState<Namelist[]>([]);
  const [presentToast] = useIonToast();

  // get the nessessary info
  const history = useHistory();
  const roomIdUrl = history.location.pathname
    .replace("/chatroom/", "")
    .replace("/namelist", "");

  const userId = useAppSelector((state) => {
    return state.auth.user?.id;
  });

  useEffect(() => {
    if (!userId) {
      presentToast({
        message: "請登入",
        duration: 1000,
        position: "bottom",
      });
      return;
    }
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/chatroom/${+roomIdUrl}/namelist`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: +userId, chatroomId: +roomIdUrl }),
      }
    ).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          setNamelist(data);
        } else {
          console.log("view name list error", data.message);
          presentToast({
            message: "未能載入名單, 請重試",
            position: "bottom",
            duration: 1500,
            color: "danger",
          });
        }
      });
    });
  }, []);

  const getProfile = (e: any) => {
    let userInfoId = e.currentTarget.dataset.userid;
    // console.log("userInfoId", e.currentTarget);
    history.push(`/user/${+userInfoId}/info`);
  };

  const kick = (e: any) => {
    let userInfoId = e.target.dataset.userId;
    fetch(
      `${
        process.env.REACT_APP_PUBLIC_URL
      }/chatroom/${+roomIdUrl}/namelist/remove`,
      {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ userId: +userInfoId, chatroomId: +roomIdUrl }),
      }
    ).then((res) => {
      res.json().then((data) => {
        if (res.ok) {
          handleClick(+userInfoId);
          setNamelist((data) => {
            return namelist.filter((member) => +member.id !== +userInfoId);
          });
          presentToast({
            message: "已踢走該成員",
            position: "bottom",
            duration: 1500,
            color: "success",
          });
        } else {
          console.log("delete member", data.message);
          presentToast({
            message: "未能踢走成員, 請重試",
            position: "bottom",
            duration: 1500,
            color: "danger",
          });
        }
      });
    });
  };

  function handleClick(userInfoId: number) {
    let sliding = document.getElementById(`member${userInfoId}`);
    if (sliding) {
      (sliding as any).close();
    }
  }

  return (
    <IonPage>
      <IonHeader translucent={true} collapse="fade">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/chatroomList" text="返回" />
          </IonButtons>
          <IonTitle>檢視聊天室名單</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonList lines="full">
          {namelist.length > 0 ? (
            //   if host
            userId === namelist[0].host_id ? (
              <>
                <IonItem>
                  <IonAvatar
                    onClick={getProfile}
                    data-userId={namelist[0].host_id}
                    slot="start"
                  >
                    <IonImg src={namelist[0].host_avatar} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{namelist[0].host_username}</h2>
                    <p>{namelist[0].host_introduction}</p>
                    <p style={{ color: "#ff885b" }}>聊天室主持</p>
                  </IonLabel>
                </IonItem>
                {namelist.map((member) => {
                  return (
                    <IonItemSliding id={`member${member.id}`}>
                      <IonItem>
                        <IonAvatar
                          slot="start"
                          onClick={getProfile}
                          data-userId={member.id}
                        >
                          <IonImg src={member.avatar} />
                        </IonAvatar>
                        <IonLabel>
                          <h2>{member.username}</h2>
                          <p>{member.introduction}</p>
                        </IonLabel>
                      </IonItem>

                      <IonItemOptions side="end">
                        <IonItemOption
                          data-userId={member.id}
                          onClick={kick}
                          style={{
                            background:
                              "linear-gradient(to right bottom,#ffa930,#ff9d3f,#ff924d,#ff885b,#ff7f67)",
                          }}
                        >
                          踢出
                        </IonItemOption>
                      </IonItemOptions>
                    </IonItemSliding>
                  );
                })}
              </>
            ) : (
              // if member
              <>
                <IonItem>
                  <IonAvatar
                    onClick={getProfile}
                    data-userId={namelist[0].host_id}
                    slot="start"
                  >
                    <IonImg src={namelist[0].host_avatar} />
                  </IonAvatar>
                  <IonLabel>
                    <h2>{namelist[0].host_username}</h2>
                    <p>{namelist[0].host_introduction}</p>
                    <p>聊天室主持</p>
                  </IonLabel>
                </IonItem>
                {namelist.map((member) => {
                  return (
                    <IonItem>
                      <IonAvatar
                        slot="start"
                        onClick={getProfile}
                        data-userId={+member.id}
                      >
                        <IonImg src={member.avatar} />
                      </IonAvatar>
                      <IonLabel>
                        <h2>{member.username}</h2>
                        <p>{member.introduction}</p>
                      </IonLabel>
                    </IonItem>
                  );
                })}
              </>
            )
          ) : null}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ChatroomNamelist;
