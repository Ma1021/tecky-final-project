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
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

// Components
import Allquestion from "../../components/discuss/Allquestion";
import MyAnswer from "../../components/discuss/Myanswer";
import MyQuestion from "../../components/discuss/Myquestion";
import Title from "../../components/All/Title";

const Discuss: React.FC = () => {
  const [segment, setSegment] = useState("all");

  const onSegmentChange = (e: any) => {
    setSegment(e.detail.value);
  };

  const history = useHistory();

  return (
    <IonPage id="main-content">
      <IonHeader translucent={true} collapse="fade">
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
        <SearchBar></SearchBar>
        <QuestionBtn
          onClick={() => {
            history.push("/discuss/createQuestion");
          }}
        >
          提出問題
        </QuestionBtn>
      </ToolContainer>

      <IonContent>
        {segment === "all" && <Allquestion />}
        {segment === "question" && <MyQuestion />}
        {segment === "answer" && <MyAnswer />}
      </IonContent>
    </IonPage>
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
  --indicator-color: #ffa73c;
  --color-checked: #fff;
  font-weight: 800;
`;

export default Discuss;
