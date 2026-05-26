require('dotenv').config();
const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: process.env.CANARY_BASE_URL,
    viewportWidth: 1280,
    viewportHeight: 800,
    defaultCommandTimeout: 12000,
    requestTimeout: 15000,
    responseTimeout: 15000,
    video: true,
    screenshotOnRunFailure: true,
    screenshotsFolder: 'tests/evidence/cypress/screenshots',
    videosFolder: 'tests/evidence/cypress/videos',
    specPattern: 'cypress/e2e/**/*.cy.{js,ts}',
    supportFile: 'cypress/support/e2e.js',
  },
  env: {
    CANARY_EMAIL: process.env.CANARY_OPERATOR_EMAIL,
    CANARY_PASSWORD: process.env.CANARY_OPERATOR_PASSWORD,
    // UUID do chat do contato de teste — lido do .env para evitar commitar dados reais
    CHAT_UUID_TEST: process.env.TEST_CONTACT_CHAT_UUID,
  },
});
