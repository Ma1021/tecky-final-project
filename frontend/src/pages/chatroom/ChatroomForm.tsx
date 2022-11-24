import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonIcon,
  IonTextarea,
  IonModal,
  IonCheckbox,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import { image } from "ionicons/icons";
import {
  ReactEventHandler,
  useEffect,
  useRef,
  useCallback,
  useState,
} from "react";
import Cropper from "react-easy-crop";
import { Point, Area } from "react-easy-crop/types";
import "./ChatroomForm.css";
import getCroppedImg from "../../helper/cropImage";
import { useAppDispatch, useAppSelector } from "../../redux/store";

const ChatroomForm: React.FC = () => {
  const {
    register,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      introduction: "",
      icon: "",
      host: 0,
    },
  });

  const selector = useAppSelector((state) => state?.auth?.user?.id as number);

  //   cropper below
  const [imageCrop, setImageCrop] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // create chatroom +  update data
  const createChatroom = () => {
    console.log("todo");
    let data = getValues();
    console.log("data befroe edited", data);
    if (croppedImage !== null) {
      data.icon = croppedImage;
    }
    data.host = selector;
    console.log("data after edited", data);

    setCroppedImage(null);
  };

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
    console.log("enter save icon input");

    try {
      const croppedImage = await getCroppedImg(
        imageCrop,
        croppedAreaPixels,
        rotation
      );
      console.log("donee", { croppedImage });
      setCroppedImage(croppedImage as any);
    } catch (e) {
      console.error(e);
    }
  }, [croppedAreaPixels, rotation]);

  const onClose = useCallback(() => {
    setCroppedImage(null);
  }, []);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="p-0">
              <div className=" d-flex justify-content-between align-items-center w100 ">
                <IonButtons>
                  <IonBackButton defaultHref="/chatroomList"></IonBackButton>
                </IonButtons>
                開設聊天室
                <IonButtons>
                  <IonButton className="pr-1">取消</IonButton>
                </IonButtons>
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonItem lines="full">
            <UploadIcon>
              <label className="ion-margin">
                {croppedImage == null ? (
                  <>
                    <span>圖示</span>
                    <IonIcon size="large" icon={image}></IonIcon>
                  </>
                ) : (
                  <div>
                    <img src={croppedImage} />
                  </div>
                )}
                <input
                  type="file"
                  onClick={clearFile}
                  onInput={checkFile}
                  {...register("icon")}
                />
              </label>
            </UploadIcon>
          </IonItem>
          <IonModal isOpen={isOpen}>
            <IonHeader>
              <IonToolbar>
                <IonButtons slot="start">
                  <IonButton onClick={() => setIsOpen(false)}>關閉</IonButton>
                </IonButtons>
                <IonTitle>圖示</IonTitle>
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
          <IonItem lines="full" counter={true}>
            <IonLabel>名稱</IonLabel>
            <IonInput
              type="text"
              maxlength={30}
              {...register("name", {
                required: { value: true, message: "請輸入聊天室名字" },
                maxLength: 30,
              })}
            ></IonInput>
          </IonItem>
          <ErrorMessage
            className="ion-padding"
            errors={errors}
            name="name"
            as={<IonLabel style={{ color: "red" }}></IonLabel>}
          />
          <IonItem lines="full" counter={true}>
            <IonLabel>介紹</IonLabel>
            <IonTextarea
              maxlength={500}
              autoGrow={true}
              {...(register("introduction"),
              {
                maxLength: 500,
              })}
            ></IonTextarea>
          </IonItem>

          <IonButton
            onClick={createChatroom}
            className="ion-margin"
            expand="block"
          >
            開設
          </IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default ChatroomForm;

const UploadIcon = styled.div`
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
