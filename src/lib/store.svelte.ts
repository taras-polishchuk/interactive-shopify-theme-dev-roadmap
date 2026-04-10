import { roadmapData } from '../data/roadmap'
import { getLevelInfo } from '../data/types'

function createAppStore() {
  const savedIds: string[] = (() => {
    try {
      return JSON.parse(localStorage.getItem('roadmap-completed') ?? '[]') as string[]
    } catch {
      return []
    }
  })()

  const prefersDark =
    localStorage.getItem('roadmap-dark') !== null
      ? localStorage.getItem('roadmap-dark') === 'true'
      : window.matchMedia('(prefers-color-scheme: dark)').matches

  let completedIds = $state<string[]>(savedIds)
  let darkMode = $state(prefersDark)
  let searchQuery = $state('')
  let selectedNodeId = $state<string | null>(null)

  // Apply initial theme immediately
  document.documentElement.classList.toggle('dark', prefersDark)

  const allNodeIds = Object.keys(roadmapData.nodes)

  return {
    get completedIds() {
      return completedIds
    },
    get darkMode() {
      return darkMode
    },
    get searchQuery() {
      return searchQuery
    },
    set searchQuery(v: string) {
      searchQuery = v
    },
    get selectedNodeId() {
      return selectedNodeId
    },
    set selectedNodeId(v: string | null) {
      selectedNodeId = v
    },

    get progress() {
      return allNodeIds.length > 0
        ? Math.round((completedIds.length / allNodeIds.length) * 100)
        : 0
    },

    get earnedXp() {
      return completedIds.reduce((sum, id) => {
        return sum + (roadmapData.nodes[id]?.xp ?? 0)
      }, 0)
    },

    get levelInfo() {
      return getLevelInfo(this.earnedXp)
    },

    get filteredNodeIds(): string[] | null {
      if (!searchQuery.trim()) return null
      const q = searchQuery.toLowerCase()
      return allNodeIds.filter((id) => {
        const node = roadmapData.nodes[id]
        return (
          node.title.toLowerCase().includes(q) ||
          node.description.toLowerCase().includes(q) ||
          node.skills.some((s) => s.toLowerCase().includes(q))
        )
      })
    },

    get recommendedNext(): string[] {
      return allNodeIds
        .filter((id) => this.isUnlocked(id) && !this.isCompleted(id))
        .slice(0, 3)
    },

    isCompleted(id: string): boolean {
      return completedIds.includes(id)
    },

    isUnlocked(id: string): boolean {
      const node = roadmapData.nodes[id]
      if (!node) return false
      return node.requires.every((req) => completedIds.includes(req))
    },

    toggleComplete(id: string) {
      if (this.isCompleted(id)) {
        completedIds = completedIds.filter((i) => i !== id)
      } else if (this.isUnlocked(id)) {
        completedIds = [...completedIds, id]
      }
      localStorage.setItem('roadmap-completed', JSON.stringify(completedIds))
    },

    toggleDarkMode() {
      darkMode = !darkMode
      document.documentElement.classList.toggle('dark', darkMode)
      localStorage.setItem('roadmap-dark', String(darkMode))
    },

    resetProgress() {
      completedIds = []
      localStorage.removeItem('roadmap-completed')
    },
  }
}

export const store = createAppStore()
