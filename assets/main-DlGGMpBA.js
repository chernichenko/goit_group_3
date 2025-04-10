(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
const tabLinks = document.querySelectorAll(".exercises .tab-link");
document.querySelector(".exercises .tab-content");
const musclesTab = document.querySelector(".exercises .muscles-tab");
const bodyPartsTab = document.querySelector(".exercises .body-parts-tab");
const equipmentTab = document.querySelector(".exercises .equipment-tab");
const searchContainer = document.querySelector(".exercises .search-container");
const bodyPartsTitle = document.querySelector(".exercises .body-parts-title");
tabLinks.forEach((link) => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    tabLinks.forEach((link2) => link2.classList.remove("active"));
    this.classList.add("active");
    const selectedTab = this.getAttribute("data-tab");
    if (selectedTab === "body-parts") {
      searchContainer.style.display = "block";
      bodyPartsTitle.style.display = "inline-block";
    } else {
      searchContainer.style.display = "none";
      bodyPartsTitle.style.display = "none";
    }
    switch (selectedTab) {
      case "muscles":
        musclesTab.style.display = "block";
        bodyPartsTab.style.display = "none";
        equipmentTab.style.display = "none";
        break;
      case "body-parts":
        musclesTab.style.display = "none";
        bodyPartsTab.style.display = "block";
        equipmentTab.style.display = "none";
        break;
      case "equipment":
        musclesTab.style.display = "none";
        bodyPartsTab.style.display = "none";
        equipmentTab.style.display = "block";
        break;
    }
  });
});
