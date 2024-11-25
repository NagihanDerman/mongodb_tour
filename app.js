const express = require("express");
const mongoose = require("mongoose");
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");
const reviewRouter = require("./routes/reviewRoutes");

//express uygulamasi olusturma
const app = express();

//middleware aktif etme
app.use(express.json());

// router'lari projeye tanit
app.use("/api/tours", tourRouter);
app.use("/api/users", userRouter);
app.use("/api/reviews", reviewRouter);

//server.js de kullanmak icin export
module.exports = app;
