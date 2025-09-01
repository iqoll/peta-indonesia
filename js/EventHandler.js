import dom from "./DomElements";

export default class EventHandlers {
  constructor() {
    this.initEvents();
  }

  initEvents() {
    this.handlePathProvinsi();
  }

  // Loop ke setiap path svg provinsi
  handlePathProvinsi() {
    dom.provinsi.forEach(prov => {
      // Click event
      prov.addEventListener("click", function(e) {

        // buka side-panel
        dom.sidePanel.classList.add("side-panel-open")
      })
    })
  }
}