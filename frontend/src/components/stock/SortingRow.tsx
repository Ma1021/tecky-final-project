import { IonButtons, IonButton, IonContent } from "@ionic/react";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import {
  changeColorTheme,
  changeLanguage,
} from "../../redux/theme/theme.action";
import "./SortingRow.css";
import { StockInfo } from "../../type";

interface SortingRowProps {
  initStockList: StockInfo[];
  onClick: (sortedStockList: any) => void;
}
const SortingRow: React.FC<SortingRowProps> = ({ initStockList, onClick }) => {
  const [stockList, setStockList] = useState<StockInfo[]>([]);
  const [sortBySymbol, setSortBySymbol] = useState<0 | 1 | 2>(0);
  const [sortByPrice, setSortByPrice] = useState<0 | 1 | 2>(0);
  const [sortByChange, setSortByChange] = useState<0 | 1 | 2>(0);
  const isDark = useAppSelector((state) => state.theme.isDark);
  const isChinese = useAppSelector((state) => state.theme.isChinese);
  const dispatch = useAppDispatch();

  let sortedStockList = [];
  return (
    <IonContent>
      <IonButtons>
        <IonButton
          onClick={() => {
            console.log("clicked");
            switch (sortBySymbol) {
              case 0:
                setSortBySymbol(1);
                setSortByPrice(0);
                setSortByChange(0);
                sortedStockList = stockList.sort(compareSymbolDescend);
                onClick(sortedStockList);
                break;
              case 1:
                setSortBySymbol(2);
                setSortByPrice(0);
                setSortByChange(0);
                sortedStockList = stockList.sort(compareSymbolAscend);
                onClick(sortedStockList);
                break;
              default:
                setSortBySymbol(0);
                setSortByPrice(0);
                setSortByChange(0);
                setStockList(initStockList);
                break;
            }
          }}
        >
          {isChinese ? "按名稱排序" : "Sort by Symbol"}
        </IonButton>
        <IonButton
          onClick={() => {
            switch (sortByPrice) {
              case 0:
                setSortByPrice(1);
                setSortBySymbol(0);
                setSortByChange(0);
                onClick(stockList.sort(comparePriceAscend));
                break;
              case 1:
                setSortByPrice(2);
                setSortBySymbol(0);
                setSortByChange(0);
                onClick(stockList.sort(comparePriceDescend));
                break;
              default:
                setSortByPrice(0);
                setSortBySymbol(0);
                setSortByChange(0);
                setStockList(initStockList);
                break;
            }
          }}
        >
          {isChinese ? "按價格排序" : "Sort by Price"}
        </IonButton>
        <IonButton
          onClick={() => {
            switch (sortByChange) {
              case 0:
                setSortByChange(1);
                setSortBySymbol(0);
                setSortByPrice(0);
                onClick(stockList.sort(compareChangeAscend));
                break;
              case 1:
                setSortByChange(2);
                setSortBySymbol(0);
                setSortByPrice(0);
                onClick(stockList.sort(compareChangeDescend));
                break;
              default:
                setSortByChange(0);
                setSortBySymbol(0);
                setSortByPrice(0);
                setStockList(initStockList);
                break;
            }
          }}
        >
          {isChinese ? "按升跌幅排序" : "Sort by Change"}
        </IonButton>
        <IonButton
          onClick={() => {
            dispatch(changeLanguage(isChinese));
          }}
        >
          {isChinese ? "English" : "中文"}
        </IonButton>
        <IonButton
          onClick={() => {
            dispatch(changeColorTheme(isDark));
          }}
        >
          {isDark ? "Light Theme" : "Dark Theme"}
        </IonButton>
      </IonButtons>
    </IonContent>
  );
};

export default SortingRow;

function compareSymbolAscend(a: StockInfo, b: StockInfo) {
  const symbolA = a.symbol.toUpperCase();
  const symbolB = b.symbol.toUpperCase();

  if (symbolA > symbolB) {
    return 1;
  }

  if (symbolA < symbolB) {
    return -1;
  }

  return 0;
}

function compareSymbolDescend(a: StockInfo, b: StockInfo) {
  const symbolA = a.symbol.toUpperCase();
  const symbolB = b.symbol.toUpperCase();

  if (symbolA > symbolB) {
    return -1;
  }

  if (symbolA < symbolB) {
    return 1;
  }

  return 0;
}

function comparePriceAscend(a: StockInfo, b: StockInfo) {
  return a.current_price - b.current_price;
}

function comparePriceDescend(a: StockInfo, b: StockInfo) {
  return b.current_price - a.current_price;
}

function compareChangeAscend(a: StockInfo, b: StockInfo) {
  return (
    a.price_difference / a.yesterday_price -
    b.price_difference / b.yesterday_price
  );
}

function compareChangeDescend(a: StockInfo, b: StockInfo) {
  return (
    b.current_price / b.yesterday_price - a.current_price / a.yesterday_price
  );
}
