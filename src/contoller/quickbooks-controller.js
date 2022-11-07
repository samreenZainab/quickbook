// const quickbook = require("node-quickbooks")
// const { TOKEN_URL } = require("node-quickbooks")
// var qbo = new quickbookZ(
//   consumerKey,
//   consumerSecret,
//   oauthToken,
//   false, // no token secret for oAuth 2.0
//   realmId,
//   false, // use the sandbox?
//   true, // enable debugging?
//   null, // set minorversion, or null for the latest version
//   "2.0", //oAuth version
//   refreshToken
// )
// qbo.createAccount(qbo)

// qbo.createAttachable({ Note: "My File" }, function (err, attachable) {
//   if (err) console.log(err)
//   else console.log(attachable.Id)
// })

// qbo.getBillPayment("42", function (err, billPayment) {
//   console.log(billPayment)
// })

// qbo.updateCustomer(
//   {
//     Id: "42",
//     SyncToken: "1",
//     sparse: true,
//     PrimaryEmailAddr: { Address: "customer@example.com" }
//   },
//   function (err, customer) {
//     if (err) console.log(err)
//     else console.log(customer)
//   }
// )

// qbo.deleteAttachable("42", function (err, attachable) {
//   if (err) console.log(err)
//   else console.log(attachable)
// })

// qbo.findAccounts(
//   {
//     AccountType: "Expense",
//     desc: "MetaData.LastUpdatedTime",
//     limit: 5,
//     offset: 5
//   },
//   function (err, accounts) {
//     accounts.QueryResponse.Account.forEach(function (account) {
//       console.log(account.Name)
//     })
//   }
// )

// qbo.reportBalanceSheet({ department: "1,4,7" }, function (err, balanceSheet) {
//   console.log(balanceSheet)
// })

// qbo.upload(
//   "contractor.jpg",
//   "image/jpeg",
//   fs.createReadStream("contractor.jpg"),
//   "Invoice",
//   40,
//   function (err, data) {
//     console.log(err)
//     console.log(data)
//   }
// )
