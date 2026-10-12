# david-kieu — personal site

My personal site and blog. Written with Next.js (App Router), React and
Tailwind CSS, and deployed on Vercel.

**Live:** https://david-kieu-personal-website.vercel.app

## What's here

- **Home** — short intro, skills, and selected projects
- **Blog** — longer write-ups on work I've done
- **Contact** — a form and my details
- **CV** — `public/david-kieu-cv.pdf`, linked from the home page

The projects section groups work by discipline (AI/ML, data engineering,
software), and the filter tabs are just client-side state over one array. It
currently carries seven cards, most recently the Fresh Shelf Ops
waste-versus-revenue warehouse and the restaurant platform's staff console.

## Blog posts

Four posts, each written from something I actually built:

- [Why FLOPs mislead on real 3D hardware](app/blog/posts.js) — a controlled
  benchmark across four 3D data representations
- [The new way to code: guardrails and tests, not line-by-line control](app/blog/posts.js)
- [Designing an autonomous multi-agent data-engineering swarm](app/blog/posts.js)
- [Reliability for LLM apps: routing, retries, and deterministic control](app/blog/posts.js)

Posts live in a single array in `app/blog/posts.js`; the list page and the
`/blog/[slug]` route both read from it.

## Running it

```bash
npm install
npm run dev      # http://localhost:3000
```

## Checks

```bash
npm run lint     # eslint
npm test         # vitest
npm run build    # next build
```

CI runs all three plus a `docker build` on every push and pull request
(`.github/workflows/ci.yml`). The tests cover the blog data contract —
posts have unique, URL-safe slugs, the required fields, and a positive
read time — because `/blog/[slug]` breaks at runtime otherwise.

## Editing content

Most of the text lives in two files:

| What | Where |
|---|---|
| Intro, about, skills, contact copy | `app/page.js` |
| Project cards | `app/components/Projects.js` |
| Blog posts | `app/blog/posts.js` |
| SEO metadata, social cards | `app/layout.js` |
| Sitemap entries | `app/sitemap.js` |
| CV PDF | `public/david-kieu-cv.pdf` |

Project card copy is kept in step with the verified, repo-backed claims in
`cvkit`'s `data/base.yaml`, so the site and the CV never drift apart.

Colours and type scale are Tailwind tokens in `app/globals.css` and
`tailwind.config.mjs`.

## Deployment

Vercel builds from `main` on push. There's also a multi-stage `Dockerfile`
for running it anywhere else; see `DEPLOYMENT.md` for both paths.

## Contact

- Email: [david.kieu25@gmail.com](mailto:david.kieu25@gmail.com)
- GitHub: [@monsieurkd](https://github.com/monsieurkd)
- LinkedIn: [david-kieu-tech](https://linkedin.com/in/david-kieu-tech)

## License

MIT — see [LICENSE](LICENSE).
