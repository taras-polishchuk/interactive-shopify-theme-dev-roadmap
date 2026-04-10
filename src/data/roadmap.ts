import type { RoadmapNode, Stage } from './types'

export const stages: Stage[] = [
  {
    id: 'foundation',
    title: 'Foundation',
    subtitle: 'Build your web dev base',
    icon: '🧱',
    color: '#6366f1',
    nodeIds: ['html-css-basics', 'responsive-design', 'js-basics', 'git-basics'],
  },
  {
    id: 'frontend',
    title: 'Frontend Deep Dive',
    subtitle: 'Level up your dev skills',
    icon: '⚡',
    color: '#8b5cf6',
    nodeIds: ['advanced-css', 'js-dom', 'performance-basics', 'build-tools'],
  },
  {
    id: 'shopify-basics',
    title: 'Shopify Basics',
    subtitle: 'Enter the Shopify ecosystem',
    icon: '🛍️',
    color: '#06b6d4',
    nodeIds: ['what-is-shopify', 'theme-structure', 'liquid-fundamentals', 'shopify-cli'],
  },
  {
    id: 'theme-dev',
    title: 'Theme Development',
    subtitle: 'Build themes from scratch',
    icon: '🔨',
    color: '#10b981',
    nodeIds: ['sections-blocks', 'json-templates', 'dynamic-rendering', 'metafields', 'dawn-theme'],
  },
  {
    id: 'theme-customization',
    title: 'Theme Customization',
    subtitle: 'Master the editor mindset',
    icon: '🎨',
    color: '#f59e0b',
    nodeIds: ['theme-editor', 'schema-settings', 'ux-merchants', 'section-groups'],
  },
  {
    id: 'advanced',
    title: 'Advanced Shopify',
    subtitle: 'Power features & performance',
    icon: '🚀',
    color: '#ef4444',
    nodeIds: ['app-integrations', 'storefront-api', 'performance-opt', 'a11y', 'ajax-cart'],
  },
  {
    id: 'professional',
    title: 'Professional Level',
    subtitle: 'Work on real stores',
    icon: '💎',
    color: '#f97316',
    nodeIds: ['portfolio', 'client-work', 'debugging', 'code-quality', 'theme-publishing'],
  },
]

export const nodes: Record<string, RoadmapNode> = {
  // ─── FOUNDATION ────────────────────────────────────────────────────────────
  'html-css-basics': {
    id: 'html-css-basics',
    stageId: 'foundation',
    title: 'HTML & CSS Fundamentals',
    description:
      'The backbone of every Shopify theme. Master semantic HTML and foundational CSS — selectors, the box model, typography, and layout. Without this, nothing else works.',
    skills: ['HTML5 semantics', 'CSS selectors', 'Box model', 'Typography', 'Colors & units', 'Positioning'],
    requires: [],
    resources: [
      { label: 'MDN — HTML Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML' },
      { label: 'MDN — CSS Basics', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS' },
      { label: 'The Odin Project', url: 'https://www.theodinproject.com' },
    ],
    xp: 50,
  },
  'responsive-design': {
    id: 'responsive-design',
    stageId: 'foundation',
    title: 'Responsive Design',
    description:
      'Every Shopify store must work on mobile. Learn media queries, fluid layouts, and mobile-first thinking. This is non-negotiable in any serious project.',
    skills: ['Media queries', 'Mobile-first', 'Viewport units', 'Fluid typography', 'Breakpoints'],
    requires: ['html-css-basics'],
    resources: [
      { label: 'MDN — Responsive Design', url: 'https://developer.mozilla.org/en-US/docs/Learn/CSS/CSS_layout/Responsive_Design' },
      { label: 'web.dev — Learn Design', url: 'https://web.dev/learn/design' },
    ],
    xp: 50,
  },
  'js-basics': {
    id: 'js-basics',
    stageId: 'foundation',
    title: 'JavaScript Basics',
    description:
      'You need JS for interactive themes. Master variables, functions, arrays, objects, and async patterns like Promises and fetch. ES6+ is the standard.',
    skills: ['Variables & scope', 'Functions & closures', 'Arrays & objects', 'ES6+ syntax', 'Promises & async/await', 'Fetch API'],
    requires: ['html-css-basics'],
    resources: [
      { label: 'javascript.info', url: 'https://javascript.info' },
      { label: 'MDN — JS Guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide' },
    ],
    xp: 50,
  },
  'git-basics': {
    id: 'git-basics',
    stageId: 'foundation',
    title: 'Git Basics',
    description:
      'Version control is non-negotiable in professional theme development. Learn commits, branching, merging, and working with remotes (GitHub/GitLab).',
    skills: ['init & clone', 'Commit & push', 'Branches & merge', 'Pull requests', 'Resolving conflicts'],
    requires: [],
    resources: [
      { label: 'Git — Pro Book', url: 'https://git-scm.com/book/en/v2' },
      { label: 'Learn Git Branching', url: 'https://learngitbranching.js.org/' },
    ],
    xp: 50,
  },

  // ─── FRONTEND DEEP DIVE ────────────────────────────────────────────────────
  'advanced-css': {
    id: 'advanced-css',
    stageId: 'frontend',
    title: 'Advanced CSS',
    description:
      'Flexbox, Grid, custom properties, and animations power modern Shopify themes. Build complex, responsive layouts with confidence and minimal markup.',
    skills: ['Flexbox', 'CSS Grid', 'Custom properties', 'Animations & transitions', 'Pseudo-elements', 'CSS Layers'],
    requires: ['responsive-design'],
    resources: [
      { label: 'CSS Tricks — Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' },
      { label: 'CSS Tricks — Grid', url: 'https://css-tricks.com/snippets/css/complete-guide-grid/' },
      { label: 'web.dev — Learn CSS', url: 'https://web.dev/learn/css' },
    ],
    xp: 75,
  },
  'js-dom': {
    id: 'js-dom',
    stageId: 'frontend',
    title: 'JavaScript DOM & Events',
    description:
      'Manipulate the DOM, handle user events, and understand how Shopify themes respond to interactions. Event delegation is key for dynamic content.',
    skills: ['querySelector / querySelectorAll', 'Event listeners', 'Event delegation', 'Dynamic HTML manipulation', 'Custom events', 'Data attributes'],
    requires: ['js-basics'],
    resources: [
      { label: 'javascript.info — DOM', url: 'https://javascript.info/document' },
      { label: 'MDN — DOM Events', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Building_blocks/Events' },
    ],
    xp: 75,
  },
  'performance-basics': {
    id: 'performance-basics',
    stageId: 'frontend',
    title: 'Web Performance Basics',
    description:
      'Shopify stores live and die by Core Web Vitals. Understand what LCP, CLS, and FID/INP mean and learn the levers to pull for faster pages.',
    skills: ['Core Web Vitals', 'Image optimization', 'Lazy loading', 'Critical CSS', 'Resource hints', 'Render blocking'],
    requires: ['advanced-css', 'js-dom'],
    resources: [
      { label: 'web.dev — Performance', url: 'https://web.dev/performance' },
      { label: 'PageSpeed Insights', url: 'https://pagespeed.web.dev/' },
    ],
    xp: 75,
  },
  'build-tools': {
    id: 'build-tools',
    stageId: 'frontend',
    title: 'Build Tools & NPM',
    description:
      'Modern theme development uses build pipelines for transpiling, bundling, and live reload during dev. Know your tools before Shopify CLI runs them for you.',
    skills: ['npm / yarn / pnpm', 'Vite basics', 'ES Modules', 'PostCSS', 'SCSS / Sass basics', 'package.json scripts'],
    requires: ['js-basics'],
    resources: [
      { label: 'Vite.js Docs', url: 'https://vite.dev' },
      { label: 'NPM Getting Started', url: 'https://docs.npmjs.com/getting-started' },
    ],
    xp: 75,
  },

  // ─── SHOPIFY BASICS ────────────────────────────────────────────────────────
  'what-is-shopify': {
    id: 'what-is-shopify',
    stageId: 'shopify-basics',
    title: 'Understanding Shopify',
    description:
      'Know the platform before you build on it. Understand what merchants see and need, the Partner dashboard, how themes relate to apps, and how to set up a dev store.',
    skills: ['Merchant perspective', 'Shopify admin overview', 'Themes vs apps', 'Partner dashboard', 'Dev store setup'],
    requires: ['git-basics'],
    resources: [
      { label: 'Shopify Partner Program', url: 'https://www.shopify.com/partners' },
      { label: 'Shopify Dev Docs', url: 'https://shopify.dev/docs/storefronts/themes' },
    ],
    xp: 100,
  },
  'theme-structure': {
    id: 'theme-structure',
    stageId: 'shopify-basics',
    title: 'Theme File Structure',
    description:
      'Learn how Shopify themes are organized: layouts, templates, sections, snippets, assets, config. Understanding the architecture is step one.',
    skills: ['layouts/', 'templates/', 'sections/', 'snippets/', 'assets/', 'config/ & locales/'],
    requires: ['what-is-shopify'],
    resources: [
      { label: 'Shopify — Theme Architecture', url: 'https://shopify.dev/docs/storefronts/themes/architecture' },
      { label: 'Dawn Theme on GitHub', url: 'https://github.com/Shopify/dawn' },
    ],
    xp: 100,
  },
  'liquid-fundamentals': {
    id: 'liquid-fundamentals',
    stageId: 'shopify-basics',
    title: 'Liquid Fundamentals',
    description:
      "Liquid is Shopify's templating language. Master objects, filters, tags, and how data flows through templates. This is the core of all Shopify theme work.",
    skills: ['Objects & properties', 'Filters (string, array, math)', 'Tags: if/unless/case', 'Loops & tablerow', 'Assign & capture', 'Whitespace control'],
    requires: ['theme-structure'],
    resources: [
      { label: 'Shopify — Liquid Reference', url: 'https://shopify.dev/docs/api/liquid' },
      { label: 'Liquid Cheat Sheet', url: 'https://cheat.markdunkley.com/' },
    ],
    xp: 100,
  },
  'shopify-cli': {
    id: 'shopify-cli',
    stageId: 'shopify-basics',
    title: 'Shopify CLI & Dev Setup',
    description:
      'Set up your professional development environment. Use Shopify CLI for hot-reloading, theme sync, and managing multiple environments without touching the live store.',
    skills: ['CLI install & auth', 'shopify theme dev', 'Push & pull', 'Environment flags', 'Version control for themes'],
    requires: ['what-is-shopify', 'git-basics'],
    resources: [
      { label: 'Shopify CLI Docs', url: 'https://shopify.dev/docs/storefronts/tools/cli' },
      { label: 'Theme Dev Workflow', url: 'https://shopify.dev/docs/storefronts/themes/tools/cli/theme-commands' },
    ],
    xp: 100,
  },

  // ─── THEME DEVELOPMENT ─────────────────────────────────────────────────────
  'sections-blocks': {
    id: 'sections-blocks',
    stageId: 'theme-dev',
    title: 'Sections & Blocks',
    description:
      'The core building units of every Shopify theme. Build reusable, merchant-editable sections with typed blocks. This unlocks true theme flexibility.',
    skills: ['Section schema', 'Block types & limits', 'Settings inputs', 'Section Rendering API', 'Dynamic vs static sections'],
    requires: ['liquid-fundamentals', 'shopify-cli'],
    realityTask:
      'Build a custom "Featured Product" section in Dawn from scratch — image block, rich text block, and a CTA button block with schema settings.',
    resources: [
      { label: 'Shopify — Sections', url: 'https://shopify.dev/docs/storefronts/themes/architecture/sections' },
      { label: 'Shopify — Blocks', url: 'https://shopify.dev/docs/storefronts/themes/architecture/blocks' },
    ],
    xp: 150,
  },
  'json-templates': {
    id: 'json-templates',
    stageId: 'theme-dev',
    title: 'JSON Templates',
    description:
      'Modern Shopify themes use JSON templates instead of Liquid ones. Understand how they reference sections, how to add new templates, and the flexibility they provide merchants.',
    skills: ['JSON template structure', 'Section references', 'App blocks in templates', 'Multiple templates per type', 'Template defaults & order'],
    requires: ['sections-blocks'],
    resources: [
      { label: 'Shopify — JSON Templates', url: 'https://shopify.dev/docs/storefronts/themes/architecture/templates/json-templates' },
    ],
    xp: 150,
  },
  'dynamic-rendering': {
    id: 'dynamic-rendering',
    stageId: 'theme-dev',
    title: 'Dynamic Data Rendering',
    description:
      'Learn to render product, collection, cart, and customer data dynamically. Understand Liquid objects deeply — this is where themes come alive.',
    skills: ['product object', 'collection object', 'cart object', 'customer object', 'Pagination', 'Storefront filtering', 'forloop helpers'],
    requires: ['liquid-fundamentals'],
    realityTask:
      'Build a product recommendations section that dynamically queries products from the same collection using Liquid — no apps required.',
    resources: [
      { label: 'Shopify — Liquid Objects', url: 'https://shopify.dev/docs/api/liquid/objects' },
      { label: 'Shopify — Liquid Filters', url: 'https://shopify.dev/docs/api/liquid/filters' },
    ],
    xp: 150,
  },
  'metafields': {
    id: 'metafields',
    stageId: 'theme-dev',
    title: 'Metafields & Metaobjects',
    description:
      "Extend Shopify's data model beyond defaults. Add custom structured data fields to products, collections, orders, and more. Essential for real client work.",
    skills: ['Metafield types & namespaces', 'Pinning definitions', 'Accessing in Liquid', 'Metaobjects', 'Admin UI extensions for input'],
    requires: ['dynamic-rendering'],
    realityTask:
      'Add a "Care Instructions" rich text metafield to products, define it in the Admin, and display it in the product page template with conditional rendering.',
    resources: [
      { label: 'Shopify — Metafields', url: 'https://shopify.dev/docs/api/liquid/objects/metafield' },
      { label: 'Metaobjects Overview', url: 'https://shopify.dev/docs/storefronts/themes/metaobjects' },
    ],
    xp: 150,
  },
  'dawn-theme': {
    id: 'dawn-theme',
    stageId: 'theme-dev',
    title: 'Dawn Theme Deep Dive',
    description:
      "Study Shopify's reference theme, Dawn. Its architecture reveals Shopify's opinionated best practices — Web Components, section patterns, and accessibility-first design.",
    skills: ['Dawn architecture', 'Web Components in Shopify', 'Custom HTML elements', 'Accessibility patterns', 'Dawn JS modules', 'Code conventions'],
    requires: ['sections-blocks', 'json-templates'],
    realityTask:
      "Modify Dawn's product page to add a sticky 'Add to Cart' bar that appears when the default ATC button scrolls out of view.",
    resources: [
      { label: 'Dawn GitHub', url: 'https://github.com/Shopify/dawn' },
      { label: 'Dawn Web Components Patterns', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/web-components' },
    ],
    xp: 150,
  },

  // ─── THEME CUSTOMIZATION ───────────────────────────────────────────────────
  'theme-editor': {
    id: 'theme-editor',
    stageId: 'theme-customization',
    title: 'Shopify Theme Editor',
    description:
      'Build FOR the editor, not just with it. Understand how the editor injects scripts, fires events, and how to make your sections preview correctly without a page reload.',
    skills: ['Editor lifecycle events', 'section:load / section:unload', 'Real-time preview accuracy', 'Section targeting', 'Editor-safe JS patterns'],
    requires: ['sections-blocks'],
    resources: [
      { label: 'Shopify — Theme Editor', url: 'https://shopify.dev/docs/storefronts/themes/tools/theme-editor' },
      { label: 'Editor Events Reference', url: 'https://shopify.dev/docs/storefronts/themes/tools/theme-editor/events' },
    ],
    xp: 150,
  },
  'schema-settings': {
    id: 'schema-settings',
    stageId: 'theme-customization',
    title: 'Schema Settings Mastery',
    description:
      'Build flexible, merchant-friendly sections using the full range of schema settings. Know when to use each type, and how to set smart defaults.',
    skills: ['text / textarea / richtext', 'image_picker / video', 'color / font_picker', 'range / checkbox', 'collection / product pickers', 'Conditional visibility'],
    requires: ['theme-editor'],
    resources: [
      { label: 'Shopify — Input Settings', url: 'https://shopify.dev/docs/storefronts/themes/architecture/settings/input-settings' },
      { label: 'Shopify — Sidebar Settings', url: 'https://shopify.dev/docs/storefronts/themes/architecture/settings/sidebar-settings' },
    ],
    xp: 150,
  },
  'ux-merchants': {
    id: 'ux-merchants',
    stageId: 'theme-customization',
    title: 'UX Thinking for Merchants',
    description:
      "Think from the merchant's perspective. Settings naming, helpful defaults, forgiving section logic, and clear labels make the difference between a good and great theme.",
    skills: ['Settings naming & labels', 'Info / paragraph settings', 'Helpful default values', 'Section complexity tradeoffs', 'Merchant personas'],
    requires: ['schema-settings'],
    realityTask:
      'Audit a section you built: rewrite all setting labels as a merchant would read them, add descriptions, and set sensible defaults.',
    resources: [
      { label: 'Theme Store UX Guidelines', url: 'https://shopify.dev/docs/storefronts/themes/store/requirements' },
    ],
    xp: 150,
  },
  'section-groups': {
    id: 'section-groups',
    stageId: 'theme-customization',
    title: 'Section Groups & Presets',
    description:
      'Enable global header/footer customization and reusable section presets. This is what separates a theme from a template.',
    skills: ['Section groups schema', 'header / footer groups', 'Section presets', 'Block presets', 'Nested sections (Blocks with local scope)'],
    requires: ['theme-editor'],
    resources: [
      { label: 'Shopify — Section Groups', url: 'https://shopify.dev/docs/storefronts/themes/architecture/section-groups' },
      { label: 'Shopify — Presets', url: 'https://shopify.dev/docs/storefronts/themes/architecture/sections/section-schema#presets' },
    ],
    xp: 150,
  },

  // ─── ADVANCED SHOPIFY ──────────────────────────────────────────────────────
  'app-integrations': {
    id: 'app-integrations',
    stageId: 'advanced',
    title: 'App Integrations',
    description:
      'Integrate third-party apps gracefully. Understand app blocks, theme app extensions, script injection, and how to avoid conflicts with app-loaded CSS/JS.',
    skills: ['App blocks', 'theme.liquid script management', 'App embeds', 'Conflict avoidance patterns', 'Testing with apps installed'],
    requires: ['json-templates', 'section-groups'],
    resources: [
      { label: 'Shopify — App Blocks', url: 'https://shopify.dev/docs/storefronts/themes/architecture/blocks/app-blocks' },
      { label: 'App Embed Blocks', url: 'https://shopify.dev/docs/apps/build/online-store/theme-app-extensions/configuration' },
    ],
    xp: 200,
  },
  'storefront-api': {
    id: 'storefront-api',
    stageId: 'advanced',
    title: 'Storefront API Basics',
    description:
      'Go beyond Liquid. Use the Storefront API to fetch data client-side, build custom cart experiences, and unlock patterns that Liquid alone cannot achieve.',
    skills: ['GraphQL basics', 'Storefront API queries', 'API authentication', 'Cart API (AJAX)', 'Predictive search API', 'Product recommendations'],
    requires: ['js-dom', 'metafields'],
    realityTask:
      'Build a custom predictive search input that queries products and collections in real time using the Storefront Search API — no app required.',
    resources: [
      { label: 'Shopify — Storefront API', url: 'https://shopify.dev/docs/api/storefront' },
      { label: 'AJAX Cart API Reference', url: 'https://shopify.dev/docs/api/ajax/reference/cart' },
    ],
    xp: 200,
  },
  'performance-opt': {
    id: 'performance-opt',
    stageId: 'advanced',
    title: 'Performance Optimization',
    description:
      'Real stores need fast themes. Apply Shopify-specific optimizations: image srcset, preload, lazy section loading, and eliminating render-blocking resources.',
    skills: ['image_tag with widths', 'srcset & sizes', 'preload hints', 'JS defer & async', 'asset_url caching', 'Lazy theme sections', 'Script splitting'],
    requires: ['performance-basics', 'dawn-theme'],
    realityTask:
      "Audit a live store with Google PageSpeed Insights. Identify the top 3 CWV issues and implement fixes in the theme. Document before/after scores.",
    resources: [
      { label: 'Shopify — Performance', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance' },
      { label: 'Shopify Speed Report', url: 'https://help.shopify.com/en/manual/online-store/themes/managing-themes/optimizing-themes' },
    ],
    xp: 200,
  },
  'a11y': {
    id: 'a11y',
    stageId: 'advanced',
    title: 'Accessibility (a11y)',
    description:
      'Accessible themes reach more customers, often rank better, and are required for Theme Store approval. Learn WCAG 2.1, ARIA patterns, and keyboard navigation.',
    skills: ['WCAG 2.1 AA', 'ARIA roles & attributes', 'Keyboard navigation & focus trapping', 'Focus management', 'Color contrast (4.5:1)', 'Screen reader testing'],
    requires: ['advanced-css', 'ux-merchants'],
    resources: [
      { label: 'web.dev — Accessibility', url: 'https://web.dev/learn/accessibility' },
      { label: 'Shopify a11y Guidelines', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/accessibility' },
      { label: 'axe DevTools', url: 'https://www.deque.com/axe/devtools/' },
    ],
    xp: 200,
  },
  'ajax-cart': {
    id: 'ajax-cart',
    stageId: 'advanced',
    title: 'AJAX Cart & Sections API',
    description:
      "Build smooth, server-rendered cart drawers using Shopify's Sections Rendering API. No page reloads. The gap between average and great themes.",
    skills: ['Sections Rendering API', 'cart.js AJAX endpoints', 'Cart drawer pattern', 'Optimistic UI updates', 'Line item management', 'Cart note & attributes'],
    requires: ['js-dom', 'sections-blocks'],
    realityTask:
      "Build a fully functional AJAX cart drawer: add-to-cart updates the drawer, quantity changes work, and everything is server-rendered via the Sections Rendering API.",
    resources: [
      { label: 'Shopify — Sections Rendering API', url: 'https://shopify.dev/docs/storefronts/themes/architecture/sections/rendering-api' },
      { label: 'Cart AJAX API', url: 'https://shopify.dev/docs/api/ajax/reference/cart' },
    ],
    xp: 200,
  },

  // ─── PROFESSIONAL LEVEL ────────────────────────────────────────────────────
  'portfolio': {
    id: 'portfolio',
    stageId: 'professional',
    title: 'Portfolio & Freelancing',
    description:
      'Turn skills into a business. Build a compelling portfolio, write case studies, list yourself on Shopify Experts, and set your rates with confidence.',
    skills: ['Portfolio site', 'Case study writing', 'GitHub presence', 'Shopify Experts profile', 'Rate setting', 'Niche positioning'],
    requires: ['dawn-theme', 'ux-merchants'],
    resources: [
      { label: 'Shopify Experts Marketplace', url: 'https://experts.shopify.com/' },
      { label: 'Upwork for Shopify Devs', url: 'https://www.upwork.com/' },
    ],
    xp: 200,
  },
  'client-work': {
    id: 'client-work',
    stageId: 'professional',
    title: 'Working with Clients',
    description:
      'Learn to scope projects, manage change requests, protect your time, and deliver professional results. Technical skill is 50% of freelance success.',
    skills: ['Project scoping & SOW', 'Change request handling', 'Staging vs live environments', 'Client communication templates', 'Handoff documentation'],
    requires: ['portfolio'],
    resources: [
      { label: 'Shopify Partner Resources', url: 'https://www.shopify.com/partners/resources' },
    ],
    xp: 200,
  },
  'debugging': {
    id: 'debugging',
    stageId: 'professional',
    title: 'Debugging Real Stores',
    description:
      "Real stores have real bugs. Learn to trace Liquid rendering issues, debug JS errors under app load, and use Theme Check to catch issues before they reach clients.",
    skills: ['Chrome DevTools — network & console', 'Liquid error tracing', 'Theme Check CLI', 'App conflict debugging', '{% render %} vs {% include %} traps', 'Console profiling'],
    requires: ['performance-opt'],
    realityTask:
      "Take a broken Shopify sandbox theme, intentionally introduce 3 bugs (Liquid error, JS conflict, layout break), then debug each from scratch. Document the process.",
    resources: [
      { label: 'Shopify — Theme Check', url: 'https://shopify.dev/docs/storefronts/tools/theme-check' },
      { label: 'Liquid Debugging Tips', url: 'https://shopify.dev/docs/storefronts/themes/best-practices/performance/liquid' },
    ],
    xp: 200,
  },
  'code-quality': {
    id: 'code-quality',
    stageId: 'professional',
    title: 'Code Quality & Architecture',
    description:
      'Write maintainable, scalable theme code. Know when to use snippets vs sections, how to avoid Liquid spaghetti, and set up linting that enforces standards.',
    skills: ['DRY Liquid patterns', 'Naming conventions', 'Theme Check in CI', 'Component thinking', 'Snippet parameterization', 'README & comments strategy'],
    requires: ['debugging', 'ajax-cart'],
    resources: [
      { label: 'Shopify — Theme Best Practices', url: 'https://shopify.dev/docs/storefronts/themes/best-practices' },
      { label: 'Theme Check Rules', url: 'https://shopify.dev/docs/storefronts/tools/theme-check/checks' },
    ],
    xp: 200,
  },
  'theme-publishing': {
    id: 'theme-publishing',
    stageId: 'professional',
    title: 'Publishing a Premium Theme',
    description:
      "The final boss. Build a theme that meets every Shopify Theme Store requirement: accessibility, performance, docs, and merchant UX. Submit and survive review.",
    skills: ['Theme Store requirements', 'Accessibility compliance (WCAG AA)', 'Performance benchmarks', 'Full documentation', 'Support setup', 'Versioning strategy'],
    requires: ['code-quality', 'a11y'],
    realityTask:
      'Run the full Shopify Theme Inspector audit on your theme. Fix every issue until it passes. Write a launch README. Ship it.',
    resources: [
      { label: 'Theme Store Requirements', url: 'https://shopify.dev/docs/storefronts/themes/store/requirements' },
      { label: 'Submit to Theme Store', url: 'https://shopify.dev/docs/storefronts/themes/store/submit' },
    ],
    xp: 300,
  },
}

export const roadmapData = { stages, nodes }

export const totalXp = Object.values(nodes).reduce((sum, n) => sum + n.xp, 0)
