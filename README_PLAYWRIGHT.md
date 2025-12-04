# Playwright Testing for TECHMAN Dashboard

## 概述 (Overview)

此项目已配置 Playwright 自动化测试框架，用于验证部署后的页面功能。
This project is configured with Playwright automated testing framework to validate deployed page functionality.

## 安装 (Installation)

测试依赖已包含在项目中：
Test dependencies are already included in the project:

```bash
npm install
```

## 运行测试 (Running Tests)

### 方法一：测试本地构建 (Test Local Build)

1. 构建 Vue3 应用 (Build Vue3 app):
```bash
cd Vue3
npm install
chmod +x node_modules/.bin/vite
npm run build
cd ..
```

2. 运行测试 (Run tests):
```bash
npm test
```

### 方法二：手动验证部署 (Manual Verification of Deployment)

由于网络限制，建议手动访问部署的网站进行验证：
Due to network restrictions, manual verification of the deployed website is recommended:

**部署地址 (Deployment URL):** https://kelvenray.github.io/myfrontend/

#### 验证步骤 (Verification Steps):

1. **测试基本导航 (Test Basic Navigation)**
   - 访问首页，确认 Dashboard 页面加载
   - 点击 "图表页" - 应显示三个图表
   - 点击 "表单页" - 应显示各种表单组件
   - 点击 "登录页" - 应显示登录表单
   - 返回 Dashboard

2. **测试快速切换导航 (Test Rapid Navigation Switching)**
   
   这是用户报告的问题点，需要重点测试：
   This is the issue point reported by the user, needs focused testing:
   
   - 快速连续点击不同页面 3-5 次
   - Dashboard → 图表页 → 表单页 → 登录页 → Dashboard
   - 重复 2-3 遍
   - 确认没有错误，页面正常加载

3. **验证表单页组件 (Verify Form Page Components)**
   - ✅ 按钮正常显示
   - ✅ 输入框可见
   - ✅ 提示框（成功、警告、错误、信息）正常显示
   - ✅ 徽章显示正确
   - ✅ 手风琴组件可展开/折叠
   - ✅ 标签页可切换
   - ✅ 数据表格正常显示

4. **验证图表渲染 (Verify Charts Rendering)**
   - ✅ 三个图表容器都可见
   - ✅ 折线图显示正确
   - ✅ 柱状图显示正确
   - ✅ 饼图显示正确
   - ✅ 控制台无错误

## 测试文件说明 (Test Files Description)

### `tests/navigation.spec.js`
全面的导航和组件测试套件，包括：
Comprehensive navigation and component test suite, including:
- 页面导航测试
- 快速切换导航测试
- 组件可见性验证
- 图表渲染验证

### `tests/quick-validation.spec.js`
快速验证测试，重点测试：
Quick validation tests, focusing on:
- 基本页面加载
- 多次快速导航切换（3次迭代）
- 关键组件验证
- 图表渲染验证

### `verify-deployment.js`
部署验证脚本，自动截图并测试：
Deployment verification script, auto-screenshots and tests:
- 自动访问所有页面
- 保存每个页面的截图
- 执行多次快速导航测试
- 检测控制台错误

运行方法：
How to run:
```bash
node verify-deployment.js
```

## Playwright 命令 (Playwright Commands)

```bash
# 运行所有测试 (Run all tests)
npm test

# 运行特定测试文件 (Run specific test file)
npx playwright test tests/quick-validation.spec.js

# 有头模式运行（显示浏览器）(Run in headed mode - show browser)
npm run test:headed

# UI 模式运行 (Run in UI mode)
npm run test:ui

# 显示测试报告 (Show test report)
npx playwright show-report
```

## 配置 (Configuration)

Playwright 配置文件：`playwright.config.js`
Playwright configuration file: `playwright.config.js`

- **测试目录 (Test directory):** `./tests`
- **基础 URL (Base URL):** `http://localhost:8080/myfrontend` (本地测试) / `https://kelvenray.github.io/myfrontend/` (部署测试)
- **浏览器 (Browser):** Chromium
- **截图 (Screenshots):** 失败时自动截图 (Auto-screenshot on failure)
- **追踪 (Trace):** 首次重试时记录 (Record on first retry)

## 持续集成 (Continuous Integration)

建议在 GitHub Actions 中添加 Playwright 测试步骤：
Recommend adding Playwright test step in GitHub Actions:

```yaml
- name: Run Playwright tests
  run: |
    npm install
    npx playwright install chromium
    npx playwright test
  
- name: Upload test results
  if: always()
  uses: actions/upload-artifact@v3
  with:
    name: playwright-report
    path: playwright-report/
```

## 故障排除 (Troubleshooting)

### 测试失败 (Tests Failing)
1. 确认 Vue3 应用已构建 (Confirm Vue3 app is built)
2. 检查基础路径配置 (Check base path configuration)
3. 查看测试截图了解失败原因 (View test screenshots to understand failure)

### 浏览器未安装 (Browser Not Installed)
```bash
npx playwright install chromium
```

### 权限问题 (Permission Issues)
```bash
chmod +x node_modules/.bin/vite
chmod +x node_modules/.bin/playwright
```

## 测试覆盖范围 (Test Coverage)

✅ Dashboard 页面加载
✅ 图表页导航和渲染
✅ 表单页导航和组件
✅ 登录页导航
✅ 多次快速导航切换（重点测试）
✅ 组件可见性验证
✅ 图表渲染验证
✅ 无控制台错误

## 支持 (Support)

如有问题，请查看：
For issues, please check:
- [Playwright 文档](https://playwright.dev/)
- [Vue3 文档](https://vuejs.org/)
- 项目 Issues 页面 (Project Issues page)
