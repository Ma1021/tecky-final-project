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
} from "@ionic/react";
// import "./Register.module.css";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const RegisterLoop: React.FC = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  let submit = async () => {
    console.log("enter submit");
    let data: any = getValues();
    data.birthday = new Date(data.birthday).toISOString();
    console.log(data);
    console.log(process.env.REACT_APP_PUBLIC_URL);
    // await register(data);
    const res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    console.log(json);
    alert(JSON.stringify(data));
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
      </IonContent>
    </IonPage>
  );
};

export default RegisterLoop;
