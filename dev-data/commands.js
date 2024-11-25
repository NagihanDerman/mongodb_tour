const mongoose = require("mongoose");
const Tour = require("../models/tourModel.js");
const fs = require("fs");

// Geliştirme aşamasında mongodbdeki verilerin sıkca degisip bozulabilecegi icin terminaldne calisian 2 tane kod (veritabanindaki verileri temozleme ve json dosyasindaki verileri veritabanina aktarma iicn clear ve import komutlarin)yaziyoruz

// .env dosyasına erisim
require("dotenv").config();
//local mongodb veritabanina baglanma
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("💥✨ Veritabanina baglandi");
  })
  .catch((err) => {
    console.error("🏀🥎 Veritabanina baglanamadi", err.message);
  });

// json dosyasındaki verileri al
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/data/tours-simple.json`)
);

// devdata klasorundeki json dosylarini veritabanina aktarir
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log("veriler veritabanına aktarıldı");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// mongodbdeki verileri siler
const clearData = async () => {
  try {
    await Tour.deleteMany();
    console.log("bütün veriler temizlendi");
  } catch (err) {
    console.log(err);
  }

  process.exit();
};

// calistirilan komutun sonuna eklenen bayraga (flag)gore dogru fonksiyonu tetikler
if (process.argv.includes("--import")) {
  importData();
} else if (process.argv.includes("--clear")) {
  clearData();
}
