// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  /* Shared settings for all projects */
  use: {
    /* This will launch browsers in headed mode */
    headless: false, 
    
    /* Screenshots: Automatic screenshots on failure */
    screenshot: 'only-on-failure',
    
    /* Video Recordings: Video of test execution */
    video: 'retain-on-failure',
    
    /* Traces: Detailed execution traces for debugging */
    trace: 'retain-on-failure',
    
    /* You can also add launchOptions to slow down execution so you can see what's happening */
    // launchOptions: {
    //   slowMo: 500,
    // },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
});