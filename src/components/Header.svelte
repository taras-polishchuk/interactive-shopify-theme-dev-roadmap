<script lang="ts">
  import { store } from '../lib/store.svelte'
  import { totalXp } from '../data/roadmap'

  let searchFocused = $state(false)
  let showResetConfirm = $state(false)

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') store.searchQuery = ''
  }

  function handleReset() {
    if (showResetConfirm) {
      store.resetProgress()
      showResetConfirm = false
    } else {
      showResetConfirm = true
      setTimeout(() => (showResetConfirm = false), 3000)
    }
  }
</script>

<header class="header">
  <div class="header-inner">
    <!-- Brand -->
    <div class="brand">
      <span class="brand-icon">🛍️</span>
      <div class="brand-text">
        <span class="brand-title">Shopify Theme Dev</span>
        <span class="brand-sub">Interactive Roadmap</span>
      </div>
    </div>

    <!-- Level badge -->
    <div class="level-badge" title="{store.levelInfo.nextLevel ? `${store.levelInfo.nextLevel.min - store.earnedXp} XP to next level` : 'Max level!'}">
      <span class="level-emoji">{store.levelInfo.emoji}</span>
      <div class="level-info">
        <span class="level-label">{store.levelInfo.label}</span>
        <span class="level-xp">{store.earnedXp.toLocaleString()} / {totalXp.toLocaleString()} XP</span>
      </div>
      <div class="level-num">Lv.{store.levelInfo.levelNum}</div>
    </div>

    <!-- Search -->
    <div class="search-wrapper" class:focused={searchFocused}>
      <svg class="search-icon" viewBox="0 0 20 20" fill="none" aria-hidden="true">
        <path
          d="M9 17A8 8 0 1 0 9 1a8 8 0 0 0 0 16zm6-6-2.828-2.828M15 15l-2-2"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
        />
      </svg>
      <input
        type="search"
        class="search-input"
        placeholder="Search skills, topics…"
        bind:value={store.searchQuery}
        onfocus={() => (searchFocused = true)}
        onblur={() => (searchFocused = false)}
        onkeydown={handleKeyDown}
        aria-label="Search roadmap"
        autocomplete="off"
      />
      {#if store.searchQuery}
        <button
          class="search-clear"
          onclick={() => (store.searchQuery = '')}
          aria-label="Clear search"
        >×</button>
      {/if}
    </div>

    <!-- Actions -->
    <div class="header-actions">
      <button
        class="icon-btn reset-btn"
        class:confirm={showResetConfirm}
        onclick={handleReset}
        title={showResetConfirm ? 'Click again to confirm reset' : 'Reset progress'}
        aria-label="Reset progress"
      >
        {#if showResetConfirm}
          <span class="reset-confirm-text">Sure?</span>
        {:else}
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M4 10a6 6 0 1 1 1.5 4M4 14v-4h4"
              stroke="currentColor"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        {/if}
      </button>

      <button
        class="icon-btn theme-btn"
        onclick={() => store.toggleDarkMode()}
        title={store.darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        aria-label="Toggle dark mode"
      >
        {#if store.darkMode}
          <!-- Sun icon -->
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <circle cx="10" cy="10" r="3.5" stroke="currentColor" stroke-width="1.5"/>
            <path d="M10 2v2M10 16v2M2 10h2M16 10h2M4.22 4.22l1.42 1.42M14.36 14.36l1.42 1.42M4.22 15.78l1.42-1.42M14.36 5.64l1.42-1.42"
              stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
        {:else}
          <!-- Moon icon -->
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M17 11.5a7.5 7.5 0 0 1-9-9 7.5 7.5 0 1 0 9 9z"
              stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
          </svg>
        {/if}
      </button>
    </div>
  </div>

  <!-- Progress bar -->
  <div class="progress-track" aria-label="Overall progress: {store.progress}%">
    <div
      class="progress-fill"
      style="width: {store.progress}%"
      role="progressbar"
      aria-valuenow={store.progress}
      aria-valuemin={0}
      aria-valuemax={100}
    ></div>
    <span class="progress-label">{store.progress}% complete</span>
  </div>
</header>

<style>
  .header {
    position: sticky;
    top: 0;
    z-index: 100;
    background: var(--bg-glass);
    backdrop-filter: blur(16px);
    -webkit-backdrop-filter: blur(16px);
    border-bottom: 1px solid var(--border);
    transition: background 0.2s ease;
  }

  .header-inner {
    display: flex;
    align-items: center;
    gap: 16px;
    padding: 0 20px;
    height: var(--header-height);
    max-width: 1200px;
    margin: 0 auto;
  }

  /* Brand */
  .brand {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .brand-icon {
    font-size: 24px;
    line-height: 1;
  }
  .brand-text {
    display: flex;
    flex-direction: column;
  }
  .brand-title {
    font-size: 14px;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: var(--text);
    line-height: 1.2;
  }
  .brand-sub {
    font-size: 11px;
    color: var(--text-muted);
    line-height: 1.2;
  }

  /* Level badge */
  .level-badge {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 6px 12px;
    background: var(--accent-subtle);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    cursor: default;
    flex-shrink: 0;
  }
  .level-emoji {
    font-size: 18px;
    line-height: 1;
  }
  .level-info {
    display: flex;
    flex-direction: column;
  }
  .level-label {
    font-size: 12px;
    font-weight: 700;
    color: var(--accent);
    line-height: 1.2;
  }
  .level-xp {
    font-size: 10px;
    color: var(--text-muted);
    font-variant-numeric: tabular-nums;
    line-height: 1.2;
  }
  .level-num {
    font-size: 11px;
    font-weight: 800;
    color: var(--accent);
    letter-spacing: 0.04em;
  }

  /* Search */
  .search-wrapper {
    display: flex;
    align-items: center;
    gap: 8px;
    flex: 1;
    max-width: 320px;
    padding: 8px 12px;
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    border-radius: var(--radius-lg);
    transition: border-color 0.15s ease, box-shadow 0.15s ease;
  }
  .search-wrapper.focused {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px var(--accent-subtle);
  }
  .search-icon {
    width: 15px;
    height: 15px;
    color: var(--text-muted);
    flex-shrink: 0;
  }
  .search-input {
    flex: 1;
    background: transparent;
    border: none;
    outline: none;
    font-size: 13px;
    color: var(--text);
    min-width: 0;
  }
  .search-input::placeholder {
    color: var(--text-muted);
  }
  .search-input::-webkit-search-cancel-button {
    display: none;
  }
  .search-clear {
    background: none;
    border: none;
    color: var(--text-muted);
    font-size: 16px;
    line-height: 1;
    padding: 0;
    width: 18px;
    height: 18px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background 0.1s ease, color 0.1s ease;
  }
  .search-clear:hover {
    background: var(--border-strong);
    color: var(--text);
  }

  /* Actions */
  .header-actions {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    flex-shrink: 0;
  }
  .icon-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 36px;
    border-radius: var(--radius-md);
    background: transparent;
    color: var(--text-secondary);
    transition: background 0.15s ease, color 0.15s ease;
  }
  .icon-btn:hover {
    background: var(--bg-elevated);
    color: var(--text);
  }
  .icon-btn svg {
    width: 18px;
    height: 18px;
  }
  .reset-btn.confirm {
    background: rgba(220, 38, 38, 0.1);
    color: var(--danger);
    width: auto;
    padding: 0 10px;
    font-size: 12px;
    font-weight: 600;
  }
  .reset-confirm-text {
    white-space: nowrap;
  }

  /* Progress bar */
  .progress-track {
    position: relative;
    height: 3px;
    background: var(--border);
    overflow: hidden;
  }
  .progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--accent), #06b6d4);
    border-radius: 0 2px 2px 0;
    transition: width 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }
  .progress-label {
    position: absolute;
    right: 12px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 9px;
    font-weight: 700;
    color: var(--text-muted);
    letter-spacing: 0.05em;
    opacity: 0.8;
    margin-top: 2px;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header-inner {
      padding: 0 12px;
      gap: 10px;
    }
    .brand-sub,
    .level-info {
      display: none;
    }
    .level-badge {
      padding: 6px 8px;
    }
    .search-wrapper {
      max-width: 160px;
    }
  }

  @media (max-width: 480px) {
    .header-inner {
      padding: 0 8px;
      gap: 6px;
    }
    .brand-text {
      display: none;
    }
    .brand-icon {
      font-size: 22px;
    }
    .level-badge {
      display: none;
    }
    .search-wrapper {
      flex: 1;
      max-width: none;
      min-width: 0;
      padding: 7px 10px;
    }
    .header-actions {
      margin-left: 0;
      gap: 2px;
    }
    .icon-btn {
      width: 32px;
      height: 32px;
    }
    .icon-btn svg {
      width: 16px;
      height: 16px;
    }
  }
</style>
