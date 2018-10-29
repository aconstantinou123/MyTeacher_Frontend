module.exports = {
  "extends": ["airbnb"],
  "env": {
    "browser": true,
    "jest": true
  },
  "rules": {
    "import/no-unresolved": "off",
    "import/extensions": "off",
    "no-console": 0,
    "semi": ["warn", "never"],
    "react/jsx-filename-extension": ["warn", { "extensions": [".js", ".jsx"] }],
    "no-underscore-dangle": ["error", {
      "allow": ["_id", "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]
    }],
    "react/forbid-prop-types": false,
    "import/prefer-default-export": 0,
    "react/sort-comp": 1,
  },
  "parser": "babel-eslint"
}