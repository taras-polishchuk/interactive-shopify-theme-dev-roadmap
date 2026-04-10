<script lang="ts">
  import { store } from '../lib/store.svelte'
  import { roadmapData } from '../data/roadmap'
  import NodeCard from './NodeCard.svelte'
  import type { Stage } from '../data/types'

  let { stage, filteredIds }: {
    stage: Stage
    filteredIds: string[] | null
  } = $props()

  const nodes = $derived(
    stage.nodeIds.map((id) => roadmapData.nodes[id]).filter(Boolean)
  )

  const completedCount = $derived(
    stage.nodeIds.filter((id) => store.isCompleted(id)).length
  )

  const stageXp = $derived(nodes.reduce((s, n) => s + n.xp, 0))
  const earnedStageXp = $derived(
    nodes.filter((n) => store.isCompleted(n.id)).reduce((s, n) => s + n.xp, 0)
  )
  const stageProgress = $derived(
    nodes.length > 0 ? Math.round((completedCount / nodes.length) * 100) : 0
  )
  const isStageComplete = $derived(completedCount === nodes.length)

  // When searching, dim cards not in filter
  const isNodeVisible = (id: string) =>
    filteredIds === null || filteredIds.includes(id)

  const hasAnyVisible = $derived(
    filteredIds === null || stage.nodeIds.some((id) => filteredIds!.includes(id))
  )
</script>

{#if hasAnyVisible}
  <section class="stage-section" id="stage-{stage.id}" aria-label="Stage: {stage.title}">
    <!-- Stage header -->
    <div class="stage-header" style="--stage-color: {stage.color}">
      <div class="stage-header-left">
        <div class="stage-icon" style="background: {stage.color}20; border-color: {stage.color}40">
          {stage.icon}
        </div>
        <div class="stage-info">
          <h2 class="stage-title">{stage.title}</h2>
          <p class="stage-subtitle">{stage.subtitle}</p>
        </div>
      </div>

      <div class="stage-header-right">
        <!-- Progress ring / counter -->
        <div class="stage-counter" class:complete={isStageComplete}>
          <svg class="ring" viewBox="0 0 36 36" aria-hidden="true">
            <circle
              class="ring-bg"
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke="var(--border-strong)"
              stroke-width="2.5"
            />
            <circle
              class="ring-fill"
              cx="18" cy="18" r="15.9"
              fill="none"
              stroke={isStageComplete ? 'var(--success)' : stage.color}
              stroke-width="2.5"
              stroke-dasharray="{stageProgress} {100 - stageProgress}"
              stroke-dashoffset="25"
              stroke-linecap="round"
              transform="rotate(-90 18 18)"
              style="transition: stroke-dasharray 0.5s ease"
            />
          </svg>
          <span class="ring-label">
            {completedCount}<span class="ring-total">/{nodes.length}</span>
          </span>
        </div>

        <div class="stage-xp">
          <span class="xp-earned">{earnedStageXp.toLocaleString()}</span>
          <span class="xp-total"> / {stageXp.toLocaleString()} XP</span>
        </div>

        {#if isStageComplete}
          <span class="badge badge-success" style="animation: unlockBurst 0.4s ease both">
            ✓ Stage Complete
          </span>
        {/if}
      </div>
    </div>

    <!-- color bar -->
    <div
      class="stage-progress-bar"
      style="--color: {stage.color}"
      aria-hidden="true"
    >
      <div class="stage-progress-fill" style="width: {stageProgress}%"></div>
    </div>

    <!-- Nodes grid -->
    <div class="nodes-grid">
      {#each stage.nodeIds as nodeId (nodeId)}
        <NodeCard
          {nodeId}
          stageColor={stage.color}
          dimmed={!isNodeVisible(nodeId)}
        />
      {/each}
    </div>
  </section>
{/if}

<style>
  .stage-section {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-2xl);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
    transition: box-shadow 0.2s ease;
    animation: fadeIn 0.3s ease both;
  }

  /* Header */
  .stage-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 18px 20px 16px;
    gap: 16px;
    flex-wrap: wrap;
  }
  .stage-header-left {
    display: flex;
    align-items: center;
    gap: 14px;
    min-width: 0;
  }
  .stage-icon {
    width: 44px;
    height: 44px;
    border-radius: var(--radius-lg);
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    flex-shrink: 0;
    line-height: 1;
  }
  .stage-info {
    min-width: 0;
  }
  .stage-title {
    font-size: 16px;
    font-weight: 800;
    letter-spacing: -0.025em;
    color: var(--text);
    line-height: 1.2;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .stage-subtitle {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 1px;
  }

  .stage-header-right {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-shrink: 0;
    flex-wrap: wrap;
  }

  /* SVG ring */
  .stage-counter {
    position: relative;
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
  .ring {
    width: 40px;
    height: 40px;
  }
  .ring-label {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 9px;
    font-weight: 800;
    color: var(--text);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.03em;
  }
  .ring-total {
    color: var(--text-muted);
    font-weight: 500;
  }
  .stage-counter.complete .ring-label {
    color: var(--success);
  }

  .stage-xp {
    font-size: 12px;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
  }
  .xp-earned {
    font-weight: 700;
    color: var(--text-secondary);
  }

  /* Stage progress bar */
  .stage-progress-bar {
    height: 2px;
    background: var(--border);
    margin: 0;
    overflow: hidden;
  }
  .stage-progress-fill {
    height: 100%;
    background: var(--color, var(--accent));
    border-radius: 0 2px 2px 0;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  /* Nodes grid */
  .nodes-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 12px;
    padding: 16px 16px 20px;
  }

  @media (max-width: 640px) {
    .nodes-grid {
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      padding: 12px;
    }
    .stage-header {
      padding: 14px 16px 12px;
    }
    .stage-xp {
      display: none;
    }
  }

  @media (max-width: 400px) {
    .nodes-grid {
      grid-template-columns: 1fr;
    }
  }
</style>
