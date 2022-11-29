import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import NewsRow from "./NewsRow";

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
    fetch(`http://localhost:8080/stock/getNewsFromDB?symbol=${symbol}`)
      .then((res) => res.json())
      .then((result) => setNewsArray(result));
  }, []);

  return (
    <>
      {newsArray.map((news) => (
        <NewsRow
          key={news.id}
          title={news.title}
          content={news.content}
          time={news.time}
          hyperlink={news.hyperlink}
        />
      ))}
    </>
  );
};

export default StockNews;
