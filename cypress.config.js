const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    "baseUrl": 'https://happy-field-011ab7b10.2.azurestaticapps.net',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: 'cypress/specs/*.js'
  },
  
});
