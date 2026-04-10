<script lang="ts">
  import { store } from '../lib/store.svelte'
  import { roadmapData, stages } from '../data/roadmap'

  const recommended = $derived(store.recommendedNext)

  function getStageColor(stageId: string): string {
    return stages.find((s) => s.id === stageId)?.color ?? '#7c3aed'
  }
</script>

{#if recommended.length > 0}
  <aside class="recommended-panel animate-fadein" aria-label="Recommended next steps">
    <header class="rec-header">
      <div class="rec-header-left">
        <span class="rec-icon">🧭</span>
        <h2 class="rec-title">Recommended Next</h2>
      </div>
      <span class="rec-count">{recommended.length} step{recommended.length !== 1 ? 's' : ''}</span>
    </header>

    <ul class="rec-list" role="list">
      {#each recommended as nodeId, i (nodeId)}
        {@const node = roadmapData.nodes[nodeId]}
        {@const color = getStageColor(node.stageId)}
        <li class="animate-fadein" style="animation-delay: {i * 60}ms">
          <button
            class="rec-item"
            style="--color: {color}"
            onclick={() => { store.selectedNodeId = nodeId }}
            aria-label="Open {node.title}"
          >
            <div class="rec-item-dot" style="background: {color}"></div>
            <div class="rec-item-text">
              <span class="rec-item-title">{node.title}</span>
              <span class="rec-item-xp">{node.xp} XP</span>
            </div>
            <svg class="rec-item-arrow" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.5"
                stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </li>
      {/each}
    </ul>
  </aside>
{/if}

<style>
  .recommended-panel {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    box-shadow: var(--shadow-sm);
    overflow: hidden;
  }

  .rec-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px 12px;
    border-bottom: 1px solid var(--border);
  }
  .rec-header-left {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .rec-icon {
    font-size: 16px;
    line-height: 1;
  }
  .rec-title {
    font-size: 13px;
    font-weight: 700;
    color: var(--text);
    letter-spacing: -0.01em;
  }
  .rec-count {
    font-size: 11px;
    font-weight: 600;
    padding: 2px 7px;
    border-radius: 99px;
    background: var(--accent-subtle);
    color: var(--accent);
  }

  .rec-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    padding: 8px 0;
  }

  .rec-item {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
    padding: 9px 16px;
    background: transparent;
    border: none;
    cursor: pointer;
    text-align: left;
    transition: background 0.15s ease;
    color: var(--text);
  }
  .rec-item:hover {
    background: var(--bg-elevated);
  }
  .rec-item:hover .rec-item-arrow {
    transform: translateX(2px);
    color: var(--color);
  }

  .rec-item-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
  }

  .rec-item-text {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 0;
    gap: 1px;
  }
  .rec-item-title {
    font-size: 12.5px;
    font-weight: 600;
    color: var(--text);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .rec-item-xp {
    font-size: 11px;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
  }

  .rec-item-arrow {
    width: 14px;
    height: 14px;
    color: var(--text-muted);
    flex-shrink: 0;
    transition: transform 0.15s ease, color 0.15s ease;
  }
</style>
