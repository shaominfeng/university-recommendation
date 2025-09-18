# 大学推荐系统 - 前端

基于 React + TypeScript + Vite 构建的大学推荐系统前端应用。

## 项目介绍

这是一个智能大学推荐系统的前端部分，帮助学生根据自己的成绩、兴趣和偏好找到合适的大学。

## 技术栈

- **框架**: React 18
- **语言**: TypeScript
- **构建工具**: Vite
- **样式**: CSS + Less
- **HTTP 客户端**: 自定义 request 工具

## 项目结构

```
src/
├── apis/           # API 接口定义
├── assets/         # 静态资源
├── config/         # 配置文件
├── pages/          # 页面组件
│   ├── Home/       # 首页
│   └── Main/       # 主页面
├── utils/          # 工具函数
├── App.tsx         # 根组件
└── main.tsx        # 应用入口
```

## 开发环境要求

- Node.js >= 16
- npm >= 7

## 安装和运行

### 安装依赖

```bash
npm install
```

### 开发模式运行

```bash
npm run dev
```

应用将在 http://localhost:5173 启动

### 构建生产版本

```bash
npm run build
```

### 预览构建结果

```bash
npm run preview
```

## 主要功能

- 🏠 **首页展示**: 系统介绍和导航
- 🎯 **智能推荐**: 基于用户信息推荐合适的大学
- 📊 **数据展示**: 大学信息表格展示
- 📱 **响应式设计**: 支持移动端和桌面端

## 配置说明

项目支持多环境配置：

- `cfg.default.ts` - 默认配置
- `cfg.local.ts` - 本地开发配置
- `cfg.test.ts` - 测试环境配置
- `cfg.production.ts` - 生产环境配置

## API 接口

前端通过 `/apis` 目录下的接口与后端服务通信，详细的 API 文档请参考后端项目。

## ESLint 配置

项目已配置 ESLint 进行代码质量检查。如需扩展 ESLint 配置以启用类型感知的检查规则：

```js
export default tseslint.config({
  extends: [
    ...tseslint.configs.recommendedTypeChecked,
    // 或使用更严格的规则
    ...tseslint.configs.strictTypeChecked,
  ],
  languageOptions: {
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

## 开发指南

1. 遵循 TypeScript 最佳实践
2. 使用 ESLint 进行代码检查
3. 组件按功能模块组织
4. 统一使用项目配置的请求工具

## 相关链接

- [后端服务](../app-server/README.md)
- [Vite 文档](https://vitejs.dev/)
- [React 文档](https://react.dev/)
