<script lang="ts">
  import { store } from './lib/store.svelte'
  import { stages } from './data/roadmap'
  import Header from './components/Header.svelte'
  import StageSection from './components/StageSection.svelte'
  import NodeModal from './components/NodeModal.svelte'
  import RecommendedNext from './components/RecommendedNext.svelte'

  const filteredIds = $derived(store.filteredNodeIds)
  const isSearching = $derived(store.searchQuery.trim().length > 0)
  const searchResultCount = $derived(filteredIds?.length ?? 0)

  // Stage connector path for the map spine
  function stageHasVisibleNodes(stageId: string): boolean {
    if (!filteredIds) return true
    return stages
      .find((s) => s.id === stageId)
      ?.nodeIds.some((id) => filteredIds.includes(id)) ?? false
  }
</script>

<div class="app-root">
  <Header />

  <div class="app-layout">
    <!-- Main map -->
    <main class="map-container" id="main-content">
      <div class="map-inner map-bg">

        <!-- Search status bar -->
        {#if isSearching}
          <div class="search-status animate-fadein">
            {#if searchResultCount > 0}
              <span class="search-status-count">{searchResultCount} result{searchResultCount !== 1 ? 's' : ''}</span>
              <span class="search-status-text">matching "{store.searchQuery}"</span>
            {:else}
              <span class="search-status-empty">No results for "{store.searchQuery}"</span>
            {/if}
            <button
              class="search-status-clear"
              onclick={() => (store.searchQuery = '')}
            >Clear search</button>
          </div>
        {/if}

        <!-- Stage map -->
        <div class="stages-map">
          {#each stages as stage, i (stage.id)}
            <StageSection {stage} {filteredIds} />

            {#if i < stages.length - 1 && (!isSearching || (stageHasVisibleNodes(stage.id) && stageHasVisibleNodes(stages[i + 1].id)))}
              <div class="stage-connector" aria-hidden="true">
                <div class="connector-line" style="border-color: {stage.color}50"></div>
                <div class="connector-node" style="background: {stage.color}20; border-color: {stage.color}60; color: {stage.color}">
                  <svg viewBox="0 0 16 16" fill="none">
                    <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" stroke-width="1.8"
                      stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <div class="connector-line" style="border-color: {stages[i + 1].color}50"></div>
              </div>
            {/if}
          {/each}

          <!-- Journey complete message -->
          {#if store.progress === 100}
            <div class="journey-complete animate-fadein">
              <div class="complete-emoji">👑</div>
              <h2>Shopify Master!</h2>
              <p>You've completed the entire roadmap. Now go build something great.</p>
              <div class="complete-xp">{store.earnedXp.toLocaleString()} XP earned</div>
            </div>
          {/if}
        </div>
      </div>
    </main>

    <!-- Sidebar -->
    <aside class="sidebar">
      <!-- Level card -->
      <div class="level-card">
        <div class="level-card-top">
          <span class="level-card-emoji">{store.levelInfo.emoji}</span>
          <div>
            <div class="level-card-name">{store.levelInfo.label}</div>
            <div class="level-card-num">Level {store.levelInfo.levelNum}</div>
          </div>
        </div>
        <div class="level-xp-bar">
          <div class="level-xp-bar-inner">
            <div
              class="level-xp-fill"
              style="width: {store.levelInfo.progress}%"
            ></div>
          </div>
          <div class="level-xp-labels">
            <span>{store.earnedXp.toLocaleString()} XP</span>
            {#if store.levelInfo.nextLevel}
              <span>{store.levelInfo.nextLevel.min.toLocaleString()} XP</span>
            {:else}
              <span>MAX</span>
            {/if}
          </div>
          {#if store.levelInfo.nextLevel}
            <div class="level-next-hint">
              {(store.levelInfo.nextLevel.min - store.earnedXp).toLocaleString()} XP until {store.levelInfo.nextLevel.label}
            </div>
          {/if}
        </div>
      </div>

      <!-- Stage nav -->
      <nav class="stage-nav" aria-label="Jump to stage">
        <div class="stage-nav-label">Stages</div>
        {#each stages as stage}
          {@const count = stage.nodeIds.filter((id) => store.isCompleted(id)).length}
          {@const done = count === stage.nodeIds.length}
          <a
            href="#stage-{stage.id}"
            class="stage-nav-item"
            class:done
            style="--color: {stage.color}"
          >
            <span class="snav-icon">{stage.icon}</span>
            <span class="snav-title">{stage.title}</span>
            <span class="snav-count" style="color: {done ? 'var(--success)' : 'var(--text-muted)'}">{count}/{stage.nodeIds.length}</span>
          </a>
        {/each}
      </nav>

      <!-- Recommended next -->
      <RecommendedNext />
    </aside>
  </div>

  <!-- Node detail modal -->
  <NodeModal />
</div>

<style>
  .app-root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  /* Layout */
  .app-layout {
    display: flex;
    align-items: flex-start;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    padding: 24px 20px 60px;
    gap: 24px;
  }

  /* Main map */
  .map-container {
    flex: 1;
    min-width: 0;
  }

  .map-inner {
    border-radius: var(--radius-2xl);
    border: 1px solid var(--border);
    padding: 20px;
    background: var(--bg-elevated);
    min-height: 400px;
  }

  /* Search status */
  .search-status {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
    padding: 10px 14px;
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    font-size: 13px;
    margin-bottom: 16px;
  }
  .search-status-count {
    font-weight: 700;
    color: var(--accent);
  }
  .search-status-text {
    color: var(--text-secondary);
  }
  .search-status-empty {
    color: var(--text-muted);
  }
  .search-status-clear {
    margin-left: auto;
    font-size: 12px;
    font-weight: 600;
    color: var(--accent);
    background: none;
    border: none;
    cursor: pointer;
    padding: 2px 0;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  /* Stages */
  .stages-map {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  /* Stage connector */
  .stage-connector {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px 0;
    gap: 0;
  }
  .connector-line {
    width: 0;
    height: 18px;
    border-left: 2px dashed;
  }
  .connector-node {
    width: 28px;
    height: 28px;
    border-radius: 50%;
    border: 1px solid;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .connector-node svg {
    width: 14px;
    height: 14px;
  }

  /* Journey complete */
  .journey-complete {
    text-align: center;
    padding: 48px 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
  }
  .complete-emoji {
    font-size: 56px;
    line-height: 1;
    filter: drop-shadow(0 4px 16px rgba(249, 115, 22, 0.4));
  }
  .journey-complete h2 {
    font-size: 28px;
    font-weight: 900;
    letter-spacing: -0.04em;
    color: var(--text);
  }
  .journey-complete p {
    font-size: 15px;
    color: var(--text-secondary);
    max-width: 320px;
    line-height: 1.6;
  }
  .complete-xp {
    font-size: 13px;
    font-weight: 700;
    padding: 6px 16px;
    border-radius: 99px;
    background: rgba(245, 158, 11, 0.12);
    color: var(--warning);
  }

  /* Sidebar */
  .sidebar {
    width: var(--sidebar-width);
    flex-shrink: 0;
    position: sticky;
    top: calc(var(--header-height) + 24px);
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: calc(100vh - var(--header-height) - 48px);
    overflow-y: auto;
    padding-bottom: 8px;
  }

  /* Level card */
  .level-card {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    box-shadow: var(--shadow-sm);
  }
  .level-card-top {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .level-card-emoji {
    font-size: 28px;
    line-height: 1;
  }
  .level-card-name {
    font-size: 14px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: -0.02em;
  }
  .level-card-num {
    font-size: 11px;
    color: var(--text-muted);
  }
  .level-xp-bar {
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .level-xp-bar-inner {
    height: 6px;
    background: var(--bg-elevated);
    border-radius: 99px;
    overflow: hidden;
  }
  .level-xp-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #06b6d4);
    border-radius: 99px;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .level-xp-labels {
    display: flex;
    justify-content: space-between;
    font-size: 10px;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    font-weight: 600;
  }
  .level-next-hint {
    font-size: 11px;
    color: var(--text-muted);
    text-align: center;
  }

  /* Stage nav */
  .stage-nav {
    background: var(--bg-card);
    border: 1px solid var(--border);
    border-radius: var(--radius-xl);
    overflow: hidden;
    box-shadow: var(--shadow-sm);
  }
  .stage-nav-label {
    font-size: 10px;
    font-weight: 700;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-muted);
    padding: 10px 14px 8px;
    border-bottom: 1px solid var(--border);
  }
  .stage-nav-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 14px;
    text-decoration: none;
    transition: background 0.15s ease;
    border-bottom: 1px solid var(--border);
  }
  .stage-nav-item:last-child {
    border-bottom: none;
  }
  .stage-nav-item:hover {
    background: var(--bg-elevated);
    text-decoration: none;
  }
  .snav-icon {
    font-size: 14px;
    line-height: 1;
    flex-shrink: 0;
  }
  .snav-title {
    font-size: 12px;
    font-weight: 600;
    color: var(--text-secondary);
    flex: 1;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    min-width: 0;
  }
  .stage-nav-item:hover .snav-title {
    color: var(--color, var(--accent));
  }
  .stage-nav-item.done .snav-title {
    color: var(--success);
  }
  .snav-count {
    font-size: 10px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    flex-shrink: 0;
  }

  /* Responsive */
  @media (max-width: 1024px) {
    .sidebar {
      width: 240px;
    }
  }

  @media (max-width: 768px) {
    .app-layout {
      flex-direction: column-reverse;
      padding: 12px 12px 40px;
      gap: 16px;
    }
    .sidebar {
      width: 100%;
      position: static;
      max-height: none;
      flex-direction: row;
      flex-wrap: wrap;
      overflow: visible;
      gap: 12px;
    }
    .level-card,
    .stage-nav {
      flex: 1;
      min-width: 200px;
    }
    .map-inner {
      padding: 12px;
    }
  }

  @media (max-width: 480px) {
    .app-layout {
      padding: 8px 8px 32px;
    }
    .sidebar {
      flex-direction: column;
    }
  }
</style>
