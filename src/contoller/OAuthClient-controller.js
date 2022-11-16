const res = require("express/lib/response")
const quickbook = require("node-quickbooks")
const OAuthClient = require("intuit-oauth")
const bodyParser = require("body-parser")
const config = require("../../config.json")
const sessions = require("express-session")
var session
const oneHour = 60 * 60
const urlencodedParser = bodyParser.urlencoded({ extended: false })

let oauth2_token_json = null
let oauthClient = null

oauthClient = new OAuthClient({
  clientId: config.OAuthClient.clientId,
  clientSecret: config.OAuthClient.clientId,
  environment: "sandbox" || "production", // enter either `sandbox` or `production`
  redirectUri: config.OAuthClient.redirectUri,
  logging: false
})
class oauth {
  /**
   * Get the AuthorizeUri
   */
  async GetAuthorizeUri(req, res) {
    try {
      oauthClient = new OAuthClient({
        clientId: req.body.clientId,
        clientSecret: req.body.clientSecret,
        environment: "sandbox" || "production", // enter either `sandbox` or `production`
        redirectUri: config.OAuthClient.redirectUri
      })
      const authUri = await oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: "testState"
      })
      res.send(authUri)
    } catch (e) {
      console.error("The error message is :" + e.originalMessage)
      console.error(e.intuit_tid)
    }
  }

  /**
   * Handle the callback to extract the `Auth Code` and `realmId` exchange them for `Bearer-Tokens` name as access token and refresh Token
   */
  async getToken(req, res) {
    try {
      if (req.authCode && req.realmId) {
        const authResponse = await oauthClient.createToken(
          req.authCode,
          req.realmId
        )
        oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
        res.send(authResponse.getJson())
      } else {
        res.send(config.qData)
      }
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }

  retrieveToken(req, res) {
    try {
      res.send(config.qData.accessToken)
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }

  async refreshAccessToken(req, res) {
    try {
      if (!oauthClient.isAccessTokenValid()) {
        await oauthClient.refresh()
      } else A
      authResponse = await oauthClient.refresh(
        (refreshToken = config.refreshToken)
      )
      res.send(authResponse)
      //oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
      //res.send(oauth2_token_json)
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }
  async getCompanyInfo(req, res) {
    try {
      const companyID = oauthClient.getToken().realmId
      const baseURL = "http://sandbox-quickbooks.api.intute.com"
      const url = `${baseURL}/v3/company/${config.qData.realmId}/companyinfo/${config.qData.realmId}`
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production
      const authHeader = `Bearer ${config.qData.accessToken}`
      const header = {
        Accept: "application/json",
        Authorization: authHeader
      }
      const authResponse = await oauthClient.makeApiCall({
        url: url,
        headers: header
      })
      res.send(authResponse)
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }
  /**
   * getPersonalInfo ()
   */
  async getPersonalInfo(req, res) {
    try {
      const baseURL = "http://sandbox-quickbooks.api.intute.com"
      const url = `${baseURL}/v1/openid_connect/userinfo`
      const auth_header = `Bearer ${config.qData.accessToken}`
      const data = {
        Authorization: auth_header
      }
      const headers = {
        Accept: "application/json;charset=UTF-8",
        Authorization: auth_header,
        "Content-type": "*/*"
      }
      const authResponse = await oauthClient.makeApiCall({
        url: url,
        headers: headers
      })
      res.send(authResponse)
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }

  /**
   * disconnect ()
   */
  disconnect(req, res) {
    const authUri = oauthClient.authorizeUri({
      scope: [OAuthClient.scopes.OpenId, OAuthClient.scopes.Email],
      state: "intuit-test"
    })
    res.redirect(authUri)
  }

  async refreshToken(req, res) {
    try {
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }
}
module.exports = new oauth()
