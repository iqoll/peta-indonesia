export default async function handler(req, res) {
  const { nama } = req.query;

  try {
    const tokenRes = await fetch(process.env.AUTH_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: process.env.WIKI_USERNAME,
        refresh_token: process.env.WIKI_REFRESH_TOKEN
      })
    });

    if (!tokenRes.ok) {
      return res.status(401).json({ error: "Failed to refresh token" });
    }

    const { access_token } = await tokenRes.json();

    const apiRes = await fetch(
      `${process.env.API_BASE_URL}/structured-contents/${encodeURIComponent(
        nama
      )}?filters=${encodeURIComponent(
        JSON.stringify({ field: "in_language.identifier", value: "id" })
      )}&fields=infoboxes`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
          Accept: "application/json",
        },
      }
    );

    const data = await apiRes.json();
    res.status(200).json(data);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
