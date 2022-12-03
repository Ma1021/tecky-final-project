import {
  IonPage,
  IonContent,
  IonHeader,
  IonButtons,
  IonBackButton,
  IonList,
  IonItem,
  IonInput,
} from "@ionic/react";
import React, { useEffect, useState } from "react";

const SearchPage: React.FC = () => {
  const [searchWord, setSearchWord] = useState("");
  const [searchResultArray, setSearchResultArray] = useState<Object[]>([]);

  useEffect(() => {
    const resultArr = [];
    const resultObject = {
      SGOO: "Snoogoo Corp.",
      GOOGL: "Alphabet Inc.",
      GOOD: "Gladstone Commercial Corporation",
      GOODO: "Gladstone Commercial Corporation",
      GOOS: "Canada Goose Holdings Inc.",
      GOOG: "Alphabet Inc.",
    };
    for (let key in resultObject) {
      resultArr.push({ key: resultObject[key as keyof typeof resultObject] });
    }
    setSearchResultArray(resultArr);
    // fetch(`http://35.213.167.63/redis/${searchWord.toUpperCase()}`)
    //   .then((res) => res.json())
    //   .then((result) => {
    //     console.log(result);
    //     const resultArray = [];
    //     for (let key in result) {
    //       resultArray.push({ key: result[key] });
    //     }
    //     setSearchResultArray(resultArray);
    //   });
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
                  <IonItem>{Object.keys(searchResult)}</IonItem>
                ))
              : null}
          </IonList>
        </IonContent>
      </IonPage>
    </>
  );
};

export default SearchPage;
