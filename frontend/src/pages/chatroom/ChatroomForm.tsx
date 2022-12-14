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
  useIonToast,
  useIonRouter,
} from "@ionic/react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { ErrorMessage } from "@hookform/error-message";
import { image } from "ionicons/icons";
import { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Area } from "react-easy-crop/types";
import "./ChatroomForm.css";
import getCroppedImg, { dataURLToBlob } from "../../helper/cropImage";
import { useAppSelector } from "../../redux/store";
import { useHistory } from "react-router";

const ChatroomForm: React.FC = () => {
  // form
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
  const [intro, setIntro] = useState("");
  const [present] = useIonToast();
  const history = useHistory();

  //   cropper below
  const [imageCrop, setImageCrop] = useState("");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  const selector = useAppSelector((state) => state?.auth?.user?.id as number);

  // goback to previous page
  const goBack = () => history.goBack();
  // ()=>{router.push("/chatroomList", "forward","replace")}

  // create chatroom +  update data
  const createChatroom = async (e: any) => {
    e.preventDefault();
    let data = getValues();
    // console.log("data befroe edited", data);
    data.introduction = intro;
    let formData = new FormData();
    formData.append("name", data.name);
    formData.append("introduction", data.introduction);
    formData.append("host", selector.toString());
    if (croppedImage !== null) {
      data.icon = croppedImage;
      console.log(data.icon);
      let filename = `${new Date().toISOString()}_${data.host}`;
      let file = dataURLToBlob(data.icon, filename);
      formData.append("icon", file);
    } else {
      data.icon = null as any;
    }
    console.log(formData);
    let res = await fetch(`${process.env.REACT_APP_PUBLIC_URL}/chatroom`, {
      method: "POST",
      body: formData,
    });
    if (res.ok) {
      present({
        message: "?????????????????????????????????",
        duration: 1500,
        position: "bottom",
      });

      history.goBack();
    } else {
      let json = await res.json();
      present({
        message: json.message,
        duration: 1000,
        position: "bottom",
      });
    }
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
  }, [setCroppedImage]);

  const textAreaChange = (e: any) => {
    setIntro((e.target as HTMLInputElement).value);
  };

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="p-0">
              <div className=" d-flex justify-content-between align-items-center w100 ">
                <IonButtons>
                  <IonBackButton
                    defaultHref="/chatroomList"
                    text="??????"
                  ></IonBackButton>
                </IonButtons>
                ???????????????
                <IonButtons>
                  <IonButton onClick={goBack} className="pr-1">
                    ??????
                  </IonButton>
                </IonButtons>
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <form
            id="createChatroomForm"
            action="/chatroom"
            method="POST"
            encType="multipart/form-data"
          >
            <IonItem lines="full">
              <UploadIcon>
                <label className="ion-margin">
                  {croppedImage == null ? (
                    <>
                      <span>??????</span>
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
                    <IonButton onClick={() => setIsOpen(false)}>??????</IonButton>
                  </IonButtons>
                  <IonTitle>??????</IonTitle>
                  <IonButtons slot="end">
                    <IonButton onClick={saveIconInput}>??????</IonButton>
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
              <IonLabel>??????</IonLabel>
              <IonInput
                type="text"
                maxlength={30}
                {...register("name", {
                  required: { value: true, message: "????????????????????????" },
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
              <IonLabel>??????</IonLabel>
              <IonTextarea
                maxlength={500}
                onIonChange={textAreaChange}
              ></IonTextarea>
            </IonItem>

            <IonButton
              onClick={createChatroom}
              className="ion-margin"
              expand="block"
            >
              ??????
            </IonButton>
          </form>
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
