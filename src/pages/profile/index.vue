<script setup lang="ts">
import { computed, ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
import { useProfileStore } from '@/stores/profile'
import { useVaccineStore } from '@/stores/vaccine'
import { useFeedingStore } from '@/stores/feeding'
import { useDiaryStore } from '@/stores/diary'
import { catBreeds } from '@/data/cat-breeds'
import { GENDER_LABELS, GENDER_ICONS } from '@/data/types'
import type { CatGender, CatProfile } from '@/data/types'
import { daysBetween, today } from '@/utils/date'
import { catToHumanAge, getAgeStage } from '@/utils/age'

const profileStore = useProfileStore()
const vaccineStore = useVaccineStore()
const feedingStore = useFeedingStore()
const diaryStore = useDiaryStore()

const currentDate = ref(today())
const showForm = ref(false)
const editingId = ref('')

const EMOJI_OPTIONS = ['🐱', '🐈', '🐈‍⬛', '😺', '😸', '😻', '😼', '🙀']
const COLOR_PALETTE = [
  '#FFE8D6', '#E3F0EA', '#F3E8FF', '#EFE4D8',
  '#FFE0B8', '#FFD9E3', '#DDE5F0', '#FFF3D9'
]

const genderOptions: Array<{ value: CatGender; label: string }> = [
  { value: 'male', label: '♂ 弟弟' },
  { value: 'female', label: '♀ 妹妹' },
  { value: 'unknown', label: '❔ 未知' }
]

const sterilizeOptions: Array<{ value: 'yes' | 'no' | ''; label: string }> = [
  { value: 'yes', label: '已绝育' },
  { value: 'no', label: '未绝育' },
  { value: '', label: '不填' }
]

const form = ref({
  name: '',
  birthday: '',
  gender: 'unknown' as CatGender,
  breedIndex: -1,
  sterilized: '' as 'yes' | 'no' | '',
  emoji: '🐱',
  color: COLOR_PALETTE[0],
  note: ''
})

onShow(() => {
  currentDate.value = today()
})

/** 品种名（档案 breedId 关联图鉴） */
function breedName(breedId?: number): string {
  if (breedId === undefined) return ''
  return catBreeds.find((b) => b.id === breedId)?.name || ''
}

/** 由生日推算年龄信息 */
function ageInfo(birthday?: string) {
  if (!birthday) return null
  const days = daysBetween(birthday, currentDate.value)
  if (days < 0) return null
  const totalMonths = Math.floor(days / 30.44)
  const years = Math.floor(totalMonths / 12)
  const months = totalMonths % 12
  const text =
    totalMonths < 1 ? '不足 1 个月' : years > 0 ? `${years} 岁${months ? ` ${months} 个月` : ''}` : `${months} 个月`
  return { years, months, text, human: catToHumanAge(years, months), stage: getAgeStage(years, months) }
}

/** 聚合各工具中属于这只猫的数据（以 catName 字符串关联） */
function catStats(name: string) {
  const next = vaccineStore.records
    .filter((r) => r.catName === name)
    .sort((a, b) => a.nextDate.localeCompare(b.nextDate))[0]
  let vaccineText = '暂无疫苗计划'
  let urgent = false
  if (next) {
    const diff = daysBetween(next.nextDate, currentDate.value)
    vaccineText =
      diff < 0
        ? `${next.name} 逾期 ${-diff} 天`
        : diff === 0
          ? `${next.name} 今天到期`
          : `${next.name} 还有 ${diff} 天`
    urgent = diff <= 3
  }
  const feedCount = feedingStore.records.filter((r) => r.catName === name).length
  const diaryCount = diaryStore.entries.filter((e) => e.catName === name).length
  return { vaccineText, urgent, feedCount, diaryCount }
}

const breedDisplay = computed(() =>
  form.value.breedIndex >= 0 ? catBreeds[form.value.breedIndex]?.name || '' : ''
)

function openAdd() {
  editingId.value = ''
  form.value = {
    name: '',
    birthday: '',
    gender: 'unknown',
    breedIndex: -1,
    sterilized: '',
    emoji: EMOJI_OPTIONS[profileStore.profileCount % EMOJI_OPTIONS.length],
    color: COLOR_PALETTE[profileStore.profileCount % COLOR_PALETTE.length],
    note: ''
  }
  showForm.value = true
}

function openEdit(profile: CatProfile) {
  editingId.value = profile.id
  form.value = {
    name: profile.name,
    birthday: profile.birthday || '',
    gender: profile.gender || 'unknown',
    breedIndex: profile.breedId ? catBreeds.findIndex((b) => b.id === profile.breedId) : -1,
    sterilized: profile.sterilized === undefined ? '' : profile.sterilized ? 'yes' : 'no',
    emoji: profile.emoji,
    color: profile.color,
    note: profile.note || ''
  }
  showForm.value = true
}

function closeForm() {
  showForm.value = false
}

function pickBirthday(value: string) {
  form.value.birthday = value
}

function pickBreed(index: number) {
  form.value.breedIndex = index
}

function clearBreed() {
  form.value.breedIndex = -1
}

function submitForm() {
  const name = form.value.name.trim()
  if (!name) {
    uni.showToast({ title: '请填写猫咪名字', icon: 'none' })
    return
  }
  // 名字是各工具的关联键，不允许重复
  const dup = profileStore.profiles.some((p) => p.name === name && p.id !== editingId.value)
  if (dup) {
    uni.showToast({ title: '已有同名猫咪，换个名字吧', icon: 'none' })
    return
  }
  const breed = form.value.breedIndex >= 0 ? catBreeds[form.value.breedIndex] : undefined
  const data = {
    name,
    birthday: form.value.birthday || undefined,
    gender: form.value.gender,
    breedId: breed?.id,
    sterilized: form.value.sterilized === '' ? undefined : form.value.sterilized === 'yes',
    emoji: form.value.emoji,
    color: form.value.color,
    note: form.value.note.trim() || undefined
  }
  if (editingId.value) {
    profileStore.updateProfile(editingId.value, data)
    uni.showToast({ title: '已更新', icon: 'success' })
  } else {
    profileStore.addProfile(data)
    uni.showToast({ title: '已添加', icon: 'success' })
  }
  closeForm()
}

function removeProfile(profile: CatProfile) {
  uni.showModal({
    title: '删除档案',
    content: `确定删除「${profile.name}」的档案吗？各工具里已记录的数据不会被删除。`,
    confirmColor: '#FF9F6B',
    success: (res) => {
      if (res.confirm) {
        profileStore.removeProfile(profile.id)
        uni.showToast({ title: '已删除', icon: 'none' })
      }
    }
  })
}

function goTool(url: string) {
  uni.navigateTo({ url })
}
</script>

<template>
  <view class="profile">
    <view class="profile__header">
      <view class="profile__tip">
        <text class="profile__tip-icon">🐈</text>
        <text class="profile__tip-text">
          给每只猫建个档案，工具里就能一键选猫，这里还会汇总它们的疫苗和记录
        </text>
      </view>
    </view>

    <!-- 档案列表 -->
    <view class="profile__list">
      <view v-if="profileStore.sortedProfiles.length">
        <view
          v-for="cat in profileStore.sortedProfiles"
          :key="cat.id"
          class="cat-card"
          @click="openEdit(cat)"
          @longpress="removeProfile(cat)"
        >
          <view class="cat-card__head">
            <view class="cat-card__avatar" :style="{ background: cat.color }">
              {{ cat.emoji }}
            </view>
            <view class="cat-card__info">
              <view class="cat-card__title-row">
                <text class="cat-card__name">{{ cat.name }}</text>
                <text class="cat-card__gender">{{ GENDER_ICONS[cat.gender || 'unknown'] }} {{ GENDER_LABELS[cat.gender || 'unknown'] }}</text>
                <text v-if="cat.sterilized" class="cat-card__tag">已绝育</text>
              </view>
              <view class="cat-card__meta">
                <text v-if="breedName(cat.breedId)" class="cat-card__meta-item">{{ breedName(cat.breedId) }}</text>
                <template v-if="ageInfo(cat.birthday)">
                  <text class="cat-card__meta-item">{{ ageInfo(cat.birthday)!.text }}</text>
                  <text class="cat-card__meta-item">≈ 人龄 {{ ageInfo(cat.birthday)!.human }} 岁</text>
                  <text class="cat-card__meta-item">{{ ageInfo(cat.birthday)!.stage }}</text>
                </template>
              </view>
              <text v-if="cat.note" class="cat-card__note">{{ cat.note }}</text>
            </view>
          </view>

          <!-- 聚合数据：点击跳转对应工具 -->
          <view class="cat-card__stats">
            <view
              class="cat-card__stat"
              @click.stop="goTool('/pages/tool-detail/vaccine')"
            >
              <text class="cat-card__stat-icon">💉</text>
              <text
                class="cat-card__stat-text"
                :class="{ 'cat-card__stat-text--urgent': catStats(cat.name).urgent }"
              >{{ catStats(cat.name).vaccineText }}</text>
            </view>
            <view
              class="cat-card__stat"
              @click.stop="goTool('/pages/tool-detail/feeding')"
            >
              <text class="cat-card__stat-icon">🍚</text>
              <text class="cat-card__stat-text">喂食记录 {{ catStats(cat.name).feedCount }} 条</text>
            </view>
            <view
              class="cat-card__stat"
              @click.stop="goTool('/pages/tool-detail/diary')"
            >
              <text class="cat-card__stat-icon">📝</text>
              <text class="cat-card__stat-text">日记 {{ catStats(cat.name).diaryCount }} 篇</text>
            </view>
          </view>
        </view>

        <view class="profile__hint">
          <text class="profile__hint-text">点击卡片编辑 · 点下方数据跳对应工具 · 长按删除</text>
        </view>
      </view>
      <Empty v-else icon="🐈" text="还没有猫咪档案，点击下方按钮添加" />
    </view>

    <!-- 添加按钮 -->
    <view class="profile__footer">
      <view class="btn-primary profile__add-btn" @click="openAdd">＋ 添加猫咪</view>
    </view>

    <!-- 表单弹层 -->
    <view v-if="showForm" class="mask" @click="closeForm">
      <view class="form" @click.stop>
        <view class="form__header">
          <text class="form__title">{{ editingId ? '编辑档案' : '添加猫咪' }}</text>
          <text class="form__close" @click="closeForm">✕</text>
        </view>

        <view class="form__body">
          <view class="form__field">
            <text class="form__label">名字 *</text>
            <input
              v-model="form.name"
              class="form__input"
              placeholder="如：咪咪"
              placeholder-class="form__placeholder"
            />
          </view>

          <view class="form__field">
            <text class="form__label">头像</text>
            <view class="emoji-grid">
              <view
                v-for="e in EMOJI_OPTIONS"
                :key="e"
                class="emoji-grid__item"
                :class="{ 'emoji-grid__item--active': form.emoji === e }"
                :style="{ background: form.emoji === e ? form.color : undefined }"
                @click="form.emoji = e"
              >{{ e }}</view>
            </view>
            <view class="color-row">
              <view
                v-for="c in COLOR_PALETTE"
                :key="c"
                class="color-row__item"
                :class="{ 'color-row__item--active': form.color === c }"
                :style="{ background: c }"
                @click="form.color = c"
              />
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">生日（选填，可估算）</text>
            <picker
              mode="date"
              :value="form.birthday || currentDate"
              :end="currentDate"
              @change="pickBirthday($event.detail.value)"
            >
              <view class="form__picker">{{ form.birthday || '未填写' }} ▾</view>
            </picker>
          </view>

          <view class="form__field">
            <text class="form__label">性别</text>
            <view class="form__seg">
              <view
                v-for="opt in genderOptions"
                :key="opt.value"
                class="form__seg-item"
                :class="{ 'form__seg-item--active': form.gender === opt.value }"
                @click="form.gender = opt.value"
              >{{ opt.label }}</view>
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">品种（关联图鉴）</text>
            <view class="breed-row">
              <picker
                class="breed-row__picker"
                :range="catBreeds"
                range-key="name"
                :value="form.breedIndex < 0 ? 0 : form.breedIndex"
                @change="pickBreed($event.detail.value)"
              >
                <view class="form__picker">{{ breedDisplay || '未填写' }} ▾</view>
              </picker>
              <text v-if="form.breedIndex >= 0" class="breed-row__clear" @click="clearBreed">清除</text>
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">绝育状态</text>
            <view class="form__seg">
              <view
                v-for="opt in sterilizeOptions"
                :key="opt.value"
                class="form__seg-item"
                :class="{ 'form__seg-item--active': form.sterilized === opt.value }"
                @click="form.sterilized = opt.value"
              >{{ opt.label }}</view>
            </view>
          </view>

          <view class="form__field">
            <text class="form__label">备注</text>
            <input
              v-model="form.note"
              class="form__input"
              placeholder="选填，如：爱吃罐头 / 怕吹风机"
              placeholder-class="form__placeholder"
            />
          </view>
        </view>

        <view class="form__footer">
          <view class="btn-ghost form__btn" @click="closeForm">取消</view>
          <view class="btn-primary form__btn" @click="submitForm">保存</view>
        </view>
      </view>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.profile {
  min-height: 100vh;
  background: $bg-color;
  padding-bottom: calc(140rpx + env(safe-area-inset-bottom));

  &__header {
    padding: $spacing-md $spacing-lg;
  }

  &__tip {
    display: flex;
    align-items: center;
    gap: $spacing-sm;
    background: rgba(201, 184, 232, 0.15);
    border-radius: $radius-md;
    padding: $spacing-sm $spacing-md;
  }

  &__tip-icon {
    font-size: 36rpx;
  }

  &__tip-text {
    flex: 1;
    font-size: $font-sm;
    color: $text-secondary;
    line-height: 1.6;
  }

  &__list {
    padding: 0 $spacing-lg;
  }

  &__hint {
    display: flex;
    justify-content: center;
    padding: $spacing-sm 0;
  }

  &__hint-text {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__footer {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    padding: $spacing-sm $spacing-lg calc(#{$spacing-sm} + env(safe-area-inset-bottom));
    background: linear-gradient(transparent, $bg-color 30%);
  }

  &__add-btn {
    width: 100%;
  }
}

.cat-card {
  background: $bg-card;
  border-radius: $radius-lg;
  box-shadow: $shadow-card;
  padding: $spacing-md;
  margin-bottom: $spacing-md;

  &__head {
    display: flex;
    gap: $spacing-md;
  }

  &__avatar {
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 56rpx;
    flex-shrink: 0;
  }

  &__info {
    flex: 1;
    min-width: 0;
  }

  &__title-row {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: $spacing-sm;
  }

  &__name {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__gender {
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__tag {
    font-size: 20rpx;
    color: $accent-mint;
    border: 2rpx solid $accent-mint;
    border-radius: $radius-sm;
    padding: 2rpx 12rpx;
  }

  &__meta {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs $spacing-md;
    margin-top: 8rpx;
  }

  &__meta-item {
    font-size: $font-sm;
    color: $text-muted;
  }

  &__note {
    display: block;
    margin-top: 8rpx;
    font-size: $font-sm;
    color: $text-secondary;
  }

  &__stats {
    display: flex;
    margin-top: $spacing-md;
    padding-top: $spacing-md;
    border-top: 1rpx solid $divider;
    gap: $spacing-md;
  }

  &__stat {
    flex: 1;
    min-width: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 4rpx;
  }

  &__stat-icon {
    font-size: 32rpx;
  }

  &__stat-text {
    font-size: 22rpx;
    color: $text-secondary;
    text-align: center;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 100%;

    &--urgent {
      color: #d9604a;
      font-weight: $font-weight-medium;
    }
  }
}

.emoji-grid {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;

  &__item {
    width: 84rpx;
    height: 84rpx;
    border-radius: $radius-md;
    border: 2rpx solid $divider;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 44rpx;

    &--active {
      border-color: $primary;
    }
  }
}

.color-row {
  display: flex;
  gap: $spacing-sm;
  margin-top: $spacing-sm;

  &__item {
    width: 52rpx;
    height: 52rpx;
    border-radius: 50%;
    border: 4rpx solid transparent;

    &--active {
      border-color: $primary;
    }
  }
}

.breed-row {
  display: flex;
  align-items: center;
  gap: $spacing-md;

  &__picker {
    flex: 1;
    min-width: 0;
  }

  &__clear {
    flex-shrink: 0;
    font-size: $font-sm;
    color: $primary-dark;
  }
}

.mask {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  background: rgba(74, 63, 53, 0.4);
  z-index: 999;
  display: flex;
  align-items: flex-end;
}

.form {
  width: 100%;
  background: $bg-color;
  border-radius: $radius-xl $radius-xl 0 0;
  padding: $spacing-lg;
  padding-bottom: calc(#{$spacing-lg} + env(safe-area-inset-bottom));
  max-height: 85vh;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: $spacing-lg;
  }

  &__title {
    font-size: $font-title;
    font-weight: $font-weight-bold;
    color: $text-primary;
  }

  &__close {
    font-size: 36rpx;
    color: $text-muted;
    padding: $spacing-xs;
  }

  &__body {
    margin-bottom: $spacing-lg;
  }

  &__field {
    margin-bottom: $spacing-md;
  }

  &__label {
    display: block;
    font-size: $font-sm;
    color: $text-secondary;
    margin-bottom: $spacing-xs;
  }

  &__input {
    height: 80rpx;
    background: $bg-card;
    border-radius: $radius-md;
    padding: 0 $spacing-md;
    font-size: $font-subtitle;
    color: $text-primary;
  }

  &__placeholder {
    color: $text-muted;
  }

  &__picker {
    display: flex;
    align-items: center;
    height: 80rpx;
    background: $bg-card;
    border-radius: $radius-md;
    padding: 0 $spacing-md;
    font-size: $font-subtitle;
    color: $text-primary;
  }

  &__seg {
    display: flex;
    gap: $spacing-sm;
  }

  &__seg-item {
    flex: 1;
    height: 76rpx;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: $radius-md;
    background: $bg-card;
    color: $text-secondary;
    font-size: $font-subtitle;

    &--active {
      background: linear-gradient(135deg, $primary-light, $primary);
      color: #ffffff;
      font-weight: $font-weight-medium;
    }
  }

  &__footer {
    display: flex;
    gap: $spacing-md;
  }

  &__btn {
    flex: 1;
  }
}
</style>
