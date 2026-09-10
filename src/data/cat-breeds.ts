/**
 * 猫咪品种静态数据（首批 20 种）
 * 图片字段留空表示使用「色块 + emoji」占位，后续替换为真实图片
 */
import type { CatBreed } from './types'

export const catBreeds: CatBreed[] = [
  {
    id: 1,
    name: '英国短毛猫',
    englishName: 'British Shorthair',
    alias: '英短',
    origin: '英国',
    lifeSpan: '12-17年',
    weight: '4-8kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '安静', '稳重', '粘人'],
    temperament: 5,
    activityLevel: 2,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#FFE8D6',
    appearance:
      '圆圆的脑袋、圆圆的蓝绿色大眼睛，配上肉肉的脸颊，是典型的"包子脸"。被毛短而浓密，手感如天鹅绒般厚实，摸起来非常舒服。体型圆润壮实，骨架大。',
    character:
      '性格温柔沉稳，是出了名的"绅士猫"。不太爱闹腾，更喜欢安静地陪在主人身边。对家人非常依恋，但不会过分黏人，自己也能玩得很开心。适应能力强，适合家庭饲养。',
    care: {
      diet: '易胖体质，需控制食量，选择低脂高蛋白的猫粮，定期称重防止过度肥胖。',
      grooming: '短毛但密，建议每周梳毛 1-2 次；换毛季可增加到每周 3 次。',
      health: '常见健康问题包括肥胖、心肌病和髋关节发育不良，需定期体检。'
    },
    suitableFor: ['新手铲屎官', '家庭饲养', '喜欢安静猫咪的人'],
    notSuitableFor: ['想要特别活跃、爱玩闹猫咪的人'],
    funFact: '英短曾被称为"英国蓝猫"，是世界上古老的猫种之一，可能由罗马人带到英国。'
  },
  {
    id: 2,
    name: '美国短毛猫',
    englishName: 'American Shorthair',
    alias: '美短',
    origin: '美国',
    lifeSpan: '15-20年',
    weight: '4-6kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '聪明', '亲人', '好奇'],
    temperament: 4,
    activityLevel: 4,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#E3F0EA',
    appearance:
      '体格健壮匀称，肌肉发达却不笨重。最经典的是银虎斑花纹，层层叠叠如鱼骨般清晰。眼睛大而圆，眼神机敏有神。',
    character:
      '性格开朗活泼，充满好奇心，喜欢探索和玩耍。非常聪明，容易训练，是陪伴型的好伙伴。对主人忠诚亲近，也能和其他宠物友好相处，是全能型的家庭猫。',
    care: {
      diet: '体型健壮需要充足优质蛋白，选择高肉含量猫粮，分餐喂食避免过量。',
      grooming: '短毛打理轻松，每周梳毛 1 次即可，换毛季适当增加。',
      health: '整体体质好，注意预防肥胖和牙周疾病，定期洁牙。'
    },
    suitableFor: ['家庭饲养', '有孩子的家庭', '想要互动性强的猫咪'],
    notSuitableFor: ['长时间不在家、无法陪伴的人'],
    funFact: '美短曾被选为"年度最受欢迎的猫咪品种"，在美国深受喜爱。'
  },
  {
    id: 3,
    name: '布偶猫',
    englishName: 'Ragdoll',
    alias: '仙女猫',
    origin: '美国',
    lifeSpan: '12-17年',
    weight: '4.5-9kg',
    size: 'large',
    coat: 'long',
    personality: ['温顺', '亲人', '安静', '忍耐'],
    temperament: 5,
    activityLevel: 2,
    grooming: 4,
    image: '',
    emoji: '🐱',
    color: '#F3E8FF',
    appearance:
      '蓝宝石般的湛蓝眼睛，是布偶的标志。被毛长而柔滑，如丝绸一般，重点色（面部、耳朵、四肢、尾巴）与浅色身体形成优雅对比，颜值极高。体型大而柔软。',
    character:
      '性格极其温顺，被抱起来时会像布偶一样全身放松任人摆布，因此得名。非常粘人，喜欢跟着主人走，叫声轻柔细嫩。对疼痛忍耐力高，是著名的"仙女猫"。',
    care: {
      diet: '体型较大，需要优质蛋白支持生长发育，注意控制体重。',
      grooming: '长毛需要每天梳毛防止打结，每周至少 2-3 次，换毛季更频繁。',
      health: '易患肥厚型心肌病，注意心脏检查；长毛易吞食毛球，需定期喂化毛膏。'
    },
    suitableFor: ['喜欢粘人猫的家庭', '能接受每天梳毛的人', '有耐心的人'],
    notSuitableFor: ['没有时间打理长毛、想要独立猫的人'],
    funFact: '布偶猫的蓝眼睛和布偶般松弛的肢体，让它在猫咪中颜值和气质都名列前茅。'
  },
  {
    id: 4,
    name: '暹罗猫',
    englishName: 'Siamese',
    alias: '泰国猫',
    origin: '泰国',
    lifeSpan: '15-20年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '话痨', '粘人', '聪明'],
    temperament: 5,
    activityLevel: 4,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#EFE4D8',
    appearance:
      '纤细优雅的体型，修长的四肢和尾巴，蓝宝石般的杏仁眼非常有神。被毛短而贴身，浅色身体配深色重点色（脸、耳、尾、爪），气质神秘高贵。',
    character:
      '暹罗猫是"猫中话痨"，叫声多变且嗓门不小，喜欢和主人"聊天"。性格极其粘人，需要大量关注，会像狗狗一样跟着主人走。聪明好动，好奇心强，认主意识非常强。',
    care: {
      diet: '代谢旺盛，需要充足营养；活泼好动消耗大，可分多餐喂食。',
      grooming: '短毛几乎不用打理，偶尔擦拭即可，是低维护品种。',
      health: '注意呼吸系统和牙齿健康，避免过度焦虑引起的心理问题。'
    },
    suitableFor: ['喜欢热闹、能陪聊的人', '爱互动的主人'],
    notSuitableFor: ['喜欢安静、长时间外出的独居者'],
    funFact: '暹罗猫曾被认为能"辟邪"，泰国皇室曾经只允许贵族饲养。'
  },
  {
    id: 5,
    name: '橘猫',
    englishName: 'Orange Tabby',
    alias: '大橘',
    origin: '中国（中华田园猫）',
    lifeSpan: '12-20年',
    weight: '3.5-6kg',
    size: 'medium',
    coat: 'short',
    personality: ['贪吃', '亲人', '随和', '爱睡觉'],
    temperament: 4,
    activityLevel: 3,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#FFE0B8',
    appearance:
      '全身覆盖着温暖的橘色被毛，斑纹多为虎斑或纯色。体型圆润，性格随和。橘猫不是特定品种，而是中华田园猫的一种毛色分类，遍布全国各地。',
    character:
      '俗话说"十个橘猫九个胖"，橘猫以贪吃闻名。性格憨厚随和，亲人友善，适应力极强。能吃能睡，非常治愈。虽然爱睡觉，但玩起来也很投入。',
    care: {
      diet: '必须严格控制饮食！橘猫极易发胖，要定时定量喂食，避免高热量零食。',
      grooming: '短毛打理简单，每周梳毛一次即可，基本零负担。',
      health: '最大的健康威胁是肥胖引起的糖尿病和关节问题，务必控制体重。'
    },
    suitableFor: ['新手铲屎官', '喜欢圆滚滚治愈感的铲屎官'],
    notSuitableFor: ['没有决心帮猫咪控制体重的人'],
    funFact: '"橘猫"不是品种，只要是橘色毛发都算。因为普遍能吃，常被网友调侃"大橘为重"。'
  },
  {
    id: 6,
    name: '狸花猫',
    englishName: 'Chinese Li Hua',
    alias: '中华狸花猫',
    origin: '中国',
    lifeSpan: '13-20年',
    weight: '3.5-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['独立', '机警', '勇敢', '聪明'],
    temperament: 3,
    activityLevel: 4,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#E8E4D8',
    appearance:
      '中国本土猫的代表，黑色条纹如"狸"一般的虎斑纹，身形矫健修长。眼睛明亮，多为黄绿色，透着一股机灵的劲儿。整体感觉精干敏捷。',
    character:
      '性格独立而机警，捕猎本能强，是天生的小猎手。聪明好学，观察力强，对环境适应快。对主人忠诚，但需要一点时间建立信任。健康皮实，是"好养活"的代表。',
    care: {
      diet: '需要高蛋白饮食支持活跃的体能消耗，注意补充牛磺酸。',
      grooming: '短毛几乎不需要打理，是极低维护的品种。',
      health: '身体素质强，抗病能力好，注意定期驱虫和疫苗即可。'
    },
    suitableFor: ['新手铲屎官', '希望猫咪独立不粘人的人', '喜欢本土猫的铲屎官'],
    notSuitableFor: ['希望猫咪非常粘人、时刻陪伴的人'],
    funFact: '狸花猫是中国唯一被认可的猫咪品种，2021年被全球最大猫协组织CFA收录。'
  },
  {
    id: 7,
    name: '三花猫',
    englishName: 'Calico',
    alias: '三色猫',
    origin: '中国（中华田园猫）',
    lifeSpan: '12-20年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['聪明', '有个性', '傲娇', '亲人'],
    temperament: 3,
    activityLevel: 3,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#FFD9E3',
    appearance:
      '黑白橙三色被毛拼接，花色千变万化，几乎每只三花猫的花纹都是独一无二的。体型匀称，颜值看"开脸"，气质多带一丝霸气。',
    character:
      '三花猫以"有个性"著称，聪明机灵，有自己的小脾气，时而傲娇时而粘人。绝大多数三花猫是母猫（公三花极为罕见），性格往往独立自主，是典型的"猫中女王"。',
    care: {
      diet: '正常的营养均衡猫粮即可，注意不要喂食过多零食。',
      grooming: '短毛易打理，每周梳毛一次足够。',
      health: '田园猫体质好，注意定期疫苗驱虫；如为母猫注意绝育时机。'
    },
    suitableFor: ['喜欢有个性猫咪的人', '能接受猫咪有自己的小脾气'],
    notSuitableFor: ['想要温顺听话、任人摆布猫咪的人'],
    funFact: '三花猫绝大多数是母猫，这与毛色基因位于X染色体有关；公三花非常罕见，且几乎都无生育能力。'
  },
  {
    id: 8,
    name: '奶牛猫',
    englishName: 'Tuxedo Cat',
    alias: '黑白猫',
    origin: '中国（中华田园猫）',
    lifeSpan: '12-20年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '调皮', '聪明', '精力旺盛'],
    temperament: 3,
    activityLevel: 5,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#ECECEC',
    appearance:
      '黑白双色如奶牛般配色，有的像穿着黑色燕尾服的绅士，因此得名。花色分布五花八门，有的戴"白手套"，有的戴"白面具"，辨识度极高。',
    character:
      '奶牛猫是出名的"拆家小能手"，精力旺盛、脑洞大开，常常做出让人哭笑不得的行为。非常聪明，爱玩爱闹，互动性强，能自己发明各种玩法。',
    care: {
      diet: '高活动量需要充足能量，但也要控制食量防止肥胖，注意提供运动空间。',
      grooming: '短毛好打理，每周梳毛一次即可。',
      health: '注意预防肥胖，提供足够的玩具和活动场地消耗精力。'
    },
    suitableFor: ['喜欢活泼搞怪猫咪的人', '能提供充足活动空间的人'],
    notSuitableFor: ['喜欢安静、受不了猫咪闹腾的人'],
    funFact: '奶牛猫被网友戏称为"猫中哈士奇"，因为精力过于旺盛、时常做出迷惑行为。'
  },
  {
    id: 9,
    name: '俄罗斯蓝猫',
    englishName: 'Russian Blue',
    alias: '俄蓝',
    origin: '俄罗斯',
    lifeSpan: '15-20年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['安静', '优雅', '温柔', '慢热'],
    temperament: 3,
    activityLevel: 2,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#DDE5F0',
    appearance:
      '一身标志性的蓝灰色短毛，泛着银白色的光泽，如月光般清冷。绿宝石般的眼睛格外明亮。身形优雅修长，步态轻盈，气质高贵神秘。',
    character:
      '性格安静内敛，温柔而害羞。对陌生人警惕慢热，一旦认主就非常忠诚亲昵。不爱吵闹，喜欢安静的环境，是理想的"书房伴侣"。',
    care: {
      diet: '口味挑剔，需要稳定的优质猫粮；注意营养均衡。',
      grooming: '被毛密度高但打理简单，每周梳毛 1 次保持光泽即可。',
      health: '注意牙周疾病和泌尿系统健康，保持安静环境减少应激。'
    },
    suitableFor: ['喜欢安静猫咪的人', '独居人士', '能耐心等待猫咪敞开心扉的人'],
    notSuitableFor: ['家里常来客人、环境嘈杂的家庭'],
    funFact: '俄罗斯蓝猫传说起源于白海沿岸的港口，也被称为"阿堪捷蓝猫"。'
  },
  {
    id: 10,
    name: '阿比西尼亚猫',
    englishName: 'Abyssinian',
    alias: '阿比',
    origin: '埃塞俄比亚（原阿比西尼亚）',
    lifeSpan: '12-16年',
    weight: '3-4.5kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '好动', '聪明', '忠诚'],
    temperament: 4,
    activityLevel: 5,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#F5DFC0',
    appearance:
      '被毛带有独特的"tipping"（每根毛末端深色）效果，阳光下呈流光溢彩的暖棕色调。身材修长优美，大耳朵，杏仁眼，被称为"猫咪中的精灵"。',
    character:
      '精力极其旺盛，像狗狗一样活泼好奇，喜欢攀爬、追逐、叼东西。智商很高，能学会许多把戏。对主人极其忠诚，需要大量陪伴和互动。',
    care: {
      diet: '运动量大，需要高蛋白高能量饮食，注意补充水分。',
      grooming: '短毛打理简单，偶尔梳毛即可，几乎不换毛。',
      health: '注意预防牙龈炎和肾脏疾病，定期体检和洁牙。'
    },
    suitableFor: ['爱运动、能陪玩的铲屎官', '想要高互动性猫咪的人'],
    notSuitableFor: ['没有时间陪玩、喜欢安静猫咪的人'],
    funFact: '阿比西尼亚猫被许多研究者认为是最接近古埃及神猫（芭丝特女神）形象的现代品种。'
  },
  {
    id: 11,
    name: '波斯猫',
    englishName: 'Persian',
    alias: '贵族猫',
    origin: '伊朗（古波斯）',
    lifeSpan: '12-17年',
    weight: '3.5-7kg',
    size: 'medium',
    coat: 'long',
    personality: ['安静', '温顺', '优雅', '慵懒'],
    temperament: 4,
    activityLevel: 1,
    grooming: 5,
    image: '',
    emoji: '🐱',
    color: '#F7F0FA',
    appearance:
      '扁平的脸蛋、圆溜溜的大眼睛、小巧的鼻子，配上一身华丽的长毛，宛如毛绒玩具。被毛浓密飘逸，步态雍容，是猫咪中的"贵族"。',
    character:
      '性格安静温和，慵懒优雅，喜欢趴在柔软的垫子上晒着太阳打盹。叫声轻柔，动作缓慢端庄。对主人温柔亲昵，是"佛系养猫"的绝佳选择。',
    care: {
      diet: '注意控制食量防止肥胖，选择适合长毛猫的优质猫粮。',
      grooming: '长毛需要每天梳理！否则极易打结成球；注意脸部泪痕清洁。',
      health: '易患多囊性肾病和眼部疾病，泪管较短需勤擦泪痕。'
    },
    suitableFor: ['喜欢安静优雅猫咪的人', '有时间每日打理长毛的人'],
    notSuitableFor: ['没时间梳毛、想要活泼猫咪的人'],
    funFact: '波斯猫是世界上最古老的品种之一，也是许多长毛猫品种的祖先。'
  },
  {
    id: 12,
    name: '加菲猫',
    englishName: 'Exotic Shorthair',
    alias: '异国短毛猫',
    origin: '美国',
    lifeSpan: '12-15年',
    weight: '3-6.5kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '安静', '粘人', '可爱'],
    temperament: 5,
    activityLevel: 2,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#FFE4D1',
    appearance:
      '波斯猫的扁平脸配上短毛，圆滚滚的脑袋、包子脸、大圆眼，萌度爆表。因为憨态可掬的长相，常被联想到动画片里的"加菲猫"。',
    character:
      '性格温柔亲人，比波斯猫更活泼一点，但同样安静好养。非常粘人，喜欢窝在主人怀里。适应力强，脾气好，是名副其实的"温柔憨厚"型猫咪。',
    care: {
      diet: '易胖体质需控制食量，选择营养均衡的猫粮，注意定时定量。',
      grooming: '短毛好打理，每周梳毛 1-2 次即可；但要注意脸部泪痕清洁。',
      health: '因鼻泪管较短易流泪，需勤擦眼周；注意呼吸道健康和肥胖问题。'
    },
    suitableFor: ['喜欢包子脸萌猫的人', '新手铲屎官'],
    notSuitableFor: ['不喜欢猫咪流眼泪、懒得擦眼周的人'],
    funFact: '动画片《加菲猫》虽然以它命名，但真实的加菲猫其实是又乖又黏人的小家伙。'
  },
  {
    id: 13,
    name: '缅因猫',
    englishName: 'Maine Coon',
    alias: '温柔的巨人',
    origin: '美国缅因州',
    lifeSpan: '12-15年',
    weight: '5-11kg',
    size: 'large',
    coat: 'long',
    personality: ['温顺', '亲人', '聪明', '稳重'],
    temperament: 5,
    activityLevel: 3,
    grooming: 4,
    image: '',
    emoji: '🐱',
    color: '#E8DCC8',
    appearance:
      '世界上体型最大的家猫品种之一，成年公猫可达 10kg 以上。耳尖有标志性的猞猁毛，尾巴蓬松如扫帚。长毛厚实，身姿威严如小狮子。',
    character:
      '虽然体型巨大，性格却极其温柔，被称为"温柔的巨人"。亲人粘人，喜欢和人互动，有时像狗狗一样对主人亦步亦趋。聪明稳重，能适应家庭生活。',
    care: {
      diet: '需要高蛋白高能量的饮食支持巨大体型，注意补钙和关节健康。',
      grooming: '长毛且厚密，需要每周梳毛 2-3 次，换毛季每天梳理。',
      health: '易患肥厚型心肌病和髋关节发育不良，大体重需注意关节保护。'
    },
    suitableFor: ['喜欢大型猫的人', '能提供较大活动空间的家庭'],
    notSuitableFor: ['居住空间狭小、无法承担大食量的人'],
    funFact: '缅因猫被称为"温柔的巨人"，是北美洲最古老的自然品种之一。'
  },
  {
    id: 14,
    name: '斯芬克斯猫',
    englishName: 'Sphynx',
    alias: '无毛猫、加拿大无毛猫',
    origin: '加拿大',
    lifeSpan: '12-15年',
    weight: '3.5-7kg',
    size: 'medium',
    coat: 'hairless',
    personality: ['粘人', '活泼', '聪明', '温暖'],
    temperament: 5,
    activityLevel: 4,
    grooming: 3,
    image: '',
    emoji: '🐱',
    color: '#F2E3D8',
    appearance:
      '全身几乎无毛，皮肤柔软温润，呈现独特的手感。大大的耳朵、圆润的肚子、深邃的眼睛，外形极具辨识度，是"最像外星生物"的猫咪。',
    character:
      '性格极其粘人，喜欢贴着主人取暖，是"小暖炉"型猫咪。活泼好动、好奇心强，聪明爱玩。对冷热非常敏感，是名副其实需要主人照顾的"怕冷星人"。',
    care: {
      diet: '无毛导致代谢快、需要更多热量保持体温，可适当增加喂食量。',
      grooming: '无毛不代表不打理！皮肤会分泌油脂，需要每周用温毛巾擦拭或洗澡。',
      health: '怕冷需注意保暖，夏天需防晒；皮肤敏感注意清洁频率。'
    },
    suitableFor: ['对猫毛过敏的爱猫人士', '愿意细心照顾猫咪日常的人'],
    notSuitableFor: ['期待毛绒绒手感、无法接受无毛外形的人'],
    funFact: '斯芬克斯猫虽然叫"无毛猫"，但摸起来手感就像温暖的麂皮，非常治愈。'
  },
  {
    id: 15,
    name: '苏格兰折耳猫',
    englishName: 'Scottish Fold',
    alias: '折耳猫',
    origin: '英国苏格兰',
    lifeSpan: '11-15年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '安静', '粘人', '可爱'],
    temperament: 5,
    activityLevel: 2,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#FFF3D9',
    appearance:
      '一对向前折叠的小耳朵，像猫头鹰一样呆萌，是它最标志性的特征。圆脸大眼，胖乎乎的腮帮子，整体圆滚滚的十分可爱。',
    character:
      '性格温顺安静，非常亲人，喜欢粘着主人。叫声轻柔，不爱捣乱。常摆出"思考的姿势"（两腿分开坐），憨态可掬，是治愈系猫咪的代表。',
    care: {
      diet: '易胖体质注意控制食量，选择优质猫粮保持健康体重。',
      grooming: '短毛易打理，每周梳毛 1-2 次即可。',
      health: '⚠️ 折耳基因可能携带软骨发育异常，需定期检查骨骼健康，发现腿疼、尾巴僵硬等异常及时就医。'
    },
    suitableFor: ['喜欢呆萌可爱猫咪的人', '温柔有耐心的铲屎官'],
    notSuitableFor: ['无法接受潜在骨骼疾病风险、不注重体检的人'],
    funFact: '折耳的性状源于一个显性基因突变，但两只折耳猫不应交配，否则后代可能出现严重的骨骼问题。'
  },
  {
    id: 16,
    name: '曼基康矮脚猫',
    englishName: 'Munchkin',
    alias: '短腿猫',
    origin: '美国',
    lifeSpan: '12-15年',
    weight: '2.5-4kg',
    size: 'small',
    coat: 'short',
    personality: ['活泼', '好动', '好奇', '亲人'],
    temperament: 4,
    activityLevel: 4,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#E6F0FF',
    appearance:
      '标志性的四条小短腿，配上圆滚滚的身体，走起路来一扭一扭的，像只小柯基。身体比例协调，被毛短而光滑，整体萌态十足。',
    character:
      '别看腿短，跑跳能力一点不差。性格活泼好动，好奇心旺盛，爱玩爱闹。对人友善亲人，喜欢和主人互动，是非常有感染力的"小可爱"。',
    care: {
      diet: '正常优质猫粮即可，注意控制食量，避免过度肥胖压迫短腿关节。',
      grooming: '短毛易打理，每周梳毛一次即可。',
      health: '注意脊柱和关节健康，避免让猫咪频繁从高处跳下。'
    },
    suitableFor: ['喜欢萌系小巧猫咪的人', '有爱心和耐心的人'],
    notSuitableFor: ['喜欢大体型、期待猫咪擅长跳跃的人'],
    funFact: '曼基康的短腿源于自然基因突变，被称为"猫界柯基"，但腿短并不影响它们活泼的天性。'
  },
  {
    id: 17,
    name: '金渐层',
    englishName: 'Golden Chinchilla',
    alias: '英短金渐层',
    origin: '英国',
    lifeSpan: '12-17年',
    weight: '4-7kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '安静', '亲人', '可爱'],
    temperament: 5,
    activityLevel: 2,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#F7E3C0',
    appearance:
      '严格来说是英国短毛猫的一种毛色，但颜值出圈成为独立"网红品种"。底色为温暖的金黄色，搭配黑色tipping毛尖，阳光下泛着华贵的光泽，配上绿宝石眼睛，非常漂亮。',
    character:
      '继承了英短的温顺性格，安静亲人，慵懒可爱。喜欢安静地待在主人身边，不太闹腾，是非常适合当"陪伴猫"的高颜值品种。',
    care: {
      diet: '易胖体质，需控制食量，选择优质高蛋白猫粮，定期称重。',
      grooming: '短毛浓密，每周梳毛 1-2 次，换毛季适当增加。',
      health: '常见问题与英短类似，注意肥胖、心肌病和呼吸道健康。'
    },
    suitableFor: ['喜欢高颜值猫咪的人', '新手铲屎官'],
    notSuitableFor: ['想要活泼好动、互动性极强的猫咪的人'],
    funFact: '金渐层和银渐层其实都是英国短毛猫的毛色变种，只是名气太大被单独立为"品种"讨论。'
  },
  {
    id: 18,
    name: '银渐层',
    englishName: 'Silver Chinchilla',
    alias: '英短银渐层',
    origin: '英国',
    lifeSpan: '12-17年',
    weight: '4-7kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '安静', '亲人', '粘人'],
    temperament: 5,
    activityLevel: 2,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#E9EDF2',
    appearance:
      '与金渐层同源，底色为银白色，被毛带有黑色毛尖，形成银光闪闪的"渐变"效果，宛如披了一层月光。圆脸大眼，颜值非常能打。',
    character:
      '性格温柔安静，比金渐层更粘人一些，喜欢窝在主人身边。适应力强，脾气好，是安静治愈的家庭伴侣。',
    care: {
      diet: '注意控制食量防止肥胖，选择营养均衡的优质猫粮。',
      grooming: '短毛浓密，每周梳毛 1-2 次，注意毛色养护。',
      health: '与英短相同，注意肥胖、心肌病等常见问题，定期体检。'
    },
    suitableFor: ['喜欢银白仙气颜值的人', '喜欢安静粘人猫的人'],
    notSuitableFor: ['想要运动量大、爱跑酷的猫咪的人'],
    funFact: '银渐层的"渐变感"来自毛尖的黑灰色段，白色+黑色渐变形成了独特的银色光芒。'
  },
  {
    id: 19,
    name: '德文卷毛猫',
    englishName: 'Devon Rex',
    alias: '外星猫',
    origin: '英国',
    lifeSpan: '10-15年',
    weight: '2.5-4.5kg',
    size: 'small',
    coat: 'curly',
    personality: ['活泼', '调皮', '粘人', '聪明'],
    temperament: 5,
    activityLevel: 5,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#F0E4D9',
    appearance:
      '一身细密的小卷毛，像烫了"大波浪"。大耳朵、大眼睛、尖下巴，配上卷毛，长相古灵精怪，被戏称为"小精灵"或"外星猫"。',
    character:
      '性格非常活泼好动，精力充沛，像个小猴子一样上蹿下跳。极其粘人，喜欢跟主人互动玩耍，聪明机灵，会自己开门翻抽屉。是"皮但可爱"的典型。',
    care: {
      diet: '活跃度高消耗大，需要高蛋白高能量饮食满足运动需求。',
      grooming: '卷毛几乎不掉毛，打理极简单，偶尔用软布擦拭即可。',
      health: '注意牙周健康和肠胃敏感问题，保持规律喂食。'
    },
    suitableFor: ['喜欢活泼古灵精怪猫咪的人', '能接受猫咪调皮捣蛋的人'],
    notSuitableFor: ['喜欢安静温顺、希望猫咪乖乖待着的人'],
    funFact: '德文卷毛猫的卷毛基因与柯尼斯卷毛猫不同，是独立的基因突变，被称为"猫中小精灵"。'
  },
  {
    id: 20,
    name: '孟加拉豹猫',
    englishName: 'Bengal',
    alias: '豹猫',
    origin: '美国',
    lifeSpan: '12-16年',
    weight: '4-8kg',
    size: 'large',
    coat: 'short',
    personality: ['活泼', '自信', '聪明', '好奇'],
    temperament: 4,
    activityLevel: 5,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#F0DFC8',
    appearance:
      '由亚洲豹猫与家猫杂交培育而成，身上带有豹纹般的斑点或大理石纹，肌肉线条流畅，野性十足的"小豹子"既视感，颜值极高。',
    character:
      '性格活泼自信，运动细胞超强，像狗狗一样爱玩水、爱接飞盘。非常聪明，好奇心重，需要大量运动和刺激。对主人亲昵，是精力旺盛的"运动达人"。',
    care: {
      diet: '运动量大需要高蛋白高能量饮食，注意补充牛磺酸和微量元素。',
      grooming: '短毛带光泽，打理简单，每周梳毛 1-2 次即可。',
      health: '注意肠道敏感和泌尿系统健康，提供充足活动空间和攀爬设施。'
    },
    suitableFor: ['爱运动、能陪玩的人', '有充足活动空间的家庭'],
    notSuitableFor: ['居住空间小、无法提供足够运动量的人'],
    funFact: '孟加拉豹猫喜欢玩水，这在猫咪中非常少见，有些甚至会跟着主人一起洗澡。'
  }
]
