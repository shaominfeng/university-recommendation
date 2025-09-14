# University Recommendation System | 大学推荐系统

<div align="center">
  <h1>🎓 University Recommendation Platform</h1>
  <p>
    <a href="#english">English</a> |
    <a href="#chinese">中文</a>
  </p>
</div>

---

## <span id="english">🇺🇸 English</span>

### 📋 Overview

The University Recommendation System is a web-based application designed to help high school students find suitable universities based on their college entrance examination scores. The system provides personalized recommendations by analyzing historical admission data and matching student scores with university admission requirements.

### ✨ Features

- **Score-based Recommendations**: Input your exam scores to get personalized university recommendations
- **Comprehensive Database**: Includes admission data for universities in Jiangsu Province (2021 data available)
- **Real-time Analysis**: Automatic calculation and ranking based on your scores
- **User-friendly Interface**: Modern, responsive design built with React and Ant Design
- **Data Export**: Export recommendation results to various formats
- **Performance Tracking**: Built-in analytics and monitoring

### 🛠️ Tech Stack

**Frontend:**
- React 19.1.0
- TypeScript
- Ant Design 5.25.2
- Vite 6.3.5
- React Router DOM

**Backend:**
- NestJS 8.0.0
- MongoDB with Mongoose
- Node.js
- TypeScript

**Development Tools:**
- ESLint & Prettier
- Husky for Git hooks
- Jest for testing

### 📦 Installation

#### Prerequisites
- Node.js >= 16.14.2
- Git
- MongoDB (for backend)

#### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/shaominfeng/UniversityRecommend.git
   cd university-recommendation
   ```

2. **Install Frontend Dependencies**
   ```bash
   cd app/frontend
   npm install
   ```

3. **Install Backend Dependencies**
   ```bash
   cd app/app-server
   npm install
   ```

4. **Start the Development Servers**

   Frontend:
   ```bash
   cd app/frontend
   npm run dev
   ```

   Backend:
   ```bash
   cd app/app-server
   npm run start:dev
   ```

5. **Access the Application**
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000

### 🚀 Available Scripts

**Frontend:**
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

**Backend:**
- `npm run start:dev` - Start development server with watch mode
- `npm run build` - Build the application
- `npm run test` - Run tests
- `npm run lint` - Run ESLint

### 📁 Project Structure

```
university-recommendation/
├── app/
│   ├── frontend/          # React frontend application
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── apis/
│   │   │   └── utils/
│   │   └── package.json
│   └── app-server/        # NestJS backend application
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── modules/
│       │   └── config/
│       └── package.json
└── README.md
```

### 🗺️ Roadmap

- [ ] Add 2022 admission data for Jiangsu Province
- [ ] Expand to more provinces (Henan, Shandong, etc.)
- [ ] Include university categories (985/211 universities)
- [ ] Add major-specific admission scores
- [ ] Support for private/public university filtering
- [ ] Multi-language support enhancement

### 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### 🐛 Issues

If you encounter any issues or have questions, please:
- Check existing [issues](https://github.com/shaominfeng/UniversityRecommend/issues)
- Create a new issue if needed
- Provide detailed information about the problem

---

## <span id="chinese">🇨🇳 中文</span>

### 📋 项目概述

大学推荐系统是一个基于Web的应用程序，旨在帮助高中生根据高考成绩找到合适的大学。系统通过分析历史录取数据，将学生成绩与大学录取要求进行匹配，提供个性化的推荐建议。

### ✨ 主要功能

- **基于分数的推荐**：输入高考成绩获得个性化大学推荐
- **全面的数据库**：包含江苏省各大学录取数据（提供2021年数据）
- **实时分析**：基于您的分数自动计算和排名
- **友好的用户界面**：使用React和Ant Design构建的现代响应式设计
- **数据导出**：将推荐结果导出为多种格式
- **性能跟踪**：内置分析和监控功能

### 🛠️ 技术栈

**前端：**
- React 19.1.0
- TypeScript
- Ant Design 5.25.2
- Vite 6.3.5
- React Router DOM

**后端：**
- NestJS 8.0.0
- MongoDB with Mongoose
- Node.js
- TypeScript

**开发工具：**
- ESLint & Prettier
- Husky Git钩子
- Jest 测试框架

### 📦 安装说明

#### 环境要求
- Node.js >= 16.14.2
- Git
- MongoDB（后端需要）

#### 快速开始

1. **克隆仓库**
   ```bash
   git clone https://github.com/shaominfeng/UniversityRecommend.git
   cd university-recommendation
   ```

2. **安装前端依赖**
   ```bash
   cd app/frontend
   npm install
   ```

3. **安装后端依赖**
   ```bash
   cd app/app-server
   npm install
   ```

4. **启动开发服务器**

   前端：
   ```bash
   cd app/frontend
   npm run dev
   ```

   后端：
   ```bash
   cd app/app-server
   npm run start:dev
   ```

5. **访问应用程序**
   - 前端：http://localhost:5173
   - 后端API：http://localhost:3000

### 🚀 可用脚本

**前端：**
- `npm run dev` - 启动开发服务器
- `npm run build` - 构建生产版本
- `npm run lint` - 运行ESLint
- `npm run format` - 使用Prettier格式化代码

**后端：**
- `npm run start:dev` - 启动带监听模式的开发服务器
- `npm run build` - 构建应用程序
- `npm run test` - 运行测试
- `npm run lint` - 运行ESLint

### 📁 项目结构

```
university-recommendation/
├── app/
│   ├── frontend/          # React 前端应用
│   │   ├── src/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── apis/
│   │   │   └── utils/
│   │   └── package.json
│   └── app-server/        # NestJS 后端应用
│       ├── src/
│       │   ├── controllers/
│       │   ├── services/
│       │   ├── modules/
│       │   └── config/
│       └── package.json
└── README.md
```

### 🗺️ 发展规划

- [ ] 添加江苏省2022年录取数据
- [ ] 扩展到更多省份（河南、山东等）
- [ ] 包含大学分类（985/211高校）
- [ ] 添加专业录取分数线
- [ ] 支持民办/公办大学筛选
- [ ] 多语言支持增强

### 🤝 贡献指南

欢迎贡献！您可以通过以下方式帮助：

1. Fork 仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 📄 许可证

该项目基于 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

### 🐛 问题反馈

如果遇到任何问题或有疑问，请：
- 查看现有的 [issues](https://github.com/shaominfeng/UniversityRecommend/issues)
- 如需要请创建新的issue
- 提供问题的详细信息

---

### 🎯 Common Issues | 常见问题

**Error: "参数无效" (Invalid Parameters)**
- Check if the `dist/src/file` folder exists
- Ensure all required data files are present

**启动问题 (Startup Issues)**
- Verify Node.js version >= 16.14.2
- Ensure MongoDB is running (for backend)
- Check if ports 3000 and 5173 are available

### 🔗 Links | 相关链接

- [Node.js](https://nodejs.org/)
- [React Documentation](https://react.dev/)
- [Ant Design](https://ant.design/)
- [NestJS Documentation](https://nestjs.com/)

---

<div align="center">
  <p>Made with ❤️ for students seeking their dream universities</p>
  <p>为寻找理想大学的学生们用❤️制作</p>
</div>