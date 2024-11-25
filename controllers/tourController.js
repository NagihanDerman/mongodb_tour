const Tour = require("../models/tourModel");

exports.getAllTours = async (req, res) => {
  try {
    // class'tan ornek alarak geriye sorgu olusturup dondurur
    const features = new APIFeatures(Tour.find(), req.query, req.formattedQuery)
      .filter()
      .limit()
      .sort()
      .pagination();

    // sorguyu calistirir
    const tours = await features.query;

    // client'a veritbanından gelen verileri gönderir
    res.json({ message: "getAllTours başarılı", results: tours.length, tours });
  } catch (error) {
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
