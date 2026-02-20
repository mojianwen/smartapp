# SmartApp 移动端应用

SmartApp是一个基于uni-app开发的移动端应用，实现了与Web端相同的功能，共享后端工程。

## 功能特点

### 1. 用户认证
- 现代化的登录界面
- 支持记住密码功能
- 社交媒体快捷登录

### 2. 门户首页
- 轮播Banner展示
- 数据指标展示
- 快捷功能入口
- 最新动态列表

### 3. 工作台
- 待办事项管理
- 常用功能快速访问
- 最近访问记录
- 工作统计展示

### 4. 消息中心
- 分类消息展示
- 系统通知
- 私信消息
- 未读消息提醒

### 5. 个人中心
- 个人信息展示
- 常用功能管理
- 系统设置选项
- 账号安全管理

## 技术栈

- **前端框架**: uni-app (基于Vue 3)
- **UI组件**: uni-ui
- **状态管理**: Vuex
- **网络请求**: uni.request
- **后端接口**: Spring Boot + MyBatis-Plus

## 项目结构

```
smartapp-mobile/
├── src/
│   ├── pages/           # 页面文件
│   │   ├── login/      # 登录页
│   │   ├── index/      # 首页
│   │   ├── workspace/  # 工作台
│   │   ├── message/    # 消息中心
│   │   └── profile/    # 个人中心
│   ├── static/         # 静态资源
│   │   ├── tabbar/     # 底部导航图标
│   │   ├── banner/     # Banner图片
│   │   ├── avatar/     # 头像图片
│   │   └── recent/     # 最近访问图片
│   ├── App.vue         # 应用入口
│   ├── main.js         # 主文件
│   └── pages.json      # 页面配置
├── package.json        # 项目配置
└── README.md          # 说明文档
```

## 开发指南

### 环境要求
- Node.js 14+
- HBuilderX 或 CLI工具

### 安装依赖
```bash
npm install
```

### 开发运行
```bash
# HBuilderX
点击运行 -> 运行到浏览器/手机/模拟器

# CLI
npm run dev:h5          # 运行到浏览器
npm run dev:mp-weixin   # 运行到微信小程序
npm run dev:app-plus    # 运行到APP
```

### 打包发布
```bash
# HBuilderX
发行 -> 原生App-云打包

# CLI
npm run build:h5          # 打包为H5
npm run build:mp-weixin   # 打包为微信小程序
npm run build:app-plus    # 打包为APP
```

## 注意事项

1. **图片资源**: 请确保static目录中有相应的图片资源
2. **API配置**: 确保后端API地址配置正确
3. **跨域问题**: 开发环境注意跨域配置
4. **权限配置**: 根据需要配置相应的权限

## 默认账号

- 用户名: admin
- 密码: admin123

## 版本信息

当前版本: v1.0.0

## 更新日志

### v1.0.0 (2026-02-20)
- 初始版本发布
- 实现基础功能模块
- 完成UI界面设计