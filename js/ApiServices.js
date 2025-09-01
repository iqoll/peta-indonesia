
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