/**
 * 猫咪品种静态数据（44 种）
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
  },
  {
    id: 21,
    name: '挪威森林猫',
    englishName: 'Norwegian Forest Cat',
    alias: '威基',
    origin: '挪威',
    lifeSpan: '12-16年',
    weight: '4-9kg',
    size: 'large',
    coat: 'long',
    personality: ['独立', '温和', '矫健', '聪明'],
    temperament: 4,
    activityLevel: 4,
    grooming: 4,
    image: '',
    emoji: '🐱',
    color: '#E4F0E4',
    appearance:
      '体型高大健壮，被毛双层浓密防水，颈部有华丽的围脖毛。三角形脑袋、长而蓬松的大尾巴，眼神警觉，一副北欧森林里走出的"猎手"模样。',
    character:
      '性格独立又不失温柔，喜欢待在高处俯瞰全家。攀爬能力极强，是天生的"登山健将"。对家人温和亲近，但保持适度距离，不吵不闹，很有分寸感。',
    care: {
      diet: '大型猫发育期长达 4 年，需要高蛋白饮食支持生长，成年后注意控制体重。',
      grooming: '双层被毛每周需梳毛 2-3 次，换毛季每天梳理防止打结毛球。',
      health: '注意髋关节发育不良和糖原贮积症筛查，定期体检。'
    },
    suitableFor: ['有攀爬空间的家庭', '能坚持梳毛的人', '喜欢独立猫咪的人'],
    notSuitableFor: ['居住空间狭小、家里没有高处可爬的人'],
    funFact: '挪威森林猫被认为是维京人的"御猫"，随船出海捉鼠，能头朝下从树干上倒着爬下来。'
  },
  {
    id: 22,
    name: '西伯利亚猫',
    englishName: 'Siberian',
    alias: '西伯利亚森林猫',
    origin: '俄罗斯',
    lifeSpan: '12-15年',
    weight: '4-9kg',
    size: 'large',
    coat: 'long',
    personality: ['忠诚', '温柔', '勇敢', '亲人'],
    temperament: 5,
    activityLevel: 4,
    grooming: 4,
    image: '',
    emoji: '🐱',
    color: '#E3EAF5',
    appearance:
      '体格强壮圆润，胸宽腿粗，被毛三层且极其浓密，冬季毛发蓬松如狮子。大而圆的眼睛多为金黄色或绿色，尾巴粗大蓬松，浑身散发着耐寒的"毛绒感"。',
    character:
      '性格忠诚温柔，像狗狗一样恋家认主，会到门口迎接主人。勇敢无畏，对陌生人也不怯场。活泼爱玩，终身保持"孩子气"，是大型长毛猫里少有的好脾气。',
    care: {
      diet: '体型大食欲好，选择高蛋白猫粮并控制食量，防止肥胖加重关节负担。',
      grooming: '三层被毛每周梳毛 2-3 次，冬季换毛季需每天梳理。',
      health: '注意肥厚型心肌病筛查；被毛防水性强，洗澡较费力。'
    },
    suitableFor: ['对猫毛轻微过敏的人群', '喜欢粘人大型猫的家庭', '有孩子的家庭'],
    notSuitableFor: ['没时间打理长毛、居住空间过小的人'],
    funFact: '西伯利亚猫分泌的 Fel d 1 过敏原较少，是相对"低致敏"的长毛猫，在俄罗斯被视为国宝。'
  },
  {
    id: 23,
    name: '喜马拉雅猫',
    englishName: 'Himalayan',
    alias: '喜猫',
    origin: '美国',
    lifeSpan: '12-15年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'long',
    personality: ['温柔', '安静', '粘人', '优雅'],
    temperament: 5,
    activityLevel: 2,
    grooming: 5,
    image: '',
    emoji: '🐱',
    color: '#F5E4EC',
    appearance:
      '拥有波斯猫的圆脸短鼻和华丽长毛，又继承了暹罗猫的重点色和湛蓝眼睛。面部、耳朵、四肢呈深色，身体浅色，像戴了精致的"深色面具"，气质雍容华贵。',
    character:
      '性格温柔甜美，安静优雅，喜欢慵懒地窝在沙发上而不是上蹿下跳。对主人依恋但表达含蓄，叫声轻柔细弱。不喜欢嘈杂环境，是典型的"贵族猫"。',
    care: {
      diet: '扁平面部进食较费力，选择小颗粒易咀嚼的猫粮，使用浅口食盆。',
      grooming: '长毛极易打结，必须每天梳毛；泪痕明显，需每天擦拭眼周。',
      health: '遗传多囊肾和呼吸道问题较常见，避免高温环境，定期体检。'
    },
    suitableFor: ['喜欢安静优雅猫咪的人', '能每天梳毛护理的人', '公寓饲养'],
    notSuitableFor: ['无法接受高频护理、家里环境嘈杂的人'],
    funFact: '喜马拉雅猫是波斯猫与暹罗猫杂交培育的品种，名字来源于喜马拉雅兔——同样的重点色毛色。'
  },
  {
    id: 24,
    name: '巴厘猫',
    englishName: 'Balinese',
    alias: '巴里猫',
    origin: '美国',
    lifeSpan: '12-16年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'long',
    personality: ['活泼', '话痨', '粘人', '聪明'],
    temperament: 5,
    activityLevel: 4,
    grooming: 3,
    image: '',
    emoji: '🐱',
    color: '#E8E2F3',
    appearance:
      '相当于长毛版暹罗猫：修长优雅的体型、楔形脑袋、大耳朵和迷人的蓝眼睛，被毛中长而柔顺贴身，尾巴如羽毛般蓬松飘逸，走起路来婀娜多姿。',
    character:
      '继承了暹罗猫的话痨基因，爱用柔和的嗓音和主人"对话"。极度粘人，喜欢参与主人的一切活动。聪明活泼，可以学会捡球、开抽屉，是互动性极强的伴侣猫。',
    care: {
      diet: '代谢旺盛消耗大，保证充足优质蛋白，可少食多餐。',
      grooming: '半长毛不易打结，每周梳毛 1-2 次即可，比多数长毛猫省心。',
      health: '注意淀粉样变和心脏问题；情感需求高，长期冷落易抑郁。'
    },
    suitableFor: ['喜欢互动型猫咪的人', '家里有人陪伴的家庭', '想要长毛猫又怕打理麻烦的人'],
    notSuitableFor: ['经常出差、无法陪伴的人', '喜欢安静怕猫叫的人'],
    funFact: '巴厘猫其实是暹罗猫的长毛基因变异后代，因舞姿般优雅的身段而得名，和巴厘岛并没有关系。'
  },
  {
    id: 25,
    name: '土耳其安哥拉猫',
    englishName: 'Turkish Angora',
    alias: '安哥拉猫',
    origin: '土耳其',
    lifeSpan: '12-15年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'long',
    personality: ['活泼', '聪明', '优雅', '好动'],
    temperament: 4,
    activityLevel: 5,
    grooming: 3,
    image: '',
    emoji: '🐱',
    color: '#F7F2E4',
    appearance:
      '纤细优雅的身躯披着一层丝绸般的半长毛，没有绒毛层，毛发飘逸不显臃肿。大而尖的耳朵、杏仁形的大眼睛（蓝、绿、金或鸳鸯眼），尾巴蓬松如鸵鸟羽毛，气质高贵。',
    character:
      '活泼好动精力充沛，喜欢跑跳攀爬，一刻也闲不住。聪明机灵，会开门、玩水龙头。对主人忠诚依恋，但有自己的主见，不是任人摆布的类型，个性十足。',
    care: {
      diet: '运动量大消耗高，需要高蛋白高能量饮食，保证牛磺酸摄入。',
      grooming: '无绒毛层不易打结，每周梳毛 1-2 次即可，护理相对轻松。',
      health: '白色蓝眼个体可能有听力障碍；注意肥厚型心肌病筛查。'
    },
    suitableFor: ['喜欢活泼聪明猫咪的人', '能提供充足活动空间的家庭'],
    notSuitableFor: ['喜欢安静慵懒猫咪的人', '家中有易碎摆件的谨慎家庭'],
    funFact: '土耳其安哥拉猫是最古老的自然长毛猫种之一，曾被土耳其安卡拉动物园当作国宝保护繁育。'
  },
  {
    id: 26,
    name: '土耳其梵猫',
    englishName: 'Turkish Van',
    alias: '梵猫',
    origin: '土耳其',
    lifeSpan: '12-17年',
    weight: '4-8kg',
    size: 'large',
    coat: 'long',
    personality: ['活泼', '勇敢', '爱水', '聪明'],
    temperament: 4,
    activityLevel: 5,
    grooming: 3,
    image: '',
    emoji: '🐱',
    color: '#E2EEF0',
    appearance:
      '以白色为主的身体，只有头顶和尾巴带有红色或奶油色斑块，像戴了"彩色帽子"。体格健壮肌肉发达，琥珀色或蓝色大眼睛，被毛半长且防水，尾巴蓬松如瓶刷。',
    character:
      '大名鼎鼎的"游泳猫"，天生爱水，会主动跳进水池浴缸玩耍。性格勇敢自信，精力旺盛，喜欢登高跳跃。对认定的主人非常忠诚，但对陌生人保持警惕。',
    care: {
      diet: '运动量极大，需要高能量饮食；游泳消耗后注意及时补充营养。',
      grooming: '半长防水被毛不易缠结，每周梳毛 1-2 次即可。',
      health: '整体健康，注意听力筛查（白色个体）；家中水缸鱼缸务必加盖。'
    },
    suitableFor: ['喜欢独特爱水猫咪的人', '有庭院或大空间的家庭'],
    notSuitableFor: ['家中养鱼、担心水缸安全的人', '喜欢安静猫咪的人'],
    funFact: '土耳其梵猫来自凡湖地区，是极少数天生会游泳、主动玩水的猫，在土耳其被视为国家财富禁止出境。'
  },
  {
    id: 27,
    name: '英国长毛猫',
    englishName: 'British Longhair',
    alias: '英长',
    origin: '英国',
    lifeSpan: '12-17年',
    weight: '4-8kg',
    size: 'medium',
    coat: 'long',
    personality: ['温顺', '安静', '稳重', '独立'],
    temperament: 4,
    activityLevel: 2,
    grooming: 4,
    image: '',
    emoji: '🐱',
    color: '#E9EEF7',
    appearance:
      '英国短毛猫的长毛版本：同样的圆脑袋、圆眼睛、包子脸和敦实体型，加上浓密蓬松的中长毛和粗壮大尾巴，活像一只圆滚滚的"毛绒熊"，可爱度爆表。',
    character:
      '性格和英短一样温柔沉稳，安静不爱闹，喜欢默默陪伴在主人身边。适应力强，对小孩和其他宠物都很包容。独立而不孤僻，自己在家也能怡然自得。',
    care: {
      diet: '和英短一样易胖体质，严格控制食量，选择低脂高蛋白猫粮。',
      grooming: '浓密长毛每周梳毛 2-3 次，换毛季每天梳理，注意腋下耳后易打结。',
      health: '注意肥胖、心肌病和多囊肾筛查，定期体检。'
    },
    suitableFor: ['喜欢圆润长毛猫的人', '公寓饲养', '有孩子的家庭'],
    notSuitableFor: ['无法坚持梳毛、对猫毛满天飞敏感的人'],
    funFact: '英国长毛猫其实是英短繁育中隐性长毛基因的"返祖"后代，早年不被认可，如今已成独立热门品种。'
  },
  {
    id: 28,
    name: '山东狮子猫',
    englishName: 'Chinese Lion Cat',
    alias: '临清狮子猫',
    origin: '中国',
    lifeSpan: '12-16年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'long',
    personality: ['温顺', '聪慧', '独立', '优雅'],
    temperament: 3,
    activityLevel: 3,
    grooming: 4,
    image: '',
    emoji: '🐱',
    color: '#F8F3E9',
    appearance:
      '通体雪白的长毛如狮鬃般蓬松华丽，颈部毛发尤为浓密，故名"狮子猫"。最珍贵的是鸳鸯眼——一蓝一黄两只眼睛，像戴了美瞳，气质仙气飘飘。',
    character:
      '性格温顺聪慧但不太粘人，保留着田园猫的独立天性。安静优雅，喜欢观察而不爱凑热闹。身体素质好，适应能力强，对主人忠诚，认家不认食。',
    care: {
      diet: '肠胃强健不挑食，选择优质猫粮即可，注意控制零食量。',
      grooming: '白色长毛需要每周梳毛 2-3 次，注意泪痕清洁，保持毛发洁白。',
      health: '体质好遗传病少；白色蓝眼个体需做听力检查。'
    },
    suitableFor: ['喜欢本土长毛猫的人', '能接受猫咪性格独立的人'],
    notSuitableFor: ['想要极致粘人猫咪、无法勤梳毛的人'],
    funFact: '山东狮子猫源于临清，相传由波斯猫与本地猫繁育而来，明清时期曾是进贡皇室的贡品猫。'
  },
  {
    id: 29,
    name: '索马里猫',
    englishName: 'Somali',
    alias: '索马里',
    origin: '美国',
    lifeSpan: '12-16年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'long',
    personality: ['活泼', '聪明', '好奇', '优雅'],
    temperament: 4,
    activityLevel: 5,
    grooming: 3,
    image: '',
    emoji: '🐱',
    color: '#F6EAD9',
    appearance:
      '阿比西尼亚猫的长毛版本：修长的身躯披着红棕色的中长毛，每根毛发都有多段深浅色带（ticking），在光线下流光溢彩。大耳朵、杏仁眼，蓬松的大尾巴像狐狸，野性又优雅。',
    character:
      '聪明好奇精力无限，是家里的"探险队长"，柜子顶、冰箱上都可能发现它。活泼好动终身保持幼猫心态，喜欢玩水玩玩具。对主人亲近，互动性极强。',
    care: {
      diet: '活动量大消耗高，选择高蛋白猫粮，保证充足饮水。',
      grooming: '半长毛打理轻松，每周梳毛 1-2 次即可，掉毛量少。',
      health: '注意丙酮酸激酶缺乏症和牙龈炎筛查，定期检查口腔。'
    },
    suitableFor: ['喜欢活泼聪明猫咪的人', '愿意每天陪玩的家庭'],
    notSuitableFor: ['希望猫咪安静待着、无暇陪玩的人'],
    funFact: '索马里猫的每根毛发有 4-12 段色带，是猫界"ticking 渐层毛"最华丽的品种，阳光下像披了金红色霞光。'
  },
  {
    id: 30,
    name: '东方短毛猫',
    englishName: 'Oriental Shorthair',
    alias: '东方猫',
    origin: '美国',
    lifeSpan: '12-15年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '话痨', '聪明', '粘人'],
    temperament: 5,
    activityLevel: 5,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#EDEFF5',
    appearance:
      '暹罗猫的"多彩版本"：同样修长纤细的体型、楔形脑袋和大耳朵，但毛色多达 300 余种——纯色、虎斑、双色应有尽有。杏仁形的绿眼睛是标志性特征，线条感极强。',
    character:
      '比暹罗猫更话痨的"聊天机器人"，会用各种音调对你发表长篇大论。极度粘人，参与感强，你走到哪它跟到哪。聪明绝顶，能学会开门、捡球，情感丰富且占有欲强。',
    care: {
      diet: '代谢快食欲旺盛，保证优质蛋白摄入，少食多餐。',
      grooming: '短毛几乎免打理，每周用软布或橡胶刷梳理一次即可。',
      health: '注意淀粉样变和牙周病；情感需求极高，不宜长时间独处。'
    },
    suitableFor: ['喜欢高互动猫咪的人', '家中常有人陪伴的家庭', '想要多色系选择的人'],
    notSuitableFor: ['怕吵怕猫叫、经常出差的人'],
    funFact: '东方短毛猫拥有猫界最多的毛色组合（超过 300 种），是名副其实的"彩虹猫"。'
  },
  {
    id: 31,
    name: '缅甸猫',
    englishName: 'Burmese',
    alias: '棕猫',
    origin: '缅甸/美国',
    lifeSpan: '12-16年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'short',
    personality: ['亲人', '活泼', '温柔', '话痨'],
    temperament: 5,
    activityLevel: 4,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#EAE0D4',
    appearance:
      '中等身材却重得惊人，抱起来像"丝绸包裹的砖头"。被毛短而光亮紧贴身体，呈独特的深棕色（貂色），随年龄渐变。金色或黄色的大眼睛圆而有神，表情甜美。',
    character:
      '超级社交达人，把每个进门的人都当朋友。性格温柔粘人，喜欢坐在主人腿上撒娇，会用沙哑柔和的嗓音轻声"唠叨"。活泼爱玩到老年，是最像狗的猫之一。',
    care: {
      diet: '食欲旺盛易发胖，控制食量并保证运动，选择高蛋白猫粮。',
      grooming: '短毛丝滑，每周轻梳一次即可，几乎不掉毛。',
      health: '注意糖尿病和前庭综合征筛查；怕冷，冬季注意保暖。'
    },
    suitableFor: ['喜欢粘人社交猫的家庭', '有孩子和其他宠物的家庭'],
    notSuitableFor: ['家中长期无人、无法忍受猫叫的人'],
    funFact: '现代缅甸猫都源自一只名叫"棕猫 Wong Mau"的母猫，1930 年它被从缅甸带到美国，开启了整个品种。'
  },
  {
    id: 32,
    name: '托基猫',
    englishName: 'Tonkinese',
    alias: '东奇尼兹猫',
    origin: '加拿大',
    lifeSpan: '12-16年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '亲人', '聪明', '好奇'],
    temperament: 5,
    activityLevel: 4,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#DAE9E8',
    appearance:
      '暹罗猫与缅甸猫的"黄金结合"：体型介于两者之间，肌肉结实线条流畅。被毛呈柔和的水貂色，最迷人的是独有的"水蓝色"（aquamarine）大眼睛，像海水一样清澈。',
    character:
      '集暹罗的聪明话痨与缅甸的温柔粘人于一身，性格平衡完美。好奇心重，喜欢"监督"主人做事。活泼好动能学会遛绳散步，对家人极度依恋，是全能型伴侣猫。',
    care: {
      diet: '活泼好动消耗大，选择高蛋白猫粮，注意补充牛磺酸。',
      grooming: '短毛 silky 手感，每周梳理一次即可，极易打理。',
      health: '整体健康，注意牙龈炎和淀粉样变筛查，定期体检。'
    },
    suitableFor: ['想要性格平衡猫咪的家庭', '有孩子的家庭', '愿意陪玩的互动型主人'],
    notSuitableFor: ['经常不在家、猫咪会孤独的人'],
    funFact: '托基猫的专属毛色叫"水貂色"（mink），既不是暹罗的重点色也不是缅甸的纯色，是独有的中间色系。'
  },
  {
    id: 33,
    name: '沙特尔猫',
    englishName: 'Chartreux',
    alias: '夏特尔猫',
    origin: '法国',
    lifeSpan: '12-15年',
    weight: '3-7kg',
    size: 'medium',
    coat: 'short',
    personality: ['安静', '温柔', '独立', '忠诚'],
    temperament: 4,
    activityLevel: 3,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#E0E5EC',
    appearance:
      '一身蓝灰色的浓密双层被毛，带有羊毛般的质感，颈部毛发蓬松像围了围巾。圆圆的脑袋配铜橙色的大眼睛，嘴角微微上扬，被称为"法兰西的微笑猫"。',
    character:
      '安静内敛，很少叫，叫声细若蚊蝇。性格温柔忠诚，会默默跟随主人但不强求关注。狩猎本能强，是出色的捕鼠能手。适应力强，对环境变化处变不惊。',
    care: {
      diet: '体质好不易挑食，选择优质猫粮，注意控制体重防止肥胖。',
      grooming: '双层被毛每周梳毛 1-2 次，换毛季适当增加频次。',
      health: '注意髌骨脱位和多囊肾筛查；牙齿易错位，定期口腔检查。'
    },
    suitableFor: ['喜欢安静猫咪的人', '公寓饲养', '上班族（能忍受适度独处）'],
    notSuitableFor: ['想要高互动粘人猫、经常搬家变动的人'],
    funFact: '传说沙特尔猫由法国沙特尔修道院的修士饲养，与卡都西修道院的绿色利口酒同名，是法国国宝级猫种。'
  },
  {
    id: 34,
    name: '科拉特猫',
    englishName: 'Korat',
    alias: '呵叻猫',
    origin: '泰国',
    lifeSpan: '10-15年',
    weight: '2.5-5kg',
    size: 'small',
    coat: 'short',
    personality: ['温柔', '安静', '粘人', '敏感'],
    temperament: 4,
    activityLevel: 3,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#EBE5F1',
    appearance:
      '银蓝色的短毛泛着丝绸光泽，毛尖如镀了银。标志性的"心形脸"——额头宽平、下巴尖俏，配上大而圆的浅绿色眼睛，在泰国被称为"带来好运的猫"。',
    character:
      '温柔安静，对主人极度依恋，喜欢趴在肩头陪伴。性格敏感细腻，能察觉主人情绪变化。不爱叫，偶尔发声也很轻柔。对陌生环境和噪音较为紧张，需要稳定感。',
    care: {
      diet: '体型小巧食量不大，选择小颗粒优质猫粮，少食多餐。',
      grooming: '短毛单层几乎不掉毛，每周轻梳一次即可。',
      health: '注意 GM1/GM2 神经节苷脂沉积症筛查（基因检测可排查）。'
    },
    suitableFor: ['喜欢安静温柔猫咪的人', '公寓饲养', '生活规律稳定的家庭'],
    notSuitableFor: ['家中环境嘈杂多变、经常有陌生人出入的人'],
    funFact: '在泰国，科拉特猫是传统的"好运猫"，常作为新婚礼物赠予新娘，寓意婚姻幸福美满。'
  },
  {
    id: 35,
    name: '新加坡猫',
    englishName: 'Singapura',
    alias: '新洲猫',
    origin: '新加坡',
    lifeSpan: '12-15年',
    weight: '2-3kg',
    size: 'small',
    coat: 'short',
    personality: ['活泼', '聪明', '亲人', '好奇'],
    temperament: 4,
    activityLevel: 4,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#F4EDDB',
    appearance:
      '世界上最小的猫品种之一，成年母猫仅 2kg 左右。象牙色的身体覆盖着温暖的深褐色 ticking 渐层毛，大而圆的眼睛呈榛子色或绿色，大耳朵在脸上显得脸更小，娇小玲珑。',
    character:
      '小身体藏着大能量，活泼好奇爱探索，喜欢占据家里制高点。性格温柔亲人，喜欢蜷在主人腿上。保留着街头智慧，机灵得很，但从不具有攻击性。',
    care: {
      diet: '体型小吃得少，选择营养密度高的小颗粒猫粮，注意不要过量喂食。',
      grooming: '短毛细密，每周梳理一次即可，非常省心。',
      health: '注意丙酮酸激酶缺乏症筛查；子宫惰性（母猫）需留意生育问题。'
    },
    suitableFor: ['喜欢小巧猫咪的人', '公寓饲养', '想要低打理成本的家庭'],
    notSuitableFor: ['家中幼儿较多、担心误伤小型猫的家庭'],
    funFact: '新加坡猫源自新加坡街头，曾被当地人称"沟渠猫"，如今是新加坡的旅游吉祥物"Kucinta"。'
  },
  {
    id: 36,
    name: '埃及猫',
    englishName: 'Egyptian Mau',
    alias: '埃及玛欧猫',
    origin: '埃及',
    lifeSpan: '12-15年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '忠诚', '敏捷', '警觉'],
    temperament: 3,
    activityLevel: 5,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#EDE4CF',
    appearance:
      '唯一拥有天然斑点纹的家猫品种，银色、古铜色或烟色的被毛上散布着随机不规则的深色斑点。额头有标志性的"M"形斑纹，眼睛呈独特的"醋栗绿"，身材矫健如小猎豹。',
    character:
      '猫界短跑冠军，冲刺速度可超 50 公里/小时。性格忠诚但略带矜持，对主人极度依恋、对陌生人保持距离。活泼好动爱玩水，会用前爪拨弄水龙头，狩猎欲望强烈。',
    care: {
      diet: '运动量极大，需要高蛋白高能量饮食，注意补充水分。',
      grooming: '短毛贴身，每周梳理一次即可，掉毛少。',
      health: '注意肥厚型心肌病筛查；肠胃较敏感，换粮要循序渐进。'
    },
    suitableFor: ['欣赏野性美的人', '能提供大活动空间的家庭', '有养猫经验的人'],
    notSuitableFor: ['想要温顺任撸猫咪的新手', '居住空间狭小的人'],
    funFact: '"Mau"在古埃及语中就是"猫"的意思，埃及猫被认为是古埃及壁画上神猫的后裔，历史超过 3000 年。'
  },
  {
    id: 37,
    name: '孟买猫',
    englishName: 'Bombay',
    alias: '黑豹猫',
    origin: '美国',
    lifeSpan: '12-16年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '粘人', '活泼', '亲人'],
    temperament: 5,
    activityLevel: 3,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#E2E2E8',
    appearance:
      '通体乌黑发亮的短毛紧贴身体，像披了黑缎子，连鼻头和爪垫都是黑色的。最惊艳的是那双铜金色大眼睛，在黑色被毛衬托下炯炯有神，活脱脱一只"迷你黑豹"。',
    character:
      '外表神秘高冷，内心却是十足的"社交牛"。性格温顺粘人，喜欢霸占主人的腿和键盘。脾气极好，对小孩和其他宠物包容度极高。适度活泼，不爱搞破坏。',
    care: {
      diet: '食欲好易发胖，控制食量并保证日常运动。',
      grooming: '黑色短毛每周梳理一次，用软布擦拭可保持缎子般光泽。',
      health: '注意肥厚型心肌病和呼吸道问题；怕冷，冬季需保暖。'
    },
    suitableFor: ['喜欢黑猫的人', '有孩子和宠物的家庭', '公寓饲养'],
    notSuitableFor: ['家中温度较低、无法提供保暖环境的人'],
    funFact: '孟买猫是黑色美短与深棕色缅甸猫杂交培育的"人造黑豹"，名字致敬印度孟买——黑豹的故乡。'
  },
  {
    id: 38,
    name: '雪鞋猫',
    englishName: 'Snowshoe',
    alias: '斯诺修猫',
    origin: '美国',
    lifeSpan: '12-15年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['温柔', '粘人', '聪明', '安静'],
    temperament: 5,
    activityLevel: 3,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#DBE9F3',
    appearance:
      '暹罗猫的花色加上四只雪白的"鞋子"——脚掌像刚踩过雪地。重点色的面部常带白色倒 V 形斑纹，湛蓝的大眼睛清澈迷人，短毛贴身，优雅又别致。',
    character:
      '温柔甜美，是出了名的"抱在怀里的猫"，喜欢依偎在主人身边。聪明爱学习，能掌握开门、捡球等技能。性格比暹罗猫安静许多，叫声轻柔，社交能力强，与人和其他宠物都相处融洽。',
    care: {
      diet: '体质较好，选择优质猫粮，注意维持理想体重。',
      grooming: '短毛易打理，每周梳理一次即可。',
      health: '整体健康，偶见淀粉样变和斜视遗传倾向，定期体检即可。'
    },
    suitableFor: ['喜欢温柔粘人猫咪的人', '公寓饲养', '有孩子的家庭'],
    notSuitableFor: ['经常长时间不在家的人——它们需要陪伴'],
    funFact: '网络顶流"不爽猫"（Grumpy Cat）就带有雪鞋猫血统，那副天生嫌弃脸让它成为表情包之王。'
  },
  {
    id: 39,
    name: '日本短尾猫',
    englishName: 'Japanese Bobtail',
    alias: '三花招财猫',
    origin: '日本',
    lifeSpan: '12-16年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['活泼', '聪明', '温柔', '幸运'],
    temperament: 4,
    activityLevel: 4,
    grooming: 1,
    image: '',
    emoji: '🐱',
    color: '#F1E6ED',
    appearance:
      '最醒目的是兔子般的短尾巴——每只的尾巴弯曲程度都独一无二，像指纹。身材修长矫健，后肢略长于前肢，常见白底配红黑斑块（三花），金色或绿色大眼睛明亮有神。',
    character:
      '活泼聪明好奇心强，喜欢"参与"家务，会用前爪拨弄各种东西。性格温柔亲人，叫声悦耳多变，据说能"唱歌"。适应力强，聪明到可以训练外出散步。',
    care: {
      diet: '体质强健不挑食，选择优质猫粮保证营养均衡。',
      grooming: '短毛顺滑，每周梳理一次即可，几乎不打结。',
      health: '整体非常健康，遗传病极少；注意尾部脊椎护理，避免拉扯尾巴。'
    },
    suitableFor: ['喜欢独特短尾猫的人', '有孩子的家庭', '想要健康省心品种的人'],
    notSuitableFor: ['家中摆满易碎品的谨慎家庭'],
    funFact: '日本招财猫"真奈美"（Maneki-neko）的原型就是三花日本短尾猫，在日本被视为招福圣物，已有千年历史。'
  },
  {
    id: 40,
    name: '美国卷耳猫',
    englishName: 'American Curl',
    alias: '卷耳猫',
    origin: '美国',
    lifeSpan: '12-16年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '活泼', '亲人', '聪明'],
    temperament: 5,
    activityLevel: 4,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#F0E7F2',
    appearance:
      '标志性的耳朵向后卷曲成优雅的弧形，像新月一样，配上丝滑的被毛和匀称的身材。眼睛呈核桃形，眼神天真无邪，整体气质灵动俏皮。',
    character:
      '被称为"永远的彼得潘"——成年后依然保持小猫般的好奇与顽皮。性格温顺亲人，喜欢跟随主人但不吵不闹。聪明爱互动，对小孩和其他宠物都很友好，是完美的家庭猫。',
    care: {
      diet: '体质好，选择优质猫粮，注意维持理想体重。',
      grooming: '短毛或半长毛每周梳理 1-2 次；耳软骨脆弱，清洁耳朵时动作务必轻柔。',
      health: '整体健康，注意耳道清洁防止感染；避免用力掰折耳朵软骨。'
    },
    suitableFor: ['喜欢独特耳形猫咪的人', '有孩子的家庭', '想要活泼又温顺猫咪的人'],
    notSuitableFor: ['无法温柔对待猫咪耳朵的幼儿家庭'],
    funFact: '卷耳猫出生时耳朵是直的，出生 10 天后开始向后卷曲，4 个月定型——每一只的卷曲角度都独一无二。'
  },
  {
    id: 41,
    name: '曼岛无尾猫',
    englishName: 'Manx',
    alias: '曼克斯猫',
    origin: '英国曼岛',
    lifeSpan: '8-14年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'short',
    personality: ['温顺', '聪明', '活泼', '忠诚'],
    temperament: 4,
    activityLevel: 4,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#E5ECDF',
    appearance:
      '天生无尾或只有一小截尾骨，臀部圆润高耸，后腿明显长于前腿，走起路来像兔子一样蹦蹦跳跳。身材圆胖结实，被毛双层浓密，圆脸圆眼，憨态可掬。',
    character:
      '聪明忠诚，认主意识强，被称为"猫中之狗"——会跟随主人、守护家园。狩猎能力出色，弹跳力惊人。性格温和但不失个性，对家人极度依恋，是优秀的伴侣猫。',
    care: {
      diet: '体型圆润易胖，控制食量并保持运动，选择高纤维猫粮助消化。',
      grooming: '双层被毛每周梳理 1-2 次，换毛季增加频次。',
      health: '无尾基因可能伴随脊椎问题（曼岛综合征），选购时务必检查脊椎健康，避免过度繁殖无尾个体。'
    },
    suitableFor: ['喜欢独特体型猫咪的人', '有院子的家庭（爱捕猎巡逻）'],
    notSuitableFor: ['无法定期观察其脊椎和排便健康状况的人'],
    funFact: '传说曼岛猫的尾巴是被诺亚关方舟门时夹掉的——当然，科学解释是自然基因突变，它们在曼岛已生存数百年。'
  },
  {
    id: 42,
    name: '塞尔凯克卷毛猫',
    englishName: 'Selkirk Rex',
    alias: '赛尔凯克猫',
    origin: '美国',
    lifeSpan: '10-15年',
    weight: '3-6kg',
    size: 'medium',
    coat: 'curly',
    personality: ['温顺', '安静', '粘人', '耐心'],
    temperament: 5,
    activityLevel: 3,
    grooming: 3,
    image: '',
    emoji: '🐱',
    color: '#F3EADF',
    appearance:
      '一身蓬松柔软的卷毛，像刚烫了"羊毛卷"，摸起来如毛绒玩具。体格圆润结实，圆脸圆眼，配上卷曲的胡须和眉毛，憨态可掬，被称为"披着羊皮的猫"。',
    character:
      '性格继承了波斯系的温柔恬静，又有美短的亲和大度。极度耐心，任抱任撸从不伸爪，对小孩和其他宠物包容度极高。安静不爱叫，喜欢懒洋洋地陪伴主人，是"佛系"猫咪代表。',
    care: {
      diet: '易胖体质，控制食量选择低脂猫粮，避免过度喂食。',
      grooming: '卷毛易打结但过度梳理会拉直卷度，建议每周用手轻拢 1-2 次，少用密齿梳。',
      health: '注意多囊肾和肥厚型心肌病筛查（波斯血统遗传），定期体检。'
    },
    suitableFor: ['喜欢卷毛猫又怕打理麻烦的人', '有孩子的家庭', '想要安静猫咪的人'],
    notSuitableFor: ['追求极致活跃互动猫咪的人'],
    funFact: '塞尔凯克是唯一以培育者继父名字命名的猫品种——1987 年培育者 Jeri Newman 用自己继父 Selkirk 的名字为它命名。'
  },
  {
    id: 43,
    name: '拉波卷毛猫',
    englishName: 'LaPerm',
    alias: '拉波猫',
    origin: '美国',
    lifeSpan: '10-15年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'curly',
    personality: ['活泼', '粘人', '聪明', '好奇'],
    temperament: 4,
    activityLevel: 4,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#EFE8F4',
    appearance:
      '一身蓬松的螺旋卷毛像刚做完"烫发"，毛发柔软有弹性，卷曲的胡须俏皮可爱。体型中等偏瘦但肌肉结实，眼睛大而明亮，表情灵动，有种随性的"波西米亚"气质。',
    character:
      '活泼好动好奇心爆棚，喜欢站在高处"监工"主人的一举一动。粘人爱撒娇，会用头不停蹭你。聪明机灵，会开门、按开关，精力充沛但不神经质，是有趣的互动型伙伴。',
    care: {
      diet: '活动量较大，选择高蛋白猫粮，保证充足饮水。',
      grooming: '卷毛每周轻梳 1-2 次，过度梳理会拉直卷度；耳部油脂较多需定期清洁。',
      health: '整体健康遗传病少；换毛期可能局部脱毛，属正常现象。'
    },
    suitableFor: ['喜欢卷毛猫的人', '想要低掉毛量猫咪的家庭', '愿意陪玩的互动型主人'],
    notSuitableFor: ['希望猫咪安静慵懒、无暇互动的人'],
    funFact: '拉波猫起源于 1982 年俄勒冈州果园里一只名叫 Curly 的卷毛母猫，它的后代全部继承了这头"天生的卷发"。'
  },
  {
    id: 44,
    name: '彼得秃猫',
    englishName: 'Peterbald',
    alias: '彼得堡秃猫',
    origin: '俄罗斯',
    lifeSpan: '12-15年',
    weight: '3-5kg',
    size: 'medium',
    coat: 'hairless',
    personality: ['粘人', '活泼', '聪明', '好奇'],
    temperament: 5,
    activityLevel: 4,
    grooming: 2,
    image: '',
    emoji: '🐱',
    color: '#E8E6EC',
    appearance:
      '身形修长优雅，皮肤细腻温热，可能完全无毛、覆盖短绒毛或有一层"桃毛"。大耳朵、杏仁眼、长尾巴，线条流畅如外星来客，摸起来像温热的麂皮，手感独特。',
    character:
      '极度粘人的"跟屁虫"，渴望关注，会用大嗓门呼唤主人。聪明好奇，喜欢探索每个角落。因为无毛怕冷，特别爱钻被窝、贴暖气片，是天生的"暖手宝"猫咪。',
    care: {
      diet: '无毛散热快代谢旺盛，食量比一般猫大，需要高热量高蛋白饮食。',
      grooming: '皮肤会分泌油脂，需每周用温水擦拭或洗澡；注意防晒和保暖。',
      health: '注意皮肤晒伤和温度敏感；冬季务必提供保暖窝，夏季避免阳光直射。'
    },
    suitableFor: ['对猫毛过敏但仍想养猫的人', '能提供恒温环境的家庭', '喜欢高互动猫咪的人'],
    notSuitableFor: ['家中温度较低、无法精心护理皮肤的人'],
    funFact: '彼得秃猫 1994 年才诞生于俄罗斯圣彼得堡，是世界上最年轻的无毛猫品种之一，名字就是为了致敬这座城市的"彼得"。'
  }
]
