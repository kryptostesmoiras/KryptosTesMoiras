# Website and project documentation specification

The root `https://kryptostesmoiras.github.io/` serves the public website. The distinct `https://kryptostesmoiras.github.io/KryptosTesMoiras/` subsite serves Markdown, the license and public GitHub Discussions. Source lives in `KryptosTesMoiras/github/pages/`, using React, TypeScript and Vite. This site is separate from the planned platform search, anonymous accounts and desktop vault.

## Document collection

`github/pages/scripts/collect-documents.mjs` collects all tracked `.md` and `.markdown` files from the canonical repository, plus `License` as a readable text document. It writes generated `public/KryptosTesMoiras/documents.json` during development and production builds. It does not collect untracked files, secrets, dependencies or hosted users' source repositories.

The reader provides:

- navigation by document path and title;
- local full-text document search, with no query sent or persisted;
- Markdown headings, lists, tables, code blocks and source links;
- internal links between source documents, including heading anchors;
- a per-document outline;
- links from each document to its matching GitHub Discussions search;
- a Discussions view listing real recent topics when GitHub confirms availability.

Markdown content remains in its original language. Raw HTML is not executed; rendered content is sanitized. Remote Markdown images are shown as links rather than loaded automatically. Mermaid fences remain readable source code blocks. The viewer requires JavaScript.

## Discussions and comments

Comments live in the hosting repository's native GitHub Discussions, not in a new database or private application account system. Public visitors can follow links to read topics; participation uses a GitHub account. No credentials or simulated comments are collected on the document reader.

During publication the workflow checks `has_discussions`, attempts activation when necessary, and retrieves up to 30 recent real topics. If the built-in token cannot enable Discussions, the owner must enable Settings > General > Features > Discussions once. Until availability is confirmed, the reader reports it as unavailable. It does not show an apparently working comment form.

## Languages and themes

The UI retains English, French, German, Spanish, Italian, Portuguese, Dutch, Polish, Russian, simplified Chinese, Japanese, Arabic, Turkish, Korean, Hindi, Ukrainian, Swedish, Danish, Greek and Hebrew. English is the default. Arabic and Hebrew use RTL navigation; the English Markdown body remains LTR.

Four themes are available: Light, Midnight, Amethyst and Terminal, plus system mode. Only appearance and language preferences are saved in the browser. Catalogs are local assets; no external translation provider is called.

## Publication

The hosting repository's `Publish website and project documentation` workflow retrieves the canonical repository, installs locked dependencies and builds the reader. It checks for source or discussion changes every five minutes; GitHub may delay scheduled jobs. Manual and forced runs are supported. It publishes generated files to the existing Pages `main` / root source and explicitly requests the Pages build after a token-authenticated commit.

`deployment.json` records which canonical source generated the documentation. The workflow preserves `.github/`, `CNAME` and owner-managed configuration. It publishes the root website and documentation subfolder together. No sample projects, live source search or private accounts are supplied. See the [publisher procedure](https://github.com/kryptostesmoiras/kryptostesmoiras.github.io/blob/main/docs/publishing.md).

## Local preview

With Node.js 22.12+ or 24 LTS, from the repository root:

```sh
cd github/pages
npm ci
npm run dev
```

`npm run build` regenerates the document collection, checks TypeScript and builds both entries into `dist/`. Root `index.html` loads the website TSX entry; `KryptosTesMoiras/index.html` loads the documentation TSX entry. `npm run preview` serves the production build. The hosting workflow publishes the generated output; no server, database or desktop source is supplied by this website.

## Root website

The root website retains the horizontal banner, Git-style navigation, repository/website tabs and disconnected search interface. Its Documentation navigation opens `/KryptosTesMoiras/`. The desktop section describes planned connections, editor, encrypted vault, provider restrictions and unavailable platform downloads; it does not implement these services. The Markdown reader is not mounted at the root URL.
