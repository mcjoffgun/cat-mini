/**
 * TabBar 图标生成脚本（Node 20，零依赖）
 *
 * 程序化绘制 81×81 PNG（4× 超采样做抗锯齿，手写 PNG 编码器）：
 *   home    🏠 房子        首页
 *   catalog ▦ 2×2 网格     图鉴（呼应卡片网格布局）
 *   tools   🔧 扳手        工具
 * 每个图标输出两态：未选中 #C4B8A8、选中 #FF9F6B（设计规范色）
 *
 * 用法：node scripts/gen-tabbar-icons.mjs
 * 输出：src/static/tabbar/*.png
 */
import { deflateSync } from 'node:zlib'
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const SIZE = 81
const SS = 4 // 超采样倍率（81×4 = 324 画布）
const BIG = SIZE * SS

const COLOR_MUTED = [0xc4, 0xb8, 0xa8] // $text-muted
const COLOR_ACTIVE = [0xff, 0x9f, 0x6b] // $primary

/* ---------- 形状原语（坐标归一化 0..1） ---------- */

const rect = (x0, y0, x1, y1) => (x, y) => x >= x0 && x <= x1 && y >= y0 && y <= y1

const circle = (cx, cy, r) => {
  const r2 = r * r
  return (x, y) => (x - cx) * (x - cx) + (y - cy) * (y - cy) <= r2
}

/** 以 (cx,cy) 为中心、绕中心旋转 ang 弧度的矩形 */
const rotatedRect = (cx, cy, w, h, ang) => {
  const cos = Math.cos(-ang)
  const sin = Math.sin(-ang)
  const hw = w / 2
  const hh = h / 2
  return (x, y) => {
    const dx = x - cx
    const dy = y - cy
    const lx = dx * cos - dy * sin
    const ly = dx * sin + dy * cos
    return Math.abs(lx) <= hw && Math.abs(ly) <= hh
  }
}

/** 线段胶囊（两端半圆，粗 w） */
const capsule = (x0, y0, x1, y1, w) => {
  const r = w / 2
  const dx = x1 - x0
  const dy = y1 - y0
  const len2 = dx * dx + dy * dy
  return (x, y) => {
    let t = len2 === 0 ? 0 : ((x - x0) * dx + (y - y0) * dy) / len2
    t = Math.max(0, Math.min(1, t))
    const px = x0 + t * dx
    const py = y0 + t * dy
    return (x - px) * (x - px) + (y - py) * (y - py) <= r * r
  }
}

/** 取反（挖洞）：mask 内为 false */
const not = (m) => (x, y) => !m(x, y)
/** 交集 */
const and = (a, b) => (x, y) => a(x, y) && b(x, y)
/** 并集 */
const or = (a, b) => (x, y) => a(x, y) || b(x, y)

/* ---------- 三个图标 ---------- */

/** 房子：屋顶三角 + 屋身，挖门 */
const homeMask = (() => {
  // 屋顶：顶点 (0.5, 0.14)，底边 y=0.5，左右 0.08/0.92
  const roof = (x, y) => {
    if (y < 0.14 || y > 0.5) return false
    const halfSpan = ((y - 0.14) / (0.5 - 0.14)) * 0.42
    return x >= 0.5 - halfSpan && x <= 0.5 + halfSpan
  }
  const body = rect(0.2, 0.5, 0.8, 0.86)
  const door = rect(0.43, 0.6, 0.57, 0.86)
  return and(or(roof, body), not(door))
})()

/** 图鉴：2×2 网格 */
const catalogMask = (() => {
  // 4 个方块，小尺寸下圆角不明显，直接用矩形
  const cells = [
    rect(0.14, 0.14, 0.44, 0.44),
    rect(0.56, 0.14, 0.86, 0.44),
    rect(0.14, 0.56, 0.44, 0.86),
    rect(0.56, 0.56, 0.86, 0.86)
  ]
  return cells.reduce((a, b) => or(a, b))
})()

/** 工具：斜向扳手（环头 + 开口 + 手柄） */
const toolsMask = (() => {
  const handle = capsule(0.36, 0.64, 0.62, 0.38, 0.16)
  const ringOut = circle(0.68, 0.32, 0.2)
  const ringIn = circle(0.68, 0.32, 0.1)
  const ring = and(ringOut, not(ringIn))
  // 开口：从环顶朝右上 45° 挖一个楔形
  const jaw = rotatedRect(0.78, 0.22, 0.14, 0.16, Math.PI / 4)
  const head = and(ring, not(jaw))
  return or(handle, head)
})()

/* ---------- 光栅化（4× 超采样 + 区域平均） ---------- */

function render(mask, [r, g, b]) {
  // 在 324×324 上求掩码，再平均为 81×81
  const gray = new Uint8Array(BIG * BIG)
  for (let py = 0; py < BIG; py++) {
    for (let px = 0; px < BIG; px++) {
      gray[py * BIG + px] = mask((px + 0.5) / BIG, (py + 0.5) / BIG) ? 255 : 0
    }
  }
  const rgba = new Uint8Array(SIZE * SIZE * 4)
  const n = SS * SS
  for (let y = 0; y < SIZE; y++) {
    for (let x = 0; x < SIZE; x++) {
      let sum = 0
      for (let sy = 0; sy < SS; sy++) {
        for (let sx = 0; sx < SS; sx++) {
          sum += gray[(y * SS + sy) * BIG + x * SS + sx]
        }
      }
      const a = Math.round(sum / n)
      const i = (y * SIZE + x) * 4
      rgba[i] = r
      rgba[i + 1] = g
      rgba[i + 2] = b
      rgba[i + 3] = a
    }
  }
  return rgba
}

/* ---------- 最小 PNG 编码器 ---------- */

const CRC_TABLE = (() => {
  const t = new Uint32Array(256)
  for (let n = 0; n < 256; n++) {
    let c = n
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1
    t[n] = c >>> 0
  }
  return t
})()

function crc32(buf) {
  let c = 0xffffffff
  for (let i = 0; i < buf.length; i++) c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8)
  return (c ^ 0xffffffff) >>> 0
}

function chunk(type, data) {
  const len = Buffer.alloc(4)
  len.writeUInt32BE(data.length)
  const typeBuf = Buffer.from(type, 'ascii')
  const crcBuf = Buffer.alloc(4)
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])))
  return Buffer.concat([len, typeBuf, data, crcBuf])
}

function encodePng(w, h, rgba) {
  // IHDR：宽/高/位深8/颜色类型6(RGBA)/压缩0/滤波0/隔行0
  const ihdr = Buffer.alloc(13)
  ihdr.writeUInt32BE(w, 0)
  ihdr.writeUInt32BE(h, 4)
  ihdr[8] = 8
  ihdr[9] = 6
  // 逐行加滤波字节 0
  const raw = Buffer.alloc(h * (1 + w * 4))
  for (let y = 0; y < h; y++) {
    raw[y * (1 + w * 4)] = 0
    Buffer.from(rgba.buffer, rgba.byteOffset + y * w * 4, w * 4).copy(raw, y * (1 + w * 4) + 1)
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk('IHDR', ihdr),
    chunk('IDAT', deflateSync(raw, { level: 9 })),
    chunk('IEND', Buffer.alloc(0))
  ])
}

/* ---------- 生成并写盘 ---------- */

const icons = {
  home: homeMask,
  catalog: catalogMask,
  tools: toolsMask
}

const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'src', 'static', 'tabbar')
mkdirSync(outDir, { recursive: true })

for (const [name, mask] of Object.entries(icons)) {
  const states = [
    [`${name}.png`, COLOR_MUTED],
    [`${name}-active.png`, COLOR_ACTIVE]
  ]
  for (const [file, color] of states) {
    const png = encodePng(SIZE, SIZE, render(mask, color))
    writeFileSync(join(outDir, file), png)
    console.log(`${file}  ${png.length} bytes`)
  }
}
console.log('done →', outDir)
