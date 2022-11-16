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
let customer
class Quickbook {
  async createInvoice(req, res) {
    try {
      qbo.getCustomer(req.body.CustomerRef.value, (error, result) => {
        if (error) {
          console.log(JSON.stringify(error))
        }
        if (!result) {
          res.status(400).send({
            success: false,
            result,
            message: "customer not exist. Please create customer first"
          })
        } else {
          customer = result
          res.send(customer)
        }
      })

      //console.log(customer.Customer.DisplayName)
      // const obj = {
      //   Line: [
      //     {
      //       Description: "Rock Fountain",
      //       DetailType: "SalesItemLineDetail",
      //       SalesItemLineDetail: {
      //         // TaxCodeRef: {
      //         //   value: "TAX"
      //         // },
      //         Qty: 1,
      //         //UnitPrice: 290
      //         ItemRef: {
      //           name: "Rock Fountain",
      //           value: "5"
      //         }
      //       },
      //       //LineNum: 1,
      //       Amount: 20.0
      //       //Id: "1"
      //     }
      //   ],
      //   CustomerRef: {
      //     //name: customer.DisplayName,
      //     value: "6"
      //   }
      // }
      // //The post body for the Invoice create call

      // await qbo.createInvoice(req.body, (error, invoice) => {
      //   if (error) {
      //     console.log(error)
      //   }
      //   if (invoice) {
      //     res.status(200).send({
      //       success: true,
      //       invoice,
      //       message: "invoice has been created syccessfully "
      //     })
      //   }
      // })
    } catch (error) {
      console.error("The error message is :" + error)
      console.error(error.intuit_tid)
    }
  }
  async createCustomer(req, res) {
    let newCustomer = {
      //FullyQualifiedName: "King Grocerie",
      // PrimaryEmailAddr: {
      //   Address: "jdhre@myemail.com"
      // },
      DisplayName: "shalila"
      //Suffix: "senior",

      // Title: "Mr",
      // MiddleName: "a",

      //Notes: "Here are other details.",

      //FamilyName: "Kings",

      // PrimaryPhone: {
      //   FreeFormNumber: "(555) 555-5555"
      // },

      //CompanyName: "Kings Groceries",

      // BillAddr: {
      //   CountrySubDivisionCode: "CA",
      //   City: "Mountain View",
      //   PostalCode: "94042",
      //   Line1: "123 Main Street",
      //   Country: "USA"
      // },
      //GivenName: "Jame"
    }
    await qbo.createCustomer(req.body, (error, result) => {
      if (error) {
        console.log(error)
      }
      if (result) {
        res.status(200).send({
          success: true,
          result,
          message: "customer has been created syccessfully "
        })
      }
    })
  }
}

module.exports = new Quickbook()
