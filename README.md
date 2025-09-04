# 🌏 Interactive Map of Indonesia

An **interactive web-based map of Indonesia** that allows users to explore provinces, cities/regencies, districts, sub-districts, and postal codes.  
The app integrates **Wikimedia Enterprise API, Wikipedia REST API, and CloudAlert API** to fetch real-time data and display it in a dynamic and user-friendly interface.  

---

## ✨ Features

- **Interactive SVG Map**
  - Clickable provinces with dynamic data fetching.
- **Province Information Panel**
  - Capital, Governor, Foundation Date, Area, Population, HDI, Fauna, Official Website, etc.
- **Administrative Hierarchy Explorer**
  - Navigate through Provinces → Regencies/Cities → Districts → Sub-districts → Postal Codes.
- **Search by Region Name**
  - Search any area and get structured results in a popup panel.
- **Pagination**
  - Clean navigation through search results and data tables.
- **Zoom Controls**
  - Zoom in/out the SVG map up to a defined scale.
- **Loading Indicators**
  - User-friendly loading messages during data fetch.

---

## 🛠️ Tech Stack

**Frontend**
- HTML5  
- CSS3 (Responsive Design)  
- JavaScript (ES6+)  

**APIs & Data Sources**
- [Wikimedia Enterprise API](https://enterprise.wikimedia.com/) → structured infobox data  
- [Wikipedia REST API](https://en.wikipedia.org/api/rest_v1/) → thumbnails & summaries  
- [The CloudAlert API](https://alamat.thecloudalert.com/) → administrative regions & postal codes  

**UI Libraries**
- Font Awesome (icons)  
- Inline SVG for Indonesia map  

---

## 📂 Project Structure
├── index.html # Main entry point (map, panels, controls)
├── styles.css # Styling & responsive layout
├── js # App logic (event handling, DOM updates, API calls)
│ ├── main.js # Entry script, initializes the app
│ ├── ApiService.js # API service layer for fetching data (CloudAlert, Wikimedia, etc.)
│ ├── Calculation.js # Logic for counting provinces, regencies, districts, sub-districts
│ ├── DomElements.js # Centralized DOM selectors and references
│ ├── EventHandler.js # Handles all UI events (clicks, search, zoom, etc.)
│ └── Utils.js # Search functionality Helper functions (used across ApiService & others)
├── api
│ └── provinsi.js Proxy handler for Wikimedia API (production)
├── wikimedia-proxy
│ ├── server.js # Development proxy server for Wikimedia API (local testing)

---

## 🚀 Installation & Usage

1. Clone the repository:
   ```
   git clone https://github.com/your-username/indonesia-map.git
   cd indonesia-map
   ```

2. Open `index.html` in your browser (no server required).
   For API calls to work properly, it’s recommended to use a local development server (e.g., VSCode Live Server, Python HTTP server, or Node.js http-server).

   Example with Python:
   `python -m http.server 8080`
   
   Example with Node.js:
   `npx http-server`
   
3. Access the app in your browser:
   `http://localhost:8080`

---

## 📖 Example Usage

- Click on a province in the SVG map → View its info & administrative breakdown.
- Use the search bar to find any region by name.
- Explore the Wilayah & Kode tab to drill down into regencies, districts, and postal codes.
- Zoom in/out with the + and - controls.

---

## 🎯 Goals

- Provide an educational tool for exploring Indonesia’s geography.
- Demonstrate integration of multiple APIs in a cohesive frontend app.
- Serve as a foundation project for further enhancements (charts, population trends, extended datasets).

---

## 📜 License
MIT License © 2025 Muhammad Haiqal
