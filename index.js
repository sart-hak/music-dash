const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const app = express();
const port = 8000;

                                                                                           
//MongoDb connection
mongoose
  .connect(
    "mongodb+srv://admin:" +
      process.env.MONGO_PASS +
      "@cluster0.ulobx.mongodb.net/?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then((x) => {
    console.log("connected");
  })
  .catch((err) => {
    console.log("error");
  });



app.listen(port, () => {
  console.log("server has started on port " + port);
});

