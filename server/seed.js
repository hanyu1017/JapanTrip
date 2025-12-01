const { pool } = require('./db');

const INITIAL_ITINERARY = [
  {
    day: 1,
    date: "1/6 (一)",
    title: "抵達大阪 & 移動至京都",
    items: [
      { id: 'd1-1', time: "09:20", type: "flight", title: "星宇航空 JX822 出發", location: "桃園機場第一航廈", desc: "帶著愉快的心情出發！", detail: "TPE T1 -> KIX T1\n飛行時間約 2小時30分" },
      { id: 'd1-2', time: "12:50", type: "flight", title: "抵達關西國際機場", location: "關西國際機場", desc: "抵達大阪，辦理入境手續。", detail: "入境手續預計約 1小時" },
      { id: 'd1-3', time: "13:44", type: "transport", title: "前往京都 (方案A: 經梅田)", from: "關西機場", to: "京都河原町", method: "HARUKA + 京雅洛", duration: "約2.5小時", detail: "1. HARUKA (13:44發) → 大阪站(梅田)\n2. 轉乘 阪急京都線「京雅洛」 (15:32發)\n3. 抵達 京都河原町", location: "關西機場" },
      { id: 'd1-4', time: "14:15", type: "transport", title: "前往京都 (方案B: 直達京都站)", from: "關西機場", to: "Minn Gion", method: "HARUKA + 公車", duration: "約2小時", detail: "1. HARUKA 直達京都車站 (約80分)\n2. 轉乘市營公車 206 或 86 號\n3. 知恩院前/祇園站下車", location: "關西機場" },
      { id: 'd1-5', time: "16:30", type: "hotel", title: "Check-in: Minn Gion", location: "Minn Gion", desc: "位於祇園的質感公寓式酒店，交通方便。", detail: "從河原町步行約11分鐘" },
      { id: 'd1-6', time: "18:00", type: "meal", title: "晚餐：和牛燒肉 Toku", location: "Wagyuyakiniku Toku", desc: "高品質日本和牛燒肉，抵達日本的第一頓大餐。", detail: "預約確認：請檢查信箱" },
      { id: 'd1-7', time: "20:00", type: "spot", title: "夜遊祇園 & 鴨川", location: "鴨川", desc: "夜晚的鴨川沿岸燈火通明，非常有氣氛。", detail: "散步路線：鴨川 -> 祇園白川 -> 高島屋" }
    ]
  },
  {
    day: 2,
    date: "1/7 (二)",
    title: "奈良小鹿 & 大佛巡禮",
    items: [
      { id: 'd2-1', time: "09:00", type: "transport", title: "前往奈良", from: "Minn Gion", to: "近鐵奈良", method: "公車 + 近鐵", duration: "約1小時", detail: "1. 步行至知恩院前搭公車 206/86\n2. 京都車站下車 (約23分)\n3. 轉乘 近鐵京都線 急行 → 近鐵奈良", location: "Minn Gion" },
      { id: 'd2-2', time: "10:30", type: "spot", title: "奈良公園 & 餵鹿", location: "奈良公園", desc: "隨處可見野生的鹿群，小心鹿群的熱情攻勢！", detail: "門票：免費 (鹿仙貝 200日圓)" },
      { id: 'd2-3', time: "12:00", type: "spot", title: "東大寺", location: "東大寺", desc: "世界最大的木造建築大佛殿。", detail: "門票：600日圓" },
      { id: 'd2-4', time: "14:00", type: "meal", title: "下午茶：大佛布丁", location: "近鐵奈良站", desc: "奈良必吃的名物甜點，口感綿密濃郁。", detail: "口味推薦：原味卡士達" },
      { id: 'd2-5', time: "15:00", type: "spot", title: "茶道體驗", location: "奈良 茶道", desc: "在古都體驗日本傳統茶道文化，沉澱心靈。", detail: "需預約" },
      { id: 'd2-6', time: "17:00", type: "transport", title: "返回京都", from: "近鐵奈良", to: "京都車站", method: "近鐵京都線", duration: "45分", detail: "搭乘急行 直達京都車站", location: "近鐵奈良" },
      { id: 'd2-7', time: "18:00", type: "spot", title: "京都塔 & 車站周邊", location: "京都塔", desc: "京都的地標，晚上點燈後非常美麗。", detail: "逛街行程：伊勢丹百貨" }
    ]
  },
  {
    day: 3,
    date: "1/8 (三)",
    title: "和服體驗 & 清水寺",
    items: [
      { id: 'd3-1', time: "09:00", type: "transport", title: "前往和服店", from: "Minn Gion", to: "清水寺周邊", method: "公車", duration: "20分", detail: "搭乘公車 206 或 202 \n至 清水道/五條坂 下車", location: "Minn Gion" },
      { id: 'd3-2', time: "09:30", type: "spot", title: "和服體驗", location: "京都和服租借", desc: "換上精選的和服，漫步在古色古香的京都街道。", detail: "需預約，記得攜帶憑證" },
      { id: 'd3-3', time: "11:00", type: "spot", title: "清水寺", location: "清水寺", desc: "京都最著名的古蹟，求取音羽之瀑的泉水。", detail: "門票：400日圓" },
      { id: 'd3-4', time: "12:30", type: "spot", title: "二年坂 & 三年坂", location: "二年坂", desc: "充滿京都風情的石板坡道與傳統商店。", detail: "小心階梯" },
      { id: 'd3-5', time: "13:30", type: "meal", title: "午餐：花見小路", location: "花見小路", desc: "在祇園中心地帶享用京料理。", detail: "推薦：湯豆腐或懷石料理" },
      { id: 'd3-6', time: "15:00", type: "spot", title: "円山公園 & 八坂神社", location: "八坂神社", desc: "祈求消災解厄與戀愛運的總本社。", detail: "美容水：可以拍在臉上祈求美貌" }
    ]
  },
  {
    day: 4,
    date: "1/9 (四)",
    title: "嵐山風情 & 錦市場",
    items: [
      { id: 'd4-1', time: "08:00", type: "spot", title: "因幡堂 (平等寺)", location: "因幡堂", desc: "祈求健康，還有超可愛的文鳥御守。", detail: "早起參拜" },
      { id: 'd4-2', time: "09:30", type: "transport", title: "前往嵐山", from: "烏丸站", to: "嵐山", method: "阪急京都線", duration: "約30分", detail: "1. 烏丸站 → 桂站 (轉乘)\n2. 桂站 → 阪急嵐山站", location: "烏丸站" },
      { id: 'd4-3', time: "10:30", type: "spot", title: "嵐山猴子公園", location: "嵐山猴子公園", desc: "位於山頂，可以俯瞰京都市景並接觸野生猴子。", detail: "門票：550日圓" },
      { id: 'd4-4', time: "12:00", type: "spot", title: "竹林小徑", location: "嵐山竹林", desc: "高聳入雲的竹林，嵐山代表性風景。", detail: "拍照熱點" },
      { id: 'd4-5', time: "13:00", type: "meal", title: "午餐：嵐山よしむら", location: "嵐山よしむら", desc: "著名的蕎麥麵專門店，欣賞渡月橋美景。", detail: "建議提前排隊" },
      { id: 'd4-6', time: "14:30", type: "meal", title: "下午茶：京豆庵", location: "京豆庵 嵐山", desc: "倒立也不會掉下來的超濃郁豆乳霜淇淋。", detail: "必點：黑芝麻與原味豆腐" },
      { id: 'd4-7', time: "16:00", type: "transport", title: "返回市區", from: "嵐山", to: "錦市場", method: "阪急線", duration: "30分", detail: "嵐山 → 桂 → 烏丸/河原町", location: "嵐山" },
      { id: 'd4-8', time: "16:30", type: "spot", title: "錦市場", location: "錦市場", desc: "京都的廚房，充滿各式美食與漬物。", detail: "注意：店家約17-18點打烊" }
    ]
  },
  {
    day: 5,
    date: "1/10 (五)",
    title: "移動日 & 大阪南區",
    items: [
      { id: 'd5-1', time: "10:00", type: "hotel", title: "Check-out & 移動", location: "OMO7 Osaka", desc: "前往大阪，入住星野集團 OMO7。", detail: "河原町(阪急) → 淡路(轉堺筋線) → 動物園前站" },
      { id: 'd5-2', time: "12:00", type: "hotel", title: "寄放行李", location: "OMO7 Osaka", desc: "先寄放行李，輕裝出遊。", detail: "" },
      { id: 'd5-3', time: "12:30", type: "spot", title: "木津市場 & 黑門市場", location: "木津市場", desc: "大阪在地人的廚房，適合吃海鮮。", detail: "海鮮丼、關東煮" },
      { id: 'd5-4', time: "15:00", type: "spot", title: "心齋橋 & 道頓堀", location: "道頓堀", desc: "大阪最熱鬧的購物區，固力果跑跑人。", detail: "購物、藥妝掃貨" }
    ]
  },
  {
    day: 6,
    date: "1/11 (六)",
    title: "勝尾寺 & 溫泉放鬆",
    items: [
      { id: 'd6-1', time: "09:00", type: "transport", title: "前往勝尾寺", from: "OMO7", to: "勝尾寺", method: "地鐵+公車", duration: "約1.5小時", detail: "1. 地鐵御堂筋線 → 千里中央站\n2. 轉乘 阪急巴士 29號 (往北攝靈園)\n3. 勝尾寺站下車", location: "OMO7" },
      { id: 'd6-2', time: "10:30", type: "spot", title: "勝尾寺", location: "勝尾寺", desc: "祈求勝運，滿滿的紅色達摩不倒翁。", detail: "購買達摩祈福" },
      { id: 'd6-3', time: "14:00", type: "transport", title: "前往空庭溫泉", from: "勝尾寺", to: "弁天町", method: "公車+地鐵", duration: "約1.5小時", detail: "公車回千里中央 → 御堂筋線(本町轉乘) → 弁天町", location: "勝尾寺" },
      { id: 'd6-4', time: "15:30", type: "spot", title: "空庭溫泉", location: "空庭溫泉", desc: "關西最大溫泉主題樂園，安土桃山風格。", detail: "放鬆身心" }
    ]
  },
  {
    day: 7,
    date: "1/12 (日)",
    title: "回程",
    items: [
      { id: 'd7-1', time: "11:00", type: "hotel", title: "Check-out & 前往機場", location: "關西機場", desc: "搭乘南海電鐵 Rapi:t 直達機場。", detail: "新今宮 → 關西機場 (約35分)" },
      { id: 'd7-2', time: "12:55", type: "flight", title: "長榮航空 回程", location: "KIX T1", desc: "BR flights", detail: "Check-in 櫃檯確認" },
      { id: 'd7-3', time: "14:00", type: "flight", title: "星宇航空 回程", location: "KIX T1", desc: "JX flights", detail: "Check-in 櫃檯確認" }
    ]
  }
];

async function seedDatabase() {
  const client = await pool.connect();
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await client.query('DELETE FROM itinerary_items');
    await client.query('DELETE FROM itinerary_days');
    await client.query('DELETE FROM expenses');
    console.log('✅ Cleared existing data');

    // Insert days and items
    for (const dayData of INITIAL_ITINERARY) {
      // Insert day
      const dayResult = await client.query(
        'INSERT INTO itinerary_days (day, date, title) VALUES ($1, $2, $3) RETURNING id',
        [dayData.day, dayData.date, dayData.title]
      );
      const dayId = dayResult.rows[0].id;
      console.log(`✅ Inserted Day ${dayData.day}: ${dayData.title}`);

      // Insert items for this day
      for (const item of dayData.items) {
        await client.query(
          `INSERT INTO itinerary_items
           (id, day_id, time, type, title, location, description, detail, from_location, to_location, method, duration)
           VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)`,
          [
            item.id,
            dayId,
            item.time,
            item.type,
            item.title,
            item.location || null,
            item.desc || null,
            item.detail || null,
            item.from || null,
            item.to || null,
            item.method || null,
            item.duration || null
          ]
        );
      }
      console.log(`   ➡️  Added ${dayData.items.length} items`);
    }

    // Insert default settings
    await client.query(
      `INSERT INTO settings (key, value) VALUES ('publicFundTotal', '150000')
       ON CONFLICT (key) DO UPDATE SET value = '150000'`
    );
    console.log('✅ Inserted default settings');

    console.log('🎉 Database seeding completed successfully!');
  } catch (err) {
    console.error('❌ Error seeding database:', err);
    throw err;
  } finally {
    client.release();
    await pool.end();
  }
}

// Run seeding
seedDatabase();
