import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: 'https://moviedle.azurewebsites.net',
    setupNodeEvents(on, config) {},
  },
});