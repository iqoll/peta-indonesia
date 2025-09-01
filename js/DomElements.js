const domElements = {
  // Peta
  peta: document.querySelector("svg"),

  // Panel
  sidePanel: document. querySelector(".side-panel"),
  popupPanel: document.querySelector(".popup-panel"),

  // Search
  searchInput: document.querySelector("#search-input"),
  searchQuery: document.querySelector(".search-query"),

  // Inti
  provinsi: document.querySelectorAll("path"),
  container: document.querySelector(".side-panel .container"),
  infoProvinsi: document.querySelector(".info-provinsi"), 
  wilayahKode: document.querySelector(".wilayah-kode"),
  loading: document.querySelector(".loading"), 

  // Button
  searchBtn: document.querySelector("#cari"),
  closeBtn: document.querySelector(".close-btn"),
  popupCloseBtn: document.querySelector(".close-btn-pop"),
  infoProvinsiBtn: document.querySelector(".info-provinsi-btn"),
  infoProvinsiBtn2: document.querySelector(".info-provinsi-btn-2"),
  wilayahKodeBtn: document.querySelector(".wilayah-kode-btn"),
  wilayahKodeBtn2: document.querySelector(".wilayah-kode-btn-2"),
  zoomInBtn: document.querySelector(".zoom-in"),
  zoomOutBtn: document.querySelector(".zoom-out"),

  // Data Output
  jumlahKabOutput: document.querySelector(".jumlah-kab"),
  jumlahKotaOutput: document.querySelector(".jumlah-kota"),
  jumlahKecOutput: document.querySelector(".jumlah-kecamatan"),
  jumlahKelOutput: document.querySelector(".jumlah-kelurahan"),
  namaProvinsiOutput: document.querySelectorAll(".nama-provinsi"),
  namaWilayahOutput: document.querySelector(".nama-wilayah"),
  lambangDaerahOutput: document.querySelectorAll(".lambang-daerah"),
  ibuKotaOutput: document.querySelector(".ibu-kota"),
  gubernurOutput: document.querySelector(".gubernur"),
  hariJadiOutput: document.querySelector(".hari-jadi"),
  wilayahOutput: document.querySelector(".wilayah"),
  populasiOutput: document.querySelector(".populasi"),
  ipmOutput: document.querySelector(".ipm"),
  faunaResmiOutput: document.querySelector(".fauna-resmi"),
  situsWebOutput: document.querySelector(".situs-web"),
  zoomValueOutput: document.querySelector(".zoom-value")
}

export default domElements;