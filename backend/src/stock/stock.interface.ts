export interface ResultObj {
  histogramData: HistogramData;
  areaData: AreaData;
  barData: BarData;
  candleStickData: CandleStickData;
  lineData: LineData;
  volume: VolumeData;
}

export interface HistogramData {
  time: string | number;
  value: number;
  color: string;
}

export interface AreaData {
  time: string | number;
  value: number;
}

export interface BarData {
  time: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface CandleStickData {
  time: string | number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export interface LineData {
  time: string | number;
  value: number;
}

export interface VolumeData {
  time: string | number;
  value: number;
  color: string;
}
