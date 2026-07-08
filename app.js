const DATA = window.CHANGSHU_DATA || {};

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));

const fallbackRoutes = {
  default: [["09:00", "常熟站 / 酒店出发", "系统正在加载路线数据，请稍后刷新。"]]
};

const routeTemplates = DATA.routes || fallbackRoutes;
const plannerMessages = DATA.plannerMessages || {
  default: "已结合实时客流与停车余位，生成推荐行程。"
};

function setChildren(parent, children) {
  if (!parent) return;
  parent.replaceChildren(...children);
}

function makeEl(tag, className, text) {
  const el = document.createElement(tag);
  if (className) el.className = className;
  if (text !== undefined) el.textContent = text;
  return el;
}

function renderQuickTags() {
  const host = $(".quick-tags");
  if (!host || !Array.isArray(DATA.quickTags)) return;
  setChildren(
    host,
    DATA.quickTags.map((item) => {
      const button = makeEl("button", "", item.label);
      button.type = "button";
      button.dataset.prompt = item.prompt;
      return button;
    })
  );
}

function renderHeroStats() {
  const host = $("#heroStats");
  if (!host || !Array.isArray(DATA.heroStats)) return;
  setChildren(
    host,
    DATA.heroStats.map((item) => {
      const article = document.createElement("article");
      article.append(makeEl("b", "", item.value), makeEl("span", "", item.label));
      return article;
    })
  );
}

function renderFeaturedPlaces() {
  const host = $("#featuredPlaces");
  if (!host || !Array.isArray(DATA.featuredPlaces)) return;
  setChildren(
    host,
    DATA.featuredPlaces.map((item, index) => {
      const card = makeEl("button", `place-card${index === 0 ? " active" : ""}`);
      card.type = "button";
      card.dataset.prompt = item.prompt;
      card.dataset.key = item.key;
      card.style.setProperty("--place-image", `url("${item.image}")`);
      const meta = makeEl("div", "place-meta");
      meta.append(
        makeEl("i", "", item.crowd),
        makeEl("i", "", `P ${item.parking}`),
        makeEl("i", "", item.duration)
      );
      card.append(makeEl("span", "", "推荐目的地"), makeEl("strong", "", item.title), makeEl("small", "", item.subtitle), meta);
      return card;
    })
  );
}

function renderTodayStatus() {
  const updated = $(".card-head strong");
  if (updated && DATA.updatedAt) updated.textContent = DATA.updatedAt;

  const host = $(".status-list");
  if (host && Array.isArray(DATA.todayStatus)) {
    setChildren(
      host,
      DATA.todayStatus.map((item) => {
        const article = document.createElement("article");
        article.append(makeEl("span", "", item.name));
        const value = makeEl("strong", item.status === "plain" ? "" : `status status-${item.status}`, item.value);
        article.append(value);
        return article;
      })
    );
  }

  const note = $(".ai-note");
  if (note && DATA.todayAdvice) {
    const title = makeEl("b", "", "避峰建议");
    note.replaceChildren(title, document.createTextNode(DATA.todayAdvice));
  }
}

function renderServices() {
  const host = $(".service-strip");
  if (!host || !Array.isArray(DATA.services)) return;
  setChildren(
    host,
    DATA.services.map((item) => {
      const link = document.createElement("a");
      link.href = item.href;
      link.append(makeEl("span", "", item.icon), document.createTextNode(item.name));
      return link;
    })
  );
}

function renderTimeline(type = "default") {
  const timeline = $("#timeline");
  if (!timeline) return;
  const route = routeTemplates[type] || routeTemplates.default || fallbackRoutes.default;
  timeline.innerHTML = route
    .map(
      ([time, title, desc]) => `
        <li>
          <time>${time}</time>
          <div>
            <strong>${title}</strong>
            <span>${desc}</span>
          </div>
        </li>`
    )
    .join("");
}

function renderTripModes() {
  const host = $("#tripModes");
  if (!host || !Array.isArray(DATA.tripModes)) return;
  setChildren(
    host,
    DATA.tripModes.map((item, index) => {
      const button = makeEl("button", `mode-card${index === 0 ? " active" : ""}`);
      button.type = "button";
      button.dataset.type = item.type;
      button.append(makeEl("strong", "", item.label), makeEl("small", "", item.desc));
      return button;
    })
  );
}

function renderRouteMetrics(type = "default") {
  const host = $("#routeMetrics");
  if (!host) return;
  const data = DATA.routeMetrics?.[type] || DATA.routeMetrics?.default || [];
  setChildren(
    host,
    data.map((item) => {
      const article = document.createElement("article");
      article.append(makeEl("span", "", item.label), makeEl("b", "", item.value));
      return article;
    })
  );
}

function renderMapPins() {
  const cityMap = $(".city-map");
  if (!cityMap || !Array.isArray(DATA.mapPins)) return;
  $$(".map-pin", cityMap).forEach((pin) => pin.remove());
  DATA.mapPins.forEach((item) => {
    const pin = makeEl("button", `map-pin ${item.category} ${item.status}`, item.label);
    pin.type = "button";
    pin.dataset.category = item.category;
    pin.dataset.title = item.title;
    pin.dataset.detail = item.detail;
    pin.dataset.crowd = item.crowd || "--";
    pin.dataset.parking = item.parking || "--";
    pin.style.setProperty("--x", item.x);
    pin.style.setProperty("--y", item.y);
    cityMap.append(pin);
  });
}

function renderParkingLots() {
  const host = $("#parkingList");
  if (!host || !Array.isArray(DATA.parkingLots)) return;
  const cards = DATA.parkingLots.map((item, index) => {
    const card = makeEl("button", `parking-card${index === 0 ? " active" : ""}`);
    card.type = "button";
    card.dataset.lot = item.lot;
    card.dataset.left = item.left;
    card.dataset.walk = item.walk;
    card.dataset.status = item.status;
    card.append(
      makeEl("span", "", item.code),
      makeEl("strong", "", item.lot),
      makeEl("small", "", `余位 ${item.left} · ${item.extra}`)
    );
    return card;
  });
  setChildren(host, cards);

  const total = DATA.parkingLots.reduce((sum, item) => sum + Number(item.left || 0), 0);
  const totalEl = $(".kpi-grid strong[data-count]");
  if (totalEl) {
    totalEl.dataset.count = String(total);
    totalEl.textContent = String(total);
  }
}

function renderParkingTimes() {
  const host = $("#parkingTimes");
  const forecastHost = $(".forecast-bars");
  const forecast = DATA.parkingForecast || {};
  const times = Object.keys(forecast);
  if (!host || !times.length) return;

  setChildren(
    host,
    times.map((time, index) => {
      const button = makeEl("button", index === 0 ? "active" : "", time);
      button.type = "button";
      button.dataset.time = time;
      return button;
    })
  );

  if (forecastHost) {
    setChildren(
      forecastHost,
      times.map((time, index) => {
        const values = forecast[time] || [];
        const average = values.length ? Math.round(values.reduce((sum, value) => sum + value, 0) / values.length) : 40;
        const span = document.createElement("span");
        span.dataset.time = time;
        span.className = index === 0 ? "active" : "";
        span.style.setProperty("--h", `${Math.max(24, Math.min(92, average))}%`);
        span.append(makeEl("b", "", time));
        return span;
      })
    );
  }
}

function renderGuides() {
  const host = $(".guide-tabs");
  if (!host || !Array.isArray(DATA.guides)) return;
  setChildren(
    host,
    DATA.guides.map((item, index) => {
      const tab = makeEl("button", `guide-tab${index === 0 ? " active" : ""}`, item.label);
      tab.type = "button";
      tab.dataset.guide = item.title;
      tab.dataset.audio = item.audio;
      tab.dataset.line = item.line;
      return tab;
    })
  );

  const first = DATA.guides[0];
  if (first) {
    $("#guideTitle").textContent = first.title;
    $("#guideLine").textContent = first.line;
    $("#audioTime").textContent = `播放 ${first.audio}`;
  }
}

function renderGuideCheckpoints(guideTitle = DATA.guides?.[0]?.title || "景区讲解") {
  const host = $("#guideCheckpoints");
  if (!host) return;
  const prefix = guideTitle.slice(0, 2);
  const items = [`${prefix}入口`, "文化节点", "休息补给"];
  setChildren(host, items.map((item) => makeEl("span", "", item)));
}

function renderTicketAndManagement() {
  if (DATA.ticket) {
    $("#ticketId").textContent = DATA.ticket.id;
    $("#ticketTitle").textContent = DATA.ticket.title;
    $("#ticketStatusText").textContent = DATA.ticket.statusText;
  }

  const host = $(".manager-grid");
  if (host && Array.isArray(DATA.management)) {
    setChildren(
      host,
      DATA.management.map((item) => {
        const article = document.createElement("article");
        article.append(makeEl("b", "", item.label), makeEl("span", "", item.value));
        return article;
      })
    );
  }
}

function renderDataDrivenSections() {
  renderHeroStats();
  renderQuickTags();
  renderFeaturedPlaces();
  renderTodayStatus();
  renderServices();
  renderTimeline("default");
  renderTripModes();
  renderRouteMetrics("default");
  renderMapPins();
  renderParkingLots();
  renderParkingTimes();
  renderGuides();
  renderGuideCheckpoints();
  renderTicketAndManagement();
}

function inferPlanType(text) {
  const value = text || "";
  if (value.includes("亲子") || value.includes("孩子")) return "family";
  if (value.includes("父母") || value.includes("老人") || value.includes("银发") || value.includes("少走路")) return "senior";
  if (value.includes("研学") || value.includes("红色") || value.includes("团队")) return "research";
  return "default";
}

function generatePlanFromText(text) {
  const type = inferPlanType(text);
  renderTimeline(type);
  renderRouteMetrics(type);
  $$(".mode-card").forEach((card) => card.classList.toggle("active", card.dataset.type === type));
  const plannerMessage = $("#plannerMessage");
  if (plannerMessage) plannerMessage.textContent = plannerMessages[type] || plannerMessages.default;
}

function bindPlanner() {
  const heroPlanner = $("#heroPlanner");
  const heroPrompt = $("#heroPrompt");
  const refinePrompt = $("#refinePrompt");

  heroPlanner?.addEventListener("submit", (event) => {
    event.preventDefault();
    const prompt = heroPrompt.value.trim();
    if (refinePrompt && prompt) refinePrompt.value = prompt;
    generatePlanFromText(prompt);
    $("#itinerary")?.scrollIntoView({ behavior: "smooth", block: "start" });
  });

  $$(".quick-tags button").forEach((button) => {
    button.addEventListener("click", () => {
      const prompt = button.dataset.prompt || button.textContent;
      heroPrompt.value = prompt;
      if (refinePrompt) refinePrompt.value = prompt;
    });
  });

  $$(".place-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".place-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      const prompt = card.dataset.prompt || card.textContent;
      heroPrompt.value = prompt;
      if (refinePrompt) refinePrompt.value = prompt;
      generatePlanFromText(prompt);
    });
  });

  $$(".mode-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".mode-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      const type = card.dataset.type || "default";
      renderTimeline(type);
      renderRouteMetrics(type);
      const plannerMessage = $("#plannerMessage");
      if (plannerMessage) plannerMessage.textContent = plannerMessages[type] || plannerMessages.default;
    });
  });

  $("#refreshPlan")?.addEventListener("click", () => {
    const traveler = $("#travelerType")?.value || "";
    generatePlanFromText(`${traveler} ${refinePrompt?.value || ""}`);
  });

  $$("[data-refine]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!refinePrompt) return;
      const refine = button.dataset.refine;
      refinePrompt.value = `${refinePrompt.value.replace(/。$/, "")}，${refine}。`;
      generatePlanFromText(refinePrompt.value);
    });
  });
}

function bindMap() {
  const filterButtons = $$(".filter-button");
  let mapPins = $$(".map-pin");
  const pinTitle = $("#pinTitle");
  const pinDetail = $("#pinDetail");
  const metricValues = $$(".map-inspector .metric-row b");
  const cityMap = $(".city-map");

  function updatePinVisibility() {
    const active = new Set(filterButtons.filter((button) => button.classList.contains("active")).map((button) => button.dataset.filter));
    const showAll = active.has("all");
    mapPins.forEach((pin) => {
      const visible = showAll || active.has(pin.dataset.category);
      pin.classList.toggle("hidden", !visible);
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.dataset.filter === "all") {
        const shouldActivate = !button.classList.contains("active");
        filterButtons.forEach((item) => item.classList.toggle("active", shouldActivate));
      } else {
        button.classList.toggle("active");
        $(".filter-button[data-filter='all']")?.classList.remove("active");
      }
      const activeSpecific = filterButtons.some((item) => item.dataset.filter !== "all" && item.classList.contains("active"));
      if (!activeSpecific) filterButtons.forEach((item) => item.classList.add("active"));
      updatePinVisibility();
    });
  });

  mapPins.forEach((pin) => {
    pin.addEventListener("click", () => {
      mapPins.forEach((item) => item.classList.remove("selected"));
      pin.classList.add("selected");
      if (pinTitle) pinTitle.textContent = pin.dataset.title || pin.textContent;
      if (pinDetail) pinDetail.textContent = pin.dataset.detail || "暂无详情。";
      if (metricValues[0]) metricValues[0].textContent = pin.dataset.crowd || "--";
      if (metricValues[1]) metricValues[1].textContent = pin.dataset.parking || "--";
    });
  });

  const defaultPin = mapPins.find((pin) => pin.dataset.title === "尚湖景区") || mapPins[0];
  defaultPin?.classList.add("selected");

  $$(".layer-dock button").forEach((button) => {
    button.addEventListener("click", () => {
      button.classList.toggle("active");
      if (!cityMap) return;
      const layer = button.dataset.layer;
      const disabled = !button.classList.contains("active");
      if (layer === "heat") cityMap.classList.toggle("layer-no-heat", disabled);
      if (layer === "parking") cityMap.classList.toggle("layer-no-parking", disabled);
      if (layer === "service") cityMap.classList.toggle("layer-no-service", disabled);
    });
  });
}

function bindParking() {
  const lotSummary = $("#lotSummary");
  $$(".parking-card").forEach((card) => {
    card.addEventListener("click", () => {
      $$(".parking-card").forEach((item) => item.classList.remove("active"));
      card.classList.add("active");
      const { lot, left, walk, status } = card.dataset;
      if (lotSummary) {
        lotSummary.textContent = `${lot}剩余 ${left} 位，步行或接驳到入口约 ${walk}，当前${status}。`;
      }
    });
  });

  $$("#parkingTimes button").forEach((button) => {
    button.addEventListener("click", () => {
      $$("#parkingTimes button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      $$(".forecast-bars span").forEach((item) => item.classList.toggle("active", item.dataset.time === button.dataset.time));
      const values = DATA.parkingForecast?.[button.dataset.time] || [];
      const lots = DATA.parkingLots || [];
      const maxIndex = values.indexOf(Math.max(...values));
      const lot = lots[maxIndex] || lots[0];
      const peak = values[maxIndex] || 0;
      if (lotSummary && lot) {
        lotSummary.textContent = `${button.dataset.time} 预测 ${lot.lot} 使用率约 ${peak}%，建议优先查看余位更充足的停车场。`;
      }
    });
  });
}

function bindGuides() {
  const guideTitle = $("#guideTitle");
  const guideLine = $("#guideLine");
  const audioTime = $("#audioTime");
  $$(".guide-tab").forEach((tab) => {
    tab.addEventListener("click", () => {
      $$(".guide-tab").forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
      if (guideTitle) guideTitle.textContent = tab.dataset.guide || tab.textContent;
      if (guideLine) guideLine.textContent = tab.dataset.line || "";
      if (audioTime) audioTime.textContent = `播放 ${tab.dataset.audio || "03:28"}`;
      renderGuideCheckpoints(tab.dataset.guide || tab.textContent);
    });
  });

  audioTime?.addEventListener("click", () => {
    const card = audioTime.closest(".audio-card");
    const playing = !card?.classList.contains("playing");
    card?.classList.toggle("playing", playing);
    audioTime.textContent = playing ? "暂停讲解" : `播放 ${$(".guide-tab.active")?.dataset.audio || "03:28"}`;
  });
}

function bindTickets() {
  let ticketStep = 2;
  const updateSteps = () => {
    $$(".flow-steps span").forEach((step, index) => {
      step.classList.toggle("done", index < ticketStep);
      step.classList.toggle("active", index === ticketStep);
    });
  };

  $("#ticketForm")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const issueType = $("#issueType")?.value || "游客诉求";
    const place = $("#issuePlace")?.value || "常熟文旅点位";
    const id = `CSWL${new Date().getFullYear()}0708${String(Math.floor(Math.random() * 900) + 100).padStart(3, "0")}`;
    $("#ticketId").textContent = id;
    $("#ticketTitle").textContent = `${place}${issueType}`;
    $("#ticketStatusText").textContent = "状态：已提交并完成智能分类，正在派单至责任部门。";
    ticketStep = 2;
    updateSteps();
  });

  $("#advanceTicket")?.addEventListener("click", () => {
    ticketStep = Math.min(ticketStep + 1, $$(".flow-steps span").length - 1);
    updateSteps();
    const labels = ["已提交", "智能分类", "部门派单", "处理中", "已办结", "游客评价"];
    $("#ticketStatusText").textContent = `状态：${labels[ticketStep]}，系统已同步最新进度。`;
  });

  $("#resetTicket")?.addEventListener("click", () => {
    ticketStep = 2;
    updateSteps();
    if (DATA.ticket) $("#ticketStatusText").textContent = DATA.ticket.statusText;
  });
}

const plannerState = {
  activeFilter: "all",
  activeSpotId: null,
  selectedIds: [],
  dragId: null,
  mode: "j"
};

const plannerTypeLabels = {
  spot: "景点",
  heritage: "非遗店",
  "food-shop": "美食店",
  dish: "常熟美食"
};

function getPlannerSpots() {
  return Array.isArray(DATA.plannerSpots) ? DATA.plannerSpots : [];
}

function findPlannerSpot(id) {
  return getPlannerSpots().find((spot) => spot.id === id);
}

function getPlannerFacts(spot) {
  if (spot.type === "spot" || spot.type === "heritage") {
    return [`开放 ${spot.openTime}`, `门票 ${spot.ticket}`, `人流 ${spot.crowd}`];
  }
  if (spot.type === "food-shop") {
    return [spot.heat, "游客点评", spot.tag];
  }
  return ["历史简介", spot.tag, "推荐加入路线"];
}

function getPlannerSummary(spot) {
  if (spot.type === "food-shop") return spot.review;
  return spot.history;
}

function renderPlannerFilters() {
  const host = $("#plannerFilters");
  if (!host) return;
  const filters = DATA.plannerFilters || [
    { key: "all", label: "全部" },
    { key: "spot", label: "景点" },
    { key: "heritage", label: "非遗店" },
    { key: "food-shop", label: "美食店" },
    { key: "dish", label: "常熟美食" }
  ];

  setChildren(
    host,
    filters.map((filter) => {
      const button = makeEl("button", filter.key === plannerState.activeFilter ? "active" : "", filter.label);
      button.type = "button";
      button.dataset.plannerFilter = filter.key;
      button.addEventListener("click", () => {
        plannerState.activeFilter = filter.key;
        renderPlannerFilters();
        renderPlannerPins();
      });
      return button;
    })
  );
}

function renderPlannerPins(searchValue = $("#plannerSearch")?.value || "") {
  const host = $("#plannerPins");
  if (!host) return;
  const keyword = searchValue.trim().toLowerCase();
  const pins = getPlannerSpots().map((spot) => {
    const matchesFilter = plannerState.activeFilter === "all" || spot.type === plannerState.activeFilter;
    const matchesSearch =
      !keyword ||
      spot.name.toLowerCase().includes(keyword) ||
      spot.short.toLowerCase().includes(keyword) ||
      spot.tag.toLowerCase().includes(keyword);
    const button = makeEl(
      "button",
      `planner-pin ${spot.type}${plannerState.activeSpotId === spot.id ? " selected" : ""}${matchesFilter && matchesSearch ? "" : " hidden"}`,
      spot.short
    );
    button.type = "button";
    button.title = spot.name;
    button.dataset.id = spot.id;
    button.style.setProperty("--x", spot.x);
    button.style.setProperty("--y", spot.y);
    button.addEventListener("click", () => selectPlannerSpot(spot.id));
    return button;
  });
  setChildren(host, pins);
}

function createPlannerCard(spot, compact = false) {
  const card = makeEl("article", compact ? "planner-route-item" : "planner-place-card");
  card.dataset.id = spot.id;
  card.draggable = !compact;

  if (compact) {
    const index = makeEl("span", "planner-route-index", String(plannerState.selectedIds.indexOf(spot.id) + 1).padStart(2, "0"));
    const body = makeEl("div", "planner-route-body");
    body.innerHTML = `
      <h3>${spot.name}</h3>
      <p>${plannerTypeLabels[spot.type]} · ${spot.tag}</p>
      <div class="planner-route-detail">
        <strong>${spot.type === "food-shop" ? "店铺点评" : "历史简介"}</strong>
        <span>${getPlannerSummary(spot)}</span>
        <strong>更具体的介绍</strong>
        <span>${spot.detail}</span>
      </div>
    `;
    const remove = makeEl("button", "planner-remove", "×");
    remove.type = "button";
    remove.setAttribute("aria-label", `从路线中移除 ${spot.name}`);
    remove.addEventListener("click", () => removePlannerSpot(spot.id));
    card.append(index, body, remove);
    card.addEventListener("dblclick", () => card.classList.toggle("expanded"));
    return card;
  }

  const image = makeEl("div", "planner-card-image");
  image.style.setProperty("--card-image", `url("${spot.image}")`);
  const facts = getPlannerFacts(spot).map((fact) => `<span>${fact}</span>`).join("");
  const body = makeEl("div", "planner-card-body");
  body.innerHTML = `
    <span class="planner-type-label">${plannerTypeLabels[spot.type]} · ${spot.tag}</span>
    <h3>${spot.name}</h3>
    <p>${getPlannerSummary(spot)}</p>
    <div class="planner-card-facts">${facts}</div>
    <div class="planner-inline-detail">
      <h4>${spot.type === "food-shop" ? "店铺点评" : spot.type === "dish" ? "美食历史简介" : "景点历史简介"}</h4>
      <p>${getPlannerSummary(spot)}</p>
      <h4>更具体的介绍</h4>
      <p>${spot.detail}</p>
      <h4>规划建议</h4>
      <p>拖入右侧卡槽后，系统会在地图上绘制路线。J 人可以自行排序，P 人可以先让 Agent 生成再微调。</p>
    </div>
  `;
  const actions = makeEl("div", "planner-card-actions");
  const add = makeEl("button", "", "加入路线");
  add.type = "button";
  add.addEventListener("click", () => addPlannerSpot(spot.id));
  const detail = makeEl("button", "planner-detail-button", "展开详情");
  detail.type = "button";
  detail.addEventListener("click", () => togglePlannerCard(card, detail));
  actions.append(add, detail);

  card.append(image, body, actions);
  card.addEventListener("dragstart", (event) => {
    plannerState.dragId = spot.id;
    event.dataTransfer.setData("text/plain", spot.id);
    event.dataTransfer.effectAllowed = "copy";
  });
  card.addEventListener("dblclick", () => togglePlannerCard(card, detail));
  return card;
}

function togglePlannerCard(card, button) {
  card.classList.toggle("expanded");
  if (button) button.textContent = card.classList.contains("expanded") ? "收起详情" : "展开详情";
}

function selectPlannerSpot(id) {
  const spot = findPlannerSpot(id);
  const shelf = $("#plannerCardShelf");
  if (!spot || !shelf) return;
  plannerState.activeSpotId = id;
  renderPlannerPins();
  setChildren(shelf, [createPlannerCard(spot)]);
}

function addPlannerSpot(id) {
  if (!findPlannerSpot(id)) return;
  if (!plannerState.selectedIds.includes(id)) plannerState.selectedIds.push(id);
  renderPlannerPlan();
}

function removePlannerSpot(id) {
  plannerState.selectedIds = plannerState.selectedIds.filter((item) => item !== id);
  renderPlannerPlan();
}

function plannerPlanType() {
  const types = plannerState.selectedIds.map((id) => findPlannerSpot(id)?.type).filter(Boolean);
  if (!types.length) return "待规划";
  if (types.includes("heritage") && types.includes("food-shop")) return "非遗美食线";
  if (types.includes("spot") && plannerState.selectedIds.length >= 4) return "全域游线";
  if (types.every((type) => type === "dish" || type === "food-shop")) return "美食线";
  return "自定义路线";
}

function renderPlannerPlan() {
  const zone = $("#plannerDropZone");
  if (!zone) return;

  if (!plannerState.selectedIds.length) {
    zone.innerHTML = `
      <div class="planner-empty">
        <strong>把卡片拖进来</strong>
        <span>也可以切到 P 人，让 Agent 自动生成。</span>
      </div>
    `;
  } else {
    setChildren(
      zone,
      plannerState.selectedIds
        .map(findPlannerSpot)
        .filter(Boolean)
        .map((spot) => createPlannerCard(spot, true))
    );
  }

  const count = $("#plannerPlanCount");
  const duration = $("#plannerDuration");
  const type = $("#plannerType");
  if (count) count.textContent = `${plannerState.selectedIds.length} 个点`;
  if (duration) duration.textContent = plannerState.selectedIds.length ? `${Math.max(2, plannerState.selectedIds.length * 1.2).toFixed(1)}h` : "--";
  if (type) type.textContent = plannerPlanType();
  drawPlannerRoute();
}

function drawPlannerRoute() {
  const path = $("#plannerRoutePath");
  if (!path) return;
  if (plannerState.selectedIds.length < 2) {
    path.setAttribute("d", "");
    return;
  }
  const points = plannerState.selectedIds
    .map(findPlannerSpot)
    .filter(Boolean)
    .map((spot) => [spot.x * 10, spot.y * 7]);
  const [first, ...rest] = points;
  const d = [`M ${first[0]} ${first[1]}`];
  rest.forEach(([x, y]) => d.push(`L ${x} ${y}`));
  path.setAttribute("d", d.join(" "));
}

function renderPlannerAgentRoute(route) {
  plannerState.selectedIds = route.ids.filter((id) => findPlannerSpot(id));
  const note = $("#plannerAgentNote");
  if (note) note.textContent = `${route.name}：${route.reason}`;
  renderPlannerPlan();
}

function bindPlannerWorkbench() {
  $("#plannerSearch")?.addEventListener("input", (event) => renderPlannerPins(event.target.value));

  $$(".planner-segments button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".planner-segments button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      plannerState.mode = button.dataset.plannerMode || "j";
      const isManual = plannerState.mode === "j";
      $("#plannerModeLabel").textContent = isManual ? "J 人手动规划" : "P 人 Agent 规划";
      $("#plannerModeHint").textContent = isManual
        ? "J 人模式：你自己点击点位、查看卡片、拖进右侧卡槽组织路线。"
        : "P 人模式：Agent 会按主题、舒适度和停车情况生成路线，你也可以继续拖拽微调。";
      if (!isManual) {
        const route = DATA.plannerAgentRoutes?.find((item) => item.id === "random") || DATA.plannerAgentRoutes?.[0];
        if (route) renderPlannerAgentRoute(route);
      }
    });
  });

  $$(".planner-map-toolbar button").forEach((button) => {
    button.addEventListener("click", () => {
      $$(".planner-map-toolbar button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      const view = button.dataset.plannerView;
      if (view === "old-town") plannerState.activeFilter = "food-shop";
      if (view === "lake") plannerState.activeFilter = "spot";
      if (view === "study") plannerState.activeFilter = "heritage";
      if (view === "all") plannerState.activeFilter = "all";
      renderPlannerFilters();
      renderPlannerPins();
    });
  });

  const zone = $("#plannerDropZone");
  zone?.addEventListener("dragover", (event) => {
    event.preventDefault();
    zone.classList.add("drag-over");
  });
  zone?.addEventListener("dragleave", () => zone.classList.remove("drag-over"));
  zone?.addEventListener("drop", (event) => {
    event.preventDefault();
    zone.classList.remove("drag-over");
    const id = event.dataTransfer.getData("text/plain") || plannerState.dragId;
    if (id) addPlannerSpot(id);
  });

  $("#plannerAgentPlan")?.addEventListener("click", () => {
    const routes = DATA.plannerAgentRoutes || [];
    const route = routes[Math.floor(Math.random() * routes.length)];
    if (route) renderPlannerAgentRoute(route);
  });

  $("#plannerClearPlan")?.addEventListener("click", () => {
    plannerState.selectedIds = [];
    const note = $("#plannerAgentNote");
    if (note) note.textContent = "已清空路线。";
    renderPlannerPlan();
  });

  $("#plannerExport")?.addEventListener("click", () => {
    const note = $("#plannerAgentNote");
    if (!plannerState.selectedIds.length) {
      if (note) note.textContent = "请先拖入至少一个点位。";
      return;
    }
    const names = plannerState.selectedIds.map((id) => findPlannerSpot(id)?.name).filter(Boolean).join(" → ");
    if (note) note.textContent = `已生成路书：${names}`;
  });
}

function initPlannerWorkbench() {
  if (!$("#plan-map")) return;
  renderPlannerFilters();
  renderPlannerPins();
  renderPlannerPlan();
  bindPlannerWorkbench();
  const firstSpot = getPlannerSpots()[0];
  if (firstSpot) selectPlannerSpot(firstSpot.id);
}

function bindScrollMotion() {
  const revealEls = $$(".reveal");
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.18 }
    );
    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  const navLinks = $$(".main-nav a");
  const railLinks = $$(".scroll-rail a");
  const storySections = $$(".story-page");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const key = entry.target.dataset.section;
          navLinks.forEach((link) => {
            link.classList.toggle("active", link.getAttribute("href") === `#${key}`);
          });
          railLinks.forEach((link) => {
            link.classList.toggle("active", link.dataset.rail === key);
          });
        });
      },
      { threshold: 0.48 }
    );
    storySections.forEach((section) => sectionObserver.observe(section));
  }

  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (ticking) return;
      window.requestAnimationFrame(() => {
        const heroBg = $(".hero-bg");
        if (heroBg) {
          const shift = Math.min(window.scrollY * 0.08, 32);
          heroBg.style.transform = `translateY(${shift}px) scale(1.04)`;
        }
        ticking = false;
      });
      ticking = true;
    },
    { passive: true }
  );

  window.addEventListener("load", () => {
    revealEls.slice(0, 3).forEach((el) => el.classList.add("visible"));
    const target = window.location.hash ? $(window.location.hash) : null;
    target?.querySelectorAll(".reveal").forEach((el) => el.classList.add("visible"));
  });
}

renderDataDrivenSections();
initPlannerWorkbench();
bindPlanner();
bindMap();
bindParking();
bindGuides();
bindTickets();
bindScrollMotion();
