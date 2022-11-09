const express = require("express")
const router = require("express").Router()
const quickbookRoute = require("./src/routes/quickbook")
const oauthRoute = require("./src/routes/sign-in-with-intuit")
router.use("/oauth", oauthRoute)
router.use("/quickbook", quickbookRoute)
module.exports = router
