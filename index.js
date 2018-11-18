// index.js
global.FormData = require("form-data");

const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const toFormData = require("object-to-formdata");
const { omit, isNil, pickBy, isEmpty, mapValues } = require("lodash/fp");

const { isGetMethod, isReqForm, isResJson } = require("./helpers");

const app = express();
const PORT = 3003;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello API Middleman!"));

app.post("/", async (req, res) => {
  const { username, url, method, ...rest } = req.headers;
  const missing = pickBy(isNil, { username, url, method });

  if (!isEmpty(missing))
    return res.send({ errors: mapValues(() => "can't be blank", missing) });

  let { body } = req;
  const headers = omit(["host", "content-type", "content-length"], rest);

  if (isGetMethod(method)) body = undefined;
  else if (isReqForm(req)) body = toFormData(body);

  const ret = await fetch(url, { method, body, headers });
  const val = isResJson(ret) ? await ret.json() : await ret.text();

  return res.send(val);
});

app.listen(PORT, () => console.log("API Middleman listening on port 3003!"));
