# Website specification coverage

The React/TSX frontend is in `github/pages/`. English is its default and fallback language. The home page is a search interface without a connected index. The desktop page replaces the former Tor Browser instructions. No accounts, repository data or sample projects are included.

## Document-to-page mapping

| Topic | Reference | Website |
|---|---|---|
| Private repositories and history | [Presentation](../../ReadMe.md#planned-features) | `#/specs/platform` — planned private service; no repository data in the public preview |
| Branches, tags, diffs, issues, pull requests and releases | [Presentation](../../ReadMe.md#planned-features) | `#/specs/platform` |
| Organizations, roles, SSH keys and signatures | [Presentation](../../ReadMe.md#project-goals), [contribution rules](../../Contributing.md) | `#/specs/platform` |
| Any repository language; separate builds and application runtimes | [Presentation](../../ReadMe.md#technology-choices), [structure](../../DirectoryStructure.md) | `#/specs/platform` |
| Account Copilot and central AI | [License](../../License) | `#/specs/platform` |
| No direct AI source access; hashes and filtered CST artifacts | [Security](../../Security.md#631-hosted-repository-source-boundary-and-cst-artifacts) | `#/specs/security` |
| No training by default; separate consent and minimized retention | [Security](../../Security.md#61-no-training-on-user-projects-by-default) | `#/specs/security` |
| Local model or external provider | [Financial model](../FinancialModel.md#7-ai-access-and-external-providers) | `#/specs/platform` |
| Independent Sentinel and deterministic policy | [Presentation](../../ReadMe.md#security-ai-and-sentinel) | `#/specs/security` |
| Action-bound signed approval with expiry and replay protection | [Presentation](../../ReadMe.md#phone-based-authorization) | `#/specs/security` |
| Targeted containment, backup restoration and emergency access | [Presentation](../../ReadMe.md#containment-and-recovery) | `#/specs/security` |
| CPU, memory and storage budgets; proposed 64 GB host | [Presentation](../../ReadMe.md#resource-planning) | `#/specs/security`, `#/specs/project` |
| Ordinary free access and no platform AI subscription | [License](../../License), [financial model](../FinancialModel.md) | `#/specs/economy` |
| Voluntary donations, continuity and self-sufficiency | [Financial model](../FinancialModel.md#21-voluntary-donations) | `#/specs/economy` |
| Domain registration, renewal and DNS | [Financial model](../FinancialModel.md#23-domain-registration-and-management) | `#/specs/economy` |
| Royalties by agreement, calculation and confirmed payment | [Royalties](../Royalties.md) | `#/specs/economy` |
| Operating funds, reserves, third-party liabilities and locked investments | [Financial model](../FinancialModel.md#4-treasury-and-restricted-funds) | `#/specs/economy` |
| Optional VPN and wallet require separate decisions | [Presentation](../../ReadMe.md#open-decisions), [financial model](../FinancialModel.md) | `#/specs/project` |
| Project ownership, proprietary license and third-party terms | [License](../../License), [contribution rules](../../Contributing.md) | `#/specs/project` |
| Source policies and contribution/structure documents | [Documentation index](../README.md) | `#/docs` |
| Owner-published projects only; limited guest search | [Search requirements](../../ReadMe.md#public-search-desktop-client-and-anonymous-accounts) | `#/explore` — interface only; no connected index |
| Desktop connections to the onion server; anonymous accounts | [Client and account requirements](../../ReadMe.md#public-search-desktop-client-and-anonymous-accounts) | `#/desktop` — planned client; no download or account service |

The catalog at `github/pages/src/data/spec-catalog.json` records each topic's source and status. Displaying a planned topic does not activate a service. No sign-in, repository mutation, payment or private API is supplied by the website.

## Languages and presentation

The twenty languages are English, French, German, Spanish, Italian, Portuguese, Dutch, Polish, Russian, simplified Chinese, Japanese, Arabic, Turkish, Korean, Hindi, Ukrainian, Swedish, Danish, Greek and Hebrew. English is the default. Arabic and Hebrew use RTL layout; code samples, paths and onion addresses remain LTR.

Translation catalogs are local JSON files under `github/pages/src/locales/`. Each has the same keys. Only the selected translation is fetched; no external translation provider is used. On a failed translation request the previous complete language remains active. The React application requires JavaScript. English is bundled initially; other languages load as local build chunks.

The themes are Midnight, Light, Amethyst and Terminal, plus system mode. Only language and theme preferences are stored in the browser. No account, password or source content is persisted by the frontend.

## Local preview

From the repository root:

```sh
cd github/pages
npm ci
npm run dev
```

Node.js 22.12+ or 24 LTS is required. `npm run build` checks TypeScript and outputs `dist/`; publish the contents of `dist/`. The single `index.html` starts the application; the interface is authored in TSX. No Rust toolchain or database is needed. The former public onion-link configuration has been removed. Connection management belongs to the planned desktop client. This website does not create a Tor service or publish the site.

## Interface presentation

The interface uses a horizontal banner, sidebar navigation, repository/website tabs and a compact search panel. The former Greek-symbol logo was removed; the header uses a typographic wordmark. Keyboard `/` and Ctrl/Cmd+K focus search; mobile navigation collapses into a menu. Submitting a query reports that the index is not connected; no query is transmitted or stored. The published-only and guest-limit labels describe requirements, not an active index or quota service. Technical descriptions on the specification pages are expandable; their source links remain visible.

## Desktop vault and downloads

See [desktop vault requirements](desktop-vault.md). The `#/desktop` view includes the planned lightweight editor, encrypted local vault and provider policy management. Download controls cover Windows, macOS, Linux, Android and iOS/iPadOS. All remain disabled until real verified release URLs are configured in `github/pages/src/releases.ts`; no installation or platform support is simulated.
