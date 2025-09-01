import dom from "./DomElements.js";

export default class EventHandlers {
  constructor() {
    this.initEvents();
  }

  initEvents() {
    this.handlePathProvinsi();
    this.handleCloseBtn();
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

  // Close button events
  handleCloseBtn() {
    // Click event tutup side-panel
    dom.closeBtn.addEventListener("click", () => {
      // Close
      dom.sidePanel.classList.remove("side-panel-open");
    })
  }
}