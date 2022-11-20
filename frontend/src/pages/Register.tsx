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
  IonRadio,
  IonRadioGroup,
  useIonAlert,
} from "@ionic/react";
// import "./Register.module.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { useAppDispatch, useAppSelector } from "../redux/store";
import { registerAuth } from "../redux/auth/actions";
import { useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

// import { Preferences } from "@capacitor/preferences";

const RegisterLoop: React.FC = () => {
  const dispatch = useAppDispatch();
  const [presentAlert] = useIonAlert();
  const history = useHistory();

  const select = useAppSelector((state) => {
    return state.auth;
  });
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

  const {
    register,
    // handleSubmit,
    // watch,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
    defaultValues: {
      username: "",
      birthday: "",
      gender: "",
      email: "",
      password: "",
      rePassword: "",
    },
  });
  let main = async (json: any) => {
    await dispatching(json);
    await gettingStorage();
    // return <Redirect to="/discuss" />;

    history.replace("/discuss");
  };
  let dispatching = (json: any) => {
    dispatch(registerAuth(json.user, json.token.access_token));
  };
  let gettingStorage = () => {
    // mobile version
    // const auth = async () => {
    //   await Preferences.get({ key: "auth_stockoverflow" });
    // };

    // web version
    localStorage.getItem("auth_stockoverflow");
  };
  let submit = async () => {
    console.log("enter submit");
    let data: any = getValues();
    data.birthday = new Date(data.birthday).toISOString();
    if (data.password !== data.rePassword) {
      presentAlert({
        header: "錯誤",
        subHeader: "密碼不一致",
        buttons: ["OK"],
      });
      return;
    }
    // console.log(data);
    // console.log(process.env.REACT_APP_PUBLIC_URL);
    const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    //format of json return: { user: {id: userObj}, access_token: token}
    console.log(json);
    console.log(res);
    if (res.ok) {
      main(json);

      // console.log("register", localStorage.getItem("auth_stockoverflow"));
    } else {
      presentAlert({
        header: "錯誤",
        subHeader: json.message,
        buttons: ["OK"],
      });
    }
  };

  return (
    <IonPage id="main-content">
      <IonHeader>
        <IonToolbar>
          <IonTitle className="p-0">
            <div className="d-flex justify-content-between align-items-center w100">
              <IonBackButton defaultHref="/home"></IonBackButton>
              註冊
              <div className="pl-5"></div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <form
        // through local strategy get the access_token
        >
          <IonList>
            <IonItem>
              <IonLabel position="floating">用戶名稱</IonLabel>
              <IonInput
                clearInput={true}
                {...register("username", {
                  required: { value: true, message: "請輸入電郵" },
                })}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="stacked">出生日期</IonLabel>
              <IonInput
                type="date"
                // clearInput={true}
                {...register("birthday", {
                  required: { value: true, message: "請輸入出生日期" },
                })}
              ></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel>性別</IonLabel>
              <IonRadioGroup
                {...register("gender", {
                  required: { value: true, message: "請選擇性別" },
                })}
              >
                <div className="d-flex">
                  <IonItem lines="none">
                    <IonLabel>男</IonLabel>
                    <div className="pl-1"></div>
                    <IonRadio
                      value="M"
                      style={{
                        marginLeft: "0rem",
                        width: "1rem",
                        height: "1rem",
                        border: "1px white solid",
                        borderRadius: "5px",
                      }}
                      {...register("gender")}
                    ></IonRadio>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>女</IonLabel>
                    <div className="pl-1"></div>
                    <IonRadio
                      value="F"
                      style={{
                        marginLeft: "0rem",
                        width: "1rem",
                        height: "1rem",
                        border: "1px white solid",
                        borderRadius: "5px",
                      }}
                      {...register("gender")}
                    ></IonRadio>
                  </IonItem>
                </div>
              </IonRadioGroup>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">用戶電郵</IonLabel>
              <IonInput
                // type="email"
                {...register("email", {
                  required: { value: true, message: "請輸入電郵" },
                  pattern: {
                    value: /^[A-Z0-9._%+_]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    // value: /[A-Z]/g,
                    message: "請輸入正確的電郵",
                  },
                })}
                clearInput={true}
              ></IonInput>
              {/* {errors.email && <>{errors.email.message}</>} */}
            </IonItem>

            <ErrorMessage
              className="ion-padding"
              errors={errors}
              name="email"
              as={<IonLabel style={{ color: "red" }}></IonLabel>}
            />
            {/* 去俾user揀做邊種用戶 */}
            {/* <IonItem >
                  <IonLabel position="floating">身份</IonLabel>
                  <IonRadioGroup {...register("identity", { required: true })}>
                    <IonItem>
                      <IonLabel>超級股神</IonLabel>
                      <IonRadio value="1"></IonRadio>
                    </IonItem>
                    <IonItem>
                      <IonLabel>精明用家</IonLabel>
                      <IonRadio value="2"></IonRadio>
                    </IonItem>
                  </IonRadioGroup>
                </IonItem>*/}
            <IonItem>
              <IonLabel position="floating">密碼</IonLabel>
              <IonInput
                type="password"
                clearInput={true}
                {...register("password", {
                  required: { value: true, message: "請輸入密碼" },
                  pattern: {
                    value:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                    message:
                      "密碼需要有8-16個字,包括最少一個數字, 一個大楷字母, 一個小楷字母及符號",
                  },
                })}
              ></IonInput>
            </IonItem>
            <ErrorMessage
              className="ion-padding"
              errors={errors}
              name="password"
              as={<IonLabel style={{ color: "red" }}></IonLabel>}
            />
            <IonItem>
              <IonLabel position="floating">確認密碼</IonLabel>
              <IonInput
                type="password"
                clearInput={true}
                {...register("rePassword", {
                  required: { value: true, message: "請再次輸入密碼以作確認" },
                  pattern: {
                    // check the value with at least 1 number/ capital or small
                    value:
                      /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{8,16}$/,
                    message:
                      "密碼需要有8-16個字,包括最少一個數字, 一個大楷字母, 一個小楷字母及符號",
                  },
                })}
              ></IonInput>
            </IonItem>
            <ErrorMessage
              className="ion-padding"
              errors={errors}
              name="rePassword"
              as={<IonLabel style={{ color: "red" }}></IonLabel>}
            />
          </IonList>
          <IonButton onClick={submit} className="ion-margin">
            註冊
          </IonButton>
        </form>
        <p className="ion-margin">
          已有帳號? 可
          <Link to="/login" replace>
            登入
          </Link>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default RegisterLoop;
