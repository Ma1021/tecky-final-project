import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonItem,
  IonList,
  IonLabel,
  IonInput,
  IonButton,
  IonBackButton,
  useIonAlert,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { login } from "../redux/auth/actions";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { fetchGetBlockList } from "../redux/block/actions";

const Login: React.FC = () => {
  let history = useHistory();
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();

  const select = useAppSelector((state) => {
    return state.auth;
  });

  // check push notification token
  async function checkPushToken(json: any) {
    const token = await localStorage.getItem("push_notification_token");
    console.log("push_token:", token);

    fetch(`${process.env.REACT_APP_PUBLIC_URL}/notification/push_token`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ user_id: json.user.id, token }),
    }).then(async (response) => {
      console.log("fetching check push token");
      if (!response.ok) {
        console.log(await response.text());
      }
    });
  }

  useEffect(() => {
    // phone version
    // async () => {
    //   await Preferences.set({ key: "auth_stockoverflow", value: JSON.stringify(select) });
    // };

    // web version
    localStorage.setItem("auth_stockoverflow", JSON.stringify(select));
    // console.log(
    //   "after useEffect and set localStorage",
    //   localStorage.getItem("auth_stockoverflow")
    // );
  }, [select]);

  let main = async (json: any) => {
    await dispatching(json);
    await gettingStorage();
    // () => <Redirect to="/discuss" />;
    await checkPushToken(json);
    history.replace("/discuss");
  };

  let dispatching = (json: any) => {
    dispatch(login(json.user, json.token));
    dispatch(fetchGetBlockList(+json.user.id));
  };
  let gettingStorage = () => {
    // mobile version
    // const auth = async () => {
    //   await Preferences.get({ key: "auth_stockoverflow" });
    // };

    // web version
    localStorage.getItem("auth_stockoverflow");
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className="d-flex justify-content-between align-items-center w100">
              <IonBackButton defaultHref="/home"></IonBackButton>
              登入
              <div className="pl-5"></div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form
          onSubmit={handleSubmit(async (data) => {
            try {
              // await register(data);
              let res = await fetch(
                `${process.env.REACT_APP_PUBLIC_URL}/auth/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(data),
                }
              );
              let json = await res.json();
              console.log("register", json);

              if (res.ok) {
                main(json);
              } else {
                console.log(select);
                presentAlert({
                  cssClass: "alert",
                  header: "錯誤",
                  subHeader: json.message,
                  buttons: ["OK"],
                });
              }
            } catch (err) {
              presentAlert({
                cssClass: "alert",
                header: "錯誤",
                subHeader: (err as any).message,
                buttons: ["OK"],
              });
            }
          })}
        >
          <IonList>
            <IonItem>
              <IonLabel position="floating">用戶電郵</IonLabel>
              <IonInput
                // type="email"
                {...register("email", {
                  required: { value: true, message: "請輸入電郵" },
                  //   pattern: {
                  //     value: /^[A-Z0-9._%+_]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                  //     // value: /[A-Z]/g,
                  //     message: "請輸入正確的電郵",
                  //   },
                })}
                clearInput={true}
              ></IonInput>
            </IonItem>
            {/* {errors.email && <>{errors.email.message}</>} */}
            <ErrorMessage
              className="ion-padding"
              errors={errors}
              name="email"
              as={<IonLabel style={{ color: "red" }}></IonLabel>}
            />

            <IonItem>
              <IonLabel position="floating">密碼</IonLabel>
              <IonInput
                type="password"
                clearInput={true}
                {...register("password", {
                  required: { value: true, message: "請輸入密碼" },
                  //   pattern: {
                  //     value:
                  //       /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                  //     message:
                  //       "密碼需要有8-16個字,包括最少一個數字, 一個大楷字母及一個小楷字母",
                  //   },
                })}
              ></IonInput>
            </IonItem>
            <ErrorMessage
              className="ion-padding"
              errors={errors}
              name="password"
              as={<IonLabel style={{ color: "red" }}></IonLabel>}
            />
          </IonList>
          <>
            <IonButton expand="block" type="submit" className="ion-margin">
              登入
            </IonButton>
          </>
        </form>
        <p className="ion-margin">
          未有帳號? 可
          <Link to="/register" replace>
            註冊
          </Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Login;
