const res = require("express/lib/response")
const quickbook = require("node-quickbooks")
const OAuthClient = require("intuit-oauth")
const bodyParser = require("body-parser")
// const tools = require("../tools/tools.js")
// const ngrok = process.env.NGROK_ENABLED === "true" ? require("ngrok") : null

const urlencodedParser = bodyParser.urlencoded({ extended: false })

let oauth2_token_json = null
let redirectUri = ""
let oauthClient = null

oauthClient = new OAuthClient({
  clientId: "AB4UnIYlydkKMzjMKyysjhpPKR8ME3An7vfOO4aTFB9ynyfP5z", // enter the apps `clientId`
  clientSecret: "QOqiP2FAc37lvPx5nm3eYxsnABK7PftqxvkyDgP3", // enter the apps `clientSecret`
  environment: "sandbox" || "production", // enter either `sandbox` or `production`
  redirectUri: "http://localhost:8000/callback", // enter the redirectUri
  logging: true // by default the value is `false`
})
class oauth {
  /**
   * Get the AuthorizeUri
   */
  GetAuthorizeUri(req, res) {
    try {
      const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: "intuit-test"
      })
      //console.log(authUri)
      res.redirect(authUri)
    } catch (e) {
      console.log("---------->")
      console.error("The error message is :" + e.originalMessage)
      console.error(e.intuit_tid)
    }
  }

  /**
   * Handle the callback to extract the `Auth Code` and exchange them for `Bearer-Tokens`
   */
  async getAuthCode(req, res) {
    try {
      const authResponse = await oauthClient.createToken(req.url)
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
      res.send(authResponse.getJson())
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }

  retrieveToken(req, res) {
    try {
      res.send(oauth2_token_json)
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }

  async refreshAccessToken() {
    try {
      authResponse = await oauthClient.refresh()
      oauth2_token_json = JSON.stringify(authResponse.getJson(), null, 2)
      res.send(oauth2_token_json)
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }
  async getCompanyInfo(req, res) {
    try {
      const companyID = oauthClient.getToken().realmId
      const url =
        oauthClient.environment == "sandbox"
          ? OAuthClient.environment.sandbox
          : OAuthClient.environment.production

      const authResponse = await oauthClient.makeApiCall({
        url: `${url}v3/company/${companyID}/companyinfo/${companyID}`
      })
      console.log(
        `The response for API call is :${JSON.stringify(authResponse)}`
      )
      res.send(JSON.parse(authResponse.text()))
    } catch (error) {
      console.error("The error message is :" + error.originalMessage)
      console.error(error.intuit_tid)
    }
  }
  /**
   * getCompanyInfo ()
   */
  getCompanyInfo(req, res) {
    const companyID = oauthClient.getToken().realmId

    const url =
      oauthClient.environment == "sandbox"
        ? OAuthClient.environment.sandbox
        : OAuthClient.environment.production

    oauthClient
      .makeApiCall({
        url: `${url}v3/company/${companyID}/companyinfo/${companyID}`
      })
      .then(function (authResponse) {
        console.log(
          `The response for API call is :${JSON.stringify(authResponse)}`
        )
        res.send(JSON.parse(authResponse.text()))
      })
      .catch(function (e) {
        console.error(e)
      })
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
  // connect_to_quickbooks(req, res) {
  //   // Set the Accounting + Payment scopes
  //   tools.setScopes("connect_to_quickbooks")

  //   // Constructs the authorization URI.
  //   var uri = tools.intuitAuth.code.getUri({
  //     // Add CSRF protection
  //     state: tools.generateAntiForgery(req.session)
  //   })

  //   // Redirect
  //   console.log("Redirecting to authorization uri: " + uri)
  //   res.redirect(uri)
  // }

  // /** /connect_handler **/
  // // This would be the endpoint that is called when "Get App Now" is clicked
  // // from apps.com
  // connect_handler(req, res) {
  //   // Set the OpenID + Accounting + Payment scopes
  //   tools.setScopes("connect_handler")

  //   // Constructs the authorization URI.
  //   var uri = tools.intuitAuth.code.getUri({
  //     // Add CSRF protection
  //     state: tools.generateAntiForgery(req.session)
  //   })

  //   // Redirect
  //   console.log("Redirecting to authorization uri: " + uri)
  //   res.redirect(uri)
  // }
  // /** /sign_in_with_intuit **/
  // sign_in_with_intuit(req, res) {
  //   // Set the OpenID scopes
  //   tools.setScopes("sign_in_with_intuit")

  //   // Constructs the authorization URI.
  //   var uri = tools.intuitAuth.code.getUri({
  //     // Add CSRF protection
  //     state: tools.generateAntiForgery(req.session)
  //   })

  //   // Redirect
  //   console.log("Redirecting to authorization uri: " + uri)
  //   res.redirect(uri)
  // }
}
module.exports = new oauth()
