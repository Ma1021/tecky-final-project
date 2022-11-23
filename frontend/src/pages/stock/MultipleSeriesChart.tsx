import React, { useRef, useEffect, useState } from "react";
import { createChart } from "lightweight-charts";
import {
  CandleStickData,
  LineData,
  ResultObj,
  VolumeData,
} from "../../../../backend/src/stock/stock.interface";
import "./MultipleSeriesChart.css";

interface TimeFrameButtonState {
  button1: boolean;
  button2: boolean;
  button3: boolean;
  button4: boolean;
  button5: boolean;
  button6: boolean;
  button7: boolean;
  button8: boolean;
  button9: boolean;
  button10: boolean;
  button11: boolean;
  button12: boolean;
}

interface ChartTypeButtonState {
  line: boolean;
  candlestick: boolean;
}

export function MultipleSeriesChart(props: { dark: boolean; symbol: string }) {
  const [isLineChart, setIsLineChart] = useState<boolean>(false);
  const [isClickedTimeFrame, setIsClickedTimeFrame] =
    useState<TimeFrameButtonState>({
      button1: true,
      button2: false,
      button3: false,
      button4: false,
      button5: false,
      button6: false,
      button7: false,
      button8: false,
      button9: false,
      button10: false,
      button11: false,
      button12: false,
    });
  const [isClickedChartType, setIsClickedChartType] =
    useState<ChartTypeButtonState>({
      line: false,
      candlestick: true,
    });
  const [timeFrame, setTimeFrame] = useState<string>("1m");
  const containerRef = useRef<HTMLDivElement | null>(null);
  let layoutOption = undefined;

  useEffect(() => {
    const chart = createChart(containerRef.current as HTMLElement, {
      width: containerRef.current!.clientWidth,
      height: 500,
      timeScale: {
        borderColor: "rgba(197, 203, 206, 0.8)",
        timeVisible: true,
        secondsVisible: false,
      },
    });
    const lineSeries = chart.addLineSeries({ visible: isLineChart });
    const candlestickSeries = chart.addCandlestickSeries({
      visible: !isLineChart,
    });
    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      // error but work
      // overlay: true,
      scaleMargins: { top: 0.9, bottom: 0 },
    });

    const candlestickDataArray: CandleStickData[] = [];
    const lineDataArray: LineData[] = [];
    const volumeDataArray: VolumeData[] = [];

    if (
      timeFrame === "1d" ||
      timeFrame === "1w" ||
      timeFrame === "1M" ||
      timeFrame === "1y"
    ) {
      fetch(
        `http://localhost:4000/getEveryDayDataFromMongoDB?symbol=${props.symbol}`
      )
        .then((res) => res.json())
        .then((result: ResultObj[]) => {
          result.map((item) => {
            lineDataArray.push(item.lineData);
            candlestickDataArray.push(item.candleStickData);
            volumeDataArray.push(item.volume);
          });

          const {
            convertedLineDataArray,
            convertedCandlestickDataArray,
            convertedVolumeDataArray,
          } = changeTimeFrame(
            timeFrame,
            volumeDataArray,
            lineDataArray,
            candlestickDataArray
          );

          lineSeries.setData(convertedLineDataArray);
          candlestickSeries.setData(convertedCandlestickDataArray);
          volumeSeries.setData(convertedVolumeDataArray);
        });
    } else {
      fetch(`http://localhost:4000/getDataFromMongoDB?symbol=${props.symbol}`)
        .then((res) => res.json())
        .then((result: ResultObj[]) => {
          result.map((item) => {
            lineDataArray.push(item.lineData);
            candlestickDataArray.push(item.candleStickData);
            volumeDataArray.push(item.volume);
          });

          const {
            convertedLineDataArray,
            convertedCandlestickDataArray,
            convertedVolumeDataArray,
          } = changeTimeFrame(
            timeFrame,
            volumeDataArray,
            lineDataArray,
            candlestickDataArray
          );

          lineSeries.setData(convertedLineDataArray);
          candlestickSeries.setData(convertedCandlestickDataArray);
          volumeSeries.setData(convertedVolumeDataArray);
        });
    }

    const handleResize = () => {
      chart.applyOptions({ width: containerRef.current!.clientWidth });
    };

    props.dark
      ? (layoutOption = {
          layout: {
            background: { color: "rgb(19, 23, 34" },
            textColor: "#FFFFFF",
          },
        })
      : (layoutOption = { layout: { background: { color: "#FFFFFF" } } });

    chart.applyOptions(layoutOption);
    chart.timeScale().fitContent();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      chart.remove();
    };
  }, [isLineChart, timeFrame]);

  return (
    <>
      <hr />
      <div className="button-container">
        <div className="chart-type-button-container">
          <button
            className={
              "chart-type " + (isClickedChartType.line ? "isClicked" : "")
            }
            onClick={() => {
              setIsLineChart(true);
              setIsClickedChartType({ line: true, candlestick: false });
            }}
          >
            Line Chart
          </button>
          <button
            className={
              "chart-type " +
              (isClickedChartType.candlestick ? "isClicked" : "")
            }
            onClick={() => {
              setIsLineChart(false);
              setIsClickedChartType({ line: false, candlestick: true });
            }}
          >
            Candlestick Chart
          </button>
        </div>
        <div className="time-frame-button-container">
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button1 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("1m");
              setIsClickedTimeFrame({
                button1: true,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            1m
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button2 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("5m");
              setIsClickedTimeFrame({
                button1: false,
                button2: true,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            5m
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button3 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("10m");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: true,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            10m
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button4 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("15m");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: true,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            15m
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button5 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("30m");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: true,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            30m
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button6 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("1h");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: true,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            1h
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button7 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("2h");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: true,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            2h
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button8 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("4h");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: true,
                button9: false,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            4h
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button9 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("1d");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: true,
                button10: false,
                button11: false,
                button12: false,
              });
            }}
          >
            1d
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button10 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("1w");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: true,
                button11: false,
                button12: false,
              });
            }}
          >
            1w
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button11 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("1M");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: true,
                button12: false,
              });
            }}
          >
            1M
          </button>
          <button
            className={
              "time-frame " + (isClickedTimeFrame.button12 ? "isClicked" : "")
            }
            onClick={() => {
              setTimeFrame("1y");
              setIsClickedTimeFrame({
                button1: false,
                button2: false,
                button3: false,
                button4: false,
                button5: false,
                button6: false,
                button7: false,
                button8: false,
                button9: false,
                button10: false,
                button11: false,
                button12: true,
              });
            }}
          >
            1y
          </button>
        </div>
      </div>
      <div id="chart-container" ref={containerRef}></div>
      <h1>{`TimeFrame:${timeFrame}`}</h1>
      <h1>{`isLineChart:${isLineChart}`}</h1>
    </>
  );
}

function changeTimeFrame(
  timeFrame: string,
  volumeArray: VolumeData[],
  lineDataArray: LineData[],
  candlestickDataArray: CandleStickData[]
) {
  let convertedVolumeDataArray: VolumeData[] = [];
  let convertedLineDataArray: LineData[] = [];
  let convertedCandlestickDataArray: CandleStickData[] = [];
  switch (timeFrame) {
    case "5m":
      convertedLineDataArray = convertLineDataArray(5, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        5,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(5, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "10m":
      convertedLineDataArray = convertLineDataArray(10, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        10,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(10, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "15m":
      convertedLineDataArray = convertLineDataArray(15, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        15,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(15, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "30m":
      convertedLineDataArray = convertLineDataArray(30, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        30,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(30, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "1h":
      convertedLineDataArray = convertLineDataArray(60, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        60,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(60, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "2h":
      convertedLineDataArray = convertLineDataArray(120, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        120,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(120, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "4h":
      convertedLineDataArray = convertLineDataArray(240, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        240,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(240, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    case "1d":
      convertedLineDataArray = convertLineDataArray(389, lineDataArray);
      convertedCandlestickDataArray = convertCandlestickDataArray(
        389,
        candlestickDataArray
      );
      convertedVolumeDataArray = convertVolumeDataArray(389, volumeArray);
      return {
        convertedLineDataArray,
        convertedCandlestickDataArray,
        convertedVolumeDataArray,
      };
    // case "1w":
    //   convertedLineDataArray = convertLineDataArray(5, lineDataArray);
    //   convertedVolumeDataArray = convertVolumeDataArray(10080, volumeArray);
    //   return { convertedLineDataArray, convertedVolumeDataArray };
    //   return ["1w"];
    // case "1M":
    //   return ["1M"];
    // case "1y":
    //   return ["1y"];
    default:
      return {
        convertedLineDataArray: lineDataArray,
        convertedCandlestickDataArray: candlestickDataArray,
        convertedVolumeDataArray: volumeArray,
      };
  }
}

function convertVolumeDataArray(timeFrame: number, array: VolumeData[]) {
  const newVolumeDataArray: VolumeData[] = [];
  if (timeFrame < 389) {
    for (let i = 0; i < array.length; i = i + 389) {
      const dayArray = array.slice(i, i + 389);
      for (let i = 0; i < dayArray.length; i = i + timeFrame) {
        const slicedArray = dayArray.slice(i, i + timeFrame);
        let totalVolume = 0;
        for (let volumeObj of slicedArray) {
          totalVolume += volumeObj.value;
        }
        newVolumeDataArray.push({
          time: slicedArray[0].time,
          value: totalVolume,
          color: "rgb(46, 255, 3)",
        });
      }
    }
    return newVolumeDataArray;
  }
  return array;
}

function convertLineDataArray(timeFrame: number, array: LineData[]) {
  const newLineDataArray: LineData[] = [];
  if (timeFrame < 389) {
    for (let i = 0; i < array.length; i = i + 389) {
      const dayArray = array.slice(i, i + 389);
      for (let i = 0; i < dayArray.length; i = i + timeFrame) {
        const slicedArray = dayArray.slice(i, i + timeFrame);
        newLineDataArray.push({
          time: slicedArray[0].time,
          value: slicedArray[slicedArray.length - 1].value,
        });
      }
    }
    return newLineDataArray;
  }
  return array;
}

function convertCandlestickDataArray(
  timeFrame: number,
  array: CandleStickData[]
) {
  const newCandlestickDataArray: CandleStickData[] = [];
  if (timeFrame < 389) {
    for (let i = 0; i < array.length; i = i + 389) {
      const dayArray = array.slice(i, i + 389);
      for (let i = 0; i < dayArray.length; i = i + timeFrame) {
        const slicedArray = dayArray.slice(i, i + timeFrame);
        const highest = slicedArray.reduce((prev, current) => {
          if (current.high > prev) {
            prev = current.high;
          }
          return prev;
        }, 0);
        const lowest = slicedArray.reduce((prev, current) => {
          if (current.low < prev) {
            prev = current.low;
          }
          return prev;
        }, 999999);

        newCandlestickDataArray.push({
          time: slicedArray[0].time,
          open: slicedArray[0].open,
          close: slicedArray[slicedArray.length - 1].close,
          high: highest,
          low: lowest,
        });
      }
    }
    return newCandlestickDataArray;
  }
  return array;
}
