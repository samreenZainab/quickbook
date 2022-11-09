const express = require("express")
const router = require("express").Router()
const quickbookController = require("../contoller/quickbooks-controller")
router.post("/createInvoice", quickbookController.createInvoice)
module.exports = router
