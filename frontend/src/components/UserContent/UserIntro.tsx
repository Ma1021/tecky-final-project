import { IonSpinner, useIonToast } from "@ionic/react";
import { useEffect, useState } from "react";
import { LoadingScreen, QuestionContainer } from "../discuss/Allquestion";

const UserIntro: React.FC<{ userId: number }> = (props) => {
  const [intro, setIntro] = useState("");
  const [loading, setLoading] = useState(true);
  const [present] = useIonToast();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/user/${props.userId}/intro`, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ userId: props.userId }),
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
      .finally(() => {
        setLoading(false);
        console.log(loading, intro);
      });
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
