const express = require("express")
const router = require("express").Router()
const OAuthClient = require("./src/contoller/OAuthClient-controller")

router.get("/authUri", OAuthClient.GetAuthorizeUri)
router.get("/callback", OAuthClient.getAuthCode)
router.get("/retrieveToken", OAuthClient.retrieveToken)
router.get("/refreshAccessToken", OAuthClient.refreshAccessToken)
router.get("/disconnect", OAuthClient.disconnect)
router.get("/getCompanyInfo", OAuthClient.getCompanyInfo)
// router.get("/connect_to_quickbooks", OAuthClient.connect_to_quickbooks)
// router.get("/connect_handler", OAuthClient.connect_handler)
// router.get("/sign_in_with_intuit", OAuthClient.sign_in_with_intuit)
module.exports = router
