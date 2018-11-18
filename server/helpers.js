const { includes, toUpper } = require("lodash/fp");

const isGetMethod = method => ["GET", "HEAD"].includes(toUpper(method));

const isReqForm = req =>
  includes("application/x-www-form-urlencoded", req.get("Content-Type"));

const isResJson = res =>
  includes("application/json", res.headers.get("Content-Type"));

module.exports = { isGetMethod, isReqForm, isResJson };
