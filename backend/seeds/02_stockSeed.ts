import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_stock').del();
  await knex('user_trades').del();
  await knex('stock_news').del();
  await knex('stock_info').del();

  // Inserts seed entries
  await knex('stock_info').insert([
    {
      id: 1,
      symbol: 'TSLA',
      name: 'Tesla',
      chinese_name: '特斯拉',
      current_price: 187.96,
      yesterday_price: 180.05,
    },
    {
      id: 2,
      symbol: 'GME',
      name: 'GameStop',
      chinese_name: '遊戲驛站',
      current_price: 130.05,
      yesterday_price: 131.04,
    },
    {
      id: 3,
      symbol: 'MSFT',
      name: 'Microsoft',
      chinese_name: '微軟',
      current_price: 190.12,
      yesterday_price: 180.52,
    },
    {
      id: 4,
      symbol: 'AAPL',
      name: 'Apple',
      chinese_name: '蘋果',
      current_price: 50.4,
      yesterday_price: 45.5,
    },
    {
      id: 5,
      symbol: 'GOOG',
      name: 'Google',
      chinese_name: '谷歌',
      current_price: 300,
      yesterday_price: 250,
    },
  ]);

  await knex('user_stock').insert([
    { id: 1, user_id: 1, stock_id: 1 },
    { id: 2, user_id: 1, stock_id: 2 },
    { id: 3, user_id: 1, stock_id: 3 },
    { id: 4, user_id: 1, stock_id: 4 },
    { id: 5, user_id: 1, stock_id: 5 },
    { id: 6, user_id: 2, stock_id: 1 },
    { id: 7, user_id: 2, stock_id: 3 },
  ]);

  await knex('user_trades').insert([
    {
      id: 1,
      user_id: 1,
      stock_id: 1,
      long: true,
      order_price: 120,
      quantity: 2,
      order_place_time: '2022-11-02',
      order_status: 2,
      order_complete_time: '2022-11-02',
    },
    {
      id: 2,
      user_id: 1,
      stock_id: 2,
      long: false,
      order_price: 10,
      quantity: 10,
      order_place_time: '2022-11-02',
    },
  ]);

  await knex('stock_news').insert([
    {
      id: 1,
      stock_id: 1,
      title: '傳特斯拉(TSLA)參投半導體公司 為在華首次佈局芯片設計及製造環節',
      content: `媒體報道，$特斯拉(TSLA.US)$已與瑞士汽車半導體公司Annex在中國濟南建立了一家合資公司——安納思半導體。

    據悉，該合資公司擁有1.5億美元的註冊資本，Annex擁有55%的股份，其次是濟南蘇黎士安納思股權投資基金合夥企業，佔40%的股份，其餘5%的股份由特斯拉擁有。濟南蘇黎士安納思股權投資基金早在2022年6月就以50億美元收購了Annex。
    
    特斯拉持有的股權比例雖然僅有5%，相對比較低，但這卻是其首次在中國大陸佈局芯片設計及製造環節。
    
    與此同時，還有報道稱特斯拉已經向臺積電(TSM)下了一份大規模的芯片訂單。據報道，該訂單規模之大，將使特斯拉成為臺積電明年的7大客户之一。這些芯片將在臺積電的4/5nm節點上製造。`,
      time: '2022-11-28',
      hyperlink: 'www.tesla.com/zh_hk',
    },
    {
      id: 2,
      stock_id: 1,
      title:
        '特斯拉全自動駕駛測試版現在將向任何已購買該選項並在其汽車屏幕上索取的北美特斯拉車主提供',
      content:
        '$特斯拉(TSLA.US)$創始人馬斯克表示，該公司的全自動駕駛測試版現在將向任何已購買該選項並在其汽車屏幕上索取的北美特斯拉車主提供。馬斯克在推文中恭喜特斯拉的自動駕駛和人工智能團隊實現了一個重大的里程碑。',
      time: '2022-11-29',
    },
    {
      id: 3,
      stock_id: 1,
      title: '為削減成本 傳特斯拉(TSLA.US)正研發改良版Model 3',
      content: `智通財經APP獲悉，據知情人士透露，$特斯拉(TSLA.US)$正在研發改良版的Model  3。這家行業領先的電動汽車製造商的目標是削減生產成本，並提高這款已推出了五年的電動汽車的吸引力。

        知情人士稱，代號為“Highland”的改造項目對Model  3重新設計的一個重點是減少其內部的組件數量和複雜性，同時專注於特斯拉買家看重的功能(包括顯示屏)。此外，知情人士還表示，對Model  3的改造可能還包括對其外觀和動力系統性能的一些改動，改造後的Model 3將在特斯拉上海工廠和加州弗裏蒙特工廠投產。他們表示，重新設計後的Model  3預計將在2023年第三季度在上海工廠投產，在加州弗裏蒙特工廠的投產時間則未定。
        
        特斯拉這一舉措凸顯了其開創的一種汽車開發方式，這一方式消除了生產過程中的複雜性和成本，目前正在被包括豐田汽車(TM.US)在內的其他汽車製造商效仿。特斯拉率先使用了被稱為Giga  Press的大型鑄造機，用於組裝單個更大的汽車部件，在降低了成本的同時加快了生產速度。特斯拉還設計了一種結構電池組，摒棄了更昂貴的模塊。馬斯克曾表示，特斯拉希望通過簡化和致力於小型車平臺來降低成本，該平臺的成本將是Model  3的一半。
        
        這種做法是特斯拉成為最賺錢的電動汽車製造商的部分原因，而許多競爭對手仍在虧損。根據兩家公司披露的信息，第三季度，特斯拉每賣出一輛車的利潤略高於9500美元，而豐田的利潤約為1300美元。
        
        Model 3是特斯拉最便宜的電動汽車，在美國的起價不到4.7萬美元，且曾是該品牌最暢銷的車型。不過，Model 3正在被Model  Y超越。由於特斯拉只生產了四款車型，因此，與傳統汽車製造商相比，特斯拉任何車型造型的變化都具有格外重要的意義。
        
        跟蹤市場趨勢和生產的AutoPacific Group總裁Ed Kim表示，由於特斯拉通過軟件更新電池性能、信息和娛樂選項的方式，目前的Model  3已經在2017年首次上市銷售的版本基礎上進行了更新，儘管它看起來仍然一樣。不過，他還指出：“話雖如此，消費者仍然傾向於將視覺變化與新鮮感等同起來。特斯拉知道，看得見摸得着的變化是必要的。”
        
        他補充稱：“潛在客户所能看到和感受到的即將到來的變化，對於確保電動汽車客户仍然把特斯拉放在他們的腦海中非常重要，因為真正優秀的特斯拉替代品正開始湧入市場。”`,
      time: '2022-11-29',
    },
  ]);
}
