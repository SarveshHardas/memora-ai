const toggleBtn = document.getElementById("toggleTracking");
const statusDiv = document.getElementById("status");
const siteListDiv = document.getElementById("siteList");
const addBtn = document.getElementById("addSite");
const newSiteInput = document.getElementById("newSite");
const durationSelect = document.getElementById("durationSelect");

function updateStatus() {
  chrome.storage.sync.get(["isTracking", "trackingEndTime"], (data) => {
    if (data.isTracking) {
      const remaining = Math.max(0, Math.round((data.trackingEndTime - Date.now()) / 60000));
      statusDiv.innerHTML = `<b>Status:</b> 🟢 Tracking (${remaining} min left)`;
      toggleBtn.textContent = "Stop Tracking";
    } else {
      statusDiv.innerHTML = "<b>Status:</b> 🔴 Not Tracking";
      toggleBtn.textContent = "Start Tracking";
    }
  });
}

function renderSites() {
  chrome.storage.sync.get(["allowedSites"], (data) => {
    const sites = data.allowedSites || [];
    siteListDiv.innerHTML = sites.map((s) => `<div>• ${s}</div>`).join("");
  });
}

toggleBtn.addEventListener("click", () => {
  chrome.storage.sync.get("isTracking", (data) => {
    const isTracking = data.isTracking;
    const selectedDuration = parseInt(durationSelect.value, 10);

    if (isTracking) {
      chrome.runtime.sendMessage({ action: "stopTracking" });
      chrome.storage.sync.set({ isTracking: false });
    } else {
      chrome.runtime.sendMessage({ action: "startTracking", duration: selectedDuration });
      chrome.storage.sync.set({ isTracking: true });
    }

    setTimeout(updateStatus, 300);
  });
});

addBtn.addEventListener("click", () => {
  const newSite = newSiteInput.value.trim();
  if (!newSite) return;
  chrome.storage.sync.get(["allowedSites"], (data) => {
    const sites = data.allowedSites || [];
    if (!sites.includes(newSite)) {
      sites.push(newSite);
      chrome.storage.sync.set({ allowedSites: sites }, renderSites);
      newSiteInput.value = "";
    }
  });
});

chrome.runtime.onMessage.addListener((msg) => {
  if (msg.action === "updateStatus") updateStatus();
});

updateStatus();
renderSites();
