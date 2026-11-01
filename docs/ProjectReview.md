# Project review — Kryptos Tēs Moiras

Scope: project documents and the public static website. This is a documentation review, not an audit of the owner's existing application or infrastructure.

## Current scope

The deliverable contains English documentation and the public HTML website under `github/pages/`. The website has twenty selectable languages and four themes plus system mode. Its repository browser displays fictional examples only.

The assistant-created Rust server, SQLite data, private account UI, `apps/`, backend manifests, build outputs and backend-specific tools have been removed. They were outside the requested website/documentation scope. Their earlier test results must not be represented as capabilities of this website or of the owner's local application.

The owner's existing `app/` has not been imported, renamed, merged or modified. References to possible application directories in the original design documents are proposals, not instructions to replace that existing code.

## Remaining decisions

1. **AI/CST boundary:** define the permitted artifact schema and source-disclosure tests. A full CST can contain source text. Hashes cannot explain unseen code. No AI service is connected to the static site.
2. **Copilot scope:** distinguish account-scoped assistance from central AI, without overriding the requirement that hosted source is not directly accessible to the AI. Changes to repositories require authorization.
3. **Hosting:** distinguish storing any language in Git from building code, static website delivery and running an application. Isolation, origins, quotas, secrets and network permissions require their own design.
4. **Supervision and recovery:** specify Sentinel's independent permissions, deterministic containment, essential logging, backups and recovery procedures before deployment.
5. **Signed approvals:** define action binding, expiry, replay protection, revocation and lost-device recovery. The website does not implement these controls.
6. **Economics and license:** clarify ordinary free access, paid ancillary domain services, external provider costs, contribution rights and commercial agreements. The proprietary license was not changed during cleanup.
7. **Royalties and treasury:** define rates through agreements, reproducible calculations, settlement confirmation, reconciliation and separation of operating funds from third-party liabilities. No payment or wallet service is active here.
8. **Deployment:** the public site is intended for `.io`; accounts remain on Tor. Domain, HTTPS, onion deployment and the official address are owner-controlled and are not supplied by the static site.

## Corrections retained

- English filenames and references match Linux case sensitivity.
- Rust backend choice is separate from hosted project languages.
- AI source confidentiality and filtered CST artifacts are stated as requirements, not implemented guarantees.
- The public portal contains no account credentials form, backend API or SQL.
- Website pages distinguish documented plans from currently supplied static presentation.
- English is the first/default website language; translations remain available by user choice.

See the [coverage matrix](architecture/site-specifications.md) for the mapping between source documents and website topics.
