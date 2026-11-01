# Documentation — Kryptos Tēs Moiras

Project documentation and the default website content are in English. Other website languages are optional translations, not replacements for the English source documents.

## Documents

| Document | Purpose |
|---|---|
| [Project presentation](../ReadMe.md) | Goals, proposed architecture, privacy boundaries and roadmap |
| [Directory structure](../DirectoryStructure.md) | Original future-layout proposal; not the owner's existing `app/` |
| [Contributing](../Contributing.md) | Contribution and review rules |
| [Security](../Security.md) | Reporting, AI data handling, supervision and recovery requirements |
| [Financial model](FinancialModel.md) | Funding, domains, accounting and treasury principles |
| [Royalties](Royalties.md) | Agreements, calculations, statements and payments |
| [License](../License) | Existing proprietary license; not rewritten by this cleanup |
| [Public React/TSX interface](../ReadMe.md#public-web-interface) | Website scope and local preview instructions |
| [Desktop editor and vault](architecture/desktop-vault.md) | Editor, encrypted source storage, provider restrictions, official publication and platform downloads |
| [Website specification coverage](architecture/site-specifications.md) | How product pages map to the Markdown requirements |
| [Project review](ProjectReview.md) | Remaining design decisions and current limits |

## Delivery boundary

This checkout contains documents and a React/TypeScript frontend in `github/pages/`. The authorized frontend source is included; no backend, database, account service, Rust workspace, `apps/` tree or server implementation is included. The owner's existing local `app/` is separate and has not been accessed or replaced.

The public portal is intended to offer limited guest search over owner-published projects. A planned desktop client manages connections to the onion server; anonymous accounts belong to the private service. The interface preview contains no accounts, repository data or sample projects. Website language/theme preferences are the only browser-persisted values.

Git hosting may store any programming language. Rust refers to the proposed platform backend, not a restriction on users' projects. Building code, running applications, AI analysis, Sentinel, payments and recovery controls remain separate implementation work.
