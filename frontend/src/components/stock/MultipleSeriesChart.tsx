import React, { useState, useEffect, useRef } from "react";
import { useAppSelector } from "../../redux/store";
import {
  createChart,
  IChartApi,
  ISeriesApi,
  SeriesType,
  IPriceLine,
  LineStyle,
} from "lightweight-charts";
import { Indicator, TimeFrameButtonState } from "../../type";
import "./MultipleSeriesChart.css";

interface NewProps {
  symbol: string;
}

const MultipleSeriesChart: React.FC<NewProps> = ({ symbol }) => {
  const [mainChart, setMainChart] = useState<IChartApi | null>(null);
  const [RSIChart, setRSIChart] = useState<IChartApi | null>(null);
  const [MACDChart, setMACDChart] = useState<IChartApi | null>(null);
  const [lineSeries, setLineSeries] = useState<ISeriesApi<SeriesType> | null>(
    null
  );
  const [candlestickSeries, setCandlestickSeries] =
    useState<ISeriesApi<SeriesType> | null>(null);
  const [volumeSeries, setVolumeSeries] =
    useState<ISeriesApi<SeriesType> | null>(null);
  const [SMA20, setSMA20] = useState<ISeriesApi<SeriesType> | null>(null);
  const [SMA50, setSMA50] = useState<ISeriesApi<SeriesType> | null>(null);
  const [SMA100, setSMA100] = useState<ISeriesApi<SeriesType> | null>(null);
  const [SMA250, setSMA250] = useState<ISeriesApi<SeriesType> | null>(null);
  const [EMA20, setEMA20] = useState<ISeriesApi<SeriesType> | null>(null);
  const [EMA50, setEMA50] = useState<ISeriesApi<SeriesType> | null>(null);
  const [EMA100, setEMA100] = useState<ISeriesApi<SeriesType> | null>(null);
  const [EMA250, setEMA250] = useState<ISeriesApi<SeriesType> | null>(null);
  const [RSI7, setRSI7] = useState<ISeriesApi<SeriesType> | null>(null);
  const [RSI14, setRSI14] = useState<ISeriesApi<SeriesType> | null>(null);
  const [RSI14BaseLine, setRSI14BaseLine] = useState<IPriceLine | null>(null);
  const [RSI14OverBuy, setRSI14OverBuy] = useState<IPriceLine | null>(null);
  const [RSI14OverSell, setRSI14OverSell] = useState<IPriceLine | null>(null);
  const [MACDFast, setMACDFast] = useState<ISeriesApi<SeriesType> | null>(null);
  const [MACDSlow, setMACDSlow] = useState<ISeriesApi<SeriesType> | null>(null);
  const [MACDHistogram, setMACDHistogram] =
    useState<ISeriesApi<SeriesType> | null>(null);
  const [currentChartType, setCurrentChartType] = useState<{
    line: boolean;
    candlestick: boolean;
  }>({ line: false, candlestick: true });
  const [timeFrame, setTimeFrame] = useState<string>("1D");
  const [currentTimeFrame, setCurrentTimeFrame] =
    useState<TimeFrameButtonState>({
      oneMinute: false,
      fiveMinutes: false,
      tenMinutes: false,
      fifteenMinutes: false,
      thirtyMinutes: false,
      oneHour: false,
      twoHours: false,
      fourHours: false,
      oneDay: true,
      oneWeek: false,
      oneMonth: false,
      oneYear: false,
    });
  const [indicators, setIndicators] = useState<Indicator>({
    SMA20: false,
    SMA50: false,
    SMA100: false,
    SMA250: false,
    EMA20: false,
    EMA50: false,
    EMA100: false,
    EMA250: false,
    RSI7: false,
    RSI14: false,
    MACD: false,
  });
  const [isFetch, setIsFetch] = useState<boolean>(false);
  const [isSetChart, setIsSetChart] = useState<boolean>(false);
  const [isSetData, setIsSetData] = useState<boolean>(false);
  const isDark = useAppSelector((state) => state.theme.isDark);

  const mainChartContainerRef = useRef<HTMLDivElement | null>(null);
  const RSIChartContainerRef = useRef<HTMLDivElement | null>(null);
  const MACDChartContainerRef = useRef<HTMLDivElement | null>(null);

  let layoutOption: any = undefined;

  isDark
    ? (layoutOption = {
        layout: {
          background: { color: "rgb(19, 23, 34" },
          textColor: "#FFFFFF",
        },
      })
    : (layoutOption = {
        layout: { background: { color: "#FFFFFF" } },
        // grid: {
        //   vertLines: { color: "rgba(0, 0, 0, 0.5)" },
        //   horzLines: { color: "rgba(0, 0, 0, 0.5)" },
        // },
      });

  // setup chart and series when loaded into the page
  useEffect(() => {
    const chart = createChart(mainChartContainerRef.current as HTMLElement, {
      width: window.innerWidth,
      height: 500,
      grid: {
        vertLines: {
          color: "rgba(200, 200, 200, 0.2)",
        },
        horzLines: {
          color: "rgba(200, 200, 200, 0.2)",
        },
      },
    });
    chart.applyOptions(layoutOption);

    const RSIChart = createChart(RSIChartContainerRef.current as HTMLElement, {
      width: window.innerWidth,
      height: 150,
      grid: {
        vertLines: { visible: false, color: "rgba(0, 0, 0, 0)" },
        horzLines: { visible: false, color: "rgba(0, 0, 0, 0)" },
      },
    });
    RSIChart.applyOptions(layoutOption);

    const MACDChart = createChart(
      MACDChartContainerRef.current as HTMLElement,
      {
        width: window.innerWidth,
        height: 150,
        grid: {
          vertLines: { visible: false, color: "rgba(0, 0, 0, 0)" },
          horzLines: { visible: false, color: "rgba(0, 0, 0, 0)" },
        },
      }
    );
    MACDChart.applyOptions(layoutOption);

    const RSI7 = RSIChart.addLineSeries({
      color: "rgba(128, 0, 128, 1)",
      visible: indicators.RSI7,
      title: "RSI7",
    });
    RSI7.createPriceLine({
      price: 50,
      color: "white",
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      lineVisible: true,
      axisLabelVisible: false,
      title: "",
    });
    RSI7.createPriceLine({
      price: 80,
      color: "white",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      lineVisible: true,
      axisLabelVisible: true,
      title: "",
    });
    RSI7.createPriceLine({
      price: 20,
      color: "white",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      lineVisible: true,
      axisLabelVisible: true,
      title: "",
    });

    const RSI14 = RSIChart.addLineSeries({
      color: "rgba(233, 112, 221, 1)",
      visible: indicators.RSI14,
      title: "RSI14",
    });
    const RSI14BaseLine = RSI14.createPriceLine({
      price: 50,
      color: "white",
      lineWidth: 2,
      lineStyle: LineStyle.Solid,
      lineVisible: true,
      axisLabelVisible: true,
      title: "",
    });
    const RSI14OverBuy = RSI14.createPriceLine({
      price: 80,
      color: "white",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      lineVisible: true,
      axisLabelVisible: true,
      title: "",
    });
    const RSI14OverSell = RSI14.createPriceLine({
      price: 30,
      color: "white",
      lineWidth: 1,
      lineStyle: LineStyle.Dotted,
      lineVisible: true,
      axisLabelVisible: true,
      title: "",
    });

    const MACDFast = MACDChart.addLineSeries({
      visible: indicators.MACD,
      lineWidth: 2,
      title: "MACD fast",
    });
    MACDFast.createPriceLine({
      price: 0,
      color: "white",
      lineWidth: 2,
      lineVisible: true,
      lineStyle: LineStyle.Solid,
      axisLabelVisible: false,
      title: "",
    });

    const line = chart.addLineSeries({ visible: currentChartType.line });
    setMainChart(chart);
    setRSIChart(RSIChart);
    setMACDChart(MACDChart);
    setLineSeries(line);
    setCandlestickSeries(
      chart.addCandlestickSeries({ visible: currentChartType.candlestick })
    );
    setVolumeSeries(
      chart.addHistogramSeries({
        priceFormat: { type: "volume" },
        overlay: true,
        scaleMargins: { top: 0.9, bottom: 0 },
      })
    );
    setSMA20(
      chart.addLineSeries({
        color: "rgba(24, 206, 206, 1)",
        lineWidth: 2,
        title: "SMA20",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.SMA20,
      })
    );
    setSMA50(
      chart.addLineSeries({
        color: "rgba(10, 107, 13, 1)",
        lineWidth: 2,
        title: "SMA50",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.SMA50,
      })
    );
    setSMA100(
      chart.addLineSeries({
        color: "rgba(167, 13, 12, 1)",
        lineWidth: 2,
        title: "SMA100",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.SMA100,
      })
    );
    setSMA250(
      chart.addLineSeries({
        color: "rgba(204, 174, 82, 1)",
        lineWidth: 2,
        title: "SMA250",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.SMA250,
      })
    );
    setEMA20(
      chart.addLineSeries({
        color: "rgba(24, 206, 206, 1)",
        lineWidth: 2,
        title: "EMA20",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.EMA20,
      })
    );
    setEMA50(
      chart.addLineSeries({
        color: "rgba(10, 107, 13, 1)",
        lineWidth: 2,
        title: "EMA50",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.EMA50,
      })
    );
    setEMA100(
      chart.addLineSeries({
        color: "rgba(167, 19, 6, 1)",
        lineWidth: 2,
        title: "EMA100",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.EMA100,
      })
    );
    setEMA250(
      chart.addLineSeries({
        color: "rgba(208, 179, 89, 1)",
        lineWidth: 2,
        title: "EMA250",
        lastValueVisible: false,
        priceLineVisible: false,
        visible: indicators.EMA250,
      })
    );
    setRSI7(RSI7);
    setRSI14(RSI14);
    setRSI14BaseLine(RSI14BaseLine);
    setRSI14OverBuy(RSI14OverBuy);
    setRSI14OverSell(RSI14OverSell);
    setMACDFast(MACDFast);
    setMACDSlow(
      MACDChart.addLineSeries({
        visible: indicators.MACD,
        lineWidth: 2,
        color: "orange",
        title: "MACD slow",
      })
    );
    setMACDHistogram(
      MACDChart.addHistogramSeries({ visible: indicators.MACD })
    );
    setIsSetChart(!isSetChart);
    setIsFetch(!isFetch);

    const handleResize = () => {
      chart.applyOptions({
        width: mainChartContainerRef.current!.clientWidth,
      });
      RSIChart.applyOptions({
        width: RSIChartContainerRef.current!.clientWidth,
      });
      MACDChart.applyOptions({
        width: MACDChartContainerRef.current!.clientWidth,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      chart.remove();
      RSIChart.remove();
      MACDChart.remove();
    };
  }, []);

  // get data from mongoDB
  useEffect(() => {
    if (
      lineSeries === null ||
      candlestickSeries === null ||
      volumeSeries === null ||
      SMA20 === null ||
      SMA50 === null ||
      SMA100 === null ||
      SMA250 === null ||
      EMA20 === null ||
      EMA50 === null ||
      EMA100 === null ||
      EMA250 === null ||
      RSI7 === null ||
      RSI14 === null ||
      MACDFast === null ||
      MACDSlow === null ||
      MACDHistogram === null
    ) {
      return;
    }

    if (
      timeFrame === "1D" ||
      timeFrame === "1W" ||
      timeFrame === "1M" ||
      timeFrame === "1Y"
    ) {
      fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/stock/getDayDataFromMongoAPI?symbol=${symbol}&timeFrame=${timeFrame}`
      )
        .then((res) => res.json())
        .then((result) => {
          lineSeries.setData(result.convertedLineDataArray);
          candlestickSeries.setData(result.convertedCandlestickDataArray);
          volumeSeries.setData(result.convertedVolumeDataArray);
          SMA20.setData(result.lineSMA20Array);
          SMA50.setData(result.lineSMA50Array);
          SMA100.setData(result.lineSMA100Array);
          SMA250.setData(result.lineSMA250Array);
          EMA20.setData(result.lineEMA20Array);
          EMA50.setData(result.lineEMA50Array);
          EMA100.setData(result.lineEMA100Array);
          EMA250.setData(result.lineEMA250Array);
          RSI7.setData(result.lineRSI7Array);
          RSI14.setData(result.lineRSI14Array);
          MACDFast.setData(result.fastLineResultArray);
          MACDSlow.setData(result.slowLineResultArray);
          MACDHistogram.setData(result.histogramResultArray);
        });
      console.log("data set into series");
    } else {
      fetch(
        `${process.env.REACT_APP_PUBLIC_URL}/stock/getMinuteDataFromMongoAPI?symbol=${symbol}&timeFrame=${timeFrame}`
      )
        .then((res) => res.json())
        .then((result) => {
          console.log(result);

          lineSeries.setData(result.convertedLineDataArray);
          candlestickSeries.setData(result.convertedCandlestickDataArray);
          volumeSeries.setData(result.convertedVolumeDataArray);
          SMA20.setData(result.lineSMA20Array);
          SMA50.setData(result.lineSMA50Array);
          SMA100.setData(result.lineSMA100Array);
          SMA250.setData(result.lineSMA250Array);
          EMA20.setData(result.lineEMA20Array);
          EMA50.setData(result.lineEMA50Array);
          EMA100.setData(result.lineEMA100Array);
          EMA250.setData(result.lineEMA250Array);
          RSI7.setData(result.lineRSI7Array);
          RSI14.setData(result.lineRSI14Array);
          MACDFast.setData(result.fastLineResultArray);
          MACDSlow.setData(result.slowLineResultArray);
          MACDHistogram.setData(result.histogramResultArray);
        });
      console.log("data set into series");
    }
    setIsSetData(!isSetData);
  }, [isFetch, timeFrame]);

  // apply options to chart and series
  useEffect(() => {
    lineSeries?.applyOptions({ visible: currentChartType.line });
    candlestickSeries?.applyOptions({ visible: currentChartType.candlestick });
    SMA20?.applyOptions({ visible: indicators.SMA20 });
    SMA50?.applyOptions({ visible: indicators.SMA50 });
    SMA100?.applyOptions({ visible: indicators.SMA100 });
    SMA250?.applyOptions({ visible: indicators.SMA250 });
    EMA20?.applyOptions({ visible: indicators.EMA20 });
    EMA50?.applyOptions({ visible: indicators.EMA50 });
    EMA100?.applyOptions({ visible: indicators.EMA100 });
    EMA250?.applyOptions({ visible: indicators.EMA250 });

    const RSICanvasContainer = document.querySelector(
      "#rsi-container > .tv-lightweight-charts"
    ) as HTMLElement;
    !indicators.RSI7 && !indicators.RSI14
      ? (RSICanvasContainer.style.height = "0")
      : (RSICanvasContainer.style.height = "150px");

    const MACDCanvasContainer = document.querySelector(
      "#macd-container > .tv-lightweight-charts"
    ) as HTMLElement;
    indicators.MACD
      ? (MACDCanvasContainer.style.height = "150px")
      : (MACDCanvasContainer.style.height = "0");

    mainChart?.applyOptions({
      timeScale: {
        visible: !indicators.RSI7 && !indicators.RSI14 && !indicators.MACD,
      },
    });
    RSIChart?.applyOptions({
      timeScale: {
        visible: (indicators.RSI7 || indicators.RSI14) && !indicators.MACD,
      },
      rightPriceScale: { visible: indicators.RSI7 || indicators.RSI14 },
      grid: {
        vertLines: { visible: indicators.RSI7 || indicators.RSI14 },
        horzLines: { visible: indicators.RSI7 || indicators.RSI14 },
      },
    });

    indicators.RSI7
      ? RSI14BaseLine?.applyOptions({
          lineVisible: false,
          axisLabelVisible: false,
        })
      : RSI14BaseLine?.applyOptions({
          lineVisible: true,
          axisLabelVisible: false,
        });
    indicators.RSI7
      ? RSI14OverBuy?.applyOptions({
          lineVisible: false,
          axisLabelVisible: false,
        })
      : RSI14OverBuy?.applyOptions({
          lineVisible: true,
          axisLabelVisible: true,
        });
    indicators.RSI7
      ? RSI14OverSell?.applyOptions({
          lineVisible: false,
          axisLabelVisible: false,
        })
      : RSI14OverSell?.applyOptions({
          lineVisible: true,
          axisLabelVisible: true,
        });

    MACDChart?.applyOptions({
      timeScale: { visible: indicators.MACD },
      rightPriceScale: { visible: indicators.MACD },
      grid: {
        vertLines: { visible: indicators.MACD },
        horzLines: { visible: indicators.MACD },
      },
    });

    RSI7?.applyOptions({ visible: indicators.RSI7 });
    RSI14?.applyOptions({ visible: indicators.RSI14 });
    MACDFast?.applyOptions({ visible: indicators.MACD });
    MACDSlow?.applyOptions({ visible: indicators.MACD });
    MACDHistogram?.applyOptions({ visible: indicators.MACD });
  }, [currentChartType, indicators]);

  // sync different charts by visibleLogicalRange
  useEffect(() => {
    if (mainChart === null || RSIChart === null || MACDChart === null) {
      return;
    }

    mainChart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
      if (range === null) {
        return;
      }
      RSIChart?.timeScale().setVisibleLogicalRange({
        from: range.from - 6,
        to: range.to - 6,
      });
      MACDChart?.timeScale().setVisibleLogicalRange({
        from: range.from - 24,
        to: range.to - 24,
      });
    });

    RSIChart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
      if (range === null) {
        return;
      }
      mainChart
        .timeScale()
        .setVisibleLogicalRange({ from: range.from + 6, to: range.to + 6 });
      MACDChart.timeScale().setVisibleLogicalRange({
        from: range.from - 19,
        to: range.to - 19,
      });
    });

    MACDChart.timeScale().subscribeVisibleLogicalRangeChange((range) => {
      if (range === null) {
        return;
      }
      mainChart
        .timeScale()
        .setVisibleLogicalRange({ from: range.from + 25, to: range.to + 25 });
      RSIChart.timeScale().setVisibleLogicalRange({
        from: range.from + 19,
        to: range.to + 19,
      });
    });
  }, [isSetData, indicators.RSI7, indicators.RSI14, indicators.MACD]);

  const mainChartContainer = document.getElementById(
    "chart-container"
  ) as HTMLElement;
  const RSIChartContainer = document.getElementById(
    "rsi-container"
  ) as HTMLElement;
  const MACDChartContainer = document.getElementById(
    "macd-container"
  ) as HTMLElement;

  // set up legend
  useEffect(() => {
    const mainChartLegendContainer = document.createElement("div");
    mainChartLegendContainer.setAttribute(
      "style",
      "position: absolute; left: 12px; top: 12px; z-index: 2; font-size: 14px; font-family: sans-serif; line-height: 18px; font-weight: 300; display: flex; flex-wrap: wrap;"
    );
    const mainLegend = document.createElement("div");
    mainLegend.innerHTML = symbol;
    mainLegend.setAttribute("style", "color: white;");
    mainChartLegendContainer.appendChild(mainLegend);

    mainChart?.subscribeCrosshairMove((param) => {
      if (param.time) {
        const legendPrice = param.seriesPrices.get(lineSeries!) as number;
        let legendSMA20 = param.seriesPrices.get(SMA20!) as number;
        let legendSMA50 = param.seriesPrices.get(SMA50!) as number;
        let legendSMA100 = param.seriesPrices.get(SMA100!) as number;
        let legendSMA250 = param.seriesPrices.get(SMA250!) as number;
        let legendEMA20 = param.seriesPrices.get(EMA20!) as number;
        let legendEMA50 = param.seriesPrices.get(EMA50!) as number;
        let legendEMA100 = param.seriesPrices.get(EMA100!) as number;
        let legendEMA250 = param.seriesPrices.get(EMA250!) as number;

        legendSMA20 === undefined
          ? (legendSMA20 = 0)
          : (legendSMA20 = legendSMA20);
        legendSMA50 === undefined
          ? (legendSMA50 = 0)
          : (legendSMA50 = legendSMA50);
        legendSMA100 === undefined
          ? (legendSMA100 = 0)
          : (legendSMA100 = legendSMA100);
        legendSMA250 === undefined
          ? (legendSMA250 = 0)
          : (legendSMA250 = legendSMA250);
        legendEMA20 === undefined
          ? (legendEMA20 = 0)
          : (legendEMA20 = legendEMA20);
        legendEMA50 === undefined
          ? (legendEMA50 = 0)
          : (legendEMA50 = legendEMA50);
        legendEMA100 === undefined
          ? (legendEMA100 = 0)
          : (legendEMA100 = legendEMA100);
        legendEMA250 === undefined
          ? (legendEMA250 = 0)
          : (legendEMA250 = legendEMA250);

        mainLegend.innerHTML = `${symbol} <strong>${legendPrice.toFixed(
          2
        )}</strong>
        SMA20 <strong>${legendSMA20.toFixed(2)}</strong>
        SMA50 <strong>${legendSMA50.toFixed(2)}</strong>
        SMA100 <strong>${legendSMA100.toFixed(2)}</strong>
        SMA250 <strong>${legendSMA250.toFixed(2)}</strong>
        EMA20 <strong>${legendEMA20.toFixed(2)}</strong>
        EMA50 <strong>${legendEMA50.toFixed(2)}</strong>
        EMA100 <strong>${legendEMA100.toFixed(2)}</strong>
        EMA250 <strong>${legendEMA250.toFixed(2)}</strong>`;
      }
    });

    mainChartContainer?.appendChild(mainChartLegendContainer);

    return () => {
      mainChartContainer?.removeChild(mainChartLegendContainer);
    };
  }, [isSetChart]);

  useEffect(() => {
    const RSIChartLegendContainer = document.createElement("div");
    RSIChartLegendContainer.setAttribute(
      "style",
      "position: absolute; left: 12px; top: 12px; z-index: 2; font-size: 14px; font-family: sans-serif; line-height: 18px; font-weight: 300; display: flex; flex-wrap: wrap;"
    );
    const RSILegend = document.createElement("div");
    RSILegend.setAttribute("style", "color: white;");
    RSIChartLegendContainer.appendChild(RSILegend);

    RSIChart?.subscribeCrosshairMove((param) => {
      if (param.time) {
        let legendRSI7 = param.seriesPrices.get(RSI7!) as number;
        let legendRSI14 = param.seriesPrices.get(RSI14!) as number;

        legendRSI7 === undefined ? (legendRSI7 = 0) : (legendRSI7 = legendRSI7);
        legendRSI14 === undefined
          ? (legendRSI14 = 0)
          : (legendRSI14 = legendRSI14);

        if (indicators.RSI7 && indicators.RSI14) {
          RSILegend.innerHTML = `RSI7 <strong>${legendRSI7.toFixed(2)}</strong>
          RSI14 <strong>${legendRSI14.toFixed(2)}</strong>`;
        } else if (indicators.RSI7) {
          RSILegend.innerHTML = `RSI7 <strong>${legendRSI7.toFixed(
            2
          )}</strong>`;
        } else {
          RSILegend.innerHTML = `RSI14 <strong>${legendRSI14.toFixed(
            2
          )}</strong>`;
        }
      }
    });

    RSIChartContainer?.appendChild(RSIChartLegendContainer);

    return () => {
      RSIChartContainer?.removeChild(RSIChartLegendContainer);
    };
  }, [indicators.RSI7, indicators.RSI14]);

  useEffect(() => {
    const MACDChartLegendContainer = document.createElement("div");
    MACDChartLegendContainer.setAttribute(
      "style",
      "position: absolute; left: 12px; top: 12px; z-index: 2; font-size: 14px; font-family: sans-serif; line-height: 18px; font-weight: 300; display: flex; flex-wrap: wrap;"
    );
    const MACDLegend = document.createElement("div");
    MACDLegend.setAttribute("style", "color: white;");
    MACDChartLegendContainer.appendChild(MACDLegend);

    MACDChart?.subscribeCrosshairMove((param) => {
      if (param.time) {
        let legendMACDFast = param.seriesPrices.get(MACDFast!) as number;
        let legendMACDSlow = param.seriesPrices.get(MACDSlow!) as number;
        let legendMACDHistogram = param.seriesPrices.get(
          MACDHistogram!
        ) as number;

        legendMACDFast === undefined
          ? (legendMACDFast = 0)
          : (legendMACDFast = legendMACDFast);
        legendMACDSlow === undefined
          ? (legendMACDSlow = 0)
          : (legendMACDSlow = legendMACDSlow);
        legendMACDHistogram === undefined
          ? (legendMACDHistogram = 0)
          : (legendMACDHistogram = legendMACDHistogram);

        MACDLegend.innerHTML = `MACD Fast <strong>${legendMACDFast.toFixed(
          2
        )}</strong>
        MACD Slow <strong>${legendMACDSlow.toFixed(2)}</strong>
        MACD Histogram <strong>${legendMACDHistogram.toFixed(2)}</strong>`;
      }
    });

    MACDChartContainer?.appendChild(MACDChartLegendContainer);

    return () => {
      MACDChartContainer?.removeChild(MACDChartLegendContainer);
    };
  }, [indicators.MACD]);

  // set up tooltip
  useEffect(() => {
    const toolTip = document.createElement("div");
    toolTip.setAttribute(
      "style",
      "display: block; height: 100px; width: 150px; position: absolute; z-index: 2;"
    );
    const toolTipWidth = 80;
    const toolTipHeight = 80;
    const toolTipMargin = 15;
    mainChart?.subscribeCrosshairMove((param) => {
      if (
        param.point === undefined ||
        !param.time ||
        param.point.x < 0 ||
        param.point.x > mainChartContainer.clientWidth ||
        param.point.y < 0 ||
        param.point.y > mainChartContainer.clientHeight
      ) {
        toolTip.style.display = "none";
      } else {
        const histogramVolume = param.seriesPrices.get(volumeSeries!) as number;
        const linePrice = param.seriesPrices.get(lineSeries!) as number;
        if (currentChartType.line) {
          if (linePrice === undefined) {
            return;
          }
          toolTip.innerHTML = `<div style="color: white; margin: 0 4px">${symbol}</div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">Open: <strong>${linePrice.toFixed(
            2
          )}</strong></div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">Volume: <strong>${histogramVolume}</strong></div>`;
        } else {
          const candlestickPrice = param.seriesPrices.get(
            candlestickSeries!
          ) as {
            open: number;
            high: number;
            low: number;
            close: number;
          };
          if (candlestickPrice === undefined) {
            return;
          }
          const openPrice = candlestickPrice.open;
          const highPrice = candlestickPrice.high;
          const lowPrice = candlestickPrice.low;
          const closePrice = candlestickPrice.close;

          toolTip.innerHTML = `<div style="color: white; margin: 0 4px">${symbol}</div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">Open: <strong>${openPrice.toFixed(
            2
          )}</strong></div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">High: <strong>${highPrice.toFixed(
            2
          )}</strong></div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">Low: <strong>${lowPrice.toFixed(
            2
          )}</strong></div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">Close: <strong>${closePrice.toFixed(
            2
          )}</strong></div>
          <div style="font-size: 12px; margin: 0 4px; color: white;">Volume: <strong>${histogramVolume}</strong></div>`;
        }

        toolTip.style.display = "block";
        const coordinate = lineSeries?.priceToCoordinate(linePrice);
        let shiftedCoordinate = param.point.x - 0;
        if (coordinate === null) {
          return;
        }

        shiftedCoordinate = Math.max(
          0,
          Math.min(
            mainChartContainer.clientWidth - toolTipWidth,
            shiftedCoordinate
          )
        );

        const coordinateY =
          coordinate! - toolTipHeight - toolTipMargin > 0
            ? coordinate! - toolTipHeight - toolTipMargin
            : Math.max(
                0,
                Math.min(
                  mainChartContainer.clientHeight -
                    toolTipHeight -
                    toolTipMargin,
                  coordinate! + toolTipMargin
                )
              );

        toolTip!.style.left = shiftedCoordinate + "px";
        toolTip!.style.top = coordinateY + "px";
      }
    });
    mainChartContainer?.appendChild(toolTip);

    return () => {
      mainChartContainer?.removeChild(toolTip);
    };
  }, [isSetChart, currentChartType]);

  const [direction, setDirection] = useState("portrait");

  function landscape() {
    // lock screen to straight
    if (direction === "portrait") {
      window.screen.orientation.lock("landscape");
      setDirection("landscape");
    } else {
      window.screen.orientation.lock("portrait");
      setDirection("portrait");
    }
  }

  return (
    <>
      <hr />
      <div className="button-container-1"></div>
      <div className="chart-type-button-container">
        <button
          className={"chart-type " + (currentChartType.line ? "isClicked" : "")}
          onClick={() => {
            setCurrentChartType({ line: true, candlestick: false });
          }}
        >
          Line Chart
        </button>

        <button
          className={
            "chart-type " + (currentChartType.candlestick ? "isClicked" : "")
          }
          onClick={() => {
            setCurrentChartType({ line: false, candlestick: true });
          }}
        >
          Candlestick Chart
        </button>
        <button
          style={{
            background: "var(--ion-color-primary)",
            color: "#fff",
            fontWeight: 500,
            borderRadius: 5,
          }}
          onClick={landscape}
        >
          {direction === "portrait" ? "橫向顯示" : "直向顯示"}
        </button>
      </div>
      <div className="indicator-button-container">
        <button
          className={"indicator " + (indicators.SMA20 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, SMA20: !indicators.SMA20 });
          }}
        >
          SMA20
        </button>
        <button
          className={"indicator " + (indicators.SMA50 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, SMA50: !indicators.SMA50 });
          }}
        >
          SMA50
        </button>
        <button
          className={"indicator " + (indicators.SMA100 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, SMA100: !indicators.SMA100 });
          }}
        >
          SMA100
        </button>
        <button
          className={"indicator " + (indicators.SMA250 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, SMA250: !indicators.SMA250 });
          }}
        >
          SMA250
        </button>
        <button
          className={"indicator " + (indicators.EMA20 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, EMA20: !indicators.EMA20 });
          }}
        >
          EMA20
        </button>
        <button
          className={"indicator " + (indicators.EMA50 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, EMA50: !indicators.EMA50 });
          }}
        >
          EMA50
        </button>
        <button
          className={"indicator " + (indicators.EMA100 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, EMA100: !indicators.EMA100 });
          }}
        >
          EMA100
        </button>
        <button
          className={"indicator " + (indicators.EMA250 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, EMA250: !indicators.EMA250 });
          }}
        >
          EMA250
        </button>
        <button
          className={"indicator " + (indicators.RSI7 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, RSI7: !indicators.RSI7 });
          }}
        >
          RSI7
        </button>
        <button
          className={"indicator " + (indicators.RSI14 ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, RSI14: !indicators.RSI14 });
          }}
        >
          RSI14
        </button>
        <button
          className={"indicator " + (indicators.MACD ? "isClicked" : "")}
          onClick={() => {
            setIndicators({ ...indicators, MACD: !indicators.MACD });
          }}
        >
          MACD
        </button>
      </div>
      <div id="chart-container" ref={mainChartContainerRef}></div>
      <div id="rsi-container" ref={RSIChartContainerRef}></div>
      <div id="macd-container" ref={MACDChartContainerRef}></div>
    </>
  );
};

export default MultipleSeriesChart;
