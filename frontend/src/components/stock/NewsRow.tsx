import React from "react";

interface NewsProps {
  title: string;
  content: string;
  time: string;
  hyperlink?: string;
}

const NewsRow: React.FC<NewsProps> = ({ title, content, time, hyperlink }) => {
  return (
    <>
      <h1>{title}</h1>
      <h3>{time}</h3>
      <div className="content-container">{content}</div>
      <a href={`${hyperlink}`}>Hyperlink</a>
    </>
  );
};

export default NewsRow;
