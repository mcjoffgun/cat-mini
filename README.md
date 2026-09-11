# 🐱 喵星人图鉴 - 猫咪小程序

一个集**猫咪品种图鉴**与**养猫实用工具**于一体的微信小程序。

---

## ✅ 技术选型确认（开发唯一标准）

| 项目 | 技术栈 | 说明 |
|------|--------|------|
| 框架 | **Vue3 + TypeScript + UniApp** | 面向微信小程序开发 |
| 状态管理 | **Pinia** | 唯一状态管理方案，禁用其他方案 |
| 构建工具 | Vite | 由 UniApp CLI 内置驱动 |
| 样式方案 | SCSS | 全局变量 + 设计规范统一管理 |
| 语言 | TypeScript（strict 模式） | 所有业务代码必须带类型定义 |

> ⚠️ **开发约束**：本项目业务状态（收藏、日记、喂食、疫苗提醒等）统一使用 Pinia 管理，禁止组件间直接 `uni.setStorageSync` 传递状态。

---

## 📋 项目概览

| 项目 | 说明 |
|------|------|
| 项目名称 | 喵星人图鉴（暂定） |
| 技术栈 | Vue3 + TypeScript + UniApp + Pinia |
| UI 风格 | 可爱治愈风（奶橘主色 + 奶油色系） |
| 目标平台 | 微信小程序 |
| 数据来源 | 内置静态数据（首批约 20 个品种） |

---

## 🎯 产品定位

面向**新手铲屎官**和**爱猫人士**的轻量级小程序——
既能了解不同猫咪品种的知识，又能通过实用工具记录和管理养猫日常。

---

## 📱 功能模块

### 底部 Tab 导航（3个）

```
┌─────────┬─────────┬─────────┐
│  🏠 首页 │  📚 图鉴 │  🛠️ 工具 │
└─────────┴─────────┴─────────┘
```

### 模块一：首页
- **每日一猫**：每天随机展示一个猫咪品种卡片（大图 + 简介）
- **快捷入口**：4 个常用工具快捷跳转
  - 年龄换算 · 喂食记录 · 疫苗提醒 · 养猫日记
- **养猫小知识**：随机冷知识 / 小贴士卡片
- **搜索入口**：跳转到图鉴搜索

### 模块二：图鉴（核心）
- **品种列表**：卡片式网格布局
- **搜索功能**：按品种名称、英文名、别名或性格标签搜索
- **分类筛选**：
  - 按体型：小型 / 中型 / 大型
  - 按毛发：短毛 / 长毛 / 无毛 / 卷毛
- **品种详情页**：
  - 主图或色块 + emoji 占位图
  - 基本信息卡（产地、寿命、体重、性格标签）
  - 外形特征
  - 性格特点
  - 饲养要点（饮食 / 护理 / 健康）
  - 适合 & 不适合人群
  - 收藏按钮

### 模块三：工具
| 工具 | 优先级 | 说明 |
|------|--------|------|
| 🐱 年龄换算器 | P0 | 猫咪年龄 ↔ 人类年龄换算 |
| 💉 疫苗驱虫提醒 | P0 | 录入下次日期，倒计时展示 |
| 📝 养猫日记 | P1 | 文字 + 图片，时间线展示 |
| 🍚 喂食记录 | P1 | 记录喂粮时间和量 |
| ❓ 猫咪身体语言 | P1 | 尾巴、耳朵和声音等行为解读 |

养猫成本计算器和品种真实图片仍在规划中。品种详情、日记和首页已支持分享给好友与朋友圈；日记支持添加本地配图。

---

## 🎨 设计规范

### 色彩系统

| 角色 | 色值 | 用途 |
|------|------|------|
| 主色（奶橘） | `#FF9F6B` | 按钮、强调、Tab 激活 |
| 主色浅 | `#FFD4B8` | 渐变、悬浮态 |
| 辅色-薄荷绿 | `#8FD7C7` | 健康/成功状态、标签 |
| 辅色-淡紫 | `#C9B8E8` | 收藏、信息提示 |
| 辅色-奶油黄 | `#FFF4E6` | 卡片背景、页面底色 |
| 背景色 | `#FFFCF8` | 页面主背景 |
| 文字-主 | `#4A3F35` | 标题、正文 |
| 文字-次 | `#8B7D6B` | 辅助文字、说明 |
| 文字-弱 | `#C4B8A8` | 占位符、禁用态 |
| 分割线 | `#F0E6D8` | 分割线、边框 |

### 圆角规范
| 类型 | 圆角值 | 用途 |
|------|--------|------|
| 小圆角 | 8px | 小标签、小按钮 |
| 中圆角 | 12px | 输入框、小卡片 |
| 大圆角 | 16px | 主卡片、弹窗 |
| 超大圆角 | 24px | 大图片容器 |

### 阴影规范
| 类型 | 值 | 用途 |
|------|-----|------|
| 软阴影 | `0 4rpx 20rpx rgba(255, 159, 107, 0.1)` | 普通卡片 |
| 深阴影 | `0 8rpx 32rpx rgba(255, 159, 107, 0.15)` | 悬浮卡片、弹窗 |

### 字体规范
| 类型 | 大小 | 字重 |
|------|------|------|
| 大标题 | 36rpx | 600 |
| 标题 | 32rpx | 600 |
| 副标题 | 28rpx | 500 |
| 正文 | 28rpx | 400 |
| 辅助文字 | 24rpx | 400 |

---

## 🏗️ 技术架构

### 目录结构

```
cat-miniapp/
├── src/
│   ├── pages/                  # 页面目录
│   │   ├── home/               # 首页
│   │   ├── catalog/            # 图鉴
│   │   │   ├── index.vue       # 品种列表
│   │   │   └── detail.vue      # 品种详情
│   │   ├── tools/              # 工具页
│   │   └── tool-detail/        # 各工具详情页
│   │       ├── age-converter.vue
│   │       ├── body-language.vue
│   │       ├── diary.vue
│   │       ├── feeding.vue
│   │       └── vaccine.vue
│   ├── components/             # 公共组件
│   │   ├── breed-image/        # 猫咪图片/占位图
│   │   ├── cat-card/           # 猫咪卡片
│   │   ├── empty/              # 空状态
│   │   ├── nav-bar/            # 自定义导航栏
│   │   └── score-bar/          # 评分条
│   ├── data/                   # 静态数据
│   │   ├── body-language.ts    # 猫咪身体语言数据
│   │   ├── cat-breeds.ts       # 猫咪品种数据
│   │   ├── cat-facts.ts        # 养猫知识数据
│   │   └── types.ts            # 业务类型定义
│   ├── stores/                 # Pinia 状态管理
│   │   ├── persist.ts          # 持久化统一封装（容错 + 版本迁移）
│   │   ├── diary.ts            # 日记数据
│   │   ├── favorite.ts         # 收藏
│   │   ├── feeding.ts          # 喂食记录
│   │   └── vaccine.ts          # 疫苗驱虫提醒
│   ├── utils/                  # 工具函数
│   │   ├── age.ts              # 年龄换算
│   │   ├── date.ts             # 日期处理
│   │   ├── id.ts               # ID 生成
│   │   ├── image.ts            # 选图与本地图片持久化
│   │   └── storage.ts          # 本地存储工具
│   ├── styles/                 # 全局样式
│   │   └── global.scss         # 全局样式
│   ├── manifest.json           # 应用及平台配置
│   ├── pages.json              # 页面路由与全局样式配置
│   ├── uni.scss                # 全局 SCSS 变量
│   ├── App.vue
│   └── main.ts
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

### 技术选型说明

| 技术 | 选型 | 理由 |
|------|------|------|
| 框架 | UniApp + Vue3 | 微信小程序应用开发 |
| 语言 | TypeScript（strict） | 类型安全，可维护性好 |
| 构建 | Vite 8.2.2 | 与当前 UniApp 编译器版本匹配 |
| 状态管理 | **Pinia 2** | **唯一方案**，Vue3 官方推荐，轻量易用 |
| 样式 | SCSS（sass） | 变量、嵌套、混入，方便维护 |
| UI 库 | （自研组件） | 定制化强，轻量无依赖 |
| 存储 | Pinia 持久化插件 + `uni` storage | 工具类数据本地化，无需后端；读写容错 + 数据版本信封，支持旧结构迁移 |
| 图片 | 色块 + emoji 占位 | 后续可替换为真实图片 |

### 版本约束（经 npm registry 核实的兼容组合）

| 依赖 | 版本 | 备注 |
|------|------|------|
| Node.js | **>= 20** | 已安装 v20.19.5 |
| @dcloudio/*（uni 全家桶） | `3.0.0-alpha-1000920260909822` | 必须是 **vue3 标签**版本，`latest` 是 Vue2 版不可用 |
| vue | 3.4.21 | 与当前 UniApp 编译器版本匹配 |
| vite | 8.2.2 | 与当前 `@dcloudio/vite-plugin-uni` 的 peer dependency 一致 |
| @dcloudio/types | 3.4.31 | UniApp API 类型定义 |
| pinia | ^2.1.7 | |
| pinia-plugin-persistedstate | ^3.2.0 | 状态自动持久化到本地 |
| sass | ^1.71.0 | |
| typescript | ^5.3.3 | |

---

## 🚀 开发计划

### Phase 1：MVP 版本（优先完成）
- [x] 项目脚手架搭建
- [x] 全局样式 & 主题变量
- [x] 原生 TabBar + 自定义导航栏
- [x] 猫咪品种数据（20 个品种）
- [x] 图鉴列表页（搜索 + 筛选）
- [x] 品种详情页
- [x] 首页（每日一猫 + 快捷入口 + 小知识）
- [x] 工具：年龄换算器
- [x] 工具：疫苗驱虫提醒
- [x] 工具：猫咪身体语言
- [x] 工具：养猫日记（提前完成）
- [x] 工具：喂食记录（提前完成）

### Phase 2：增强版本
- [x] 收藏功能
- [x] 分享功能
- [x] 日记图片
- [x] 数据持久化优化

### Phase 3：扩展版本
- [ ] 工具：养猫成本计算器
- [ ] 更多猫咪品种扩充到 40+
- [ ] 深色模式
- [ ] 用户反馈入口

---

## 📦 首批猫咪品种清单（20 种）

| # | 品种 | 类型 | # | 品种 | 类型 |
|---|------|------|---|------|------|
| 1 | 英国短毛猫 | 短毛 | 11 | 波斯猫 | 长毛 |
| 2 | 美国短毛猫 | 短毛 | 12 | 加菲猫（异国短毛） | 短毛 |
| 3 | 布偶猫 | 长毛 | 13 | 缅因猫 | 长毛 |
| 4 | 暹罗猫 | 短毛 | 14 | 斯芬克斯无毛猫 | 无毛 |
| 5 | 橘猫（中华田园） | 短毛 | 15 | 苏格兰折耳猫 | 短毛 |
| 6 | 狸花猫 | 短毛 | 16 | 曼基康矮脚猫 | 短毛 |
| 7 | 三花猫 | 短毛 | 17 | 金渐层 | 短毛 |
| 8 | 奶牛猫 | 短毛 | 18 | 银渐层 | 短毛 |
| 9 | 俄罗斯蓝猫 | 短毛 | 19 | 德文卷毛猫 | 卷毛 |
| 10 | 阿比西尼亚猫 | 短毛 | 20 | 孟加拉豹猫 | 短毛 |

---

## 📝 数据结构设计

### 猫咪品种数据结构

```typescript
interface CatBreed {
  id: number
  name: string           // 品种名称
  englishName: string    // 英文名
  alias?: string         // 别名 / 昵称
  origin: string         // 产地
  lifeSpan: string       // 寿命 如 "12-15年"
  weight: string         // 体重 如 "3-6kg"
  size: 'small' | 'medium' | 'large'  // 体型
  coat: 'short' | 'long' | 'hairless' | 'curly'  // 毛发类型
  personality: string[]  // 性格标签
  temperament: number    // 亲人程度 1-5
  activityLevel: number  // 活跃度 1-5
  grooming: number       // 打理难度 1-5
  image: string          // 主图
  images?: string[]      // 详情轮播图
  emoji: string          // 无图时展示的占位 emoji
  color: string          // 无图时展示的占位背景色
  appearance: string     // 外形特征描述
  character: string      // 性格特点描述
  care: {
    diet: string         // 饮食要点
    grooming: string     // 护理要点
    health: string       // 健康注意
  }
  suitableFor: string[]  // 适合人群
  notSuitableFor: string[]  // 不适合人群
  funFact?: string       // 趣味小知识
}
```

### 养猫日记数据结构

```typescript
interface DiaryEntry {
  id: string
  date: string           // 日期 YYYY-MM-DD
  title?: string
  content: string
  images?: string[]
  mood?: 'happy' | 'normal' | 'sick'
  catName?: string
  createdAt: number
}
```

### 疫苗提醒数据结构

```typescript
interface VaccineRecord {
  id: string
  name: string           // 疫苗/驱虫名称
  type: 'vaccine' | 'deworm'  // 类型
  lastDate: string       // 上次日期
  nextDate: string       // 下次日期
  note?: string
  catName?: string
}
```

---

## 🔧 开发环境准备

- Node.js >= 20
- 微信开发者工具
- HBuilderX 或 VS Code（推荐 VS Code + UniApp 插件）

### 微信小程序运行

```bash
npm ci
npm run dev:mp-weixin
```

开发构建完成后，在微信开发者工具中导入 `dist/dev/mp-weixin`，不要导入项目源码根目录。
`app.json` 由 `src/pages.json` 自动生成在构建产物中，不需要手动创建。

发布构建使用：

```bash
npm run build:mp-weixin
```

构建完成后导入 `dist/build/mp-weixin`。
