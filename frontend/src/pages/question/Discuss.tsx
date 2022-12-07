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
import { useAppDispatch } from "../../redux/store";
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
      JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user ||
      undefined;
    user_id = +user.id;
  }

  const slider = useRef<HTMLIonSlidesElement>(null);
  const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
  };

  const handleSlideChange = async (event: any) => {
    let index: number = 0;
    await event.target.getActiveIndex().then((value: any) => (index = value));
    setSegment("" + index);
  };

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
    slider.current!.slideTo(e.detail.value);
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
            <Title title="討論區" />
          </IonToolbar>
        </IonHeader>

        <IonContent>
          <div
            style={{
              position: "sticky",
              top: 0,
              zIndex: 5,
              backgroundColor: "#111",
            }}
          >
            <div className="d-flex justify-content-center">
              <SegmentTab value={segment} onIonChange={onSegmentChange}>
                <SegmentButton value="0">
                  <IonLabel>所有問題</IonLabel>
                </SegmentButton>
                <SegmentButton value="1">
                  <IonLabel>我的問題</IonLabel>
                </SegmentButton>
                <SegmentButton value="2">
                  <IonLabel>我的答題</IonLabel>
                </SegmentButton>
              </SegmentTab>
            </div>

            <div className="d-flex justify-content-center">
              <ToolContainer>
                <SearchBar
                  value={keyword}
                  placeholder="輸入關鍵字搜索"
                  onIonChange={handleKeywordChange}
                ></SearchBar>
                <QuestionBtn
                  onClick={() => {
                    history.push("/discuss/createQuestion");
                  }}
                >
                  提出問題
                </QuestionBtn>
              </ToolContainer>
            </div>
          </div>

          <IonSlides
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
          </IonSlides>
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
