const mongoose = require("mongoose");
const validator = require("validator");

//veritabanina kaydedilecek olan verilerin schemasi/kisitlamalarinin yazilmasi
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: [true, "Bu tur ismi zaten mevcut"],
      required: [true, "Tur isim değerine sahip olmalı"],
      //third part validator paketi
      validate: [validator.isAlphanumeric, "Tur ismi ozel karakter icermemeli"],
    },

    price: {
      type: Number,
      required: [true, "Tur fiyat değerine sahip olmalı"],
    },

    priceDiscount: {
      type: Number,
      // custom validator = kendi yazdığımız kontrol methdolari mw ler
      // dogrulama fonksiyonları false return ederse dogrulamadan gecmedi demektir, ve belge veritabanına kaydedilmez
      //  true return ederse dogrulamadan gecti anlamına gelir
      validate: {
        validator: function (value) {
          return value < this.price;
        },
        message: "İndirim fiyati asil fiyattan buyuk olamaz",
      },
    },

    duration: {
      type: Number,
      required: [true, "Tur süre değerine sahip olmalı"],
    },

    difficulty: {
      type: String,
      required: [true, "Tur zorluk değerine sahip olmalı"],
      enum: ["easy", "medium", "hard", "difficult"],
    },

    maxGroupSize: {
      type: Number,
      required: [true, "Tur maksimum kişi sayısı değerine sahip olmalı"],
    },

    ratingsAverage: {
      type: Number,
      min: [1, "Rating değeri 1'den küçük olamaz"],
      max: [5, "Rating değeri 5'den büyük olamaz"],
      default: 4.0,
    },

    ratingsQuantity: {
      type: Number,
      default: 0,
    },

    summary: {
      type: String,
      maxLength: [200, "Özet alanı 200 karakteri geçemez"],
      required: [true, "Tur özet değerine sahip olmalı"],
    },

    description: {
      type: String,
      maxLength: [1000, "Açıklama alanı 1000 karakteri geçemez"],
      required: [true, "Tur açıklama değerine sahip olmalı"],
    },

    imageCover: {
      type: String,
      required: [true, "Tur kapak fotğrafına sahip olmalı"],
    },

    images: {
      type: [String],
    },

    startDates: {
      type: [Date],
    },
    durationHour: { type: Number },
  },
  //sema ayarlari
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
//! Virtual Property
//sanal veriler :veritabaninda tutulmayip frondtend kisminda sadece client a istedigi anda verilen bilgiler. tu fiyatklarinin indirimli halleri gibi
tourSchema.virtual("discountedPrice").get(function () {
  return this.price - this.priceDiscount;
});

// Örn: Veritabanında tur ismini tutugumuz veriyi client ekstra olarak slug olarak isterse.
// The City Wanderer: the-city-wanderer(endpointde ki ismin kucukharflerle ve araya  tire konularak yazilmasi islemi slug deniliyor)
tourSchema.virtual("slug").get(function () {
  return this.name.replaceAll(" ", "-").toLowerCase();
});

//! Document Middleware
// Bir belgenin kaydedilme, güncelleme, silinme, okunma gibi  olaylarindan once veya sonra islem gerçekleştirmek icin kullanilir.
// Örn: Client'tan gelen tur verisinin veritbanına kaydilmeden once kac saat sürdüğünü hesaplama
tourSchema.pre("save", function (next) {
  // gerekli işlemleri yap
  this.durationHour = this.duration * 24;

  // sonraki adıma devam et
  next();
});

//? pre() işlemden önce post() işlemden sonra middleware'i çalıştırmaya yarar
tourSchema.post("updateOne", function (doc, next) {
  // kullanıciya sifre güncelleme isleminden sonra haber veya dogrulama maili gonderme.
  console.log(doc._id, "şifreniz güncellendi maili gönderildi...");

  next();
});

//! Query Middleware
// Sorgulardan önce veya sonra çalıştırdğımız middleware'ler.
tourSchema.pre("find", function (next) {
  // premium olanlar her kullanciya gonderilmesini istemedigimiz icin sorgularda otomatik olarak premium olmayanlari filtrele
  this.find({ premium: { $ne: true } });

  next();
});

//! Aggregate Middleware
// Rapor olusturma islemlerinden once veya sonra calistirilan middleware'ler.
tourSchema.pre("aggregate", function (next) {
  // premium olan turları rapora dahil etmesin
  this.pipeline().unshift({ $match: { premium: { $ne: true } } });

  next();
});

//sema kullanarak bir model olusturma
const Tour = mongoose.model("Tour", tourSchema);

// controller'da kullanmak icin
module.exports = Tour;
