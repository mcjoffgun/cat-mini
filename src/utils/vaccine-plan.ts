/**
 * 幼猫标准免疫计划模板
 * 根据生日一键生成整套疫苗 + 驱虫提醒，供 vaccine 页面调用
 *
 * 参考通用免疫程序：
 * - 猫三联：8 周 / 12 周 / 16 周三针，之后每年加强
 * - 狂犬疫苗：12 周首针，之后每年加强
 * - 体内驱虫：每 3 个月一次；体外驱虫：每月一次
 */
import type { VaccineRecord } from '@/data/types'
import { addDays, today } from './date'

export type PlanRecord = Omit<VaccineRecord, 'id'>

/** 猫三联针次：名称 + 距出生天数 + 上一针日期基准 */
const COMBO_DOSES = [
  { name: '猫三联 第1针', days: 56 },
  { name: '猫三联 第2针', days: 84 },
  { name: '猫三联 第3针', days: 112 }
]

/** 狂犬首针：12 周 */
const RABIES_DAYS = 84

/**
 * 生成幼猫免疫计划
 * @param birthDate 生日 YYYY-MM-DD（可估算）
 * @param catName 猫咪名字（选填）
 * @returns 待新增的提醒记录（已过期的针次自动跳过，年度加强滚动到下一个未来日期）
 */
export function generateKittenPlan(birthDate: string, catName?: string): PlanRecord[] {
  const name = catName?.trim() || undefined
  const t = today()
  const records: PlanRecord[] = []

  // 猫三联三针：日期已过的跳过（无法补排，需手动录入）
  COMBO_DOSES.forEach((dose, index) => {
    const nextDate = addDays(birthDate, dose.days)
    if (nextDate < t) return
    const lastDate =
      index === 0 ? birthDate : addDays(birthDate, COMBO_DOSES[index - 1].days)
    records.push({
      name: dose.name,
      type: 'vaccine',
      lastDate,
      nextDate,
      note: '幼猫标准免疫程序',
      catName: name
    })
  })

  // 狂犬首针
  const rabiesDate = addDays(birthDate, RABIES_DAYS)
  if (rabiesDate >= t) {
    records.push({
      name: '狂犬疫苗 首针',
      type: 'vaccine',
      lastDate: birthDate,
      nextDate: rabiesDate,
      note: '幼猫标准免疫程序',
      catName: name
    })
  }

  // 年度加强：从末针 + 1 年起，滚动到下一个未来日期（成年猫也适用）
  // 频率按国内疫苗说明书为每年一次；三联与狂犬分开记录，名称与实际疫苗对应
  let comboBooster = addDays(birthDate, COMBO_DOSES[2].days + 365)
  for (let i = 0; i < 40 && comboBooster < t; i += 1) {
    comboBooster = addDays(comboBooster, 365)
  }
  records.push({
    name: '猫三联 年度加强',
    type: 'vaccine',
    lastDate: addDays(comboBooster, -365),
    nextDate: comboBooster,
    note: '国内说明书为每年一次；国际指南（WSAVA）成年猫可每 3 年，遵医嘱',
    catName: name
  })

  let rabiesBooster = addDays(birthDate, RABIES_DAYS + 365)
  for (let i = 0; i < 40 && rabiesBooster < t; i += 1) {
    rabiesBooster = addDays(rabiesBooster, 365)
  }
  records.push({
    name: '狂犬疫苗 年度加强',
    type: 'vaccine',
    lastDate: addDays(rabiesBooster, -365),
    nextDate: rabiesBooster,
    note: '每年加强一次',
    catName: name
  })

  // 驱虫：首次不早于 8 周龄；已过期则从今天起算
  const dewormStart = addDays(birthDate, 56) >= t ? addDays(birthDate, 56) : t
  records.push({
    name: '体内驱虫',
    type: 'deworm',
    lastDate: dewormStart,
    nextDate: addDays(dewormStart, 90),
    note: '每 3 个月一次',
    catName: name
  })
  records.push({
    name: '体外驱虫',
    type: 'deworm',
    lastDate: dewormStart,
    nextDate: addDays(dewormStart, 30),
    note: '每月一次',
    catName: name
  })

  return records.sort((a, b) => a.nextDate.localeCompare(b.nextDate))
}
