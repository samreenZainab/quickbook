const express = require("express")
const { createInvoice } = require("../contoller/quickbooks-controller")
const router = require("express").Router()

router.post("/createInvoice", createInvoice)
// router.post("/createAccount", quickbookController.createCustomer)
module.exports = router
