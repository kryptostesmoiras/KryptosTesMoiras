# Security Policy

> **Project:** Private and Secure Git Platform  
> **Status:** Initial security policy — to be validated and updated as the project develops  
> **Primary language:** Rust  
> **Remote access target:** Tor onion service  
> **Scope:** Security issues affecting this project, its source code, services, deployment, and operational procedures

## 1. Purpose

Security is a core design requirement of this project. This policy describes how to report vulnerabilities, how reports should be handled, and the principles that govern security fixes and incident response.

The project is under active design and development. Until a feature has been implemented and tested, its intended design must not be interpreted as a guarantee that the feature is operational or secure.

## 2. Reporting a Vulnerability

**Please do not publish details of an unpatched vulnerability in a public issue, discussion, commit, or other public channel.** Public disclosure can expose users and deployments before a fix is available.

Report suspected vulnerabilities through the project's designated private security contact:

- **Security contact:** `[INSERT SECURITY EMAIL ADDRESS]`
- **Alternative secure contact:** `[INSERT ALTERNATIVE CONTACT, IF AVAILABLE]`
- **Project repository:** `[INSERT REPOSITORY URL]`

Replace the placeholders above before publishing this policy. Do not put private keys, passwords, recovery codes, access tokens, or personal data in a report.

If no private reporting channel has been published yet, do not assume that a public issue is confidential. Contact the project maintainers through an available private channel, if one exists, and share only the minimum information necessary to establish contact.

## 3. What to Include in a Report

A useful report should include, where possible:

- a concise description of the suspected vulnerability;
- affected component, version, commit, or configuration;
- prerequisites and required privileges;
- reproducible steps or a minimal proof of concept;
- expected behavior and observed behavior;
- potential impact and realistic attack scenarios;
- relevant logs or screenshots, with secrets and personal data removed;
- any known workaround or mitigation.

Reports do not need to contain every item above to be considered. If a detail is unknown, state that it is unknown rather than guessing.

## 4. Scope

Reports are welcome for security weaknesses in project-owned code, documentation, build and release processes, deployment templates, and supported configurations, including:

- authentication, session handling, account recovery, and authorization;
- repository access controls, Git operations, and data isolation;
- command execution, path handling, archive processing, and unsafe repository content;
- privilege separation between the platform, administration, security AI, Sentinel, and recovery components;
- containment, watchdog integrity, and recovery procedures;
- phone-based approval, signature verification, expiration, and replay protection;
- audit-log integrity, confidentiality, and access controls;
- resource exhaustion, denial of service, and quota enforcement;
- Tor service configuration, unintended network exposure, and metadata leakage;
- secret handling, cryptographic integration, dependency risks, and update integrity;
- backup confidentiality, restoration, and deletion behavior.

The following are generally outside scope unless they demonstrate a specific vulnerability in this project:

- vulnerabilities in unrelated third-party services;
- issues in unsupported or materially modified deployments;
- purely theoretical concerns without a plausible security impact;
- missing security headers or scanner findings without a demonstrated risk;
- social engineering, physical attacks, or denial-of-service testing against systems you do not own or have permission to test.

A report outside these examples may still be considered if it identifies a credible risk to the project or its users.

## 5. Responsible Testing

Security research must be limited to systems and data that you own or are explicitly authorized to test.

- Do not access, alter, delete, or disclose other users' data.
- Do not disrupt services, degrade availability, or perform load testing against a live deployment without explicit authorization.
- Do not install persistence, deploy malware, or use a vulnerability to move laterally into other systems.
- Do not extract more data than is strictly necessary to demonstrate an issue.
- Stop testing and report the issue if you encounter sensitive data or obtain unexpected access.
- Use a local or isolated test environment whenever practical.

These guidelines describe the project's expectations; they do not grant permission to test systems that you do not own or administer.

## 6. Triage and Remediation

After receiving a report, maintainers should aim to:

1. acknowledge receipt through the available reporting channel;
2. assess reproducibility, affected components, severity, and potential impact;
3. determine whether immediate containment or a workaround is needed;
4. prepare and test a fix, prioritizing the risk to users and deployments;
5. verify that the fix addresses the root cause and does not undermine recovery or auditability;
6. coordinate disclosure with the reporter when contact is possible;
7. publish an advisory or release note when disclosure is appropriate.

Response and remediation times depend on severity, reproducibility, maintainer availability, and the complexity of a safe fix. No fixed response deadline is promised by this initial policy.

If a vulnerability is actively exploited or presents an immediate critical risk, maintainers may prioritize containment before a complete fix. Containment should preserve essential logging and recovery capabilities wherever possible.

## 7. Severity and Prioritization

Severity should be assessed using the practical impact and exploitability of the issue, including:

- the privileges needed to exploit it;
- whether exploitation requires user interaction;
- confidentiality, integrity, and availability impact;
- the number and type of affected deployments;
- whether the issue crosses a defined trust boundary;
- whether exploitation compromises Sentinel, recovery, signing, or audit controls;
- the availability and reliability of mitigations.

A vulnerability that allows an AI component or ordinary service to disable independent supervision, alter its own authorization policy, bypass required approval, or erase protected audit evidence should receive particularly careful review.

Severity labels are triage aids, not guarantees of a particular response time.

## 8. Confidentiality and Disclosure

Please keep vulnerability details private until the maintainers and reporter have had a reasonable opportunity to assess and address the issue.

Where practical, coordinated disclosure should occur after a fix or mitigation is available. Disclosure timing should account for active exploitation, the severity of the issue, the availability of updates, and risks to affected users.

The project does not promise a bug bounty, monetary reward, public credit, or a fixed disclosure schedule unless a separate written program explicitly provides one. A reporter's identity or report details should not be publicly disclosed without permission, except where disclosure is required by applicable law or is necessary to address an immediate safety or security concern.

A request for confidentiality does not justify concealing information where disclosure is legally required. The project should disclose only what is necessary in such circumstances.

## 9. Security AI, Sentinel, and Containment

The security AI is intended to analyze authorized events and provide findings or recommendations. It must not be treated as the final security authority.

The design target is that the AI cannot, by itself:

- disable Sentinel or its watchdog;
- grant itself additional privileges or change its own authorization policy;
- rewrite or erase protected audit records;
- authorize financial operations;
- independently release critical containment.

Enforcement of critical actions must be handled by a separately controlled policy and authorization path. Privileged operations must be checked server-side, and approvals must be bound to the exact action and parameters. Any phone-based approval mechanism must verify signatures, expiration, and replay protection.

These are design requirements, not claims that the controls are already implemented. Their effectiveness must be demonstrated by tests and security review before production use.

## 10. Secrets and Sensitive Information

Never commit real secrets to the repository, including:

- private signing keys or wallet keys;
- passwords, access tokens, session secrets, or API keys;
- production credentials or recovery codes;
- real onion-service private keys or credentials;
- unredacted security logs containing sensitive user data.

Use clearly marked example values in documentation and configuration templates. If a secret is committed accidentally, removing it from the latest commit is not sufficient: treat it as exposed, revoke or rotate it, assess possible access, and follow the incident-response procedure. Repository history may retain the original value.

## 11. Dependencies and Supply Chain

The project should prefer maintained, reviewed dependencies and avoid implementing production cryptographic primitives from scratch merely to eliminate dependencies.

As the build and release process matures, it should include appropriate measures such as:

- dependency and vulnerability auditing;
- review of new or updated dependencies;
- reproducible or verifiable build practices where practical;
- protected release permissions and signing keys;
- integrity checks for release artifacts;
- controlled updates and tested rollback procedures.

The presence of a tool or workflow in this policy does not mean it is already configured. Actual controls should be documented in the repository and verified in CI or release procedures.

## 12. Incident Handling

A security incident should be handled using a documented procedure that prioritizes safety, containment, evidence preservation, and controlled recovery.

The intended process is to:

1. validate the alert and identify affected services and trust boundaries;
2. preserve relevant audit events and system evidence;
3. apply targeted containment where possible;
4. keep the operating system, independent supervisor, essential logging, and recovery path available;
5. require explicit authorization for leaving critical containment;
6. patch or mitigate the root cause;
7. restore services gradually and verify their integrity;
8. document the incident, corrective actions, and follow-up tests.

Do not indiscriminately freeze or terminate every process. Such an action can disable the very components needed to investigate and recover from an incident. Containment behavior must be tested in an isolated environment before deployment.

## 13. Supported Versions

During early development, there may be no formally supported production release. Security fixes should target the current development version unless maintainers explicitly designate additional supported versions.

When releases and support commitments are established, this section should identify supported versions and the process for receiving security updates.

## 14. Legal and Safe-Harbor Note

This policy describes the project's preferred reporting and testing process. It is not a grant of authorization to access systems, data, or services without permission, and it does not replace applicable law or agreements governing a deployment.

The project will consider good-faith reports in accordance with the scope and procedures described here. No unconditional immunity or legal safe harbor is promised by this document.

## 15. Policy Maintenance

This policy should be reviewed when the project introduces production releases, new trust boundaries, remote administration, CI/CD execution, wallet functionality, VPN functionality, or a materially different incident-response process.

Changes to the policy should be recorded in version control. Before publishing this file, replace the contact placeholders and ensure that the reporting channel is active and monitored.

---

**Last updated:** 2026-10-18  
**Policy status:** Initial draft; operational procedures and contact details must be validated before production deployment.
