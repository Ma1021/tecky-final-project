import { IonImg, IonItem, IonText } from "@ionic/react";
import styled from "styled-components";
import missionIcon from '../../img/mission.png';
import { useState } from "react";

const UserPoints: React.FC = () => {
  const [style, setStyle] = useState({});
  const done = 70
  const point = 700
  
  setTimeout(() => {
		const newStyle = {
			opacity: 1,
			width: `${done}%`
		}
		
		setStyle(newStyle);
	}, 50);

  return (
    <Container>
      <IonText style={{alignSelf:'flex-start', fontWeight:600, marginLeft:'4%'}}>我的積分：{point}</IonText>
      
      <div className="kolProgressCard">
        <div className="title">
          <IonText> 申請KOL</IonText>
          <IonImg src={missionIcon}/>
        </div>

        <div className="progressBar">
          <IonText>需要獲取1,000積分</IonText>
          <div className="progress">
            <div className="progress-done" style={style}>
              {done}%
            </div>
          </div>
        </div>
      </div>

      <IonText style={{alignSelf:'flex-start', marginLeft:'4%', fontSize:15}}>積分記錄</IonText>
      <div className="pointRecord">
        <IonItem lines="full">
          <div style={{width:'96%', margin:'0.5rem 0'}} className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column description">
              <IonText>提出問題</IonText>
              <IonText>2022/12/04 10:36</IonText>
            </div>
            <IonText className="point">+10</IonText>
          </div>
        </IonItem>
        <IonItem lines="full">
          <div style={{width:'96%', margin:'0.5rem 0'}} className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column description">
              <IonText>提出問題</IonText>
              <IonText>2022/12/04 10:36</IonText>
            </div>
            <IonText className="point">+10</IonText>
          </div>
        </IonItem>
        <IonItem lines="full">
          <div style={{width:'96%', margin:'0.5rem 0'}} className="d-flex align-items-center justify-content-between">
            <div className="d-flex flex-column description">
              <IonText>提出問題</IonText>
              <IonText>2022/12/04 10:36</IonText>
            </div>
            <IonText className="point">+10</IonText>
          </div>
        </IonItem>
      </div>
    </Container>
  )
};

export default UserPoints;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem 0rem;
  gap: 0.5rem;

  .kolProgressCard {
    width: 95%;
    background-color: #222;
    border-radius: 0.5rem;
    padding: 1rem;
    font-size: 15px;
    display: flex;

    .title {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
      width: 20%;

      ion-img {
        width: 3rem;
        height: 3rem;
      }
    }

    .progressBar {
      width: 80%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .progress {
        background-color: #444;
        border-radius: 20px;
        position: relative;
        margin: 10px 0;
        height: 20px;
        width: 90%;
        overflow: hidden;
      }

      .progress-done {
        background: var(--ion-color-primary);
        border-radius: 20px;
        color: #fff;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
        width: 0;
        opacity: 0;
        transition: 0.6s ease 0.1s;
      }
    }
  }

  .pointRecord {
    width: 95%;
    background-color: #222;
    border-radius: 0.5rem;
    padding-top: 0.5rem;
    
    ion-item {
      font-size: 14px;

      .description {
        gap: 0.3rem;

        ion-text:nth-child(1) {
          font-weight: 600;
        }
        ion-text:nth-child(2) {
          font-size: 12px;
          color: #999;
        }
      }

      .point {
        font-size: 18px;
        font-weight: 600;
        color: #ff924d;
      }
    }
  }
`