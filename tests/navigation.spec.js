const { test, expect } = require('@playwright/test');

test.describe('TECHMAN Dashboard Navigation and Components', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the deployed GitHub Pages site
    await page.goto('/');
    // Wait for the app to load
    await page.waitForLoadState('networkidle');
  });

  test('should load the dashboard page by default', async ({ page }) => {
    // Check if the page title is correct
    await expect(page).toHaveTitle(/TECHMAN 2025/);
    
    // Check if the TECHMAN logo is visible
    await expect(page.locator('.logo')).toBeVisible();
    
    // Check if Dashboard is the active page
    await expect(page.locator('.nav-item.active')).toContainText('Dashboard');
  });

  test('should navigate to Charts page', async ({ page }) => {
    // Click on the Charts navigation item
    await page.click('text=图表页');
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000); // Give time for charts to render
    
    // Check if the Charts title is visible
    await expect(page.locator('h1.title')).toContainText('数据可视化');
    
    // Check if charts are present (looking for chart containers)
    const chartContainers = page.locator('.chart');
    await expect(chartContainers).toHaveCount(3);
  });

  test('should navigate to Form page', async ({ page }) => {
    // Click on the Form navigation item
    await page.click('text=表单页');
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Check if the Form title is visible
    await expect(page.locator('h1.title')).toContainText('控件展示');
    
    // Verify some form components are present
    await expect(page.locator('.btn.primary')).toBeVisible();
    await expect(page.locator('.input').first()).toBeVisible();
  });

  test('should navigate to Login page', async ({ page }) => {
    // Click on the Login navigation item
    await page.click('text=登录页');
    
    // Wait for navigation
    await page.waitForLoadState('networkidle');
    
    // Check if the login card is visible
    await expect(page.locator('.login-card')).toBeVisible();
    
    // Verify login form elements
    await expect(page.locator('input[type="text"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should navigate back to Dashboard from other pages', async ({ page }) => {
    // Navigate to Charts
    await page.click('text=图表页');
    await page.waitForLoadState('networkidle');
    
    // Navigate back to Dashboard
    await page.click('text=Dashboard');
    await page.waitForLoadState('networkidle');
    
    // Verify we're on Dashboard
    await expect(page.locator('h1.title')).toContainText('欢迎回来');
    
    // Check for Dashboard stats
    await expect(page.locator('.stat').first()).toBeVisible();
  });

  test('should handle multiple navigation switches', async ({ page }) => {
    // Navigate to Charts
    await page.click('text=图表页');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Navigate to Form
    await page.click('text=表单页');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Navigate to Login
    await page.click('text=登录页');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(500);
    
    // Navigate back to Dashboard
    await page.click('text=Dashboard');
    await page.waitForLoadState('networkidle');
    
    // Verify Dashboard is showing
    await expect(page.locator('h1.title')).toContainText('欢迎回来');
    
    // Navigate to Charts again
    await page.click('text=图表页');
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(1000);
    
    // Verify Charts page is showing
    await expect(page.locator('h1.title')).toContainText('数据可视化');
  });

  test('should have functional theme toggle button', async ({ page }) => {
    // Check if theme button exists
    await expect(page.locator('#themeBtn')).toBeVisible();
  });

  test('should have functional color scheme button', async ({ page }) => {
    // Check if color scheme button exists
    await expect(page.locator('#colorSchemeBtn')).toBeVisible();
  });

  test('should have functional menu button', async ({ page }) => {
    // Check if menu button exists
    await expect(page.locator('#menuBtn')).toBeVisible();
  });
});

test.describe('Form Components Validation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Navigate to Form page
    await page.click('text=表单页');
    await page.waitForLoadState('networkidle');
  });

  test('should display various button types', async ({ page }) => {
    // Check for different button types
    await expect(page.locator('.btn.primary').first()).toBeVisible();
    await expect(page.locator('.btn.secondary').first()).toBeVisible();
    await expect(page.locator('.btn.reset').first()).toBeVisible();
    await expect(page.locator('.btn.danger').first()).toBeVisible();
  });

  test('should display icon buttons', async ({ page }) => {
    // Check for icon buttons
    await expect(page.locator('.icon-btn').first()).toBeVisible();
  });

  test('should display input fields', async ({ page }) => {
    // Check for input fields
    await expect(page.locator('.input').first()).toBeVisible();
  });

  test('should display alerts', async ({ page }) => {
    // Check for different alert types
    await expect(page.locator('.alert.success')).toBeVisible();
    await expect(page.locator('.alert.warning')).toBeVisible();
    await expect(page.locator('.alert.error')).toBeVisible();
    await expect(page.locator('.alert.info')).toBeVisible();
  });

  test('should display badges', async ({ page }) => {
    // Check for badges
    await expect(page.locator('.badge.primary').first()).toBeVisible();
  });

  test('should display accordion component', async ({ page }) => {
    // Check for accordion
    await expect(page.locator('.accordion')).toBeVisible();
  });

  test('should display tabs component', async ({ page }) => {
    // Check for tabs
    await expect(page.locator('.tabs')).toBeVisible();
  });

  test('should display pagination component', async ({ page }) => {
    // Check for pagination
    await expect(page.locator('.pagination')).toBeVisible();
  });

  test('should display data table', async ({ page }) => {
    // Check for data table
    await expect(page.locator('.data-table')).toBeVisible();
  });
});

test.describe('Charts Rendering', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Navigate to Charts page
    await page.click('text=图表页');
    await page.waitForLoadState('networkidle');
    // Wait for charts to render
    await page.waitForTimeout(2000);
  });

  test('should render all three charts', async ({ page }) => {
    // Check if all chart containers exist
    const chartContainers = page.locator('.chart');
    await expect(chartContainers).toHaveCount(3);
    
    // Verify chart titles
    await expect(page.locator('.chart-title').nth(0)).toContainText('折线图');
    await expect(page.locator('.chart-title').nth(1)).toContainText('柱状图');
    await expect(page.locator('.chart-title').nth(2)).toContainText('饼图');
  });
});
