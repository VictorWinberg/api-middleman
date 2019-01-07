// index.js
global.FormData = require("form-data");

const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");
const toFormData = require("object-to-formdata");
const multer = require("multer");
const { omit, isNil, pickBy, isEmpty, mapValues } = require("lodash/fp");

const { isGetMethod, isReqForm, isResJson } = require("./helpers");

const app = express();
const PORT = 3009;

app.use(express.static(path.resolve(__dirname, "..", "client")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post("/test", multer().any(), (req, res) => res.send(req.body));

app.post("/", multer().any(), async (req, res) => {
  const { username, url, method, ...rest } = req.headers;
  const missing = pickBy(isNil, { username, url, method });

  if (!isEmpty(missing))
    return res
      .status(422)
      .send({ errors: mapValues(() => "can't be blank", missing) });

  let { body } = req;
  const headers = omit(
    ["host", "accept-encoding", "content-type", "content-length"],
    rest
  );

  if (isGetMethod(method)) body = undefined;
  else if (isReqForm(req)) body = toFormData(body);
  else body = JSON.stringify(body);

  const ret = await fetch(url, { method, body, headers });
  const val = isResJson(ret) ? await ret.json() : await ret.text();

  return res.send(val);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "..", "client", "index.html"));
});

app.listen(PORT, () => console.log("API Middleman listening on port 3003!"));
