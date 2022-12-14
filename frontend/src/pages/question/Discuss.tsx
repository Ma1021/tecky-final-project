import {
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSearchbar,
  IonButton,
  IonSlides,
  IonSlide,
} from "@ionic/react";
import { useState, useCallback, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  loadAnswererQuestions,
  loadAskerQuestions,
  loadQuestions,
} from "../../redux/questions/questionSlice";

// Components
import Allquestion from "../../components/discuss/Allquestion";
import MyAnswer from "../../components/discuss/Myanswer";
import MyQuestion from "../../components/discuss/Myquestion";
import Title from "../../components/All/Title";
import Menu from "../../components/All/Menu";

const Discuss: React.FC = () => {  
  const [segment, setSegment] = useState("0");
  const [keyword, setKeyword] = useState("");
  let user;
  let user_id: number;

  if (localStorage.getItem("auth_stockoverflow") !== null) {
    user =
      JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
    user_id = +user.id;
  }

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
    // slider.current!.slideTo(e.detail.value);
  };

  function handleKeywordChange(e: any) {
    setKeyword(e.target.value);
  }

  const dispatch = useAppDispatch();

  const initQuestion = useCallback(async () => {
    await dispatch(loadQuestions());
  }, [dispatch]);

  const initAskerQuestion = useCallback(async () => {
    await dispatch(loadAskerQuestions(user_id));
  }, [dispatch]);

  const initAnswererQuestion = useCallback(async () => {
    await dispatch(loadAnswererQuestions(user_id));
  }, [dispatch]);

  useEffect(() => {
    initQuestion();
    initAskerQuestion();
    initAnswererQuestion();
  }, []);

  const history = useHistory();

  return (
    <>
      <Menu />
      <IonPage id="main-content">
        <IonHeader
          translucent={true}
          collapse="fade"
          className="d-flex align-items-center"
        >
          <IonToolbar>
            <Title title="?????????" />
          </IonToolbar>
        </IonHeader>

        <div className="d-flex justify-content-center">
            <SegmentTab value={segment} onIonChange={onSegmentChange}>
              <SegmentButton value="0">
                <IonLabel>????????????</IonLabel>
              </SegmentButton>
              <SegmentButton value="1">
                <IonLabel>????????????</IonLabel>
              </SegmentButton>
              <SegmentButton value="2">
                <IonLabel>????????????</IonLabel>
              </SegmentButton>
            </SegmentTab>
        </div>

        <div className="d-flex justify-content-center">
          <ToolContainer>
            <SearchBar
              value={keyword}
              placeholder="?????????????????????"
              onIonChange={handleKeywordChange}
            ></SearchBar>
            <QuestionBtn
              onClick={() => {
                history.push("/discuss/createQuestion");
              }}
            >
              ????????????
            </QuestionBtn>
          </ToolContainer>
        </div>



        <IonContent>
          {/* <IonSlides
            options={slideOpts}
            onIonSlideDidChange={(e) => handleSlideChange(e)}
            ref={slider}
          >
            <IonSlide>
              <Allquestion keyword={keyword} />
            </IonSlide>
            <IonSlide>
              <MyQuestion keyword={keyword} />
            </IonSlide>
            <IonSlide>
              <MyAnswer keyword={keyword} />
            </IonSlide>
          </IonSlides> */}

          {segment === "0" && <Allquestion keyword={keyword} />}
          {segment === "1" && <MyQuestion keyword={keyword} />}
          {segment === "2" && <MyAnswer keyword={keyword} />}
        </IonContent>
      </IonPage>
    </>
  );
};

const ToolContainer = styled.div`
  width: 95%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  margin-bottom: 0.5rem;

  @media (min-width: 768px) {
    width: 85%;
  }
`;

const SearchBar = styled(IonSearchbar)`
  width: 75%;
  height: 100%;
  padding: 0px;
`;

const QuestionBtn = styled(IonButton)`
  width: 25%;
  height: 100%;
  padding: 3px;
  font-size: 14px;
  margin: 0px;
`;

export const SegmentTab = styled(IonSegment)`
  width: 95%;
  margin: 8px 10px;
  color: #dedede;

  @media (min-width: 768px) {
    width: 85%;
  }
`;

export const SegmentButton = styled(IonSegmentButton)`
  --indicator-color: var(--ion-color-primary);
  --color-checked: #fff;
  font-weight: 800;
`;

export default Discuss;
