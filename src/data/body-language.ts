/**
 * 猫咪身体语言图解数据
 */
export interface BodyLanguageGroup {
  id: string
  /** 部位/主题 */
  label: string
  /** 展示图标（emoji） */
  icon: string
  /** 解释条目 */
  items: BodyLanguageItem[]
}

export interface BodyLanguageItem {
  /** 表现形式，如 "尾巴高高竖起" */
  title: string
  /** 含义 */
  meaning: string
}

export const bodyLanguageGroups: BodyLanguageGroup[] = [
  {
    id: 'tail',
    label: '尾巴',
    icon: '🐾',
    items: [
      { title: '尾巴高高竖起', meaning: '心情超好，自信放松，正在和你打招呼。' },
      { title: '尾巴竖直并抖动', meaning: '极度兴奋，通常是见到你或期待投喂时的表现。' },
      { title: '尾巴像钟摆般缓慢摆动', meaning: '专注观察周围，保持警惕，正在思考下一步。' },
      { title: '尾巴快速甩动', meaning: '有点不耐烦或烦躁，此时最好别去招惹它。' },
      { title: '尾巴炸毛变粗', meaning: '感到害怕或受威胁，正在试图让自己看起来更大。' },
      { title: '尾巴夹在两腿之间', meaning: '非常恐惧或顺从，是明确的不安信号。' },
      { title: '尾巴缠住你的腿', meaning: '表达亲昵和依恋，表示"你是我的"。' }
    ]
  },
  {
    id: 'ear',
    label: '耳朵',
    icon: '👂',
    items: [
      { title: '耳朵自然向前', meaning: '放松状态，正在正常感知周围环境。' },
      { title: '耳朵警觉竖起', meaning: '听到感兴趣的声音，注意力集中。' },
      { title: '耳朵向两侧展开（飞机耳）', meaning: '紧张、害怕或准备攻击，是明显的压力信号。' },
      { title: '耳朵向后压平', meaning: '极度恐惧或攻击前的最后警告，请保持距离。' },
      { title: '耳朵前后快速转动', meaning: '对声音好奇，正在判断声音来源。' }
    ]
  },
  {
    id: 'eye',
    label: '眼睛',
    icon: '👀',
    items: [
      { title: '眼睛缓慢眨眼', meaning: '表达信任和喜爱，被称为"猫咪之吻"，也可以回个眨眼。' },
      { title: '瞳孔放大（灯光正常时）', meaning: '兴奋、好奇或紧张，情绪处于激活状态。' },
      { title: '瞳孔收缩成竖线', meaning: '警惕或攻击准备，也可能是光线过强。' },
      { title: '直直盯着你', meaning: '可能是好奇，也可能是挑战，配合身体姿势判断。' },
      { title: '眯眼看你', meaning: '放松、信任和满足的状态。' }
    ]
  },
  {
    id: 'sound',
    label: '声音',
    icon: '💬',
    items: [
      { title: '呼噜呼噜', meaning: '通常是满足放松，但也可能是在安抚自己（疼痛时也会）。' },
      { title: '短促的喵', meaning: '打招呼，表示"嘿，我在这"。' },
      { title: '长长的喵', meaning: '有所求，可能是饿了、想玩或想要关注。' },
      { title: '哈气/嘶嘶声', meaning: '害怕或愤怒的警告："再靠近我就动手了"。' },
      { title: '低沉的吼叫', meaning: '严重的威胁警告，准备战斗，请立即退后。' },
      { title: '类似鸟叫的啁啾声', meaning: '看到猎物（如窗外小鸟）时的兴奋表达。' }
    ]
  },
  {
    id: 'body',
    label: '身体动作',
    icon: '🐈',
    items: [
      { title: '肚子朝上翻滚', meaning: '极度信任的表现，把最脆弱的地方露给你。' },
      { title: '用头蹭你', meaning: '在你身上做记号，宣示主权，表达亲昵。' },
      { title: '在你腿上踩奶', meaning: '幼年吸奶的回忆，表示非常安全舒适。' },
      { title: '身体弓起、毛竖立', meaning: '经典防御姿势，感到威胁，准备战斗或逃跑。' },
      { title: '缓慢靠近并蹭腿', meaning: '想要食物或关注，是"讨好"的信号。' },
      { title: '背对着你坐下', meaning: '表示信任——把注意力放在别处，说明在你身边很安心。' },
      { title: '用屁股对着你', meaning: '不是在嫌弃你，而是把你当"家人"的信任表现。' }
    ]
  }
]
