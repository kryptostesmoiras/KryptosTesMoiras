# Kryptos Tēs Moiras — Public Portal

The public entry point to Kryptos Tēs Moiras: a planned private Git platform for source repositories and hosted projects in any programming language. The `.io` portal presents the project, explains its security and funding model, and guides visitors toward the separate Tor service where accounts and private repositories will live.

**Current delivery:** eight static pages, an interactive repository demo, twenty languages, and four themes with a system preference option. English is the default language. The demo contains fictional data; the private account service is not connected.

[Preview locally](#preview-locally) · [Explore the pages](#explore-the-pages) · [Project specifications](#project-specifications) · [Tor access](#tor-access)

## Preview locally

From the root of your local `KryptosTesMoiras` checkout, run:

```sh
python3 -m http.server 8080 --bind 127.0.0.1 --directory github/pages
```

Open **<http://127.0.0.1:8080/>**. Go directly to **<http://127.0.0.1:8080/demo.html>** to explore the fictional workspace. Stop the server with `Ctrl+C`.

Python 3 is the only requirement for this preview. The site needs no installation, package manager, build step, database, or Rust toolchain. Serve it over HTTP so that translation JSON files can load; opening an HTML file with `file://` is insufficient for the full experience.

## Explore the pages

| Page | What it covers |
| --- | --- |
| [Home](index.html) | Project introduction and routes into the portal. |
| [Platform](platform.html) | Planned Git workflows, teams, hosting, account Copilot, and AI provider choices. |
| [Security](security.html) | Source confidentiality, AI boundaries, independent Sentinel supervision, signed approvals, containment, and recovery. |
| [Economy](economy.html) | Free access, voluntary donations, domain services, agreed royalties, and treasury principles. |
| [Project](project.html) | Architecture direction, resource planning, ownership, and proposed extensions. |
| [Documents](documents.html) | Reference documents and specification coverage. |
| [Access](access.html) | Tor access instructions and the owner-configured onion link, when available. |
| [Demo](demo.html) | Fictional repository search, sorting, file browsing, and history views. |

The demo is read-only and runs in the browser. It neither reads nor modifies real repositories. Refreshing the page resets its transient state.

## Public portal and private accounts

The two surfaces have distinct roles:

| Public `.io` portal | Separate Tor service |
| --- | --- |
| Project information, documentation, appearance settings, and fictional demo | Real accounts, authentication, permissions, and private repository operations |
| Static HTML, CSS, JavaScript, and local JSON assets supplied here | Private application and infrastructure managed separately by the owner |
| Available to an ordinary browser | Requires Tor access |

The planned server is written in Rust. That choice does not restrict the languages used by projects hosted on the platform. Storing code, building it, and running a hosted application are separate capabilities with separate isolation requirements.

### AI and source confidentiality

The intended AI interface exposes hashes and authorized, filtered artifacts derived from CST analysis (Concrete Syntax Trees), rather than granting the AI direct access to hosted source repositories. Raw CST output can contain source text, so filtering and validation must happen before artifacts cross that boundary.

This portal describes that policy; it does not connect an AI model or implement the private analysis pipeline. See the [source-access policy](../../Security.md#631-hosted-repository-source-boundary-and-cst-artifacts) for the specification.

## Languages and themes

Use the language and appearance selectors on the pages. Preferences are stored in this browser and apply across pages on the same origin. The public site and a future onion site have separate browser storage.

**Languages:** English, French, German, Spanish, Italian, Portuguese, Dutch, Polish, Russian, simplified Chinese, Japanese, Arabic, Turkish, Korean, Hindi, Ukrainian, Swedish, Danish, Greek, and Hebrew.

English is the initial and fallback language. Arabic and Hebrew use right-to-left layouts. Translation catalogs are local files; no external translation service is called. If a selected catalog cannot load, the previous complete language stays active.

**Themes:** Midnight, Light, Amethyst, and Terminal. System mode follows the browser's light or dark preference.

## Tor access

The onion address is intentionally unset in [config.js](config.js). The portal remains usable while that address is unavailable; visitors can explore the demo without an account.

When the private service is ready, the owner can set `onionUrl` in their deployed copy of that file to the service's full HTTP or HTTPS v3 onion URL. The access page then displays the address and enables its copy and open controls. The accepted address has a 56-character onion hostname and no credentials, custom port, query, fragment, or path beyond `/`.

Configuration changes the public link only. It does not create an onion service, proxy Tor traffic, authenticate a visitor, or launch Tor Browser automatically. Any address placed in a deployed static file is public to its visitors; the owner does not need to send it to an AI assistant or commit it to this repository.

## Files and publishing

| Location | Purpose |
| --- | --- |
| `*.html` | Eight pages with English fallback content. |
| `config.js` | Owner-managed public onion link. |
| `public.js` | Public navigation and onion-link controls. |
| `shared/portal.css`, `shared/workspace.css` | Portal and demo layouts and themes. |
| `shared/preferences.js`, `shared/locales.js` | Language selection, theme preferences, and embedded English messages. |
| `shared/locales/*.json` | Twenty translation catalogs and their registry. |
| `shared/workspace.js` | Fictional, in-memory repository demo. |
| `shared/spec-catalog.json` | Specification topics, source references, and delivery status. |
| `favicon.svg` | Site icon. |

Publish the **contents of `github/pages/`** together on a static web host, preserving their relative paths. Assets support both domain-root hosting and a subdirectory. Putting these files in this folder does not by itself enable GitHub Pages or configure a `.io` domain; hosting and DNS must be configured separately.

The website includes no backend, account service, database, payment processing, build runner, or application runtime. It does not require changes to the owner's existing `app/` directory.

## Project specifications

The portal summarizes the repository's design documents. Features described there remain planned unless explicitly identified as working in this static delivery.

- [Project presentation](../../ReadMe.md) — goals, architecture, trust boundaries, and roadmap.
- [Security policy](../../Security.md) — AI data access, consent, and security requirements.
- [Financial model](../../docs/FinancialModel.md) and [royalties](../../docs/Royalties.md) — funding and commercial principles.
- [Directory structure](../../DirectoryStructure.md) — proposed future platform organization.
- [Contribution rules](../../Contributing.md) and [license](../../License) — contribution and usage terms.
- [Website specification coverage](../../docs/architecture/site-specifications.md) — document-to-page mapping and current delivery limits.

These relative Markdown links work in the repository. A deployment containing only `github/pages/` will not include the parent documents; the website's Documents page links to their GitHub versions.
