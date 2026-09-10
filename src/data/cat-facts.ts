/**
 * 养猫小知识 / 冷知识（首页随机展示）
 */
export interface CatFact {
  /** 分类 */
  category: string
  /** 知识内容 */
  content: string
}

export const catFacts: CatFact[] = [
  {
    category: '冷知识',
    content: '猫咪一天平均要睡 12-16 个小时，几乎占了一天的大半时间。'
  },
  {
    category: '冷知识',
    content: '猫咪用脸颊、下巴蹭你，是在用气味腺给你"盖章"，宣告你是它的专属人类。'
  },
  {
    category: '冷知识',
    content: '猫咪的呼噜声频率在 25-150 赫兹，这个范围有助于促进骨骼愈合，对它们自己有疗愈作用。'
  },
  {
    category: '冷知识',
    content: '猫的舌头上有大约 300 根倒刺状的乳突，所以舔起来像砂纸，用来梳理毛发和刮肉。'
  },
  {
    category: '冷知识',
    content: '猫咪的听力比狗狗还灵敏，可以听到老鼠等啮齿动物发出的高频超声波。'
  },
  {
    category: '冷知识',
    content: '猫咪的胡须长度大约和身体宽度相当，用来探测能否钻过狭窄的缝隙。'
  },
  {
    category: '冷知识',
    content: '成年猫咪之间很少互相"喵喵叫"，它们叫"喵"主要是为了和人类沟通。'
  },
  {
    category: '冷知识',
    content: '猫尝不出甜味，因为它们的味蕾缺少甜味受体基因。'
  },
  {
    category: '冷知识',
    content: '猫咪一天超过 16 小时不喝水就容易导致泌尿问题，要多留意它们的饮水量。'
  },
  {
    category: '冷知识',
    content: '猫踩奶是在模仿幼年吸奶时的动作，说明它感到非常安全和放松。'
  },
  {
    category: '养猫贴士',
    content: '给猫咪换猫粮要循序渐进，用 7-10 天慢慢过渡，突然换粮容易引起肠胃不适。'
  },
  {
    category: '养猫贴士',
    content: '猫砂盆的数量建议是"猫的数量 + 1"，并且要放在安静、不易被打扰的角落。'
  },
  {
    category: '养猫贴士',
    content: '猫咪是纯肉食动物，不要喂人类食物中的洋葱、大蒜、巧克力，它们对猫有毒。'
  },
  {
    category: '养猫贴士',
    content: '新猫到家不要急着抱它，先让它自己探索，准备好隐蔽的角落会让它更有安全感。'
  },
  {
    category: '养猫贴士',
    content: '猫咪呕吐毛球是正常现象，但频繁呕吐、精神差时要及时就医。日常喂化毛膏可帮助排毛。'
  },
  {
    category: '养猫贴士',
    content: '水盆要每天换水，猫咪更喜欢流动的新鲜水，可以试试宠物饮水机。'
  },
  {
    category: '养猫贴士',
    content: '猫咪的指甲要定期修剪，一般 2-3 周一次，剪到粉色血线之前的位置即可。'
  },
  {
    category: '养猫贴士',
    content: '不要把猫咪长期关在笼子里，它需要足够的活动空间，否则容易焦虑和发胖。'
  },
  {
    category: '养猫贴士',
    content: '刚接回家的小猫 2 个月左右就要开始打疫苗（猫三联），之后每年加强一次。'
  },
  {
    category: '养猫贴士',
    content: '猫咪对百合、郁金香等植物有毒性，养猫家庭要避开这些花草。'
  }
]

/** 获取随机一条养猫知识 */
export function getRandomFact(): CatFact {
  const index = Math.floor(Math.random() * catFacts.length)
  return catFacts[index]
}
