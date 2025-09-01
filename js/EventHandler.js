import dom from "./DomElements.js";

export default class EventHandlers {
  constructor() {
    this.initEvents();
  }

  initEvents() {
    this.handlePathProvinsi();
    this.handleSearchQuery();
    this.handleCloseBtn();
    this.handleZoom();
  }

  // Loop ke setiap path svg provinsi
  handlePathProvinsi() {
    dom.provinsi.forEach(prov => {
      // Click event
      prov.addEventListener("click", function(e) {
        // set loading
        dom.loading.innerText = "Loading..."
        // Sembunyikan container data provinsi
        dom.container.classList.add("hide")
        // show loading
        dom.loading.classList.remove("hide")

        // variabel nama provinsi
        let namaProvinsi;
        // If svg path yang di klik (provinsi) memiliki atribut nama
        if(e.target.hasAttribute("name")) {
          // ambil value atribut nama
          namaProvinsi = e.target.getAttribute("name") 
        } else {
          // ambil dari nama class
          namaProvinsi = e.target.classList.value;
        }
        // buka side-panel
        dom.sidePanel.classList.add("side-panel-open");

        // Informasi Provinsi berdasarkan nama provinsi yang di klik
        getProvinsiData(namaProvinsi).then(data => {

        });
      })
    })
  }

  // Search Query
  handleSearchQuery() {
    dom.searchBtn.addEventListener("click", async () => {
      const namaDaerah = dom.searchInput.value;
      // Popup-panel open
      dom.popupPanel.classList.add("popup-panel-open")
      
      dom.searchQuery.innerText = namaDaerah;
      dom.searchInput.value = "";
    })
  }

  // Close button events
  handleCloseBtn() {
    // Click event tutup side-panel
    dom.closeBtn.addEventListener("click", () => {
      // Close
      dom.sidePanel.classList.remove("side-panel-open");
    })

    // Click event tutup popup-panel
    dom.popupCloseBtn.addEventListener("click", () => {
      // closing class
      dom.popupPanel.classList.add("popup-panel-closing");
      
      setTimeout(() => {
        dom.popupPanel.classList.remove("popup-panel-open");
        dom.popupPanel.classList.remove("popup-panel-closing");
      }, 300);
    })
  }

  // Zoom 
  handleZoom() {
        let zoomValue = 100;
    // Disable zoom out on load
    dom.zoomOutBtn.disabled = true

    // Click event ke zoomIn
    dom.zoomInBtn.addEventListener("click", () => {
      // Enable zoom out btn
      dom.zoomOutBtn.disabled = false;
      // Increment zoom value 100
      zoomValue += 100;
      // Limit zoom adalah 500
      if(zoomValue < 500) {
        dom.zoomInBtn.disabled = false;
      // Jika mencapai limit
      } else {
        // Disable zoom in btn
        dom.zoomInBtn.disabled = true;
      }
      // Set map width and height to zoom value
      dom.peta.style.width = zoomValue + "vw";
      dom.peta.style.height = zoomValue +"vh";

      // Output zoom value percentage
      dom.zoomValueOutput.innerText = zoomValue + "%";
    });

    // Click event ZoomOut
    dom.zoomOutBtn.addEventListener("click", () => {
      // Enable zoom out btn
      dom.zoomInBtn.disabled = false;
      // Increment zoom value 100
      zoomValue -= 100;
      // Limit zoom adalah 100
      if(zoomValue > 100) {
        dom.zoomOutBtn.disabled = false;
      // Jika mencapai limit
      } else {
        // Disable zoom in btn
        dom.zoomOutBtn.disabled = true;
      }
      // Set map width and height to zoom value
      dom.peta.style.width = zoomValue + "vw";
      dom.peta.style.height = zoomValue +"vh";

      // Output zoom value percentage
      dom.zoomValueOutput.innerText = zoomValue + "%";
    });
  }
}