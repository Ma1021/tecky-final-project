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
} from "@ionic/react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const Login: React.FC = () => {
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

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
              console.log(process.env.REACT_APP_PUBLIC_URL);
              // await register(data);
              const res = await fetch(
                `${process.env.REACT_APP_PUBLIC_URL}/auth/login`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ data }),
                }
              );
              const json = await res.json();
              console.log(json);
              alert(JSON.stringify(data));
            } catch (err) {
              console.log(err);
            }
          })}
        >
          <IonList>
            <IonItem>
              <IonLabel position="floating">用戶電郵</IonLabel>
              <IonInput
                // type="email"
                {...register("username", {
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
      </IonContent>
    </IonPage>
  );
};

export default Login;
