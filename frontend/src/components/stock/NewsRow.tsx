import { IonText } from "@ionic/react";
import React, { useState } from "react";
import styled from "styled-components";

interface NewsProps {
  title: string;
  content: string;
  time: string;
  hyperlink?: string;
  index: number;
}

function formatDate(date: string) {
  const time = new Date(date).toLocaleString([], {
    hour12: false,
    dateStyle: "medium",
    timeStyle: "short",
  });
  return time;
}

const NewsRow: React.FC<NewsProps> = ({ title, content, time, hyperlink, index }) => {
  const [ selected, setSelected] = useState(-1);
  
  const toggle = (index: number) => {
    console.log('click toggle');
    
    if(index == selected) {
      return setSelected(-1)
    }
    setSelected(index)
  }

  console.log(selected);
  
  return (
    <NewsCard>
      <div className="cardHeader">
        <IonText>{title}</IonText>
        <IonText>{formatDate(time)}</IonText>
      </div>

      <div className={selected == index ? "content-container show" : "content-container"}>{content}</div>
      <div className="showBtn" onClick={()=>toggle(index)}>{selected === index ? "隱藏內容": "顯示更多"}</div>
    </NewsCard>
  );
};

export default NewsRow;

const NewsCard = styled.div`
  background-color: #222;
  display:flex;
  flex-direction: column;
  gap: 0.3rem;
  padding: 1rem;
  
  .cardHeader {
    display:flex;
    flex-direction: column;
    gap:0.5rem;

    ion-text:nth-child(1) {
      font-size: 16px;
      font-weight: 600;
    }
  
    ion-text:nth-child(2) {
      font-size: 14px;
      color: #9e9e9e;
    }
  }

  .content-container {
    color: #ddd;
    max-height: 0;
    overflow: hidden;
    transition: all 0.5s cubic-bezier(0,1,0,1);
  }

  .content-container.show {
    height: auto;
    max-height: 9999px;
    transition: all 0.5s cubic-bezier(1,0,1,0);
  }

  .showBtn {
    font-size: 14px;
    align-self: flex-end;
    color: #ddd
  }
`