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
bindPlanner();
bindMap();
bindParking();
bindGuides();
bindTickets();
bindScrollMotion();
