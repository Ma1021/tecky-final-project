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
        const resultArray = [];
        for (let i = 0; i < 10; i++) {
          const objKeyArr = Object.keys(result);
          if (objKeyArr[i] === undefined) {
            return;
          }
          resultArray.push({ [objKeyArr[i]]: result[objKeyArr[i]] });
        }
        setSearchResultArray(resultArray);
      });
  }, [searchWord]);

  return (
    <>
      <IonPage>
        <IonHeader>
          <IonButtons slot="start">
            <IonBackButton>Back</IonBackButton>
          </IonButtons>
          <IonInput
            onIonChange={(e: any) => {
              setSearchWord(e.detail.value);
            }}
          ></IonInput>
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
