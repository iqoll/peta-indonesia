// Mapping provinsi ID untuk CloudAlert
const provinsiMap = {
  "Bali": 1,
  "Kepulauan Bangka Belitung": 2,
  "Banten": 3,
  "Bengkulu": 4,
  "Daerah Istimewa Yogyakarta": 5,
  "Daerah Khusus Ibukota Jakarta": 6,
  "Gorontalo": 7,
  "Jambi": 8,
  "Jawa Barat": 9,
  "Jawa Tengah": 10,
  "Jawa Timur": 11,
  "Kalimantan Barat": 12,
  "Kalimantan Selatan": 13,
  "Kalimantan Tengah": 14,
  "Kalimantan Timur": 15,
  "Kalimantan Utara": 16,
  "Kepulauan Riau": 17,
  "Lampung": 18,
  "Maluku": 19,
  "Maluku Utara": 20,
  "Aceh": 21,
  "Nusa Tenggara Barat": 22,
  "Nusa Tenggara Timur": 23,
  "Papua": 24,
  "Papua Barat": 25,
  "Riau": 26,
  "Sulawesi Barat": 27,
  "Sulawesi Selatan": 28,
  "Sulawesi Tengah": 29,
  "Sulawesi Tenggara": 30,
  "Sulawesi Utara": 31,
  "Sumatera Barat": 32,
  "Sumatera Selatan": 33,
  "Sumatera Utara": 34,
}

/* 
  === SEARCH (CloudAlert) ===
  function mencari daerah berdasarkan keyword 
*/
export async function keywordSearch(namaDaerah) {
  const res = await fetch(
    `https://alamat.thecloudalert.com/api/cari/index/?keyword=${namaDaerah}`
  );
  const data = await res.json();
  return data.result;
}

/*
  === PROVINSI (Wikimedia + Wikipedia + CloudAlert) ===
*/
export async function getProvinsiData(namaProvinsi) {
  // Wikimedia API untuk data-data infoboxes
  try {
    const res = await fetch(`http://localhost:5000/provinsi/${encodeURIComponent(namaProvinsi)}`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();


  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}
