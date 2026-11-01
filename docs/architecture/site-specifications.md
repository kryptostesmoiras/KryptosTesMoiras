# Website specification coverage

The static public site is in `github/pages/`. English is its default and fallback language. It presents the project and an empty interface preview, with no accounts, repository data or sample projects.

## Document-to-page mapping

| Topic | Reference | Website |
|---|---|---|
| Private repositories and history | [Presentation](../../ReadMe.md#planned-features) | `platform.html#git` — planned private service; no repository data in the public preview |
| Branches, tags, diffs, issues, pull requests and releases | [Presentation](../../ReadMe.md#planned-features) | `platform.html#teams` |
| Organizations, roles, SSH keys and signatures | [Presentation](../../ReadMe.md#project-goals), [contribution rules](../../Contributing.md) | `platform.html#teams` |
| Any repository language; separate builds and application runtimes | [Presentation](../../ReadMe.md#technology-choices), [structure](../../DirectoryStructure.md) | `platform.html#hosting` |
| Account Copilot and central AI | [License](../../License) | `platform.html#copilot` |
| No direct AI source access; hashes and filtered CST artifacts | [Security](../../Security.md#631-hosted-repository-source-boundary-and-cst-artifacts) | `security.html#sourceBoundary` |
| No training by default; separate consent and minimized retention | [Security](../../Security.md#61-no-training-on-user-projects-by-default) | `security.html#training` |
| Local model or external provider | [Financial model](../FinancialModel.md#7-ai-access-and-external-providers) | `platform.html#providers` |
| Independent Sentinel and deterministic policy | [Presentation](../../ReadMe.md#security-ai-and-sentinel) | `security.html#sentinel` |
| Action-bound signed approval with expiry and replay protection | [Presentation](../../ReadMe.md#phone-based-authorization) | `security.html#approval` |
| Targeted containment, backup restoration and emergency access | [Presentation](../../ReadMe.md#containment-and-recovery) | `security.html#recovery` |
| CPU, memory and storage budgets; proposed 64 GB host | [Presentation](../../ReadMe.md#resource-planning) | `security.html#resources`, `project.html#resources` |
| Ordinary free access and no platform AI subscription | [License](../../License), [financial model](../FinancialModel.md) | `economy.html#freeAccess` |
| Voluntary donations, continuity and self-sufficiency | [Financial model](../FinancialModel.md#21-voluntary-donations) | `economy.html#donations` |
| Domain registration, renewal and DNS | [Financial model](../FinancialModel.md#23-domain-registration-and-management) | `economy.html#domains` |
| Royalties by agreement, calculation and confirmed payment | [Royalties](../Royalties.md) | `economy.html#royalties` |
| Operating funds, reserves, third-party liabilities and locked investments | [Financial model](../FinancialModel.md#4-treasury-and-restricted-funds) | `economy.html#treasury` |
| Optional VPN and wallet require separate decisions | [Presentation](../../ReadMe.md#open-decisions), [financial model](../FinancialModel.md) | `project.html#extensions` |
| Project ownership, proprietary license and third-party terms | [License](../../License), [contribution rules](../../Contributing.md) | `project.html#rights` |
| Source policies and contribution/structure documents | [Documentation index](../README.md) | `documents.html` |
| Public portal; real accounts only on the separate Tor service | [Presentation](../../ReadMe.md#website-only-scope-of-this-checkout) | `access.html` |

The catalog at `github/pages/shared/spec-catalog.json` records each topic's source and status. Displaying a planned topic does not activate a service. No sign-in, repository mutation, payment or private API is supplied by the website.

## Languages and presentation

The twenty languages are English, French, German, Spanish, Italian, Portuguese, Dutch, Polish, Russian, simplified Chinese, Japanese, Arabic, Turkish, Korean, Hindi, Ukrainian, Swedish, Danish, Greek and Hebrew. English is the default. Arabic and Hebrew use RTL layout; code samples, paths and onion addresses remain LTR.

Translation catalogs are local JSON files under `github/pages/shared/locales/`. Each has the same keys. Only the selected translation is fetched; no external translation provider is used. On a failed translation request the previous complete language remains active. English content is also present in the HTML without JavaScript.

The themes are Midnight, Light, Amethyst and Terminal, plus system mode. Only language and theme preferences are stored in the browser. No account, password or source content is persisted by this static demo.

## Local preview

From the repository root:

```sh
python3 -m http.server 8080 --directory github/pages
```

This uses Python's built-in static file server; no custom server source, Rust toolchain or database is needed. The owner configures the onion address locally in `github/pages/config.js`. This does not create a Tor service or publish the site.
