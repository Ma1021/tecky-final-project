import {
  IonCol,
  IonGrid,
  IonItem,
  IonList,
  IonRow,
  IonSpinner,
  useIonToast,
} from "@ionic/react";
import { useEffect, useState } from "react";
import { useRouteMatch } from "react-router";
import styled from "styled-components";
import { useAppSelector } from "../../redux/store";
import { LoadingScreen, QuestionContainer } from "../discuss/Allquestion";

const UserIntro: React.FC = () => {
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);
  const [present] = useIonToast();

  let url = useRouteMatch<{ id?: string }>();
  let userId = url.params.id;

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/${+userId!}/intro`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId }),
    })
      .then((res) => {
        res.json().then((data) => {
          setIntro(data.introduction);
        });
      })
      .catch((error) => {
        console.log(`failed to load introduction, ${error}`);
        present({
          message: String(error),
          duration: 15000,
          color: "danger",
        });
      })
      .finally(() => setLoading(false));
  }, [setIntro, setLoading]);

  return (
    <>
      {loading === true ? (
        <LoadingScreen>
          <IonSpinner name="crescent" /> 載入中...
        </LoadingScreen>
      ) : (
        <QuestionContainer>
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {intro}
          </div>
        </QuestionContainer>
      )}
    </>
  );
};

export default UserIntro;

// const Introduction = styled(div)`
//   --min-height: 100%;
// `;
