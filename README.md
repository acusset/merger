# PDF Merger

A client-side PDF merging tool. Files are processed entirely in the browser — nothing is uploaded to any server.

## Stack

- **React 18** + **TypeScript**
- **Vite** — dev server and bundler
- **Tailwind CSS** — styling
- **pdf-lib** — PDF processing (runs in the browser)
- **ESLint** — linting

## Getting started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173` with hot module replacement.

## Available commands

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Type-check and produce a production build in `dist/` |
| `npm run preview` | Serve the production build locally to verify it before deploying |
| `npm run lint` | Run ESLint |

## Build

```bash
npm run build
```

This runs two steps in sequence:
1. `tsc -b` — full TypeScript type-check across the project (fails the build on type errors)
2. `vite build` — bundles and minifies everything into `dist/`

The output is a static site: one `index.html` entry point and hashed JS/CSS bundles under `dist/assets/`. No server or runtime is required to host it.

## Deployment

Upload the `dist/` folder to any static host. Common options:

**Vercel / Netlify** — connect the repo, they auto-detect Vite and run `npm run build`. The `dist/` folder is served automatically.

**Cloudflare Pages** — same: set build command to `npm run build`, output directory to `dist`.

**GitHub Pages** — build locally with `npm run build`, then push `dist/` to the `gh-pages` branch (or use the [peaceiris/actions-gh-pages](https://github.com/peaceiris/actions-gh-pages) action).

**Any static host / object storage (S3, R2, etc.)** — just sync the `dist/` folder.

If you deploy to a sub-path (e.g. `https://example.com/pdf-merger/`) rather than a root domain, add this to `vite.config.ts`:

```ts
export default defineConfig({
  base: '/pdf-merger/',
  // ...
});
```

## How the PDF merging works

Everything runs in the browser — no file ever leaves the user's machine.

1. The user selects or drops PDF files. The browser reads them via the [File API](https://developer.mozilla.org/en-US/docs/Web/API/File).
2. Each file is read into an `ArrayBuffer` using `file.arrayBuffer()`.
3. `pdf-lib` loads each PDF from memory, copies its pages into a new merged document, and serialises the result to bytes — all in-memory.
4. The result is turned into a blob URL and downloaded via a temporary `<a>` element. The URL is revoked immediately after.

## Project structure

```
pdf-merger/
├── src/
│   ├── App.tsx        # main component
│   ├── main.tsx       # React entry point
│   └── index.css      # Tailwind directives
├── index.html         # HTML entry point (Vite replaces the script tag at build time)
├── vite.config.ts
├── tailwind.config.js
├── postcss.config.js
├── tsconfig.json      # project references root
├── tsconfig.app.json  # config for src/
├── tsconfig.node.json # config for vite.config.ts
└── eslint.config.js
```
