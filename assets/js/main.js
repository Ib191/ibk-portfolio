/* ============================================================
   IBK Blogs — main.js
   Navigation, dark-mode toggle, posts loader, timeline accordion
   ============================================================ */

/* ---------- Helpers ---------- */
function getAssetsRoot() {
  const root = document.body.dataset.assetsRoot || '.';
  return root.endsWith('/') ? root.slice(0, -1) : root;
}

/* ---------- Dark Mode ---------- */
function setupThemeToggle() {
  const toggles = document.querySelectorAll('.theme-toggle');
  if (!toggles.length) return;

  // Check saved preference, default to light
  const saved = localStorage.getItem('ibk-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = saved || (prefersDark ? 'dark' : 'light');

  applyTheme(theme);

  toggles.forEach((btn) => {
    btn.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      localStorage.setItem('ibk-theme', next);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const icon = theme === 'dark' ? '☀️' : '🌙';
  document.querySelectorAll('.theme-toggle').forEach((btn) => {
    btn.textContent = icon;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  });
}

/* ---------- Navigation ---------- */
function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const pageId = document.body.dataset.page;

  // Mark active link
  if (pageId) {
    const activeLink = document.querySelector(`[data-nav="${pageId}"]`);
    if (activeLink) activeLink.classList.add('active');
  }

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-inner')) {
      navLinks.classList.remove('open');
    }
  });
}

/* ---------- Posts Loader (removed — posts are now hardcoded in HTML) ---------- */

/* ---------- Timeline Accordion ---------- */
function setupTimeline() {
  const items = document.querySelectorAll('.timeline-item.is-collapsible');

  items.forEach((item) => {
    const btn = item.querySelector('.ti-toggle');
    const extra = item.querySelector('.ti-extra');
    if (!btn || !extra) return;

    const close = () => {
      item.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      btn.textContent = 'Read more';
      extra.style.maxHeight = '0';
    };

    const open = () => {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      btn.textContent = 'Show less';
      extra.style.maxHeight = extra.scrollHeight + 'px';
    };

    btn.addEventListener('click', () => {
      item.classList.contains('open') ? close() : open();
    });

    window.addEventListener('resize', () => {
      if (item.classList.contains('open')) {
        extra.style.maxHeight = extra.scrollHeight + 'px';
      }
    });

    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && item.classList.contains('open')) {
        close();
        btn.focus();
      }
    });
  });
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', () => {
  setupThemeToggle();
  setupNavigation();
  setupTimeline();
});
