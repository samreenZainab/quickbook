const env = require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 8080
const app = express()
const mongoose = require("mongoose")
const config = require("../config.json")
const router = require("../router")

mongoose
  .connect(config.dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.info("Database connected successfully")
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
app.use(router)
app.listen(PORT, () => {
  console.log(`server listening to port: ${PORT}`)
})
module.exports = app
