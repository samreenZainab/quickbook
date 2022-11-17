const express = require('express');
const router = require('express').Router();
const OAuthClient = require('../contoller/OAuthClient-controller');

router.post('/authUri', OAuthClient.GetAuthorizeUri);
router.get('/callback', OAuthClient.getToken);
router.get('/retrieveToken', OAuthClient.retrieveToken);
router.get('/refreshAccessToken', OAuthClient.refreshAccessToken);
router.get('/disconnect', OAuthClient.disconnect);
router.get('/getCompanyInfo', OAuthClient.getCompanyInfo);
router.get('/getPersonalInfo', OAuthClient.getPersonalInfo);
module.exports = router;
