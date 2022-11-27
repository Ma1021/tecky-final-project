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
} from "@ionic/react";
import { useState, useCallback, useEffect } from "react";
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
  const [segment, setSegment] = useState("all");
  const [keyword, setKeyword] = useState("");
  let user
  let user_id: number

  if(localStorage.getItem("auth_stockoverflow") !== null) {
    user = JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
    user_id = +user.id;
  }

  
  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
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
        <IonHeader translucent={true} collapse="fade" style={{height:50}} className="d-flex align-items-center">
          <IonToolbar>
            <Title title="討論區" />
          </IonToolbar>
        </IonHeader>

        <SegmentTab value={segment} onIonChange={onSegmentChange}>
          <SegmentButton value="all">
            <IonLabel>所有問題</IonLabel>
          </SegmentButton>
          <SegmentButton value="question">
            <IonLabel>我的問題</IonLabel>
          </SegmentButton>
          <SegmentButton value="answer">
            <IonLabel>我的答題</IonLabel>
          </SegmentButton>
        </SegmentTab>

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

        <IonContent>
          {segment === "all" && (
            <Allquestion loadQuestion={initQuestion} keyword={keyword} />
          )}
          {segment === "question" && (
            <MyQuestion
              loadAskerQuestion={initAskerQuestion}
              keyword={keyword}
            />
          )}
          {segment === "answer" && (
            <MyAnswer
              loadAnswererQuestion={initAnswererQuestion}
              keyword={keyword}
            />
          )}
        </IonContent>
      </IonPage>
    </>
  );
};

const ToolContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0px 10px;
  gap: 8px;
  margin-bottom: 0.5rem;
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

const SegmentTab = styled(IonSegment)`
  width: 95%;
  margin: 8px 10px;
  color: #dedede;
`;

const SegmentButton = styled(IonSegmentButton)`
  --indicator-color: linear-gradient(to right bottom, #ffa930, #ff9d3f, #ff924d, #ff885b, #ff7f67);
  --color-checked: #fff;
  font-weight: 800;
`;

export default Discuss;
