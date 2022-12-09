import { Knex } from 'knex';

export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex('user_stocks').del();
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
      symbol: 'NVDA',
      name: 'Nvidia',
      chinese_name: '輝達',
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
    {
      id: 6,
      symbol: 'ETHUSDT',
      name: 'Ethereum',
      chinese_name: '以太幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 7,
      symbol: 'BTCUSDT',
      name: 'Bitcoin',
      chinese_name: '比特幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 8,
      symbol: 'DOGEUSDT',
      name: 'DogeCoin',
      chinese_name: '狗狗幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 9,
      symbol: 'XRPUSDT',
      name: 'XRP',
      chinese_name: '瑞波幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 10,
      symbol: 'LTCUSDT',
      name: 'LiteCoin',
      chinese_name: '萊特幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 11,
      symbol: 'FILUSDT',
      name: 'FileCoin',
      chinese_name: '文件幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 12,
      symbol: 'BNBUSDT',
      name: 'BNB',
      chinese_name: '幣安幣',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 13,
      symbol: 'NVR',
      name: 'NVR Inc',
      chinese_name: 'NVR Inc',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 14,
      symbol: 'KO',
      name: 'Coca-Cola',
      chinese_name: '可口可樂',
      current_price: 300,
      yesterday_price: 250,
    },
    {
      id: 15,
      symbol: 'CCL',
      name: 'Carnival Corporation',
      chinese_name: '嘉年華郵輪',
      current_price: 300,
      yesterday_price: 250,
    },
  ]);

  await knex('user_stocks').insert([
    { user_id: 1, symbol: 'TSLA' },
    { user_id: 1, symbol: 'GOOG' },
    { user_id: 1, symbol: 'AAPL' },
    { user_id: 1, symbol: 'ETHUSDT' },
    { user_id: 1, symbol: 'BTCUSDT' },
    { user_id: 2, symbol: 'TSLA' },
    { user_id: 2, symbol: 'GOOG' },
    { user_id: 2, symbol: 'GME' },
    { user_id: 2, symbol: 'NVDA' },
    { user_id: 2, symbol: 'AAPL' },
    { user_id: 2, symbol: 'NVR' },
    { user_id: 2, symbol: 'KO' },
    { user_id: 2, symbol: 'CCL' },
    { user_id: 2, symbol: 'ETHUSDT' },
    { user_id: 2, symbol: 'BTCUSDT' },
    { user_id: 2, symbol: 'DOGEUSDT' },
    { user_id: 2, symbol: 'XRPUSDT' },
    { user_id: 2, symbol: 'LTCUSDT' },
    { user_id: 2, symbol: 'FILUSDT' },
    { user_id: 2, symbol: 'BNBUSDT' },
  ]);

  await knex('user_trades').insert([
    {
      id: 1,
      user_id: 1,
      symbol: 'TSLA',
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
      symbol: 'GOOG',
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
    {
      id: 4,
      stock_id: 2,
      title: '韋德布什：將遊戲驛站(GME.N)目標價從6美元下調至5.3美元',
      content: '韋德布什：將遊戲驛站(GME.N)目標價從6美元下調至5.3美元。',
      time: '2022-12-09',
    },
    {
      id: 5,
      stock_id: 2,
      title: '美股WSB概念股上揚',
      content:
        '格隆匯12月9日丨WSB概念股上揚，Express漲285，遊戲驛站漲超7%，ContextLogic漲超6%，Roblox、AMC院線漲3%。',
      time: '2022-12-09',
    },
    {
      id: 6,
      stock_id: 2,
      title: '美股異動 | WSB概念股上揚 遊戲驛站(GME.US)漲超8%',
      content: `智通財經APP獲悉，週四，WSB概念股上揚，截至發稿，遊戲驛站(GME.US)漲超8%，ContextLogic(WISH.US)漲超7%，AMC院線(AMC.US)漲近5%，Roblox(RBLX.US)漲超3%。

    此前遊戲驛站公佈第三財季財務報告，截至10月29日的第三財季，遊戲驛站的總銷售額約為12億美元，低於去年同期的13億美元。現金和現金等價物則同比減少了約6億元，剩下8.04億美元。第三財季，遊戲驛站報告淨虧損僅9500萬美元，較去年同期約1.05億美元的虧損略有收縮。`,
      time: '2022-12-09',
    },
    {
      id: 7,
      stock_id: 3,
      title: 'Tigress Financial：將英偉達目標價下調至250美元 維持買入評級',
      content: `Tigress Financial分析師Ivan Feinseth將$英偉達(NVDA.US)$的目標價從310美元下調至250美元，並維持對該股的買入評級，英偉他對該股估值進行重新評估。

      該分析師指出，調整後的目標價代表了較目前水平仍有超過55%的潛在上升空間，他認爲英偉達在人工智能領域的行業領先地位、多種新產品及夥伴關係使其能夠克服近期的不利因素影響，併爲新的業務週期做好準備。`,
      time: '2022-12-09',
    },
    {
      id: 8,
      stock_id: 3,
      title: '機構：Q3晶圓代工十大廠商產值環比增長6% Q4產業將結束逐季成長趨勢',
      content: `研究機構TrendForce日前發佈今年第三季度晶圓代工行業統計數據，Q3前十大晶圓代工廠商產值達到352.1億美元，環比增長6%。不過，由於宏觀經濟環境拖累，導致下半年旺季不旺，客戶對晶圓代工廠訂單修正幅度加深，TrendForce預期，四季度營收將因此下跌，正式結束過去兩年晶圓代工產業逐季成長的盛況。`,
      time: '2022-12-09',
    },
    {
      id: 9,
      stock_id: 3,
      title:
        'NVIDIA to Overcome Near-Term Challenges With AI, New Products, Tigress Says',
      content: `04:19 PM EST, 12/08/2022 (MT Newswires) -- NVIDIA's (NVDA) pole position in artificial intelligence as well as its new products and partnerships will enable it to overcome near-term headwinds, Tigress Financial Partners said in a note on Thursday.
      Ivan Feinseth, research director, said the company is evolving into "the world's leading AI processing provider through the ongoing applications of its" graphic processing units, adding that it is also advancing its "leadership in autonomous vehicle technology."
      "NVDA is one of the best ways to play the accelerating adoption of AI into all types of technologies and applications," Feinseth said, adding that its strong balance sheet and cash flow would enable it to fund growth-driving initiatives.
      Still, Tigress cut its price target for the stock to $250 from $310 on a re-rating of valuation while reaffirming its buy call.`,
      time: '2022-12-09',
    },
    {
      id: 10,
      stock_id: 4,
      title: '蘋果可能同時在開發兩個頭顯操作系統，realityOS和xrOS',
      content: `品玩12月9日訊，據 9to5mac 消息，realityOS 和 xrOS 可能是兩個不同的作業系統，正同步開發。此前 彭博社 Mark Gurman 稱，蘋果頭顯作業系統由一開始的 realityOS 改名為 xrOS 。

      9to5mac認為，realityOS 是基於 iOS 的平臺，而 xrOS 則是基於 macOS 的平臺。這可能是因為，蘋果初代頭顯的工作方式可能類似於初代 Apple Watch，大部分的操作都需要在手機上完成。因此，頭顯也需要依賴其它設備的操作平臺進行完整的操作。xrOS 甚至可能會在專門的配套設備上運行。`,
      time: '2022-12-09',
    },
    {
      id: 11,
      stock_id: 4,
      title: '傳推特將上調蘋果(AAPL.US)iPhone用戶藍V認證定價',
      content: `智通財經APP獲悉，據報道，推特將提高通過蘋果(AAPL.US)iPhone註冊用戶的藍V認證(Twitter Blue)訂閱服務定價。知情人士表示，如果用戶在網上訂閱藍V認證，推特將收取每月7美元的費用，但如果用戶通過App Store訂閱，每月收費則為11美元。此前藍V認證的收費標準為每月8美元。

      報告還指出，推特已告知其員工，藍V認證將於週五(12月9日)重新推出。在今年早些時候推出時，這項服務一直存在問題。
      
      對此，推特和蘋果沒有立即回應置評請求。
      
      據猜測，對蘋果用戶採取提價措施很可能是對蘋果在其iOS應用程式內購買服務收取30%佣金的應對方案。此前，馬斯克曾公開抱怨“蘋果稅”，並稱蘋果已基本停止在推特投放廣告，並且威脅將推特從其應用商店下架。
      
      不過，隨後馬斯克發文稱，感謝庫克帶領他參觀蘋果總部，並表示，自己與庫克進行了友好的對話，推特和蘋果的誤解得到了解決。
      
      此後，馬斯克也證實，蘋果已經“全面”恢復了推特上的廣告投放，並補充稱，蘋果是推特最大的廣告客戶。`,
      time: '2022-12-09',
    },
    {
      id: 12,
      stock_id: 4,
      title: '蘋果開始與三星顯示和LG顯示開發20.25英寸可摺疊OLED面板',
      content: `據TheElec報道，蘋果已經開始與韓國顯示面板供應商三星顯示和LG顯示合作開發20.25英寸可折疊OLED面板。然而，這種面板是否會被商業化還沒有決定。這個專案很可能是為了讓蘋果公司獲得推出可折疊面板產品所需的核心技術而進行的。

      該面板展開後尺寸為20.25英寸，折疊後為15.3英寸，這意味著該面板可能是為蘋果的MacBook系列筆記本開發的。目前的MacBooks最多隻有10英寸大小，而iPad則是10英寸左右。蘋果尚未在其iPad和MacBook產品線上應用OLED面板。
      
      採用OLED面板的iPad的開發正在進行中，該公司預計將在2024年推出11英寸和12.9英寸的機型，面板由三星顯示和LG顯示提供。配備OLED面板的MacBook預計比這更晚推出，可能在2026年左右。配備可折疊OLED面板的MacBook可能會離這一推出時間更遠。`,
      time: '2022-12-09',
    },
    {
      id: 13,
      stock_id: 5,
      title:
        'Alphabet Inc. Cl A Stock Underperforms Thursday When Compared To Competitors',
      content: `This article was automatically generated by MarketWatch using technology from Automated Insights.
      Shares of Alphabet Inc. Cl A (GOOGL) slipped 1.30% to $93.71 Thursday, on what proved to be an all-around great trading session for the stock market, with the S&P 500 Index rising 0.75% to 3,963.51 and the Dow Jones Industrial Average rising 0.55% to 33,781.48. This was the stock's fifth consecutive day of losses. Alphabet Inc. Cl A closed $57.84 short of its 52-week high ($151.55), which the company reached on February 2nd.
      The stock underperformed when compared to some of its competitors Thursday, as Microsoft Corp. (MSFT) rose 1.24% to $247.40, Amazon.com Inc. (AMZN) rose 2.14% to $90.35, and Meta Platforms Inc. (META) rose 1.23% to $115.33. Trading volume (32.1 M) remained 370,730 below its 50-day average volume of 32.5 M.`,
      time: '2022-12-09',
    },
    {
      id: 14,
      stock_id: 5,
      title: '歐盟法院裁定谷歌必須刪除被證明爲虛假的搜索結果',
      content: `歐盟法院週四裁定，谷歌必須從蒐索結果中刪除被確認為虛假或內容不實的資訊。

      在這起裁定發生之前，谷歌拒絕了一家投資公司的兩名高管的請求。他們希望這家蒐索引擎巨頭刪除批評該集團的文章及含有他們本人肖像的照片。
      
      歐盟法院表示：“如果請求撤銷引用的人證明此類資訊明顯不準確，蒐索引擎的運營商必須撤銷引用內容中的資訊。”
      
      8年前，同樣是歐盟法院發佈了一項具有里程碑意義的“被遺忘權”裁決，稱如果個人資訊被認為不準確或不相關，人們可以要求谷歌等公司刪除其個人資訊。
      
      谷歌發言人在一份聲明中表示：“自2014年以來，我們一直努力在歐洲落實“被遺忘”的權利，並在人們獲取資訊的權利和隱私權之間取得合理的平衡。”。`,
      time: '2022-12-09',
    },
    {
      id: 15,
      stock_id: 5,
      title:
        'Alphabet Inc. (NASDAQ:GOOG) Shares Purchased by Willow Creek Wealth Management Inc.',
      content: `Willow Creek Wealth Management Inc. boosted its holdings in Alphabet Inc. (NASDAQ:GOOG – Get Rating) by 52.1% during the second quarter, according to the company in its most recent filing with the Securities and Exchange Commission. The fund owned 809 shares of the information services provider's stock after buying an additional 277 shares during the period. Willow Creek Wealth Management Inc.'s holdings in Alphabet were worth $1,770,000 at the end of the most recent reporting period.
      A number of other hedge funds have also recently added to or reduced their stakes in the business. Clough Capital Partners L P lifted its stake in shares of Alphabet by 85.1% in the 2nd quarter. Clough Capital Partners L P now owns 11,405 shares of the information services provider's stock valued at $24,948,000 after purchasing an additional 5,244 shares in the last quarter. Centiva Capital LP lifted its stake in shares of Alphabet by 1,097.4% in the 2nd quarter. Centiva Capital LP now owns 57,500 shares of the information services provider's stock valued at $6,288,000 after purchasing an additional 52,698 shares in the last quarter. Crow s Nest Holdings LP lifted its stake in shares of Alphabet by 4.5% in the 2nd quarter. Crow s Nest Holdings LP now owns 14,945 shares of the information services provider's stock valued at $32,691,000 after purchasing an additional 650 shares in the last quarter. Davidson Kempner Capital Management LP lifted its stake in shares of Alphabet by 6.7% in the 2nd quarter. Davidson Kempner Capital Management LP now owns 16,000 shares of the information services provider's stock valued at $35,004,000 after purchasing an additional 1,000 shares in the last quarter. Finally, DF Dent & Co. Inc. raised its holdings in shares of Alphabet by 5.4% during the 2nd quarter. DF Dent & Co. Inc. now owns 89,702 shares of the information services provider's stock valued at $196,219,000 after buying an additional 4,623 shares during the period. 1.49% of the stock is owned by institutional investors and hedge funds.
      `,
      time: '2022-12-09',
    },
  ]);
}
