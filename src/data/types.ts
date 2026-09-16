/**
 * 猫咪相关 TypeScript 类型定义
 */

/** 体型 */
export type CatSize = 'small' | 'medium' | 'large'

/** 毛发类型 */
export type CoatType = 'short' | 'long' | 'hairless' | 'curly'

/** 饲养要点 */
export interface CatCare {
  /** 饮食要点 */
  diet: string
  /** 护理要点 */
  grooming: string
  /** 健康注意 */
  health: string
}

/** 猫咪品种 */
export interface CatBreed {
  id: number
  /** 品种名称 */
  name: string
  /** 英文名 */
  englishName: string
  /** 别名 / 昵称 */
  alias?: string
  /** 产地 */
  origin: string
  /** 寿命，如 "12-15年" */
  lifeSpan: string
  /** 体重，如 "3-6kg" */
  weight: string
  /** 体型 */
  size: CatSize
  /** 毛发类型 */
  coat: CoatType
  /** 性格标签 */
  personality: string[]
  /** 亲人程度 1-5 */
  temperament: number
  /** 活跃度 1-5 */
  activityLevel: number
  /** 打理难度 1-5 */
  grooming: number
  /** 主图（空字符串时使用色块占位） */
  image: string
  /** 详情轮播图 */
  images?: string[]
  /** 占位 emoji（无图时展示） */
  emoji: string
  /** 占位背景色（无图时展示） */
  color: string
  /** 外形特征描述 */
  appearance: string
  /** 性格特点描述 */
  character: string
  /** 饲养要点 */
  care: CatCare
  /** 适合人群 */
  suitableFor: string[]
  /** 不适合人群 */
  notSuitableFor: string[]
  /** 趣味小知识 */
  funFact?: string
}

/** 体型标签映射 */
export const SIZE_LABELS: Record<CatSize, string> = {
  small: '小型',
  medium: '中型',
  large: '大型'
}

/** 毛发类型标签映射 */
export const COAT_LABELS: Record<CoatType, string> = {
  short: '短毛',
  long: '长毛',
  hairless: '无毛',
  curly: '卷毛'
}

/* ========================================
 * 养猫工具相关类型
 * ======================================== */

/** 养猫日记条目 */
export interface DiaryEntry {
  id: string
  /** 日期 YYYY-MM-DD */
  date: string
  title?: string
  content: string
  images?: string[]
  /** 心情 */
  mood?: 'happy' | 'normal' | 'sick'
  catName?: string
  /** 创建时间戳 */
  createdAt: number
}

/** 心情标签映射 */
export const MOOD_LABELS: Record<NonNullable<DiaryEntry['mood']>, string> = {
  happy: '开心',
  normal: '日常',
  sick: '生病'
}

/** 疫苗/驱虫记录 */
export interface VaccineRecord {
  id: string
  /** 疫苗/驱虫名称 */
  name: string
  /** 类型 */
  type: 'vaccine' | 'deworm'
  /** 上次日期 YYYY-MM-DD */
  lastDate: string
  /** 下次日期 YYYY-MM-DD */
  nextDate: string
  note?: string
  catName?: string
}

/** 疫苗类型标签映射 */
export const VACCINE_TYPE_LABELS: Record<VaccineRecord['type'], string> = {
  vaccine: '疫苗',
  deworm: '驱虫'
}

/** 喂食记录 */
export interface FeedingRecord {
  id: string
  /** 日期 YYYY-MM-DD */
  date: string
  /** 时间 HH:mm */
  time: string
  /** 喂食量，如 "50g"、"1/3罐" */
  amount: string
  /** 食物类型 */
  foodType?: 'catfood' | 'can' | 'snack' | 'other'
  catName?: string
  /** 创建时间戳 */
  createdAt: number
}

/** 食物类型标签映射 */
export const FOOD_TYPE_LABELS: Record<NonNullable<FeedingRecord['foodType']>, string> = {
  catfood: '猫粮',
  can: '罐头',
  snack: '零食',
  other: '其他'
}

/** 用户反馈类型 */
export type FeedbackType = 'feature' | 'bug' | 'content' | 'other'

/** 体重记录 */
export interface WeightRecord {
  id: string
  /** 体重（kg） */
  weight: number
  /** 记录日期 YYYY-MM-DD */
  date: string
  catName?: string
  note?: string
  /** 创建时间戳 */
  createdAt: number
}

/** 用户反馈条目 */
export interface FeedbackItem {
  id: string
  /** 反馈类型 */
  type: FeedbackType
  /** 反馈内容 */
  content: string
  /** 联系方式（选填） */
  contact?: string
  /** 创建时间戳 */
  createdAt: number
}

/** 反馈类型标签映射 */
export const FEEDBACK_TYPE_LABELS: Record<FeedbackType, string> = {
  feature: '功能建议',
  bug: 'BUG 反馈',
  content: '内容纠错',
  other: '其他'
}

/* ========================================
 * 危险食物指南相关类型
 * ======================================== */

/** 食物风险等级 */
export type FoodRiskLevel = 'deadly' | 'danger' | 'caution'

/** 危险食物条目 */
export interface DangerousFood {
  id: number
  /** 食物名称 */
  name: string
  /** 展示 emoji */
  emoji: string
  /** 风险等级 */
  level: FoodRiskLevel
  /** 常见来源 */
  foundIn: string
  /** 危害与中毒症状 */
  symptoms: string
  /** 误食后的处理建议 */
  action: string
}

/** 风险等级标签映射 */
export const FOOD_RISK_LABELS: Record<FoodRiskLevel, string> = {
  deadly: '剧毒',
  danger: '危险',
  caution: '慎用'
}

/** 安全替代零食 */
export interface SafeFood {
  id: number
  name: string
  emoji: string
  /** 喂食说明 */
  note: string
}

/** 应急处理步骤 */
export interface EmergencyStep {
  /** 步骤标题 */
  title: string
  /** 步骤说明 */
  desc: string
}

/* ========================================
 * 猫咪档案相关类型
 * ======================================== */

/** 性别 */
export type CatGender = 'male' | 'female' | 'unknown'

/** 猫咪档案 */
export interface CatProfile {
  id: string
  /** 名字 */
  name: string
  /** 生日 YYYY-MM-DD（可估算） */
  birthday?: string
  /** 性别 */
  gender?: CatGender
  /** 关联图鉴品种 id */
  breedId?: number
  /** 是否已绝育（undefined = 未填写） */
  sterilized?: boolean
  /** 头像 emoji */
  emoji: string
  /** 头像背景色 */
  color: string
  /** 备注 */
  note?: string
  /** 创建时间戳 */
  createdAt: number
}

/** 性别标签映射 */
export const GENDER_LABELS: Record<CatGender, string> = {
  male: '弟弟',
  female: '妹妹',
  unknown: '未知'
}

/** 性别图标映射 */
export const GENDER_ICONS: Record<CatGender, string> = {
  male: '♂',
  female: '♀',
  unknown: '❔'
}
