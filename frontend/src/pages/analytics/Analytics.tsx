import { IonHeader, IonPage, IonToolbar, IonButtons, IonBackButton, IonContent, IonTitle, IonText, IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import styled from "styled-components";
import { Area } from '@ant-design/plots';

const DemoColumn = () => {
    const data = [
      {
        type: '家具家电',
        sales: 38,
      },
      {
        type: '粮油副食',
        sales: 52,
      },
      {
        type: '生鲜水果',
        sales: 61,
      },
      {
        type: '美容洗护',
        sales: 145,
      },
      {
        type: '母婴用品',
        sales: 48,
      },
      {
        type: '进口食品',
        sales: 38,
      },
      {
        type: '食品饮料',
        sales: 38,
      },
      {
        type: '家庭清洁',
        sales: 38,
      },
    ];
    const config = {
      data,
      xField: 'type',
      yField: 'sales',
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

const Analytics: React.FC = () => {
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
                <Container>
                    <FansAmountHeader>
                        <IonText>粉絲增長</IonText>
                        <IonText>過去30天</IonText>
                    </FansAmountHeader>
                    <div className="totalAmount">
                        <IonText>你有<strong style={{fontSize:25, margin:"0rem 0.5rem"}}>102</strong>名粉絲</IonText>
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