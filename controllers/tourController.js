const Tour = require("../models/tourModel");
const APIFeatures = require("../utils/apiFeatures");

exports.getAllTours = async (req, res) => {
  try {
    //classtan ornek alip geriye sorguyu olusturup donduruyor
    const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery)
      .filter()
      .limit()
      .sort()
      .pagination();

    //sorguyu calisitirma
    const tours = await features.query;

    res.json({ message: "getAllTours başarılı", results: tours.length, tours });
  } catch (error) {
    console.error("getAllTours hata:", error.message);
    res
      .status(500)
      .json({ message: "getAllTours başarısız", error: error.message });
  }
};

exports.createTours = async (req, res) => {
  try {
    // veirtabanina yeni tur kaydeder
    const newTour = await Tour.create(req.body);

    // client'a cevap gonderir
    res.json({ text: "createTour başarılı", tour: newTour });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ text: "createTour başarısız", error: error.message });
  }
};

exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.json({ message: "getTour başarılı", tour });
  } catch (error) {
    res.status(400).json({ message: "getTour başarsiz", error: error.message });
  }
};

exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.deleteOne({ _id: req.params.id });
    res.status(204).json({});
  } catch (error) {
    res.status(400).json({ text: "deleteTour basarisiz" });
  }
};

exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json({ message: "updateTours başarılı", tour });
  } catch (error) {
    res.status(400).json({ text: "updateTours başarısiz" });
  }
};


// istek parametreleri frontend yerine mw ile burada tanimliyoruz(alias routes))
exports.aliasTopTours = (req, res, next) => {
  req.query.sort = "-ratingsAverage,-ratingsQuantity";
  req.query["price[lte]"] = "1200";
  req.query.limit = 5;
  req.query.fields = "name,price,ratingsAverage,summary,difficulty";

  next();
};


//! rapor oluşturup gönderme
// zorluga gore gruplandirarak istatistik hesaplama
exports.getTourStats = (async (req, res, next) => {
  //! Aggeregation Pipeline
  // Raporlama Adimlari
  const stats = await Tour.aggregate([
    // 1- ratingi 4 ve uzeri olan turlari bul ve al
    { $match: { ratingsAverage: { $gte: 4 } } },
    // 2- zorluga gore gruplandir ve ortalama degerlerini hesapla
    {
      $group: {
        _id: "$difficulty",
        count: { $sum: 1 },
        avgRating: { $avg: "$ratingsAverage" },
        avgPrice: { $avg: "$price" },
        minPrice: { $min: "$price" },
        maxPrice: { $max: "$price" },
      },
    },
    // 3- gruplanan veriyi fiyata gore sirala
    { $sort: { avgPrice: 1 } },
    // 4- fiyatı 500'den buyul olanlari al
    { $match: { avgPrice: { $gte: 500 } } },
  ]);

  return res.status(200).json({ message: "Rapor Oluşturuldu", stats });
});
