const express = require("express");
const mongoose = require("mongoose");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

//express uygulamasi olusturma
const app = express();

//middleware aktif ediyoruz
app.use(express.json());

// router'ları projeye tanıt
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

//server.js de kullanmak iicn export
module.exports = app;
