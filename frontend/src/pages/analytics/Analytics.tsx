import { IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle, IonText, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import styled from "styled-components";
import { Area, Line } from '@ant-design/plots';
import { useEffect, useState } from "react";

let user_id: number

if(localStorage.getItem("auth_stockoverflow") !== null) {
  const user = JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user || undefined;
  user_id = +user.id;
}

interface Data {
  date:string,
  number_of_follower: number
}

interface Follower {
  increaseData:Data[],
  follower_now: number,
  follower_beforeMonth: number
}


const Analytics: React.FC = () => {
    const [followerData, setFollowerData] = useState(Array<Follower>);

    useEffect(()=>{
      fetch(`${process.env.REACT_APP_PUBLIC_URL}/analytics/follower_month/${user_id}`)
      .then(response => response.json())
      .then(json => setFollowerData(json));
    },[]);

    const DemoColumn = () => {    
      let data: Data[] = [];
  
      if(followerData.length > 0) {
        data = followerData[0].increaseData
      }
  
      const config = {
        data,
        xField: 'date',
        yField: 'number_of_follower',
        smooth: true,
        areaStyle:{
          fill:"#dedede",
          fillOpacity:1,
          lineOpacity:0,
        },
        line:{
          color:'#666'
        },
        xAxis: {
          label: {
            autoHide: true,
            autoRotate: false,
          },
        },
        meta: {
          type: {
            alias: '',
          },
          sales: {
            alias: '關注數量',
          },
        },
      };
      return <Area {...config as any} />;
    };

    return (
        <IonPage>
            <IonHeader translucent={true} collapse="fade">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/discuss" />
                    </IonButtons>
                    <IonTitle>數據分析</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
              {followerData.length > 0 &&
                <Container>
                    <FansAmountHeader>
                        <IonText>粉絲增長</IonText>
                        <IonText>過去30天</IonText>
                    </FansAmountHeader>
                    <div className="totalAmount">
                        <IonText>你有<strong style={{fontSize:25, margin:"0rem 0.5rem"}}>{followerData[0].follower_now}</strong>名粉絲</IonText>
                        <IonText>+0.2% vs 10月27日</IonText>
                    </div>
                    <FansAmountAnalysis>
                        <div className="amountAnalysis">
                            <IonText>數據</IonText>
                            <div className="amountCardContainer">
                                <div className="amountCard">
                                    <IonText>變化</IonText>
                                    <IonText>+2</IonText>
                                </div>
                                <div className="amountCard">
                                    <IonText>關注</IonText>
                                    <IonText>4</IonText>
                                </div>
                                <div className="amountCard">
                                    <IonText>取消關注</IonText>
                                    <IonText>2</IonText>
                                </div>
                            </div>
                        </div>
                        <DemoColumn />
                    </FansAmountAnalysis>
                </Container>
              }
            </IonContent>
        </IonPage>
    )
}

export default Analytics;

const Container = styled.div`
    padding: 1rem;

    .totalAmount {
        width: 100%;
        height: 10rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap:0.5rem;

        ion-text:nth-child(1) {
            font-size: 18px;
        }

        ion-text:nth-child(2) {
            color: #9e9e9e
        }

    }

`

const FansAmountHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const FansAmountAnalysis = styled.div`
    height: 15rem;

    .amountCardContainer {
        display: flex;
        gap: 0.8rem;
        margin: 1rem 0rem;
        
        .amountCard {
            width: 8rem;
            height: 3rem;
            border-radius: 0.5rem;
            background-image: linear-gradient(to right bottom, #ffa930, #ff9d3f, #ff924d, #ff885b, #ff7f67);
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0rem 0.8rem;
            
            ion-text {
                font-weight: 600;
                font-size: 14px;
            }
        }
    }

`