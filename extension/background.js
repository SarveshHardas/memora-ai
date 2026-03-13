const DEFAULT_SITES = [
  "facebook.com",
  "twitter.com",
  "instagram.com",
  "linkedin.com",
  "youtube.com",
  "tiktok.com",
  "reddit.com",
];

let isTracking = false;
let timer = null;
let trackingEndTime = null;
let sendQueue = [];
let isSending = false;
const API_URL = "http://localhost:3000/extension/content";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.get(["allowedSites"], (data) => {
    if (!data.allowedSites) {
      chrome.storage.sync.set({ allowedSites: DEFAULT_SITES });
    }
  });
});

(async () => {
  const data = await chrome.storage.local.get(["sendQueue"]);
  sendQueue = data.sendQueue || [];
  const { isTracking: t, trackingEndTime: end, durationMinutes } = await chrome.storage.sync.get([
    "isTracking",
    "trackingEndTime",
    "durationMinutes",
  ]);
  if (t && end > Date.now()) {
    const remaining = (end - Date.now()) / 1000 / 60;
    startTracking(remaining);
  }
  processQueue();
})();

function startTracking(durationMinutes = 60) {
  isTracking = true;
  trackingEndTime = Date.now() + durationMinutes * 60 * 1000;
  chrome.storage.sync.set({ isTracking, trackingEndTime, durationMinutes });
  console.log(`✅ Tracking started for ${durationMinutes.toFixed(1)} minutes`);
  clearTimeout(timer);
  timer = setTimeout(() => {
    stopTracking();
    showExtendNotification();
  }, durationMinutes * 60 * 1000);
}

function stopTracking() {
  isTracking = false;
  clearTimeout(timer);
  chrome.storage.sync.set({ isTracking: false });
  console.log("🛑 Tracking stopped");
}

function showExtendNotification() {
  chrome.notifications.create("trackingPauseNotif", {
    type: "basic",
    iconUrl: "icons/icon48.png",
    title: "Tracking Paused",
    message: "Do you want to extend tracking for another hour?",
    buttons: [{ title: "Extend 1 hour" }, { title: "Stop" }],
    priority: 1,
  });
}

chrome.notifications.onButtonClicked.addListener((notifId, btnIdx) => {
  if (notifId === "trackingPauseNotif") {
    if (btnIdx === 0) startTracking(60);
    else stopTracking();
  }
});

async function addToQueue(data) {
  sendQueue.push({ ...data, retries: 0 });
  await chrome.storage.local.set({ sendQueue });
  console.log("🧩 Queued:", data.url);
  processQueue();
}

async function processQueue() {
  if (isSending || sendQueue.length === 0) return;
  isSending = true;
  const item = sendQueue[0];
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(item),
      keepalive: true,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    console.log("✅ Sent:", item.url);
    sendQueue.shift();
    await chrome.storage.local.set({ sendQueue });
  } catch (err) {
    console.warn("⚠️ Failed:", err.message);
    item.retries += 1;
    const delay = Math.min(30000, 2000 * 2 ** item.retries);
    console.log(`⏳ Retrying in ${delay / 1000}s`);
    await new Promise((r) => setTimeout(r, delay));
  } finally {
    isSending = false;
    if (sendQueue.length > 0) setTimeout(processQueue, 500);
  }
}

async function handleTabChange(tab) {
  if (!isTracking || !tab.url) return;
  const { allowedSites = DEFAULT_SITES } = await chrome.storage.sync.get("allowedSites");
  const matched = allowedSites.some((site) => tab.url.includes(site));
  if (!matched) return;
  const contentData = {
    title: tab.title,
    url: tab.url,
    timestamp: new Date().toISOString(),
  };
  await addToQueue(contentData);
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.url || (changeInfo.status === "complete" && tab.url)) {
    handleTabChange(tab);
  }
});

chrome.webNavigation.onHistoryStateUpdated.addListener((details) => {
  chrome.tabs.get(details.tabId, (tab) => handleTabChange(tab));
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.action === "startTracking") startTracking(message.duration);
  else if (message.action === "stopTracking") stopTracking();
});
