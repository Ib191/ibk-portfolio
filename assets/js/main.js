function getAssetsRoot() {
  const root = document.body.dataset.assetsRoot || '.';
  return root.endsWith('/') ? root.slice(0, -1) : root;
}

function formatDate(isoDate) {
  const date = new Date(`${isoDate}T00:00:00Z`);
  return date.toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });
}

async function loadPosts() {
  const postsPath = `${getAssetsRoot()}/assets/data/posts.json`;
  try {
    const response = await fetch(postsPath);
    if (!response.ok) {
      throw new Error(`Unable to load posts: ${response.status}`);
    }

    const posts = await response.json();
    const sorted = posts.sort((a, b) => new Date(b.publishedOn) - new Date(a.publishedOn));
    renderFeaturedPosts(sorted.slice(0, 3));
    renderAllPosts(sorted);
  } catch (error) {
    console.error(error);
  }
}

function renderFeaturedPosts(posts) {
  const container = document.querySelector('[data-featured-posts]');
  if (!container) return;

  container.innerHTML = posts
    .map(
      (post) => `
        <article class="card highlight">
          <span class="card-tag">Featured ? ${formatDate(post.publishedOn)}</span>
          <h3>${post.title}</h3>
          <p>${post.excerpt}</p>
          <div class="card-footer">
            <span>${post.readTime}</span>
            <a href="${post.link}">Read more ?</a>
          </div>
        </article>
      `
    )
    .join('');
}

function renderAllPosts(posts) {
  const list = document.querySelector('[data-post-list]');
  if (!list) return;

  list.innerHTML = posts
    .map(
      (post) => `
        <article class="post-card">
          <header>
            <div class="post-meta">
              <span>${formatDate(post.publishedOn)}</span>
              <span>${post.readTime}</span>
              <span>${post.tags.join(' ? ')}</span>
            </div>
            <h3><a href="${post.link}">${post.title}</a></h3>
          </header>
          <p>${post.excerpt}</p>
          <footer>
            <a href="${post.link}">Read the story ?</a>
          </footer>
        </article>
      `
    )
    .join('');
}

function setupNavigation() {
  const toggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');
  const pageId = document.body.dataset.page;

  if (pageId) {
    const activeLink = document.querySelector(`[data-nav="${pageId}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach((link) =>
    link.addEventListener('click', () => navLinks.classList.remove('open'))
  );
}

document.addEventListener('DOMContentLoaded', () => {
  setupNavigation();
  loadPosts();
});


(function () {
  const items = document.querySelectorAll('.timeline-item.is-collapsible');

  items.forEach((item, idx) => {
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
      // set to natural height for smooth animation
      extra.style.maxHeight = extra.scrollHeight + 'px';
    };

    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      isOpen ? close() : open();
    });

    // Keep height correct on resize if open
    window.addEventListener('resize', () => {
      if (item.classList.contains('open')) {
        extra.style.maxHeight = extra.scrollHeight + 'px';
      }
    });

    // Optional: close with ESC when focused inside
    item.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && item.classList.contains('open')) {
        close();
        btn.focus();
      }
    });
  });
})();
