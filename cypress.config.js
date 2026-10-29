const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'cypress-mochawesome-reporter',

  reporterOptions: {
    reportDir: 'cypress/reports',
    reportPageTitle: 'Trabalho final — PGATS',
    embeddedScreenshots: true,
    inlineAssets: true
  },

  e2e: {
    baseUrl: 'https://automationexercise.com',
    defaultBrowser: 'chrome',

    setupNodeEvents(on) {
      require('cypress-mochawesome-reporter/plugin')(on);
    }
  }
});