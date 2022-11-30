import {
  IonHeader,
  IonPage,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonContent,
  IonTitle,
  IonText,
  IonSegment,
  IonSegmentButton,
  IonLabel,
} from "@ionic/react";
import styled from "styled-components";
import Canvas from "@antv/f2-react";
import { Chart, Legend, Axis, Line, Tooltip, Point } from "@antv/f2";
import { useEffect, useState } from "react";
import GenderPie from "./GenderPie";
import AgeChart from "./AgeChart";

interface Data {
  date: string;
  number_of_follower: number;
}

interface Follower {
  data: Data[];
  follower_now: number;
  follower_beforeMonth: number;
  increaseNum: number;
  decreaseNum: number;
}

const Analytics: React.FC = () => {
  const [followerData, setFollowerData] = useState(Array<Follower>);

  let user_id: number = 0;

  if (localStorage.getItem("auth_stockoverflow") !== null) {
    const user =
      JSON.parse(localStorage.getItem("auth_stockoverflow") as string).user ||
      undefined;
    user_id = +user.id;
  }

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_PUBLIC_URL}/analytics/follower_month/${user_id}`
    )
      .then((response) => response.json())
      .then((json) => setFollowerData(json));
  }, []);

  const thirtyDaysAgo = new Date(new Date().setDate(new Date().getDate() - 30))
    .toISOString()
    .split("T")[0];

  function percentage(now: number, thirtyAgo: number) {
    if (thirtyAgo === 0) {
      return (((now - thirtyAgo) / 1) * 100).toFixed(1);
    }
    return (((now - thirtyAgo) / thirtyAgo) * 100).toFixed(1);
  }

  const scale = {
    date: {
      type: "timeCat",
      mask: "MM/DD",
      tickCount: 5,
      range: [0, 1],
    },
    number_of_follower: {
      tickCount: 3,
      min: 0,
      alias: "關注數量",
    },
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
        {followerData.length > 0 && (
          <Container>
            <FansAmountHeader>
              <IonText>粉絲數據</IonText>
              <IonText>過去30天</IonText>
            </FansAmountHeader>
            <div className="totalAmount">
              <IonText>
                你有
                <strong style={{ fontSize: 25, margin: "0rem 0.5rem" }}>
                  {followerData[0].follower_now}
                </strong>
                名粉絲
              </IonText>
              <IonText>
                {percentage(
                  followerData[0].follower_now,
                  followerData[0].follower_beforeMonth
                )}
                % vs {thirtyDaysAgo}
              </IonText>
            </div>
            <FansAmountAnalysis>
              <div className="amountAnalysis">
                <IonText>增長</IonText>
                <div className="amountCardContainer">
                  <div className="amountCard">
                    <IonText>變化</IonText>
                    <IonText>
                      {followerData[0].increaseNum -
                        followerData[0].decreaseNum}
                    </IonText>
                  </div>
                  <div className="amountCard">
                    <IonText>關注</IonText>
                    <IonText>{followerData[0].increaseNum}</IonText>
                  </div>
                  <div className="amountCard">
                    <IonText>取消關注</IonText>
                    <IonText>{followerData[0].decreaseNum}</IonText>
                  </div>
                </div>
              </div>
              <Canvas height="250">
                <Chart data={followerData[0].data} scale={scale}>
                  <Axis
                    field="date"
                    tickCount={5}
                    style={{
                      label: { align: "between" },
                    }}
                  />
                  <Axis field="number_of_follower" tickCount={4} />
                  <Line
                    x="date"
                    y="number_of_follower"
                    lineWidth="4px"
                    shape="smooth"
                    color={{ field: "category", range: ["#0ADA73", "#ff3d41"] }}
                  />
                  <Point
                    x="date"
                    y="number_of_follower"
                    color={{ field: "category", range: ["#0ADA73", "#ff3d41"] }}
                  />
                  <Legend
                    position="top"
                    style={{
                      justifyContent: "space-around",
                    }}
                  />
                  <Tooltip />
                </Chart>
              </Canvas>
            </FansAmountAnalysis>

            <IonText>性別分布</IonText>
            <FansGenderAnalysis>
              <GenderPie user_id={user_id} />
            </FansGenderAnalysis>

            <IonText>年齡分布</IonText>
            <FansAgeAnalysis>
              <AgeChart user_id={user_id} />
            </FansAgeAnalysis>

            <IonText>聊天室數據</IonText>
            <ChatroomAnalysis></ChatroomAnalysis>
          </Container>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Analytics;

const Container = styled.div`
  padding: 1rem 1.5rem;

  .totalAmount {
    width: 100%;
    height: 7rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    background-color: #222;
    border-radius: 0.8rem;
    margin: 0.5rem 0rem;

    ion-text:nth-child(1) {
      font-size: 18px;
    }

    ion-text:nth-child(2) {
      color: #9e9e9e;
    }
  }
`;

const FansAmountHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const FansAmountAnalysis = styled.div`
  .amountCardContainer {
    display: flex;
    gap: 0.8rem;
    margin: 1rem 0rem;

    .amountCard {
      width: 8rem;
      height: 2.5rem;
      border-radius: 0.5rem;
      background-image: linear-gradient(
        to right bottom,
        #ffa930,
        #ff9d3f,
        #ff924d,
        #ff885b,
        #ff7f67
      );
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
`;

const FansGenderAnalysis = styled.div`
  width: 100%;
  height: 12rem;
  margin: 1rem 0rem;
  background-color: #222;
  border-radius: 0.8rem;
`;

const FansAgeAnalysis = styled.div`
  width: 100%;
  height: 13rem;
  margin-top: 0.5rem;
  background-color: #222;
  border-radius: 0.8rem;
`;

const ChatroomAnalysis = styled.div`
  width: 100%;
  height: 13rem;
  margin-top: 0.5rem;
  background-color: #222;
  border-radius: 0.8rem;
`;
