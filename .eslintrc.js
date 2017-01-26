module.exports = {
  "parser": "babel-eslint",
  "extends": [
    "eslint-config-airbnb-base",
    "eslint-config-airbnb-base/rules/strict"
  ],
  "env": {
    "node": true,
    "es6": true,
    "mocha": true
  },
  "rules": {
    "import/no-unresolved": ["error", { "ignore": ["^~"] }],
    "import/extensions": 0,
    "global-require": 0
  }
};
