import express from "express";
import fetch from "node-fetch";
import FormData from "form-data"
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

let accessToken = null;
let refreshToken = process.env.REFRESH_TOKEN;

// === Refresh acces token Function ===
async function refreshAccessToken() {
  try {
    const form = new FormData();
    form.append("username", process.env.WIKI_USERNAME);
    form.append("refresh_token", refreshToken);

    const res = await fetch("https://auth.enterprise.wikimedia.com/v1/token-refresh", {
      method: "POST",
      body: form,
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Refresh token gagal: ", data);
      throw new Error(`Failed to refresh token: ${res.status}`);
    }

    accessToken = data.access_token;
    console.log("Token Refreshed");
    return accessToken;
  } catch (err) {
    console.error("Error refresh token:", err)
    throw err;
  }
}

// === Middleware valid token ===
async function getToken() {
  if(!accessToken) {
    return await refreshAccessToken();
  }
  return accessToken;
}

// === Proxy endpoint data provinsi ===
app.get("/provinsi/:nama", async (req, res) => {
  try {
    let token = await getToken();

    const url = `${process.env.API_BASE_URL}/structured-contents/${encodeURIComponent(req.params.nama)}`;
    const params = new URLSearchParams({
      filters: JSON.stringify({ field: "in_language.identifier", value: "id"}),
      fields: "infoboxes",
    })

    let response = await fetch(`${url}?${params.toString()}`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json",
      },
    });

    if (response.status === 401) {
      // kalau token expired, refresh lalu ulang
      token = await refreshAccessToken();
      response = await fetch(`${url}?${params.toString()}`, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
      });
    }

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Proxy server running at http://localhost:${process.env.PORT}`)
})