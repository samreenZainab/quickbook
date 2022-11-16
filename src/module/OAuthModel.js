const mongoose = require("mongoose")

const OAuthSchema = new mongoose.Schema({
  user: {
    type: String,
    require: true
  },
  AccessToken: {
    type: String
  },
  refreshToken: {
    type: String
  },
  realmId: {
    type: String
  },
  oAuthCode: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now()
  },
  updatedAt: {
    type: Date,
    default: Date.now()
  }
})

module.exports = mongoose.model("oauthAssets", OAuthSchema)
