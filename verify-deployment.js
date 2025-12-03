const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();
  
  const screenshotsDir = path.join(__dirname, 'deployment-screenshots');
  if (!fs.existsSync(screenshotsDir)) {
    fs.mkdirSync(screenshotsDir, { recursive: true });
  }

  console.log('🚀 Starting deployment verification...\n');
  
  // Set up console error listener before navigation
  const errors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  
  try {
    // Navigate to the deployed site
    console.log('📍 Navigating to https://kelvenray.github.io/myfrontend/');
    await page.goto('https://kelvenray.github.io/myfrontend/', { 
      waitUntil: 'networkidle',
      timeout: 30000 
    });
    
    // Wait a bit for the page to fully render
    await page.waitForTimeout(2000);
    
    // Take screenshot of Dashboard
    console.log('📸 Taking screenshot of Dashboard page...');
    await page.screenshot({ 
      path: path.join(screenshotsDir, '1-dashboard.png'),
      fullPage: true 
    });
    console.log('✅ Dashboard screenshot saved\n');
    
    // Navigate to Charts
    console.log('📍 Navigating to Charts page...');
    await page.click('text=图表页');
    await page.waitForTimeout(3000); // Wait for charts to render
    await page.screenshot({ 
      path: path.join(screenshotsDir, '2-charts.png'),
      fullPage: true 
    });
    console.log('✅ Charts screenshot saved\n');
    
    // Navigate to Form
    console.log('📍 Navigating to Form page...');
    await page.click('text=表单页');
    await page.waitForTimeout(1500);
    await page.screenshot({ 
      path: path.join(screenshotsDir, '3-form.png'),
      fullPage: true 
    });
    console.log('✅ Form screenshot saved\n');
    
    // Navigate to Login
    console.log('📍 Navigating to Login page...');
    await page.click('text=登录页');
    await page.waitForTimeout(1500);
    await page.screenshot({ 
      path: path.join(screenshotsDir, '4-login.png'),
      fullPage: true 
    });
    console.log('✅ Login screenshot saved\n');
    
    // Test multiple rapid navigation switches
    console.log('🔄 Testing multiple rapid navigation switches...');
    for (let i = 1; i <= 3; i++) {
      console.log(`  Iteration ${i}:`);
      
      await page.click('text=Dashboard');
      await page.waitForTimeout(800);
      console.log('    ✓ Dashboard');
      
      await page.click('text=图表页');
      await page.waitForTimeout(800);
      console.log('    ✓ Charts');
      
      await page.click('text=表单页');
      await page.waitForTimeout(800);
      console.log('    ✓ Form');
      
      await page.click('text=登录页');
      await page.waitForTimeout(800);
      console.log('    ✓ Login');
    }
    
    // Take final screenshot after rapid navigation
    await page.click('text=Dashboard');
    await page.waitForTimeout(1000);
    await page.screenshot({ 
      path: path.join(screenshotsDir, '5-after-rapid-navigation.png'),
      fullPage: true 
    });
    console.log('\n✅ Rapid navigation test completed successfully!\n');
    
    console.log('✨ All validations completed successfully!');
    console.log(`📁 Screenshots saved to: ${screenshotsDir}`);
    
    if (errors.length > 0) {
      console.log('\n⚠️  Console errors detected:');
      errors.forEach(err => console.log(`  - ${err}`));
    } else {
      console.log('\n✅ No console errors detected');
    }
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    await page.screenshot({ 
      path: path.join(screenshotsDir, 'error.png'),
      fullPage: true 
    });
    console.log(`📸 Error screenshot saved to: ${path.join(screenshotsDir, 'error.png')}`);
  } finally {
    await browser.close();
  }
})();
