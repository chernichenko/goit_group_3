const tabLinks = document.querySelectorAll(".exercises .tab-link");
const tabContent = document.querySelector(".exercises .tab-content");
const musclesTab = document.querySelector(".exercises .muscles-tab");
const bodyPartsTab = document.querySelector(".exercises .body-parts-tab");
const equipmentTab = document.querySelector(".exercises .equipment-tab");
const searchContainer = document.querySelector(".exercises .search-container");
const bodyPartsTitle = document.querySelector(".exercises .body-parts-title");

tabLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
        e.preventDefault();

        tabLinks.forEach((link) => link.classList.remove("active"));
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
