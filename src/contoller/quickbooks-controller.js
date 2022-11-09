const quickbook = require("node-quickbooks")
const config = require("../../config.json")
const ResponseService = require("../services/responseService")
qbo = new quickbook(
  config.OAuthClient.clientId,
  config.OAuthClient.clientSecret,
  config.qData.accessToken,
  true, // no token secret for oAuth 2.0
  config.qData.realmId,
  true, // use the sandbox?
  true, // enable debugging?
  null, // set minorversion, or null for the latest version
  "2.0", //oAuth version
  config.refreshToken
)
class Quickbook {
  async createInvoice(req, res) {
    let cust
    let itemss
    let ItemBeforeInvoice
    try {
      const obj = {
        Line: [
          {
            Description: "Rock Fountain",
            DetailType: "SalesItemLineDetail",
            SalesItemLineDetail: {
              TaxCodeRef: {
                value: "TAX"
              },
              Qty: 1,
              UnitPrice: 600,
              ItemRef: {
                name: "Rock Fountain",
                value: "5"
              }
            },
            LineNum: 1,
            Amount: 600.0,
            Id: "1"
          }
        ],
        CustomerRef: {
          name: "Cool Cars",
          value: "2"
        }
      }
      //The post body for the Invoice create call
      await qbo.createInvoice(obj, (error, invoice) => {
        if (error) {
          console.log(error)
        }
        if (invoice) {
          res.status(200).send({
            message: "invoice has been generated",
            invoice
          })
        }
      })
    } catch (error) {
      console.error("The error message is :" + error)
      console.error(error.intuit_tid)
    }
  }
}

module.exports = new Quickbook()
