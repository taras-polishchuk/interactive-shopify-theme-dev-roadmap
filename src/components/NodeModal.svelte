<script lang="ts">
  import { store } from '../lib/store.svelte'
  import { roadmapData, stages } from '../data/roadmap'

  const node = $derived(
    store.selectedNodeId ? roadmapData.nodes[store.selectedNodeId] : null
  )
  const stage = $derived(node ? stages.find((s) => s.id === node.stageId) : null)
  const isCompleted = $derived(node ? store.isCompleted(node.id) : false)
  const isUnlocked = $derived(node ? store.isUnlocked(node.id) : false)

  const requiresNodes = $derived(
    node ? node.requires.map((id) => roadmapData.nodes[id]).filter(Boolean) : []
  )
  const unlockedBy = $derived(
    node ? node.requires.filter((id) => store.isCompleted(id)) : []
  )

  function close() {
    store.selectedNodeId = null
  }

  function handleBackdropClick(e: MouseEvent) {
    if (e.target === e.currentTarget) close()
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Escape') close()
  }

  function toggleComplete() {
    if (!node) return
    store.toggleComplete(node.id)
  }
</script>

{#if node && stage}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="modal-backdrop animate-fadein"
    onclick={handleBackdropClick}
    onkeydown={handleKeyDown}
    role="dialog"
    aria-modal="true"
    aria-label="{node.title}"
    tabindex="-1"
  >
    <div class="modal" style="--stage-color: {stage.color}" role="document">
      <!-- Top bar -->
      <div class="modal-top" style="background: {stage.color}18; border-color: {stage.color}30">
        <div class="modal-stage-badge">
          <span>{stage.icon}</span>
          <span>{stage.title}</span>
        </div>
        <div class="modal-meta">
          <span class="xp-chip">
            <svg viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <polygon points="6,1 7.8,4.5 11.7,5 8.85,7.8 9.6,12 6,10 2.4,12 3.15,7.8 0.3,5 4.2,4.5"
                fill="currentColor"/>
            </svg>
            {node.xp} XP
          </span>
          {#if node.realityTask}
            <span class="badge badge-accent">⚡ Reality Mode</span>
          {/if}
        </div>
        <button class="modal-close" onclick={close} aria-label="Close">
          <svg viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M5 5l10 10M15 5L5 15" stroke="currentColor" stroke-width="1.8"
              stroke-linecap="round"/>
          </svg>
        </button>
      </div>

      <div class="modal-body">
        <!-- Title + status -->
        <div class="modal-title-row">
          <h2 class="modal-title">{node.title}</h2>
          <div class="modal-status-badge" class:completed={isCompleted} class:locked={!isUnlocked}>
            {#if isCompleted}✓ Completed{:else if isUnlocked}Unlocked{:else}Locked{/if}
          </div>
        </div>

        <!-- Description -->
        <p class="modal-description">{node.description}</p>

        <!-- Skills -->
        <section class="modal-section">
          <h3 class="section-label">Skills covered</h3>
          <div class="skills-grid">
            {#each node.skills as skill}
              <span class="skill-tag">{skill}</span>
            {/each}
          </div>
        </section>

        <!-- Requirements -->
        {#if requiresNodes.length > 0}
          <section class="modal-section">
            <h3 class="section-label">Prerequisites</h3>
            <div class="requires-list">
              {#each requiresNodes as req}
                <button
                  class="req-pill"
                  class:req-done={store.isCompleted(req.id)}
                  onclick={() => { store.selectedNodeId = req.id }}
                  aria-label="Open {req.title}"
                >
                  {#if store.isCompleted(req.id)}
                    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" fill="var(--success)" fill-opacity="0.15"/>
                      <path d="M4.5 7l2 2 3-3.5" stroke="var(--success)" stroke-width="1.5"
                        stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  {:else}
                    <svg viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <circle cx="7" cy="7" r="6" stroke="var(--text-muted)" stroke-width="1.2"/>
                    </svg>
                  {/if}
                  {req.title}
                </button>
              {/each}
            </div>
          </section>
        {/if}

        <!-- Reality Mode task -->
        {#if node.realityTask}
          <section class="modal-section">
            <div class="reality-box">
              <div class="reality-header">
                <span class="reality-icon">⚡</span>
                <h3>Shopify Reality Mode</h3>
              </div>
              <p class="reality-task">{node.realityTask}</p>
            </div>
          </section>
        {/if}

        <!-- Resources -->
        {#if node.resources.length > 0}
          <section class="modal-section">
            <h3 class="section-label">Resources</h3>
            <ul class="resources-list">
              {#each node.resources as resource}
                <li>
                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="resource-link"
                  >
                    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                      <path d="M6 3H3a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1v-3M9 2h5m0 0v5m0-5L7 10"
                        stroke="currentColor" stroke-width="1.4" stroke-linecap="round"
                        stroke-linejoin="round"/>
                    </svg>
                    {resource.label}
                  </a>
                </li>
              {/each}
            </ul>
          </section>
        {/if}
      </div>

      <!-- Footer CTA -->
      <div class="modal-footer">
        {#if !isUnlocked && requiresNodes.length > 0}
          <p class="unlock-hint">
            Complete {unlockedBy.length}/{requiresNodes.length} prerequisites to unlock
          </p>
        {/if}
        <div class="footer-actions">
          <button class="btn btn-ghost" onclick={close}>Close</button>
          {#if isUnlocked}
            <button
              class="btn"
              class:btn-success={!isCompleted}
              class:btn-danger={isCompleted}
              onclick={toggleComplete}
            >
              {#if isCompleted}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M4 8l3 3 5-6" stroke="currentColor" stroke-width="1.5"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Mark Incomplete
              {:else}
                <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M3 8l3.5 3.5L13 4" stroke="currentColor" stroke-width="1.8"
                    stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Mark Complete
              {/if}
            </button>
          {/if}
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 200;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 16px;
  }

  .modal {
    background: var(--bg-card);
    border: 1px solid var(--border-strong);
    border-radius: var(--radius-2xl);
    box-shadow: var(--shadow-xl);
    width: 100%;
    max-width: 580px;
    max-height: calc(100vh - 40px);
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    animation: scaleIn 0.2s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  }

  /* Top bar */
  .modal-top {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 20px;
    border-bottom: 1px solid;
    flex-shrink: 0;
    flex-wrap: wrap;
  }
  .modal-stage-badge {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 700;
    color: var(--stage-color);
    letter-spacing: 0.02em;
  }
  .modal-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-left: auto;
  }
  .xp-chip {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 11px;
    font-weight: 700;
    color: var(--warning);
  }
  .xp-chip svg {
    width: 10px;
    height: 10px;
  }
  .modal-close {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 28px;
    height: 28px;
    border-radius: var(--radius-md);
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border: none;
    cursor: pointer;
    transition: background 0.15s ease, color 0.15s ease;
    flex-shrink: 0;
  }
  .modal-close:hover {
    background: var(--border-strong);
    color: var(--text);
  }
  .modal-close svg {
    width: 14px;
    height: 14px;
  }

  /* Body */
  .modal-body {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .modal-title-row {
    display: flex;
    align-items: flex-start;
    gap: 12px;
    justify-content: space-between;
  }
  .modal-title {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: var(--text);
    line-height: 1.2;
  }
  .modal-status-badge {
    flex-shrink: 0;
    font-size: 11px;
    font-weight: 700;
    padding: 4px 10px;
    border-radius: 99px;
    background: var(--accent-subtle);
    color: var(--accent);
    white-space: nowrap;
  }
  .modal-status-badge.completed {
    background: var(--success-subtle);
    color: var(--success);
  }
  .modal-status-badge.locked {
    background: var(--bg-elevated);
    color: var(--text-muted);
  }

  .modal-description {
    font-size: 14px;
    color: var(--text-secondary);
    line-height: 1.65;
  }

  /* Sections */
  .modal-section {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--text-muted);
  }

  /* Skills */
  .skills-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
  }
  .skill-tag {
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 99px;
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }

  /* Requires */
  .requires-list {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  .req-pill {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 12px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 99px;
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border: 1px solid var(--border);
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .req-pill:hover {
    background: var(--accent-subtle);
    border-color: var(--accent);
    color: var(--accent);
  }
  .req-pill svg {
    width: 14px;
    height: 14px;
    flex-shrink: 0;
  }
  .req-pill.req-done {
    color: var(--success);
    border-color: rgba(5, 150, 105, 0.3);
  }
  .req-pill.req-done:hover {
    background: var(--success-subtle);
    border-color: var(--success);
  }

  /* Reality mode */
  .reality-box {
    background: linear-gradient(135deg, rgba(245, 158, 11, 0.08), rgba(239, 68, 68, 0.06));
    border: 1px solid rgba(245, 158, 11, 0.25);
    border-radius: var(--radius-lg);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .reality-header {
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .reality-icon {
    font-size: 16px;
  }
  .reality-header h3 {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--warning);
  }
  .reality-task {
    font-size: 13.5px;
    color: var(--text-secondary);
    line-height: 1.6;
  }

  /* Resources */
  .resources-list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: 6px;
  }
  .resource-link {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 500;
    color: var(--accent);
    padding: 7px 12px;
    border-radius: var(--radius-md);
    background: var(--bg-elevated);
    border: 1px solid var(--border);
    transition: background 0.15s ease, border-color 0.15s ease, transform 0.15s ease;
    text-decoration: none;
  }
  .resource-link:hover {
    background: var(--accent-subtle);
    border-color: var(--accent);
    transform: translateX(2px);
    text-decoration: none;
  }
  .resource-link svg {
    width: 13px;
    height: 13px;
    flex-shrink: 0;
  }

  /* Footer */
  .modal-footer {
    padding: 16px 24px;
    border-top: 1px solid var(--border);
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .unlock-hint {
    font-size: 12px;
    color: var(--text-muted);
    text-align: center;
  }
  .footer-actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
  }

  .btn {
    display: flex;
    align-items: center;
    gap: 6px;
    padding: 9px 18px;
    border-radius: var(--radius-md);
    font-size: 13px;
    font-weight: 700;
    border: none;
    cursor: pointer;
    transition: all 0.15s ease;
  }
  .btn svg {
    width: 14px;
    height: 14px;
  }
  .btn-ghost {
    background: var(--bg-elevated);
    color: var(--text-secondary);
    border: 1px solid var(--border);
  }
  .btn-ghost:hover {
    background: var(--border-strong);
    color: var(--text);
  }
  .btn-success {
    background: var(--success);
    color: #fff;
  }
  .btn-success:hover {
    filter: brightness(1.1);
    transform: translateY(-1px);
  }
  .btn-danger {
    background: var(--bg-elevated);
    color: var(--danger);
    border: 1px solid rgba(220, 38, 38, 0.2);
  }
  .btn-danger:hover {
    background: rgba(220, 38, 38, 0.1);
  }

  @media (max-width: 480px) {
    .modal {
      border-radius: var(--radius-xl) var(--radius-xl) 0 0;
      margin-top: auto;
      max-height: 90vh;
    }
    .modal-backdrop {
      align-items: flex-end;
      padding: 0;
    }
    .modal-body {
      padding: 16px 20px;
    }
    .modal-footer {
      padding: 12px 20px;
    }
  }
</style>
