module.exports = {
  parser: "babel-eslint",
  env: {
    browser: true,
    node: true,
    es6: true,
    amd: true
  },
  extends: [
    "eslint:recommended",
    "plugin:requirejs/recommended",
    "prettier",
    "prettier/standard"
  ],
  plugins: ["requirejs"]
};
