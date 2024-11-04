const js = require("@eslint/js");

module.exports = [
    js.configs.recommended,

   {
       rules: {
           "no-unused-vars": "warn",
           "no-undef": "warn",
           "parser": "@babel/eslint-parser",
            "parserOptions": {
                "babelOptions": { 
                    "configFile": "./server/babel.config.js" 
                } 
            },
       }
   }
];