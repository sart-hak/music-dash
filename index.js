const express = require("express")
const mongoose = require("mongoose")
const routes = require('./routes')
const cors = require('cors')
require("dotenv").config()
const app = express()
const port = 8000

app.use(express.json())
app.use(cors({ origin: 'http://localhost:5173' }));
const startMongo = async () => {
  try {
    await mongoose.connect("mongodb+srv://admin:" + "Khatu11rs" + "@cluster0.ulobx.mongodb.net/?retryWrites=true&w=majority", {})
    console.log("Connected to MongoDB")
  } catch (error) {
    console.error("Error connecting to MongoDB:", error)
    process.exit(1)
  }
}

startMongo()

app.use("/", routes)

app.listen(port, () => {
  console.log("server has started on port ", port)
})
