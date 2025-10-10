# IBK Blogs ? Everyday AI Use Cases

This repository contains the source code for **IBK Blogs**, a flexible static website built to share real-world AI use cases, playbooks, and resources created by Ilias Benkhaled.

The site is framework-free (plain HTML, CSS, and JS), making it easy to deploy on any static hosting provider such as GitHub Pages, Netlify, Vercel, or Cloudflare Pages.

## Project structure

```
.
??? index.html                # Home page
??? about.html                # About me page
??? blog.html                 # Blog index (populates from JSON)
??? contact.html              # Contact + newsletter forms
??? blog/                     # Individual article pages
??? assets/
?   ??? css/styles.css        # Global styles
?   ??? js/main.js            # Navigation + dynamic blog rendering
?   ??? data/posts.json       # Source of blog card metadata
??? README.md
```

## Customisation quick-start

1. **Update copy & visuals**
   - Edit the hero text, featured sections, and resource cards directly in `index.html`.
   - Replace the portrait image URL in `about.html` with your own hosted image (local files can go inside `assets/images/`).

2. **Manage featured posts**
   - Add, remove, or reorder blog cards in `assets/data/posts.json`.
   - Each entry needs an `id`, `title`, `excerpt`, `tags`, `publishedOn`, `readTime`, and `link` to a detail page.

3. **Write new articles**
   - Duplicate one of the templates in `blog/` and adjust the content.
   - Make sure the `body` tag keeps `data-assets-root=".."` so shared scripts work correctly.

4. **Contact forms**
   - The current forms point to Formspree test endpoints. Swap the `action` attribute with your own form handler or marketing tool.

5. **Branding**
   - Adjust colours and typography via CSS variables at the top of `assets/css/styles.css`.
   - Navigation items highlight automatically based on `data-page` attributes.

## Local preview

Because everything is static, you can open `index.html` directly in a browser. When using Chrome/Edge, the Fetch API may be blocked when loading `assets/data/posts.json` from the file system. To avoid this, serve the site with a lightweight HTTP server, for example:

```bash
# Using Python 3
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Free hosting options

- **GitHub Pages** ? Commit this folder to a repository and enable Pages (root directory). Project pages are supported; just build and push to the `main` branch.
- **Netlify** ? Drag-and-drop this folder into the deploy dashboard or connect the Git repository. Set the build command to `None` and the publish directory to the repository root.
- **Vercel** ? Import the repository, choose the root directory, and select the static site preset (no build command required).
- **Cloudflare Pages** ? After connecting the repo, leave the build command empty and the output directory as `.`.

## Future enhancements

- Add a CMS or headless backend (e.g., Notion API, Contentful) and update `main.js` to fetch dynamic content.
- Convert the layout to Astro, Next.js, or Eleventy if you later need server-side rendering or markdown support.
- Extend the styles with a light theme toggle using CSS variables.

Happy building! Reach out via `hello@ibk.ai` for collaboration ideas.
