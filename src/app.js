const env = require("dotenv").config()
const express = require("express")
const PORT = process.env.PORT || 8080
const app = express()
const router = require("../router")

app.use(router)
app.listen(PORT, () => {
  console.log(`server listening to port: ${PORT}`)
})
module.exports = app
