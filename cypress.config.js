const { defineConfig } = require("cypress");
const {
  addCucumberPreprocessorPlugin,
} = require("@badeball/cypress-cucumber-preprocessor");

const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");

const {
  createEsbuildPlugin,
} = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  reporter: "cypress-mochawesome-reporter",

  reporterOptions: {
    charts: true,
    reportPageTitle: "Relatório de Testes - ServeRest",
    embeddedScreenshots: true,
    inlineAssets: true,
    saveAllAttempts: false,
  },

  modifyObstructiveCode: true,
  viewportWidth: 1300,
  viewportHeight: 720,
  defaultCommandTimeout: 20000,

  e2e: {
    async setupNodeEvents(on, config) {
      // Cucumber
      await addCucumberPreprocessorPlugin(on, config);

      // Processa os arquivos .feature
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)],
        })
      );

      // Relatório Mochawesome
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    },

    specPattern: "cypress/features/**/*.feature",
    supportFile: "cypress/support/e2e.js",
  },
});