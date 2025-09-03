import { getKecamatanData, getKelurahanData } from "./ApiServices.js";
/*
  === Helper Function ==
  function menghitung jumlah kab/kota
*/

export function jumlahKabKota(arr) {
  let jumlahKab = 0;
  let jumlahKota = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].text.startsWith("Kabupaten")) {
      jumlahKab++
    } else {
      jumlahKota++
    }
  }

  return {jumlahKab, jumlahKota}
}

// function menghitung jumlah kecamatan
export async function jumlahKecamatan(arrKabKot) {
  let jumlahKec = 0;
  for (let i = 0; i < arrKabKot.length; i++) {
    const allKecamatan = await getKecamatanData(arrKabKot[i].id)
    jumlahKec += allKecamatan.length
  }
  return jumlahKec;
}

// function menghitung jumlah kelurahan
export async function jumlahKelurahan(arrKabKot) {
  let jumlahKel = 0;
  for (let i = 0; i < arrKabKot.length; i++) {
    const allKecamatan = await getKecamatanData(arrKabKot[i].id);
    for (let j = 0; j < allKecamatan.length; j++) {
      const allKelurahan = await getKelurahanData(allKecamatan[j].id);
      jumlahKel += allKelurahan.length;
 
    }
  }
  return jumlahKel;
}