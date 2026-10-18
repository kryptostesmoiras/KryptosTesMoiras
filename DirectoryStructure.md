KyptosTesMoiras/
├── ReadMe.md
├── DirectoryStructure.md
├── License
├── Contributing.md
├── Security.md
├── .gitignore
├── rust-toolchain.toml
├── Cargo.toml
├── Cargo.lock
│
├── docs/
│   ├── architecture/
│   │   ├── overview.md
│   │   ├── trust-boundaries.md
│   │   ├── service-interfaces.md
│   │   ├── resource-pools.md
│   │   └── data-flows.md
│   ├── security/
│   │   ├── threat-model.md
│   │   ├── permissions.md
│   │   ├── incident-response.md
│   │   ├── containment-policy.md
│   │   └── phone-authorization.md
│   ├── operations/
│   │   ├── installation.md
│   │   ├── configuration.md
│   │   ├── backups-and-restore.md
│   │   ├── updates-and-rollback.md
│   │   └── recovery-runbook.md
│   └── decisions/
│       ├── README.md
│       └── 0001-rust-first.md
│
├── apps/
│   ├── platform-ui/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── app.rs
│   │       ├── routes/
│   │       │   ├── home.rs
│   │       │   ├── repositories.rs
│   │       │   ├── commits.rs
│   │       │   ├── branches.rs
│   │       │   ├── issues.rs
│   │       │   ├── pull_requests.rs
│   │       │   ├── releases.rs
│   │       │   └── settings.rs
│   │       ├── components/
│   │       └── styles/
│   │
│   ├── admin-ui/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── app.rs
│   │       ├── pages/
│   │       │   ├── overview.rs
│   │       │   ├── resources.rs
│   │       │   ├── services.rs
│   │       │   ├── ai_monitor.rs
│   │       │   ├── incidents.rs
│   │       │   └── audit_logs.rs
│   │       └── components/
│   │
│   └── recovery-ui/
│       ├── Cargo.toml
│       └── src/
│           ├── main.rs
│           ├── status.rs
│           └── approved_actions.rs
│
├── services/
│   ├── git-service/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── repositories/
│   │       ├── refs/
│   │       ├── commits/
│   │       └── permissions.rs
│   │
│   ├── api-gateway/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── routes/
│   │       ├── middleware/
│   │       └── limits.rs
│   │
│   ├── identity-service/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── accounts/
│   │       ├── sessions/
│   │       ├── organizations/
│   │       └── credentials/
│   │
│   ├── admin-service/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── operations/
│   │       └── authorization.rs
│   │
│   ├── resource-controller/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── pools/
│   │       ├── quotas.rs
│   │       └── metrics.rs
│   │
│   ├── security-ai/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── ingestion/
│   │       ├── detectors/
│   │       ├── findings/
│   │       └── recommendations/
│   │
│   ├── sentinel/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── health_checks.rs
│   │       ├── policy.rs
│   │       └── state_machine.rs
│   │
│   ├── containment-controller/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── isolation.rs
│   │       ├── allowlist.rs
│   │       └── recovery.rs
│   │
│   ├── phone-authorization/
│   │   ├── Cargo.toml
│   │   └── src/
│   │       ├── main.rs
│   │       ├── requests.rs
│   │       ├── signature_verification.rs
│   │       └── replay_protection.rs
│   │
│   └── audit-service/
│       ├── Cargo.toml
│       └── src/
│           ├── main.rs
│           ├── events.rs
│           └── verification.rs
│
├── crates/
│   ├── domain/
│   ├── config/
│   ├── api-types/
│   ├── authz/
│   ├── crypto-boundaries/
│   ├── event-types/
│   ├── observability/
│   ├── storage/
│   └── test-support/
│
├── migrations/
│   └── README.md
│
├── config/
│   ├── examples/
│   │   ├── platform.example.toml
│   │   ├── services.example.toml
│   │   └── resource-limits.example.toml
│   ├── policies/
│   │   ├── containment.example.toml
│   │   └── approvals.example.toml
│   └── README.md
│
├── deploy/
│   ├── tor/
│   │   └── README.md
│   ├── service-units/
│   │   └── README.md
│   ├── host-hardening/
│   │   └── README.md
│   └── local-dev/
│       └── README.md
│
├── scripts/
│   ├── dev.sh
│   ├── test.sh
│   ├── lint.sh
│   └── verify-config.sh
│
├── tests/
│   ├── integration/
│   ├── security/
│   ├── containment/
│   ├── recovery/
│   └── fixtures/
│
├── tools/
│   ├── audit-inspector/
│   └── dev-cli/
│
└── .github/
    ├── workflows/
    │   ├── ci.yml
    │   └── security-checks.yml
    ├── ISSUE_TEMPLATE/
    └── PULL_REQUEST_TEMPLATE.md
