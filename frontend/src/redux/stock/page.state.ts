export interface PageStateType {
  stockList: boolean;
  stockInfo: boolean;
  stockForum: boolean;
  stockNews: boolean;
  stockAnalysis: boolean;
}

export const initPageState: PageStateType = {
  stockList: false,
  stockInfo: true,
  stockForum: false,
  stockNews: false,
  stockAnalysis: false,
};
