const { includes, toUpper } = require("lodash/fp");

const isGetMethod = method => ["GET", "HEAD"].includes(toUpper(method));

const isReqForm = req => includes("form", req.get("Content-Type"));

const isResJson = res => includes("json", res.headers.get("Content-Type"));

module.exports = { isGetMethod, isReqForm, isResJson };
