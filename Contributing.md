# Contributing to Private and Secure Git Platform

> **Status:** Proposed contribution policy — adapt before accepting external contributions.  
> **Primary language:** Rust  
> **Documentation language:** English

Thank you for your interest in contributing. This project aims to build a private source-code hosting platform with strong security boundaries, auditable administration, and recoverable operations. Contributions should improve functionality without weakening those properties.

This document describes the intended contribution workflow. Requirements that depend on infrastructure or automation are not considered enforced until the corresponding controls have been implemented and tested.

## 1. Contribution Principles

Contributions should:

- solve a defined problem and remain within the project's stated scope;
- favor clear, maintainable Rust over unnecessary abstraction;
- preserve least privilege and explicit service boundaries;
- include appropriate tests and documentation;
- avoid introducing unnecessary dependencies or external network calls;
- make security-sensitive behavior reviewable and auditable;
- distinguish implemented behavior from planned behavior;
- avoid unrelated refactors in focused changes.

Do not add placeholder modules, empty abstractions, or speculative services merely to match the proposed directory tree. Add components when there is a concrete implementation need.

## 2. Before Starting

1. Read `README.md` and `DIRECTORY_STRUCTURE.md`.
2. Review the relevant architecture and security documents under `docs/`, especially the threat model and trust-boundary documentation when available.
3. Search existing issues and changes to avoid duplicating work.
4. For a substantial feature or architectural change, open a discussion or issue before implementation.
5. For a security vulnerability, **do not open a public issue**. Follow `SECURITY.md` and use the private reporting channel configured by the maintainers.

Do not assume that every proposed directory or service already exists. Confirm the current workspace members and implementation status before relying on them.

## 3. Scope and Design Changes

Small bug fixes can generally be proposed directly. Changes that affect public interfaces, persistent data, authentication, authorization, cryptography, service boundaries, deployment, or recovery behavior require a clear rationale and focused review.

For architectural changes, describe:

- the problem and intended outcome;
- affected applications, services, crates, and data flows;
- trust boundaries and permission changes;
- failure modes and recovery behavior;
- compatibility and migration implications;
- tests needed to validate the change;
- alternatives considered where the choice is not obvious.

Record lasting architectural decisions in `docs/decisions/` when that directory and its process are in use. Update diagrams and related documentation when the architecture changes.

## 4. Rust and Workspace Conventions

- Follow the formatting produced by `rustfmt`.
- Keep modules focused and public APIs as small as practical.
- Use explicit types and validate data at trust boundaries.
- Handle errors deliberately; do not silently discard security-relevant failures.
- Avoid panics in normal operation paths, especially in long-running services and authorization code.
- Do not log passwords, tokens, private keys, recovery codes, session secrets, or other sensitive values.
- Do not hard-code production endpoints, credentials, keys, or environment-specific assumptions.
- Keep dependency direction clear. Shared crates must not depend on application binaries, and circular dependencies must be avoided.
- Do not implement cryptographic primitives from scratch for production use. Use reviewed libraries behind narrow interfaces where appropriate.
- Do not add comments that merely restate obvious code. Comments and documentation should explain contracts, invariants, security reasoning, or non-obvious decisions when needed.

The root `Cargo.toml` should list only workspace members that actually exist. Add members incrementally and keep `Cargo.lock` updated for application workspaces as appropriate.

## 5. Local Validation

Run the checks that apply to the workspace members you changed. From the repository root, the intended baseline checks are:

```bash
cargo fmt --all -- --check
cargo clippy --workspace --all-targets -- -D warnings
cargo test --workspace
```

These commands may not all pass while the workspace is still being bootstrapped. If a command cannot run because a member or target is not implemented, report that limitation accurately; do not add fake modules merely to make the command pass.

For changes affecting behavior, add tests for normal cases, invalid input, permission failures, and relevant error paths. For security-sensitive changes, include regression tests for the risk being addressed.

Before submitting, inspect the diff and verify that it contains only intended changes:

```bash
git diff --check
git status --short
git diff
```

Do not claim that a test, audit, or security check passed unless it was actually run and its result was observed.

## 6. Security Requirements

All contributions must preserve the principle of least privilege.

### Authentication and authorization

- Enforce authorization on the server side; hiding a UI control is not an authorization check.
- Deny access by default when required authorization information is missing or invalid.
- Validate session state, request parameters, and object-level permissions at the appropriate boundary.
- Avoid logging credentials or sensitive session data.

### Security AI and Sentinel

- The security AI must not receive unrestricted host or administrator privileges.
- The AI must not be able to disable Sentinel, alter its own permission policy, erase protected audit records, or independently release critical containment.
- Keep deterministic policy enforcement separate from AI-generated recommendations.
- Treat AI output and ingested event content as untrusted input.
- Any proposed automated action must be narrowly scoped, explicitly authorized by policy, and auditable.

### Containment and recovery

- Do not implement a blanket process freeze that can disable the operating system, supervisor, logging, or recovery path.
- Preserve essential recovery components according to a tested allowlist and documented policy.
- Critical containment release must require the configured explicit authorization bound to the exact action and incident.
- Test both containment and recovery behavior in a controlled environment.

### Phone-based authorization

- Never transmit private signing keys to the server.
- Bind approvals to the exact action, target, parameters, expiry, and incident or request identifier as applicable.
- Prevent replay and reject expired, malformed, or mismatched approvals.
- Do not add undocumented bypasses or backdoors for lost-device recovery.

### Repository content and execution

- Treat repository content, uploaded artifacts, hooks, and metadata as untrusted.
- Do not execute repository code on the host as part of ordinary browsing or Git operations.
- Any future CI runner or code execution feature requires its own isolation design, resource limits, and security review.

### Dependencies and secrets

- Add dependencies only when there is a clear need; consider maintenance status, license, transitive dependencies, and security history.
- Never commit real secrets, private keys, production tokens, recovery codes, or real onion-service credentials.
- Example configuration must use clearly non-functional placeholder values.
- If a secret is committed, treat it as exposed: notify maintainers privately and rotate or revoke it. Removing it from the latest commit alone may not remove it from Git history or other copies.

See `SECURITY.md` for vulnerability reporting and incident-handling guidance.

## 7. Tests and Evidence

Choose tests proportionate to the change. Depending on the affected component, this may include:

- unit and integration tests;
- authorization and permission-boundary tests;
- malformed-input and error-path tests;
- migration and persistence tests;
- audit-log integrity checks;
- resource exhaustion tests;
- containment and recovery tests;
- signature validation, expiry, and replay-protection tests.

Tests must not use production secrets or target systems without authorization. Security tests that could interrupt services or alter data must run only in a controlled environment.

## 8. Documentation

Update documentation when a contribution changes user-visible behavior, configuration, APIs, security guarantees, operational procedures, or architecture.

Documentation should:

- use precise language and identify limitations;
- distinguish current implementation from future plans;
- avoid promising absolute security or anonymity;
- describe required configuration without publishing secrets;
- keep diagrams consistent with actual data flows and trust boundaries.

If a feature is not implemented, describe it as proposed or planned rather than available.

## 9. Pull Request Checklist

Before submitting a pull request, confirm as applicable that:

- [ ] The change addresses a defined problem and has a clear scope.
- [ ] Related tests have been added or updated.
- [ ] Formatting, linting, and relevant tests have been run, with limitations stated honestly.
- [ ] Authorization is enforced at the server-side boundary.
- [ ] No secrets or sensitive production data are included.
- [ ] New dependencies and their purpose are explained.
- [ ] Security and failure behavior have been considered.
- [ ] Documentation and diagrams reflect the change.
- [ ] Database or persistent-data changes include an appropriate migration and recovery considerations.
- [ ] The diff contains no unrelated changes.

A pull request description should summarize the problem, solution, affected components, testing performed, security impact, and any known limitations.

## 10. Review and Maintainer Decisions

Maintainers may request changes, additional tests, a narrower scope, or a design discussion before accepting a contribution. Changes affecting security boundaries may require additional review beyond ordinary code review.

A successful build does not by itself demonstrate that a change is secure. Security-sensitive changes should be reviewed against the threat model and tested for failure cases as well as intended behavior.

Do not merge your own changes into protected or production branches unless the repository's explicit contribution and authorization policy permits it. Repository branch protections and approval requirements must be configured separately; this document alone does not enforce them.

## 11. Licensing and Rights

By submitting a contribution, you confirm that you have the right to submit it and that you are not knowingly including third-party material in violation of its applicable terms.

Contributions are subject to the project's `LICENSE` and any additional written contribution terms published by the maintainers. Review those terms before submitting. A pull request does not, by itself, change the project's license or grant rights beyond those stated in the applicable terms.

If the licensing terms do not clearly explain how contributions are handled, ask the maintainers privately before submitting substantial work.

## 12. Community Conduct

Be respectful, specific, and constructive. Focus review comments on code, design, evidence, and project requirements rather than personal attributes. Explain disagreements technically and remain open to revising a proposal when new evidence emerges.

Harassment, deliberate disclosure of private information, malicious submissions, and attempts to bypass project security controls are not acceptable. Maintainers may close contributions that violate these expectations.

## 13. Questions and Contact

For ordinary contribution questions, use the repository's configured discussion or issue channels.

For suspected vulnerabilities, exposed credentials, or other sensitive security matters, follow the private process in `SECURITY.md`. Do not publish exploit details or sensitive incident information in a public issue or pull request.

---

**Project principle:** contributions should make the platform more useful without making its trust boundaries, administrative actions, or recovery behavior less understandable and controllable.
