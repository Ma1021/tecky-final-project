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

export interface CandlestickData {
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

export interface ResultObj {
  convertedLineDataArray: LineData[];
  convertedCandlestickDataArray: CandlestickData[];
  convertedVolumeDataArray: VolumeData[];
  lineSMA20Array: LineData[];
  lineSMA50Array: LineData[];
  lineSMA100Array: LineData[];
  lineSMA250Array: LineData[];
  lineEMA20Array: LineData[];
  lineEMA50Array: LineData[];
  lineEMA100Array: LineData[];
  lineEMA250Array: LineData[];
  lineRSI7Array: LineData[];
  lineRSI14Array: LineData[];
  fastLineResultArray: LineData[];
  slowLineResultArray: LineData[];
  histogramResultArray: HistogramData[];
}

export interface StockInfo {
  stock_id: number;
  symbol: string;
  name: string;
  chinese_name: string;
  current_price: number;
  yesterday_price: number;
  price_difference: number;
}

export interface TimeFrameButtonState {
  oneMinute: boolean;
  fiveMinutes: boolean;
  tenMinutes: boolean;
  fifteenMinutes: boolean;
  thirtyMinutes: boolean;
  oneHour: boolean;
  twoHours: boolean;
  fourHours: boolean;
  oneDay: boolean;
  oneWeek: boolean;
  oneMonth: boolean;
  oneYear: boolean;
}

export interface ChartTypeButtonState {
  line: boolean;
  candlestick: boolean;
}

export interface Indicator {
  SMA20: boolean;
  SMA50: boolean;
  SMA100: boolean;
  SMA250: boolean;
  EMA20: boolean;
  EMA50: boolean;
  EMA100: boolean;
  EMA250: boolean;
  RSI7: boolean;
  RSI14: boolean;
  MACD: boolean;
}
