<script lang="ts">
  import { store } from '../lib/store.svelte'
  import { roadmapData } from '../data/roadmap'
  import type { NodeStatus } from '../data/types'

  let { nodeId, stageColor = '#7c3aed', dimmed = false }: {
    nodeId: string
    stageColor?: string
    dimmed?: boolean
  } = $props()

  const node = $derived(roadmapData.nodes[nodeId])
  const isCompleted = $derived(store.isCompleted(nodeId))
  const isUnlocked = $derived(store.isUnlocked(nodeId))
  const status: NodeStatus = $derived(
    isCompleted ? 'completed' : isUnlocked ? 'unlocked' : 'locked'
  )

  const requiresLabels = $derived(
    node.requires.map((id) => roadmapData.nodes[id]?.title ?? id)
  )

  function handleClick() {
    if (status !== 'locked') store.selectedNodeId = nodeId
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      handleClick()
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_no_noninteractive_tabindex -->
<div
  class="node-card status-{status}"
  class:dimmed
  onclick={handleClick}
  onkeydown={handleKeyDown}
  role={status !== 'locked' ? 'button' : 'article'}
  tabindex={status !== 'locked' ? 0 : -1}
  aria-label="{node.title} — {status}"
  style="--stage-color: {stageColor}"
>
  <!-- Status indicator strip -->
  <div class="card-accent-strip"></div>

  <div class="card-body">
    <!-- Header row -->
    <div class="card-header">
      <div class="card-title-wrap">
        <span class="card-title">{node.title}</span>
        {#if node.realityTask}
          <span class="reality-dot" title="Has a Reality Mode task">⚡</span>
        {/if}
      </div>
      <div class="card-status-icon" aria-hidden="true">
        {#if status === 'completed'}
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" fill="var(--success)" fill-opacity="0.15"/>
            <path d="M6.5 10l2.5 2.5 4.5-5" stroke="var(--success)" stroke-width="1.8"
              stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        {:else if status === 'locked'}
          <svg viewBox="0 0 20 20" fill="none">
            <rect x="5" y="9" width="10" height="8" rx="2" stroke="var(--text-muted)" stroke-width="1.5"/>
            <path d="M7 9V7a3 3 0 0 1 6 0v2" stroke="var(--text-muted)" stroke-width="1.5"
              stroke-linecap="round"/>
          </svg>
        {:else}
          <svg viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="10" r="9" stroke="var(--stage-color)" stroke-width="1.5"
              stroke-dasharray="3 2" opacity="0.5"/>
          </svg>
        {/if}
      </div>
    </div>

    <!-- Description -->
    <p class="card-description">{node.description.slice(0, 100)}{node.description.length > 100 ? '…' : ''}</p>

    <!-- Skills (first 3) -->
    <div class="card-skills">
      {#each node.skills.slice(0, 3) as skill}
        <span class="skill-chip">{skill}</span>
      {/each}
      {#if node.skills.length > 3}
        <span class="skill-chip skill-more">+{node.skills.length - 3}</span>
      {/if}
    </div>

    <!-- Footer -->
    <div class="card-footer">
      {#if status === 'locked' && requiresLabels.length > 0}
        <span class="requires-hint" aria-label="Requires: {requiresLabels.join(', ')}">
          🔒 Requires: {requiresLabels.slice(0, 2).join(', ')}{requiresLabels.length > 2 ? '…' : ''}
        </span>
      {:else if status === 'completed'}
        <span class="badge badge-success">✓ Done</span>
      {:else if status === 'unlocked'}
        <span class="open-hint">Click to explore →</span>
      {/if}

      <span class="xp-badge" aria-label="{node.xp} XP">
        <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <polygon points="6,1 7.8,4.5 11.7,5 8.85,7.8 9.6,12 6,10 2.4,12 3.15,7.8 0.3,5 4.2,4.5"
            fill="currentColor" opacity="0.8"/>
        </svg>
        {node.xp} XP
      </span>
    </div>
  </div>

  <!-- Locked overlay -->
  {#if status === 'locked'}
    <div class="locked-overlay" aria-hidden="true"></div>
  {/if}
</div>

<style>
  .node-card {
    position: relative;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    transition:
      transform 0.18s ease,
      box-shadow 0.18s ease,
      border-color 0.18s ease,
      opacity 0.18s ease;
    box-shadow: var(--shadow-sm);
    display: flex;
    flex-direction: column;
    cursor: default;
    user-select: none;
  }

  .node-card.status-unlocked,
  .node-card.status-completed {
    cursor: pointer;
  }

  .node-card.status-unlocked:hover {
    transform: translateY(-3px);
    box-shadow: var(--shadow-md);
    border-color: var(--stage-color);
  }

  .node-card.status-completed {
    border-color: var(--success);
  }
  .node-card.status-completed:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }

  .node-card.status-locked {
    opacity: 0.55;
  }

  .node-card.dimmed {
    opacity: 0.25;
    pointer-events: none;
  }

  /* Accent strip */
  .card-accent-strip {
    height: 3px;
    background: var(--stage-color);
    flex-shrink: 0;
    transition: height 0.18s ease;
  }
  .node-card.status-completed .card-accent-strip {
    background: var(--success);
  }
  .node-card.status-locked .card-accent-strip {
    background: var(--border-strong);
  }

  .card-body {
    padding: 14px 16px 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    flex: 1;
  }

  /* Header */
  .card-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
  }
  .card-title-wrap {
    display: flex;
    align-items: center;
    gap: 5px;
    min-width: 0;
  }
  .card-title {
    font-size: 13.5px;
    font-weight: 700;
    color: var(--text);
    line-height: 1.3;
    letter-spacing: -0.01em;
  }
  .reality-dot {
    font-size: 11px;
    flex-shrink: 0;
    line-height: 1;
    opacity: 0.9;
  }
  .card-status-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  /* Description */
  .card-description {
    font-size: 12px;
    color: var(--text-secondary);
    line-height: 1.5;
  }
  .node-card.status-locked .card-description {
    color: var(--text-muted);
  }

  /* Skills */
  .card-skills {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .skill-chip {
    font-size: 10px;
    font-weight: 500;
    padding: 2px 7px;
    border-radius: 99px;
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border: 1px solid var(--border);
    white-space: nowrap;
    line-height: 1.6;
  }
  .skill-more {
    color: var(--text-muted);
  }

  /* Footer */
  .card-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    padding-top: 2px;
    margin-top: auto;
  }
  .requires-hint {
    font-size: 10.5px;
    color: var(--text-muted);
    line-height: 1.4;
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .open-hint {
    font-size: 11px;
    color: var(--stage-color);
    font-weight: 600;
    opacity: 0.8;
    transition: opacity 0.15s ease;
  }
  .node-card:hover .open-hint {
    opacity: 1;
  }
  .xp-badge {
    display: flex;
    align-items: center;
    gap: 3px;
    font-size: 10px;
    font-weight: 700;
    color: var(--text-muted);
    flex-shrink: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: 0.02em;
  }
  .xp-badge svg {
    width: 9px;
    height: 9px;
    color: var(--warning);
  }
  .node-card.status-completed .xp-badge {
    color: var(--success);
  }

  /* Locked overlay */
  .locked-overlay {
    position: absolute;
    inset: 0;
    background: var(--locked-overlay);
    pointer-events: none;
  }

  /* Completion animation */
  .node-card.status-completed .card-accent-strip {
    animation: none;
  }
</style>
