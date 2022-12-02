import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NewsRow from "./NewsRow";
import styled from "styled-components";

interface News {
  id: number;
  title: string;
  content: string;
  time: string;
  hyperlink?: string;
}

const StockNews: React.FC = () => {
  const location = useLocation();
  const symbol =
    location.pathname.split("/")[location.pathname.split("/").length - 1];
  const [newsArray, setNewsArray] = useState<News[]>([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_PUBLIC_URL}/stock/getNewsFromDB?symbol=${symbol}`)
      .then((res) => res.json())
      .then((result) => setNewsArray(result));
  }, []);

  return (
    <NewsContainer>
      {newsArray.map((news, index) => (
        <NewsRow
          key={news.id}
          title={news.title}
          content={news.content}
          time={news.time}
          hyperlink={news.hyperlink}
          index={index}
        />
      ))}
    </NewsContainer>
  );
};

export default StockNews;

const NewsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap:0.3rem;
`