// 常熟智游原型数据源
// 只改这个文件即可更新页面内容。后续接后台时，把 window.CHANGSHU_DATA 替换为接口返回即可。
window.CHANGSHU_DATA = {
  updatedAt: "18:08 更新",

  quickTags: [
    { label: "亲子周末", prompt: "亲子周末，上午自然教育，下午轻松美食，避开拥堵" },
    { label: "银发慢游", prompt: "银发慢游，少走路，停车方便，有讲解和休息点" },
    { label: "红色研学", prompt: "红色研学，沙家浜主题，包含讲解和团队预约" },
    { label: "非遗美食", prompt: "非遗美食路线，古城 Citywalk，本帮菜和老字号" },
    { label: "湖山骑行", prompt: "湖山骑行，尚湖和虞山，傍晚看日落" },
    { label: "雨天路线", prompt: "雨天路线，少户外，多场馆和室内体验" }
  ],

  todayStatus: [
    { name: "虞山景区", value: "较舒适", status: "calm" },
    { name: "尚湖景区", value: "舒适", status: "open" },
    { name: "沙家浜", value: "较拥挤", status: "busy" },
    { name: "古城片区停车", value: "剩余 1268 位", status: "plain" }
  ],

  todayAdvice: "当前更适合古城 Citywalk，14:30 后前往尚湖，沙家浜预计 16:00 后客流回落。",

  heroStats: [
    { label: "实时接入点位", value: "128" },
    { label: "今日推荐路线", value: "36" },
    { label: "诉求平均响应", value: "18min" }
  ],

  featuredPlaces: [
    {
      key: "yushan",
      title: "虞山文化线",
      subtitle: "琴派文化 · 古城文脉 · 轻徒步",
      image: "assets/scene-yushan.png",
      crowd: "较舒适",
      parking: "86",
      duration: "2.5h",
      prompt: "虞山文化线，想听琴派讲解，少走台阶，午餐吃本帮菜"
    },
    {
      key: "shanghu",
      title: "尚湖湿地慢游",
      subtitle: "湖山湿地 · 亲子自然 · 银发友好",
      image: "assets/scene-shanghu.png",
      crowd: "舒适",
      parking: "214",
      duration: "3h",
      prompt: "尚湖湿地亲子慢游，想要自然教育和轻松午餐"
    },
    {
      key: "shajiabang",
      title: "沙家浜红色研学",
      subtitle: "芦苇荡 · 红色讲解 · 实景演艺",
      image: "assets/scene-shajiabang.png",
      crowd: "较拥挤",
      parking: "52",
      duration: "3.5h",
      prompt: "沙家浜红色研学路线，包含讲解、演艺预约和团队停车"
    }
  ],

  tripModes: [
    { type: "default", label: "经典一日", desc: "湖山、古城、美食平衡" },
    { type: "senior", label: "银发慢游", desc: "少走路、近停车、多休息" },
    { type: "family", label: "亲子周末", desc: "自然教育、轻体验、轻餐饮" },
    { type: "research", label: "红色研学", desc: "团队签到、讲解、报告生成" }
  ],

  routeMetrics: {
    default: [
      { label: "总时长", value: "9h" },
      { label: "步行", value: "4.2km" },
      { label: "停车余位", value: "356" }
    ],
    family: [
      { label: "总时长", value: "8h" },
      { label: "步行", value: "3.1km" },
      { label: "亲子点位", value: "6" }
    ],
    senior: [
      { label: "总时长", value: "7h" },
      { label: "步行", value: "2.2km" },
      { label: "休息点", value: "9" }
    ],
    research: [
      { label: "总时长", value: "8.5h" },
      { label: "团队容量", value: "60人" },
      { label: "研学任务", value: "5" }
    ]
  },

  services: [
    { icon: "AI", name: "行程规划", href: "#itinerary" },
    { icon: "听", name: "智能讲解", href: "#guide" },
    { icon: "图", name: "景区舒适度", href: "#map" },
    { icon: "P", name: "停车查询", href: "#parking" },
    { icon: "路", name: "实时路况", href: "#map" },
    { icon: "票", name: "门票预约", href: "#guide" },
    { icon: "厕", name: "找厕所", href: "#map" },
    { icon: "寄", name: "行李寄存", href: "#map" },
    { icon: "站", name: "旅游驿站", href: "#map" },
    { icon: "食", name: "美食推荐", href: "#itinerary" },
    { icon: "救", name: "投诉求助", href: "#feedback" },
    { icon: "服", name: "一键客服", href: "#feedback" }
  ],

  routes: {
    default: [
      ["09:00", "常熟站 / 酒店出发", "智能估算 24 分钟到虞山北门，推荐 P3 停车场。"],
      ["09:35", "虞山文化游线", "琴派文化讲解可用，当前较舒适，建议游玩 90 分钟。"],
      ["11:40", "本帮菜午餐", "推荐老字号餐厅，步行 8 分钟，可提前取号。"],
      ["13:20", "尚湖湿地轻游", "停车余位 214，当前舒适，适合银发慢游。"],
      ["18:00", "古城夜游与美食", "避开沙家浜高峰后回到古城，串联非遗手作和夜市。"]
    ],
    family: [
      ["09:10", "常熟站出发", "优先选择电梯和少步行换乘，先到尚湖游客中心。"],
      ["09:45", "尚湖亲子自然课堂", "当前舒适，安排湿地观察和轻量步道，建议 90 分钟。"],
      ["11:40", "湖畔午餐", "推荐本帮菜和儿童友好餐厅，可提前排号。"],
      ["13:20", "虞山轻徒步", "避开陡坡路线，开启智能讲解和休息点提醒。"],
      ["17:30", "古城夜游", "串联非遗手作、甜品和夜景，停车建议 P1。"]
    ],
    senior: [
      ["09:00", "酒店 / 常熟站出发", "车辆直达虞山北门，优先安排近入口停车。"],
      ["09:35", "虞山琴派文化线", "少台阶路线，讲解可用，当前较舒适。"],
      ["11:30", "本帮菜午餐", "选择包厢和无障碍入口，步行 8 分钟。"],
      ["13:10", "尚湖湿地慢游", "P2 余位充足，推荐观景车和湖边休息点。"],
      ["16:40", "古城茶点", "避开沙家浜高峰，返回古城轻松收尾。"]
    ],
    research: [
      ["08:50", "团队集合", "系统生成研学签到码，车辆进入预约车位。"],
      ["09:40", "沙家浜红色研学", "讲解员预约成功，芦苇荡路线预计 110 分钟。"],
      ["12:00", "团队午餐", "推荐可接待 60 人团队餐厅。"],
      ["14:00", "虞山文化课堂", "接入琴派文化、藏书文化和答题互动。"],
      ["17:10", "研学报告生成", "自动整理打卡照片、问答记录和路线证明。"]
    ]
  },

  plannerMessages: {
    default: "已结合实时客流与停车余位，优先推荐虞山文化线、尚湖慢游和古城夜游。",
    family: "已按亲子周末重排：先安排尚湖自然教育，再串联虞山轻徒步和古城夜游。",
    senior: "已按银发慢游重排：少台阶、近停车、增加休息点，并避开沙家浜高峰。",
    research: "已按红色研学重排：优先沙家浜讲解预约，并生成团队签到和研学报告节点。"
  },

  mapPins: [
    { category: "spot", status: "calm", x: "25%", y: "28%", label: "虞山", title: "虞山景区", detail: "较舒适，讲解可用，北门停车剩余 86 位", crowd: "58 / 100", parking: "86" },
    { category: "spot", status: "open", x: "58%", y: "42%", label: "尚湖", title: "尚湖景区", detail: "舒适，P2 停车剩余 214 位，适合亲子和银发慢游", crowd: "42 / 100", parking: "214" },
    { category: "spot", status: "busy", x: "72%", y: "70%", label: "沙家浜", title: "沙家浜", detail: "较拥挤，演艺预约 15:30 场余票紧张", crowd: "78 / 100", parking: "52" },
    { category: "spot", status: "calm", x: "38%", y: "58%", label: "古城", title: "常熟古城", detail: "较舒适，推荐步行 Citywalk 和非遗手作", crowd: "51 / 100", parking: "1268" },
    { category: "parking", status: "open", x: "18%", y: "45%", label: "P1", title: "虞山北门停车场", detail: "剩余 86 位，步行至入口 6 分钟", crowd: "45 / 100", parking: "86" },
    { category: "parking", status: "open", x: "63%", y: "30%", label: "P2", title: "尚湖 P2 停车场", detail: "剩余 214 位，新能源充电 18 个", crowd: "42 / 100", parking: "214" },
    { category: "parking", status: "busy", x: "81%", y: "62%", label: "P3", title: "沙家浜换乘停车场", detail: "剩余 52 位，建议换乘景区接驳", crowd: "78 / 100", parking: "52" },
    { category: "service", status: "calm", x: "46%", y: "35%", label: "驿站", title: "旅游驿站", detail: "可咨询、饮水、休息、行李寄存", crowd: "30 / 100", parking: "--" },
    { category: "service", status: "open", x: "33%", y: "72%", label: "厕所", title: "公共厕所", detail: "步行 3 分钟，开放中，无障碍厕位可用", crowd: "22 / 100", parking: "--" },
    { category: "food", status: "calm", x: "47%", y: "64%", label: "美食", title: "本帮菜街区", detail: "叫花鸡、蕈油面、桂花酒推荐，当前排队 12 分钟", crowd: "56 / 100", parking: "320" },
    { category: "accessible", status: "open", x: "57%", y: "55%", label: "无障碍", title: "无障碍游线", detail: "坡道、轮椅租借、休息点可用", crowd: "28 / 100", parking: "--" }
  ],

  parkingLots: [
    { code: "P1", lot: "虞山北门停车场", left: 86, walk: "6 分钟", status: "较舒适", extra: "步行 6 分钟" },
    { code: "P2", lot: "尚湖 P2 停车场", left: 214, walk: "8 分钟", status: "舒适", extra: "充电桩 18" },
    { code: "P3", lot: "沙家浜换乘停车场", left: 52, walk: "接驳 4 分钟", status: "较拥挤", extra: "建议接驳" }
  ],

  parkingForecast: {
    "09:00": [60, 45, 40],
    "11:00": [72, 58, 64],
    "13:00": [81, 62, 76],
    "15:00": [86, 70, 88],
    "17:00": [64, 52, 58],
    "19:00": [48, 36, 42]
  },

  guides: [
    { label: "虞山", title: "虞山琴派文化", audio: "03:28", line: "从山门到琴川书院，听琴派故事与古城文脉。" },
    { label: "尚湖", title: "尚湖湿地慢游", audio: "04:12", line: "沿湖心栈道听湿地生态、候鸟与江南水系。" },
    { label: "沙家浜", title: "沙家浜红色研学", audio: "05:06", line: "跟随芦苇荡路线，串联红色记忆和实景演艺。" }
  ],

  ticket: {
    id: "CSWL202607080018",
    title: "尚湖景区 P2 停车场收费疑问",
    statusText: "状态：处理中，预计 30 分钟内反馈。"
  },

  management: [
    { label: "今日游客量", value: "68,420" },
    { label: "停车使用率", value: "63%" },
    { label: "诉求办结率", value: "96.8%" },
    { label: "满意度", value: "4.8 / 5" }
  ],

  activities: [
    { title: "尚湖荷风夜游", tag: "夜游", time: "19:30", place: "尚湖", state: "余票充足" },
    { title: "沙家浜红色实景演艺", tag: "演艺", time: "15:30", place: "沙家浜", state: "余票紧张" },
    { title: "虞山琴派文化体验", tag: "非遗", time: "10:00", place: "虞山", state: "可预约" }
  ],

  plannerFilters: [
    { key: "all", label: "全部" },
    { key: "spot", label: "景点" },
    { key: "heritage", label: "非遗店" },
    { key: "food-shop", label: "美食店" },
    { key: "dish", label: "常熟美食" }
  ],

  plannerSpots: [
    {
      id: "planner-yushan",
      type: "spot",
      name: "虞山景区",
      short: "虞山",
      tag: "山水人文",
      x: 30,
      y: 35,
      image: "assets/scene-yushan.png",
      openTime: "08:00-17:00",
      ticket: "免费，部分景点另行收费",
      crowd: "较舒适 58/100",
      history:
        "虞山是常熟城市文脉的重要象征，山不高而清秀，串联城墙、书院、琴派文化和古城生活。常熟琴派、藏书文化与虞山山水共同构成了江南文人城市的气质。",
      detail:
        "推荐从虞山北门进入，选择少台阶路线串联兴福寺、城墙遗址、琴川书院周边。适合文化讲解、轻徒步和银发慢游。"
    },
    {
      id: "planner-shanghu",
      type: "spot",
      name: "尚湖景区",
      short: "尚湖",
      tag: "湖山湿地",
      x: 58,
      y: 42,
      image: "assets/scene-shanghu.png",
      openTime: "08:10-16:30",
      ticket: "成人票约 80 元，活动票另计",
      crowd: "舒适 42/100",
      history:
        "尚湖因姜太公隐居垂钓传说而闻名，湖面开阔，背靠虞山，是常熟湖山城市格局的重要组成。这里兼具湿地生态、亲子自然教育和湖畔休闲体验。",
      detail:
        "适合亲子、银发和摄影用户。建议优先查看 P2 停车场余位，上午或傍晚体验更舒适。"
    },
    {
      id: "planner-shajiabang",
      type: "spot",
      name: "沙家浜景区",
      short: "沙家浜",
      tag: "红色研学",
      x: 72,
      y: 70,
      image: "assets/scene-shajiabang.png",
      openTime: "08:00-17:00",
      ticket: "成人票约 100 元，演艺另计",
      crowd: "较拥挤 78/100",
      history:
        "沙家浜以芦苇荡、红色记忆和实景演艺闻名，是常熟红色研学和团队游的重要目的地。水乡生态与革命叙事形成了独特的文化场景。",
      detail:
        "建议提前预约讲解和演艺场次。团队游客可使用换乘停车场，避开 13:30-15:30 高峰。"
    },
    {
      id: "planner-fangta",
      type: "spot",
      name: "方塔园",
      short: "方塔",
      tag: "古城园林",
      x: 42,
      y: 55,
      image: "assets/scene-shanghu.png",
      openTime: "08:00-16:30",
      ticket: "约 30 元",
      crowd: "舒适 35/100",
      history:
        "方塔园位于常熟古城，是城市历史肌理中的代表性园林空间。方塔与古城街巷、老字号餐饮、非遗体验可组成半日 Citywalk。",
      detail:
        "适合与古城美食、非遗体验组合。步行体验最佳，停车建议选择外围停车场。"
    },
    {
      id: "planner-qinpai",
      type: "heritage",
      name: "虞山琴派体验馆",
      short: "琴派",
      tag: "非遗体验",
      x: 37,
      y: 40,
      image: "assets/scene-yushan.png",
      openTime: "09:30-17:00",
      ticket: "体验课 68 元起",
      crowd: "较舒适 46/100",
      history:
        "虞山琴派是常熟重要的非遗文化符号，强调清微淡远的审美与江南文人气质。体验馆可提供古琴聆听、入门讲解和文化研学。",
      detail:
        "适合放在虞山文化线中段，体验时长 40-60 分钟。建议提前预约小班体验。"
    },
    {
      id: "planner-blueprint",
      type: "heritage",
      name: "蓝印花布手作店",
      short: "蓝印",
      tag: "非遗手作",
      x: 49,
      y: 62,
      image: "assets/hero-changshu.png",
      openTime: "10:00-20:00",
      ticket: "手作体验 58 元起",
      crowd: "舒适 38/100",
      history:
        "蓝印花布以靛蓝和白色纹样构成江南日用美学，是水乡生活与民间工艺结合的代表。游客可完成拓印、染布和文创制作。",
      detail:
        "适合古城 Citywalk 与亲子路线，可与方塔园和老字号餐饮组合。"
    },
    {
      id: "planner-wangsi",
      type: "food-shop",
      name: "王四酒家",
      short: "王四",
      tag: "叫花鸡老店",
      x: 45,
      y: 66,
      image: "assets/scene-shanghu.png",
      heat: "热门，预计排队 18 分钟",
      review:
        "游客点评：叫花鸡外皮香、肉质嫩，适合家庭聚餐；高峰时段建议提前取号，停车建议选择古城外围。",
      detail:
        "适合加入午餐或晚餐节点。若用户选择银发慢游，系统会优先推荐包厢和少步行路线。"
    },
    {
      id: "planner-mian",
      type: "food-shop",
      name: "常吉兴面馆",
      short: "面馆",
      tag: "蕈油面",
      x: 53,
      y: 58,
      image: "assets/scene-yushan.png",
      heat: "较热，预计排队 10 分钟",
      review:
        "游客点评：蕈油香气突出，适合作为古城早午餐；店面不大，错峰体验更舒服。",
      detail:
        "建议安排在古城 Citywalk 起点或虞山下山后的补给节点。"
    },
    {
      id: "planner-jiaohuaji",
      type: "dish",
      name: "常熟叫花鸡",
      short: "叫花鸡",
      tag: "地方名菜",
      x: 63,
      y: 60,
      image: "assets/scene-shanghu.png",
      history:
        "叫花鸡是常熟代表性美食之一，以荷叶、泥封、焖烤等工艺形成独特香气。它不仅是菜品，也承载了江南饮食故事和城市记忆。",
      detail:
        "适合与古城、尚湖、虞山路线组合。推荐午餐或晚餐食用，团队游客建议提前预订。"
    },
    {
      id: "planner-xunyoumian",
      type: "dish",
      name: "蕈油面",
      short: "蕈油面",
      tag: "季节风味",
      x: 40,
      y: 70,
      image: "assets/hero-changshu.png",
      history:
        "蕈油面以菌菇香味见长，是常熟本帮风味中很有记忆点的一类面食。它适合用作轻量餐饮节点，连接古城街巷和本地生活。",
      detail:
        "适合上午或午餐安排。若路线偏轻松，系统会把它作为低耗时美食补给。"
    }
  ],

  plannerAgentRoutes: [
    {
      id: "classic",
      name: "经典湖山古城一日",
      ids: ["planner-yushan", "planner-qinpai", "planner-mian", "planner-shanghu", "planner-fangta", "planner-wangsi"],
      reason: "平衡文化、湖山、非遗和本帮美食，适合首次到常熟的游客。"
    },
    {
      id: "slow",
      name: "银发少步行慢游",
      ids: ["planner-shanghu", "planner-blueprint", "planner-wangsi", "planner-fangta"],
      reason: "减少步行和爬坡，优先停车方便、休息点多的点位。"
    },
    {
      id: "food",
      name: "古城非遗美食线",
      ids: ["planner-fangta", "planner-blueprint", "planner-xunyoumian", "planner-mian", "planner-jiaohuaji"],
      reason: "把古城街巷、非遗手作和本地美食串成半日 Citywalk。"
    },
    {
      id: "random",
      name: "P 人随性路线",
      ids: ["planner-shanghu", "planner-mian", "planner-blueprint", "planner-yushan"],
      reason: "少做决定，先去舒适度高的点位，再根据心情补充美食和非遗。"
    }
  ]
};
