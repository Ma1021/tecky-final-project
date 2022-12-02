import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonModal,
  IonList,
  IonLabel,
  IonInput,
  IonTextarea,
  IonRadio,
  IonRadioGroup,
  useIonToast,
} from "@ionic/react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { useCallback, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import getCroppedImg, { dataURLToBlob } from "../../helper/cropImage";
import { image } from "ionicons/icons";
import styled from "styled-components";
import { useHistory } from "react-router";
import { login } from "../../redux/auth/actions";

interface RadioGroupCustomEvent<T = any> extends CustomEvent {
  detail: RadioGroupChangeEventDetail<T>;
  target: HTMLIonRadioGroupElement;
}

interface RadioGroupChangeEventDetail<T = any> {
  value: T;
}

interface DataForm {
  intro?: string;
  icon?: string;
  username?: string;
  birthday?: string;
  gender?: string;
}

const UserEdit: React.FC = () => {
  const user = useAppSelector((state) => state.auth.user);
  const localUser = useAppSelector((state) => state.auth);
  const token = useAppSelector((state) => state.auth.token);
  const [present] = useIonToast();
  const history = useHistory();
  const dispatch = useAppDispatch();

  // form info below
  const [intro, setIntro] = useState<string | undefined>(user?.introduction);
  const [icon, setIcon] = useState<string | undefined>(user?.avatar);
  const [username, setUsername] = useState<string | undefined>(user?.username);
  const [birthday, setBirthday] = useState<string | undefined>(user?.birthday);
  const [gender, setGender] = useState<"M" | "F" | undefined>(user?.gender);

  // controlling form data
  const textAreaChange = (e: any) => {
    setIntro((e.target as HTMLInputElement).value);
  };

  const updateUser = async (e: any) => {
    e.preventDefault();
    // handle form data before sending
    let filename = `${new Date().toISOString()}_user${user?.id}`;
    let file = null;
    if (icon !== undefined && icon !== null) {
      file = dataURLToBlob(icon, filename);
    }
    let formData = new FormData();
    if (file !== null) {
      formData.append("icon", file);
    }
    formData.append("introduction", intro as string);
    formData.append("username", username as string);
    formData.append("birthday", birthday as string);
    formData.append("gender", gender as string);

    let res = await fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/user/${user?.id}/update`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.ok) {
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/${user?.id}`)
        .then((res) => {
          if (res.ok) {
            res.json().then((json) => {
              // update dispatchOne
              dispatch(login(json, token as string));
              // update localstorage
              // phone version
              // async () => {
              //   await Preferences.set({ key: "auth_stockoverflow", value: JSON.stringify(select) });
              // };

              // web version
              localStorage.setItem(
                "auth_stockoverflow",
                JSON.stringify(localUser)
              );
            });
            // console.log("user after dispatch", user);
          } else {
            {
              res.json().then((json) => {
                present({
                  message: json.message,
                  duration: 1000,
                  position: "bottom",
                });
              });
            }
          }
        })
        .then(() => {
          present({
            message: "已成功更新你的資料！",
            duration: 1500,
            position: "bottom",
          });
          history.goBack();
        })
        .catch((error) => {
          console.log("error", error);
        });

      // history.replace("/discuss");
    } else {
      let json = await res.json();
      present({
        message: json.message,
        duration: 1000,
        position: "bottom",
      });
    }
  };

  //   cropper below
  const [imageCrop, setImageCrop] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const checkFile = (e: any) => {
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setImageCrop(() => {
        return reader.result as any;
      });
    };
    reader.readAsDataURL(files[0]);
    if (e.target.files.length > 0) {
      setIsOpen(true);
    }
  };
  const clearFile = (e: any) => {
    e.target.value = null;
  };
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels as any);
    },
    []
  );

  const saveIconInput = useCallback(async () => {
    setIsOpen(false);

    try {
      const croppedImage = await getCroppedImg(
        imageCrop,
        croppedAreaPixels,
        rotation
      );
      // console.log("donee", { croppedImage });
      setCroppedImage(croppedImage as any);
      setIcon(croppedImage as any);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, [setCroppedImage]);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar>
          <IonTitle className="p-0">
            <div className=" d-flex justify-content-round align-items-center w100 h100">
              <IonButtons>
                <IonBackButton defaultHref="/discuss"></IonBackButton>
              </IonButtons>
              <div style={{ flexGrow: 1, textAlign: "center" }}>編輯用戶</div>
              <div style={{ width: "3rem" }}></div>
            </div>
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {/* user information below */}
        <form
          encType="multipart/form-data"
          // through local strategy get the access_token
        >
          <IonList>
            <IonItem lines="full">
              <UploadIcon>
                <label className="ion-margin">
                  {croppedImage == null && user?.avatar == undefined ? (
                    <>
                      <span>圖示</span>
                      <IonIcon size="large" icon={image}></IonIcon>
                    </>
                  ) : croppedImage == null ? (
                    // <div>
                    <img src={icon} alt="user icon upload" />
                  ) : (
                    // </div>
                    <div>
                      <img src={croppedImage} alt="user icon uploaded" />
                    </div>
                  )}
                  <input type="file" onClick={clearFile} onInput={checkFile} />
                </label>
                <span className="ion-padding pt-0">按一下頭像編輯</span>
              </UploadIcon>
            </IonItem>
            <IonModal isOpen={isOpen}>
              <IonHeader>
                <IonToolbar>
                  <IonButtons slot="start">
                    <IonButton onClick={() => setIsOpen(false)}>關閉</IonButton>
                  </IonButtons>
                  <IonTitle>頭像</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={saveIconInput}>儲存</IonButton>
                  </IonButtons>
                </IonToolbar>
              </IonHeader>
              <IonContent className="ion-padding">
                <div className="crop-container-wrapper">
                  <div className="crop-container">
                    <Cropper
                      image={imageCrop}
                      crop={crop}
                      zoom={zoom}
                      aspect={1 / 1}
                      onCropChange={setCrop}
                      onCropComplete={onCropComplete}
                      onZoomChange={setZoom}
                      cropShape="round"
                    />
                  </div>
                </div>
              </IonContent>
            </IonModal>
            <IonItem lines="full">
              <IonLabel>用戶名稱</IonLabel>
              <IonInput
                type="text"
                value={username}
                onIonChange={(e: any) => setUsername(e.target.value)}
              ></IonInput>
            </IonItem>
            {/* <ErrorMessage
              className="ion-padding"
              errors={errors}
              name="username"
              as={<IonLabel style={{ color: "red" }}></IonLabel>}
            /> */}
            <IonItem lines="full">
              <IonLabel>性別</IonLabel>
              <IonRadioGroup
                // {...register("gender", {
                //   required: { value: true, message: "請選擇性別" },
                // })}
                value={gender}
                onIonChange={(e: RadioGroupCustomEvent) => {
                  setGender(e.detail.value);
                }}
              >
                <div className="d-flex">
                  <IonItem lines="none">
                    <IonLabel>男</IonLabel>
                    <div className="pl-1">
                      <IonRadio
                        value="M"
                        style={{
                          marginLeft: "0rem",
                          width: "1rem",
                          height: "1rem",
                          border: "1px white solid",
                          borderRadius: "5px",
                        }}
                      ></IonRadio>
                    </div>
                  </IonItem>
                  <IonItem lines="none">
                    <IonLabel>女</IonLabel>
                    <div className="pl-1">
                      <IonRadio
                        value="F"
                        style={{
                          marginLeft: "0rem",
                          width: "1rem",
                          height: "1rem",
                          border: "1px white solid",
                          borderRadius: "5px",
                        }}
                      ></IonRadio>
                    </div>
                  </IonItem>
                </div>
              </IonRadioGroup>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>用戶電郵</IonLabel>
              <IonInput disabled type="text" value={user?.email}></IonInput>
            </IonItem>
            <IonItem lines="full">
              <IonLabel>出生日期</IonLabel>
              <IonInput
                type="date"
                value={new Date(birthday as string).toLocaleDateString("fr-CA")}
                onIonChange={(e: any) => {
                  setBirthday(e.target.value);
                }}
                // {...register("birthday", {
                //   required: { value: true, message: "請輸入出生日期" },
                // })}
              ></IonInput>
            </IonItem>
            <IonItem lines="full" counter={true}>
              <IonLabel className="ion-padding">介紹</IonLabel>
              <IonTextarea
                value={intro}
                onIonChange={textAreaChange}
              ></IonTextarea>
            </IonItem>
            {/* user information above */}
          </IonList>
          <IonButton onClick={updateUser} className="ion-margin" expand="block">
            更新
          </IonButton>
          {/* <IonButton  className="ion-margin" expand="block">
            更改密碼
          </IonButton> */}
        </form>
      </IonContent>
    </IonPage>
  );
};

export default UserEdit;

export const UploadIcon = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;

  div {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background-color: pink;
  }

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    background-color: pink;
    object-fit: cover;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100px;
    height: 100px;
    background-color: grey;
    border-radius: 50%;
  }

  label input {
    display: none;
  }
`;
