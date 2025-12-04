const { test, expect } = require('@playwright/test');

test.describe('Quick Validation Tests', () => {
  test('should load the main page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Check if the page title is correct
    await expect(page).toHaveTitle(/TECHMAN 2025/);
    
    // Check if the TECHMAN logo is visible
    await expect(page.locator('.logo')).toBeVisible({ timeout: 10000 });
    
    console.log('✓ Main page loaded successfully');
  });

  test('should navigate to all pages', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Test Dashboard
    await expect(page.locator('.nav-item.active')).toContainText('Dashboard');
    console.log('✓ Dashboard page is active by default');
    
    // Navigate to Charts
    await page.click('text=图表页');
    await page.waitForTimeout(2000); // Wait for navigation and chart rendering
    await expect(page.locator('h1.title')).toContainText('数据可视化', { timeout: 5000 });
    console.log('✓ Charts page navigation successful');
    
    // Navigate to Form
    await page.click('text=表单页');
    await page.waitForTimeout(1000);
    await expect(page.locator('h1.title')).toContainText('控件展示', { timeout: 5000 });
    console.log('✓ Form page navigation successful');
    
    // Navigate to Login
    await page.click('text=登录页');
    await page.waitForTimeout(1000);
    await expect(page.locator('.login-card')).toBeVisible({ timeout: 5000 });
    console.log('✓ Login page navigation successful');
    
    // Navigate back to Dashboard
    await page.click('text=Dashboard');
    await page.waitForTimeout(1000);
    await expect(page.locator('h1.title')).toContainText('欢迎回来', { timeout: 5000 });
    console.log('✓ Back to Dashboard successful');
  });

  test('should test multiple rapid navigation switches', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    for (let i = 0; i < 3; i++) {
      console.log(`\nIteration ${i + 1}:`);
      
      // Navigate to Charts
      await page.click('text=图表页');
      await page.waitForTimeout(1500);
      await expect(page.locator('h1.title')).toContainText('数据可视化', { timeout: 5000 });
      console.log('  ✓ Charts page');
      
      // Navigate to Form
      await page.click('text=表单页');
      await page.waitForTimeout(800);
      await expect(page.locator('h1.title')).toContainText('控件展示', { timeout: 5000 });
      console.log('  ✓ Form page');
      
      // Navigate to Login
      await page.click('text=登录页');
      await page.waitForTimeout(800);
      await expect(page.locator('.login-card')).toBeVisible({ timeout: 5000 });
      console.log('  ✓ Login page');
      
      // Navigate back to Dashboard
      await page.click('text=Dashboard');
      await page.waitForTimeout(800);
      await expect(page.locator('h1.title')).toContainText('欢迎回来', { timeout: 5000 });
      console.log('  ✓ Dashboard page');
    }
    
    console.log('\n✓ All rapid navigation tests passed successfully!');
  });

  test('should verify key components on Form page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Navigate to Form page
    await page.click('text=表单页');
    await page.waitForTimeout(1000);
    
    // Check for various components
    await expect(page.locator('.btn.primary').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Buttons are visible');
    
    await expect(page.locator('.input').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Input fields are visible');
    
    await expect(page.locator('.alert').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Alerts are visible');
    
    await expect(page.locator('.badge').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Badges are visible');
    
    await expect(page.locator('.accordion').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Accordion is visible');
    
    await expect(page.locator('.tabs').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Tabs are visible');
    
    await expect(page.locator('.data-table').first()).toBeVisible({ timeout: 5000 });
    console.log('✓ Data table is visible');
  });

  test('should verify charts render on Charts page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Navigate to Charts page
    await page.click('text=图表页');
    await page.waitForTimeout(2000); // Wait for charts to render
    
    // Check if all chart containers exist
    const chartContainers = page.locator('.chart');
    await expect(chartContainers).toHaveCount(3, { timeout: 5000 });
    console.log('✓ All 3 charts are present');
    
    // Verify chart titles
    await expect(page.locator('.chart-title').nth(0)).toContainText('折线图', { timeout: 5000 });
    await expect(page.locator('.chart-title').nth(1)).toContainText('柱状图', { timeout: 5000 });
    await expect(page.locator('.chart-title').nth(2)).toContainText('饼图', { timeout: 5000 });
    console.log('✓ All chart titles are correct');
  });

  test('should handle button group clicks and active states', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle', { timeout: 10000 });
    
    // Navigate to Form page where button groups are displayed
    await page.click('text=表单页');
    await page.waitForTimeout(1000);
    await expect(page.locator('h1.title')).toContainText('控件展示', { timeout: 5000 });
    
    // Test horizontal button group
    console.log('Testing horizontal button group:');
    
    // Initially no button should be active
    await expect(page.locator('.btn-group:not(.vertical) .btn.active')).toHaveCount(0);
    console.log('✓ No buttons active initially (horizontal group)');
    
    // Click left button
    await page.locator('.btn-group:not(.vertical) .btn:has-text("左")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('.btn-group:not(.vertical) .btn:has-text("左")')).toHaveClass(/active/);
    console.log('✓ Left button activated');
    
    // Click center button
    await page.locator('.btn-group:not(.vertical) .btn:has-text("中")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('.btn-group:not(.vertical) .btn:has-text("中")')).toHaveClass(/active/);
    await expect(page.locator('.btn-group:not(.vertical) .btn:has-text("左")')).not.toHaveClass(/active/);
    console.log('✓ Center button activated, left button deactivated');
    
    // Click right button
    await page.locator('.btn-group:not(.vertical) .btn:has-text("右")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('.btn-group:not(.vertical) .btn:has-text("右")')).toHaveClass(/active/);
    await expect(page.locator('.btn-group:not(.vertical) .btn:has-text("中")')).not.toHaveClass(/active/);
    console.log('✓ Right button activated, center button deactivated');
    
    // Test vertical button group
    console.log('\nTesting vertical button group:');
    
    // Initially no button should be active
    await expect(page.locator('.btn-group.vertical .btn.active')).toHaveCount(0);
    console.log('✓ No buttons active initially (vertical group)');
    
    // Click top button
    await page.locator('.btn-group.vertical .btn:has-text("顶部")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('.btn-group.vertical .btn:has-text("顶部")')).toHaveClass(/active/);
    console.log('✓ Top button activated');
    
    // Click middle button
    await page.locator('.btn-group.vertical .btn:has-text("中间")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('.btn-group.vertical .btn:has-text("中间")')).toHaveClass(/active/);
    await expect(page.locator('.btn-group.vertical .btn:has-text("顶部")')).not.toHaveClass(/active/);
    console.log('✓ Middle button activated, top button deactivated');
    
    // Click bottom button
    await page.locator('.btn-group.vertical .btn:has-text("底部")').click();
    await page.waitForTimeout(500);
    await expect(page.locator('.btn-group.vertical .btn:has-text("底部")')).toHaveClass(/active/);
    await expect(page.locator('.btn-group.vertical .btn:has-text("中间")')).not.toHaveClass(/active/);
    console.log('✓ Bottom button activated, middle button deactivated');
    
    console.log('\n✓ All button group tests passed successfully!');
  });
});
