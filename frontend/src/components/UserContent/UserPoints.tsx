import { IonImg, IonItem, IonText } from "@ionic/react";
import styled from "styled-components";
import missionIcon from '../../img/mission.png';
import { useEffect, useState, memo } from "react";

interface RecordListData {
  totalPoints: number,
  records: [
    {
			id: number,
			user_id: number,
			event: string,
			event_id: number,
			point: number,
			created_at: string,
		}
  ]
}

const UserPoints: React.FC = memo(() => {
  const [style, setStyle] = useState({});
  const [recordList, setRecordList] = useState({
    totalPoints: 0,
    records:[{}]
  } as RecordListData);
  let user_id: number;
  if (localStorage.getItem("auth_stockoverflow") !== null) {
    const user = JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
    user_id = +user.id;
  }
  
  useEffect(()=>{
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/points/${user_id}`)
    .then(response => response.json())
    .then((json) => {
      setRecordList(json)
    });
  },[])

  const done = (recordList.totalPoints/1000)*100
  const point = recordList.totalPoints

  useEffect(()=>{    
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${done}%`
      }
      
      setStyle(newStyle);
    }, 50);
  },[recordList])

  function formatDate(date: string) {
    const time = new Date(date).toLocaleString([], {
      hour12: false,
      dateStyle: "medium",
      timeStyle: "short",
    });
    return time;
  }

  const { records } = recordList;

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
              <div style={{marginLeft: done <= 10 ? done + 50 : done}}>{done > 0 && done+'%'}</div>
            </div>
          </div>
        </div>
      </div>

      <IonText style={{alignSelf:'flex-start', marginLeft:'4%', fontSize:15}}>積分記錄</IonText>
      <div className="pointRecord">
        {records.length > 0 ? records.map((record)=>{
          return <IonItem lines="full">
                    <div style={{width:'96%', margin:'0.5rem 0'}} className="d-flex align-items-center justify-content-between">
                      <div className="d-flex flex-column description">
                        <IonText>{record.event}</IonText>
                        <IonText>{formatDate(record.created_at)}</IonText>
                      </div>
                      <IonText className="point">{record.point > 0 ? '+'+record.point : record.point}</IonText>
                    </div>
                  </IonItem>
        }):
        <div className="d-flex flex-column justify-content-center align-items-center mt-4">
          <IonText>未有記錄</IonText>
          <IonText style={{fontSize:14, color:'#999'}}>去獲取積分吧</IonText>
        </div>
        }
      </div>
    </Container>
  )
});

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
    height: 35vh;
    background-color: #222;
    border-radius: 0.5rem;
    padding-top: 0.5rem;
    overflow-y: scroll;
    
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