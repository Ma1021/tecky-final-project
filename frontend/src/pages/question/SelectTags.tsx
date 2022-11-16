import React, { useState, memo } from 'react'
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonBackButton, IonButtons, IonText, IonList, IonSearchbar, IonGrid, IonRow, IonCol } from '@ionic/react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const SelectTags: React.FC = memo(() => {
  const data = [
    {
      stock_id:1,
      stock_symbol:"AAPL",
      stock_name:"Apple Inc.",
      stock_price:138.92,
      stock_change:+0.54,
      stock_change_percent:+0.39
    },
    {
      stock_id:2,
      stock_symbol:"TSLA",
      stock_name:"Tesla, Inc.",
      stock_price:197.08,
      stock_change:-10.39,
      stock_change_percent:-5.01
    },
    {
      stock_id:3,
      stock_symbol:"NFLX",
      stock_name:"Netflix, Inc.",
      stock_price:258.60,
      stock_change:-2.19,
      stock_change_percent:-0.84
    },
    {
      stock_id:4,
      stock_symbol:"QQQ",
      stock_name:"Invesco QQQ Trust (QQQ)",
      stock_price:267.59,
      stock_change:+2.91,
      stock_change_percent:+1.10
    },
    {
      stock_id:5,
      stock_symbol:"VOO",
      stock_name:"Vanguard 500 Index Fund (VOO)",
      stock_price:349.14,
      stock_change:+3.32,
      stock_change_percent:+0.96
    },
  ]
  const [tags, setTags] = useState([...data])

  console.log('rendering...');

  let handelInputChange = (e: Event) =>{
    console.log('input changing');
    let search = "";
    const target = e.target as HTMLIonSearchbarElement;
    if(target) search = target.value!.toLowerCase();
    setTags(data.filter(tag => tag.stock_name.toLowerCase().includes(search) || tag.stock_symbol.toLowerCase().includes(search)));
  }

  const history = useHistory();

  return (
      <IonPage>
        <IonHeader translucent={true} collapse="fade">
            <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/discuss/createQuestion"/>
                    </IonButtons>
                <IonTitle>選擇標籤</IonTitle>
            </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonSearchbar onIonChange={(e)=>handelInputChange(e)}></IonSearchbar>
          <IonText style={{paddingLeft:15}}>熱門股票</IonText>
          <IonList>
            {tags.map((tag)=>{
            const price_color = tag.stock_change > 0 ? "#48BC89" : "#F56080"
              
            return <IonGrid key={tag.stock_id}>
                    <StockContainer onClick={() => { history.replace({pathname:"/discuss/createQuestion", state:{stock_id:tag.stock_id, stock_symbol: tag.stock_symbol}})}}>
                      <StockInfo size='6'>
                        <IonText>{tag.stock_name}</IonText>
                        <IonText>{tag.stock_symbol}</IonText>
                      </StockInfo>
                      <StockPrice size='3'>
                        <IonText>$ {tag.stock_price}</IonText>
                      </StockPrice>
                      <StockChang size='3' style={{color:price_color}}>
                        <IonText>$ {tag.stock_change}</IonText>
                        <IonText>( {tag.stock_change_percent}% )</IonText>
                      </StockChang>
                    </StockContainer>
                  </IonGrid>
            })}
          </IonList>
        </IonContent>
      </IonPage>
  )
});

const StockContainer = styled(IonRow)`
  display:flex;
  border-bottom: 1px solid rgba(255,255,255,0.2);
  color: #dedede;
`

const StockInfo = styled(IonCol)`
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding-left:15px;
  font-size: 14px;
`

const StockPrice = styled(IonCol)`
  display:flex;
  justify-content: center;
  flex-direction: column;
  padding-left:15px;
  font-size: 15px;
`

const StockChang = styled(IonCol)`
  display:flex;
  justify-content: center;
  flex-direction: column;
  align-items:center;
  font-size: 14px;
`

export default SelectTags;