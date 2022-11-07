import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonSegment, IonSegmentButton, IonLabel, IonSearchbar, IonButton } from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

// Components
import Allquestion from '../components/discuss/Allquestion';
import MyQuestion from '../components/discuss/Myquestion';
import MyAnswer from '../components/discuss/Myanswer';

const Discuss: React.FC = () => {
  const [segment, setSegment] = useState("all")

  const onSegmentChange = (e:any) => {
    setSegment(e.detail.value);
  };

  const history = useHistory();

  return (
    <IonPage>
      <IonHeader translucent={true} collapse="fade">
        <IonToolbar>
          <IonTitle>討論區</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <SegmentTab value={segment} onIonChange={onSegmentChange}>
          <IonSegmentButton value="all">
            <IonLabel>所有問題</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="question">
            <IonLabel>我的問題</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="answer">
            <IonLabel>我的答題</IonLabel>
          </IonSegmentButton>
        </SegmentTab>

        <ToolContainer>
            <SearchBar></SearchBar>
            <QuestionBtn onClick={()=>{ history.push("/discuss/askQuestion")}}>提出問題</QuestionBtn>
        </ToolContainer>

        {segment === "all" && <Allquestion/>}
        {segment === "question" && <MyQuestion/>}
        {segment === "answer" && <MyAnswer/>}
        
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
    margin-top:10px;
    padding:0px 10px;
    gap:10px;
` 

const SearchBar = styled(IonSearchbar)`
    width: 75%;
    height: 100%;
    padding: 0px;
`

const QuestionBtn = styled(IonButton)`
    width: 25%;
    height: 100%;
    padding: 3px;
    font-size: 14px;
    margin: 0px;
`

const SegmentTab = styled(IonSegment)`
  width:95%;
  margin: 0px 10px 0px 10px;
`

export default Discuss;
