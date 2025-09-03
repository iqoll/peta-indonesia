import { findField, findFieldMulti } from "./Utils.js";
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
    const res = await fetch(`api/provinsi/${encodeURIComponent(namaProvinsi)}`)
    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const json = await res.json();

    // cari item yang punya infobox provinsi
    const provinsiBox = json.find(item =>
      item.infoboxes?.some(info => info.name?.toLowerCase().includes("provinsi"))
    );
    if (!provinsiBox) {
      console.log("Data provinsi tidak ditemukan");
      return null;
    }

    // ambil infobox utama
    const kotakInfo = provinsiBox.infoboxes.find(info =>
      info.name?.toLowerCase().includes("provinsi")
    );
    if (!kotakInfo || !kotakInfo.has_parts) {
      console.log("Infobox provinsi tidak ditemukan atau tidak punya has_parts");
      return null;
    }

    // thumbnail dari Wikipedia REST
    const wikiRes = await fetch(
      `https://id.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(namaProvinsi)}`
    );
    const wikiData = await wikiRes.json();
    const thumbnail = wikiData.thumbnail?.source || "";

    // data kab/kota dari CloudAlert
    const id = provinsiMap[namaProvinsi];
    let kabKota = [];
    if (id) {
      const kabKotaRes = await fetch(
        `https://alamat.thecloudalert.com/api/kabkota/get/?d_provinsi_id=${id}`
      );
      const kabKotaData = await kabKotaRes.json();
      kabKota = kabKotaData.result || [];
    }

    // Ambil field-field
    const gubernur = findField(kotakInfo.has_parts, "Gubernur");
    const ibuKota = findField(kotakInfo.has_parts, "Ibu kota");
    const hariJadi = findField(kotakInfo.has_parts, "Hari jadi");
    const luasWilayah = findFieldMulti(
      kotakInfo.has_parts,
      ["Total"],
      ["Luas Wilayah", "Luas", "Luas wilayah"]
    );
    const populasi = findFieldMulti(
      kotakInfo.has_parts,
      ["Total"],
      ["Populasi", "Populasi (31 Desember 2024)", "Populasi (30 Juni 2024)", "Populasi (2022)", "Populasi (2023)"]
    );
    const ipm = findField(kotakInfo.has_parts, "IPM");
    const faunaResmi = findField(kotakInfo.has_parts, "Fauna resmi");
    const situsWeb = findField(kotakInfo.has_parts, "Situs web");

    return {kabKota ,thumbnail, gubernur, ibuKota, hariJadi, luasWilayah, populasi, ipm, faunaResmi, situsWeb}

  } catch (error) {
    console.error("Error fetching data: ", error);
    return null;
  }
}

//  === CloudAlert detail ===
export async function getKecamatanData(idKabKota) {
  const res = await fetch(`https://alamat.thecloudalert.com/api/kecamatan/get/?d_kabkota_id=${idKabKota}`);
  const data = await res.json();
  return data.result;
}
export async function getKodePosData(idKabKota, idKecamatan) {
  const res = await fetch(`https://alamat.thecloudalert.com/api/kodepos/get/?d_kabkota_id=${idKabKota}&d_kecamatan_id=${idKecamatan}`);
  const data = await res.json();
  return data.result;
}
export async function getKelurahanData(idKecamatan) {
  const res = await fetch(`https://alamat.thecloudalert.com/api/kelurahan/get/?d_kecamatan_id=${idKecamatan}`);
  const data = await res.json();
  return data.result;
}
