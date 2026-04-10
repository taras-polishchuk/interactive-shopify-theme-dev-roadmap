export interface Resource {
  label: string
  url: string
}

export interface RoadmapNode {
  id: string
  stageId: string
  title: string
  description: string
  skills: string[]
  requires: string[]
  resources: Resource[]
  realityTask?: string
  xp: number
}

export interface Stage {
  id: string
  title: string
  subtitle: string
  icon: string
  color: string
  nodeIds: string[]
}

export type NodeStatus = 'locked' | 'unlocked' | 'completed'

export const LEVELS = [
  { min: 0,    label: 'Apprentice',    emoji: '🌱' },
  { min: 200,  label: 'Learner',       emoji: '📖' },
  { min: 500,  label: 'Developer',     emoji: '⚡' },
  { min: 950,  label: 'Builder',       emoji: '🔨' },
  { min: 1550, label: 'Craftsman',     emoji: '🛠️' },
  { min: 2150, label: 'Expert',        emoji: '🚀' },
  { min: 2750, label: 'Senior Dev',    emoji: '💎' },
  { min: 3450, label: 'Shopify Master',emoji: '👑' },
]

export function getLevelInfo(xp: number) {
  let level = LEVELS[0]
  for (const l of LEVELS) {
    if (xp >= l.min) level = l
  }
  const idx = LEVELS.indexOf(level)
  const nextLevel = LEVELS[idx + 1]
  const progress = nextLevel
    ? Math.round(((xp - level.min) / (nextLevel.min - level.min)) * 100)
    : 100
  return { ...level, levelNum: idx + 1, nextLevel, progress }
}
