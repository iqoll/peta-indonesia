import dom from "./DomElements.js";
import { 
  keywordSearch,
  getProvinsiData,
 } from "./ApiServices.js";
import { jumlahKabKota, jumlahKecamatan, jumlahKelurahan } from "./Calculation.js";
export default class EventHandlers {
  constructor() {
    this.initEvents();
  }

  initEvents() {
    this.handlePathProvinsi();
    this.handleSearchQuery();
    this.handleCloseBtn();
    this.handleZoom();
    this.handleToggle();
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
          // untuk lambang provinsi dari wikipedia delay 1/2 detik
          setTimeout(() => {
            // mengisi data/text di html
            if (!data) {
              dom.loading.innerText = "Data tidak ditemukan";
              return;
            }
            dom.namaProvinsiOutput.forEach(nama => {
              nama.innerText = namaProvinsi;
            })
            dom.lambangDaerahOutput.forEach(lambang => {
              lambang.src = data.thumbnail
            });
            dom.ibuKotaOutput.innerText = data.ibuKota;
            dom.gubernurOutput.innerText = data.gubernur;
            dom.hariJadiOutput.innerText = data.hariJadi;
            dom.wilayahOutput.innerText = data.luasWilayah;
            dom.populasiOutput.innerText = data.populasi;
            dom.ipmOutput.innerText = data.ipm;
            dom.faunaResmiOutput.innerText = data.faunaResmi;
            dom.situsWebOutput.innerText = data.situsWeb;
            dom.situsWebOutput.href = `https://${data.situsWeb}`;

            dom.infoProvinsiBtn.classList.add("active");
            dom.infoProvinsiBtn.disabled = true;

            // nama wilayah berdasarkan provinsi untuk text-info
            if (
              namaProvinsi.includes("Sumatera") ||
              namaProvinsi.includes("Jawa") ||
              namaProvinsi.includes("Jambi") ||
              namaProvinsi.includes("Aceh") ||
              namaProvinsi.includes("Riau") ||
              namaProvinsi.includes("Daerah") ||
              namaProvinsi.includes("Banten") ||
              namaProvinsi.includes("Bangka") 
            ) {
                dom.namaWilayahOutput.innerText = "Barat";
            } else if (
                namaProvinsi.includes("Kalimantan") 
            ) {
                dom.namaWilayahOutput.innerText = "Tengah-Utara";
            } else if (
                namaProvinsi.includes("Sulawesi") ||           
                namaProvinsi.includes("Bali") ||        
                namaProvinsi.includes("Nusa Tenggara")         
            ) {
                dom.namaWilayahOutput.innerText = "Tengah-Timur";
            } else {
                dom.namaWilayahOutput.innerText = "Timur";
            }

            // Jumlah Kabupaten/Kota
            const jumKabKot = jumlahKabKota(data.kabKota || []);
            dom.jumlahKabOutput.innerText = jumKabKot.jumlahKab;
            dom.jumlahKotaOutput.innerText = jumKabKot.jumlahKota;
            
            // Jumlah kecamatan
            (async () => {
              const jumKecamatan = await jumlahKecamatan(data.kabKota || []);
              dom.jumlahKecOutput.innerText = jumKecamatan;
            })();

            // Jumlah kelurahan
            (async () => {
              dom.jumlahKelOutput.innerText = "..."; // Tampilan loading
              const jumKelurahan = await jumlahKelurahan(data.kabKota || []);
              dom.jumlahKelOutput.innerText = jumKelurahan;
            })();

            /* === Side Panel Table === */
            const rowsPerPage = 10;
            let currentPage = 1;
            let currentData = [];
            let currentTipe = "Kab/kota";
            let currentFetcher = null;

            function renderTable(page = 1) {

            }

            function renderPagination() {

            }

            // Inisialisasi pertama (kab/kota) dan render table pertama kali
            currentData = data.kabKota || [];
            currentTipe = "Kab/Kota";
            currentFetcher = getKecamatanData;
            renderTable(currentPage)

            // waktu menunggu lambang daerah baru load
            dom.lambangDaerahOutput.forEach(lambang => {
              lambang.onload = () => {
              // Show the container dengan info provinsi
              dom.container.classList.remove("hide");
              // Hide loading screen
              dom.loading.classList.add("hide")
            }
            });
          }, 500); 
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

      // Ambil data untuk table query search
      const data = await keywordSearch(namaDaerah);
      const rowsPerPage = 5; // max row di 1 page table
      let currentPage = 1;

      function renderTableQuery(page = 1) {
        const tbody = document.querySelector("#query-table tbody");
        tbody.innerHTML = ""; //clear isi table

        // range data
        const start = (page - 1) * rowsPerPage;
        const end = start + rowsPerPage;
        const pageData = data.slice(start, end);

        // render rows
        pageData.forEach((item, index) => {
          const tr = document.createElement("tr");

          const tdNo = document.createElement("td");
          tdNo.textContent = start + index + 1;

          const tdProv = document.createElement("td");
          tdProv.textContent = item.provinsi;

          const tdKabKota = document.createElement("td");
          tdKabKota.textContent = item.kabkota;

          const tdKec = document.createElement("td");
          tdKec.textContent = item.kecamatan;

          const tdKelurahan = document.createElement("td");
          tdKelurahan.textContent = item.desakel;
      
          const tdKodepos = document.createElement("td");
          tdKodepos.textContent = item.kodepos;

          tr.appendChild(tdNo);
          tr.appendChild(tdProv);
          tr.appendChild(tdKabKota);
          tr.appendChild(tdKec);
          tr.appendChild(tdKelurahan);
          tr.appendChild(tdKodepos);

          tbody.appendChild(tr);
        });
        
        renderPaginationQuery();
      }

      function renderPaginationQuery() {
        const totalPages = Math.ceil(data.length / rowsPerPage);
        const pagination = document.querySelector(".pagination-query");
        pagination.innerHTML = "";

        const maxVisible = 5; 

        // Prev button
        const prev = document.createElement("button");
        prev.textContent = "Prev";
        prev.disabled = currentPage === 1;
        prev.onclick = () => {
          if (currentPage > 1) {
            currentPage--;
            renderTableQuery(currentPage);
          }
        };
        pagination.appendChild(prev);

        // tampilkan halaman pertama
        addPageButton(1)

        // Rentang halaman
        let start = Math.max(2, currentPage - Math.floor(maxVisible / 2));
        let end = Math.min(totalPages - 1, currentPage + Math.floor(maxVisible / 2));

        // kalau dekat awal
        if (currentPage <= Math.floor(maxVisible / 2) + 2) {
          end = Math.min(totalPages - 1, maxVisible + 1);
        }
        // kalau dekat akhir
        if (currentPage >= totalPages - Math.floor(maxVisible /2) - 1) {
          start = Math.max(2, totalPages - maxVisible);
        }

        // titik-titik sebelum rentang tengah
        if (start > 2) {
          pagination.appendChild(buatTitik());
        }

        // halaman tengah
        for (let i = start; i <= end; i++) {
          addPageButton(i);
        }

        // titik-titik setelah rentang tengah
        if (end < totalPages - 1) {
          pagination.appendChild(buatTitik())
        }

        // selalu tampilkan halaman terakhir kalau > 1
        if (totalPages > 1) {
          addPageButton(totalPages);
        }

        // Next button
        const next = document.createElement("button");
        next.textContent = "Next";
        next.disabled = currentPage === totalPages;
        next.onclick = () => {
          if (currentPage < totalPages) {
            currentPage++;
            renderTableQuery(currentPage);
          }
        };
        pagination.appendChild(next);

        // function helper: buat tombol halaman 
        function addPageButton(page) {
          const btn = document.createElement("button");
          btn.textContent = page;
          if(page === currentPage) btn.disabled = true;
          btn.onclick = () => {
            currentPage = page;
            renderTableQuery(currentPage);
          }
          pagination.appendChild(btn)
        }
      
        // function helper: buat titik (...)
        function buatTitik() {
          const span = document.createElement("span");
          span.textContent = "...";
          span.style.margin = "0 5px";
          return span;
        }
      }

      renderTableQuery(currentPage);
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

  // Toggle btn for changing side-panel content
  handleToggle() {
    // Click event untuk menunjukkan section wilayah & kode
    dom.wilayahKodeBtn.addEventListener("click", () => {
      dom.infoProvinsi.classList.add("hidden");
      dom.wilayahKode.classList.remove("hidden");
      dom.wilayahKodeBtn2.classList.add("active");
      dom.wilayahKodeBtn2.disabled = true;
    })
    // Click event untuk info provinsi
    dom.infoProvinsiBtn2.addEventListener("click", () => {
      dom.wilayahKode.classList.add("hidden");
      dom.infoProvinsi.classList.remove("hidden");
    })
  }
}