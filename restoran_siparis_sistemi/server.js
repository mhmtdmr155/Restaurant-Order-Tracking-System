const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors()); // Frontend'den gelen isteklere izin ver
app.use(express.json()); // JSON verilerini işle

// MySQL bağlantısı
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "restoran_vt",
});

// Veritabanı bağlantısını kontrol et
db.connect((err) => {
  if (err) throw err;
  console.log("MySQL'e bağlandı!");
});

// Örnek API: Tüm siparişleri getir
app.get("/api/siparisler", (req, res) => {
  db.query("SELECT * FROM siparisler", (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Yeni sipariş ekle
app.post("/api/siparis-ekle", (req, res) => {
  const { musteri_adi, siparis } = req.body;
  db.query(
    "INSERT INTO siparisler (musteri_adi, siparis) VALUES (?, ?)",
    [musteri_adi, siparis],
    (err, result) => {
      if (err) throw err;
      res.json({ message: "Sipariş eklendi!", id: result.insertId });
    }
  );
});

// Sunucuyu başlat
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Sunucu http://localhost:${PORT} adresinde çalışıyor...`);
});