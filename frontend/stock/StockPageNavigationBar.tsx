import React from "react";
import { Link } from "react-router-dom";
import { changePage } from "../../redux/stock/page.action";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import "./StockPageNavigationBar.css";

export default function StockPageNavigationBar(props: { symbol: string }) {
  const currentPage = useAppSelector((state) => state.page);
  const dispatch = useAppDispatch();

  return (
    <>
      <div className="stock-page-navigation-bar-container">
        <Link
          to="/stockList"
          className={
            "stock-page-navigation " +
            (currentPage.stockList ? "current-page" : "")
          }
          onClick={() => {
            dispatch(
              changePage({
                stockList: true,
                stockInfo: false,
                stockForum: false,
                stockNews: false,
                stockAnalysis: false,
              })
            );
          }}
        >
          Stock List
        </Link>
        <Link
          to={`/individualStockInfo/${props.symbol}`}
          className={
            "stock-page-navigation " +
            (currentPage.stockInfo ? "current-page" : "")
          }
          onClick={() => {
            dispatch(
              changePage({
                stockList: false,
                stockInfo: true,
                stockForum: false,
                stockNews: false,
                stockAnalysis: false,
              })
            );
          }}
        >
          Stock Info
        </Link>
        <Link
          to={`/stockForum/${props.symbol}`}
          className={
            "stock-page-navigation " +
            (currentPage.stockForum ? "current-page" : "")
          }
          onClick={() => {
            dispatch(
              changePage({
                stockList: false,
                stockInfo: false,
                stockForum: true,
                stockNews: false,
                stockAnalysis: false,
              })
            );
          }}
        >
          Stock Forum
        </Link>
        <Link
          to={`/stockNews/${props.symbol}`}
          className={
            "stock-page-navigation " +
            (currentPage.stockNews ? "current-page" : "")
          }
          onClick={() => {
            dispatch(
              changePage({
                stockList: false,
                stockInfo: false,
                stockForum: false,
                stockNews: true,
                stockAnalysis: false,
              })
            );
          }}
        >
          Stock News
        </Link>
        <Link
          to={`/stockAnalysis/${props.symbol}`}
          className={
            "stock-page-navigation " +
            (currentPage.stockAnalysis ? "current-page" : "")
          }
          onClick={() => {
            dispatch(
              changePage({
                stockList: false,
                stockInfo: false,
                stockForum: false,
                stockNews: false,
                stockAnalysis: true,
              })
            );
          }}
        >
          Stock Analysis
        </Link>
      </div>
    </>
  );
}
