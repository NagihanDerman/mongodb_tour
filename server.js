const app = require("./app.js");
const mongoose = require("mongoose");

// .env dosyasına erisim saglarr
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

//express uygulamasi dinlemeye basla
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`${port} port dinlenmeye basladiii`);
});
