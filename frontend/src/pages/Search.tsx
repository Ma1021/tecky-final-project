import {
  IonPage,
  IonContent,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonInput,
  IonLabel,
  IonSearchbar,
  IonToolbar,
  IonTitle,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

const SearchPage: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResultArray, setSearchResultArray] = useState<Object[]>([]);

  useEffect(() => {
    fetch(
      `${
        process.env.REACT_APP_PUBLIC_URL
      }/search?keyword=${searchWord.toUpperCase()}`
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result search", result);
        const resultArray = [];
        for (let i = 0; i < 10; i++) {
          const objKeyArr = Object.keys(result);
          if (objKeyArr[i] === undefined) {
            return;
          }
          resultArray.push({ [objKeyArr[i]]: result[objKeyArr[i]] });
        }
        setSearchResultArray(resultArray);
      })
      .catch((err) => {
        console.log("err", err);
      });
  }, [searchWord]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle className="p-0">
              <div className=" d-flex justify-content-round align-items-center w100 h100">
                <IonButtons slot="start">
                  <IonBackButton
                    defaultHref="/discuss"
                    text="返回"
                  ></IonBackButton>
                </IonButtons>
                <IonSearchbar
                  className="pt-0 pb-0 ion-margin"
                  onIonChange={(e: any) => {
                    setSearchWord(e.detail.value);
                  }}
                ></IonSearchbar>
              </div>
            </IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent>
          {searchWord}
          <IonList>
            {searchResultArray.length > 0
              ? searchResultArray.map((searchResult) => (
                  <IonItem>
                    <IonLabel>{Object.keys(searchResult)}</IonLabel>
                    <IonLabel>{Object.entries(searchResult)[0][1]}</IonLabel>
                  </IonItem>
                ))
              : null}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default SearchPage;
