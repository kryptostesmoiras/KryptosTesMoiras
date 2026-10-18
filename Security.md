# Security Policy

> **Project:** KyptosTesMoiras  
> **Status:** Initial security policy — to be validated and updated as the project develops  
> **Primary language:** Rust  
> **Remote access target:** Tor onion service  
> **Scope:** Security issues affecting this project, its source code, services, AI components, deployment, and operational procedures

## 1. Purpose

Security, confidentiality, and user control are core design requirements of KyptosTesMoiras. This policy describes how to report vulnerabilities, how reports should be handled, and the principles governing security fixes, AI data handling, and incident response.

The project is under active design and development. Until a feature has been implemented and tested, its intended design must not be interpreted as a guarantee that the feature is operational or secure. Any statement in this policy describing a design objective must be verified against the actual implementation before it is represented as an implemented guarantee.

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

Reports are welcome for security weaknesses in project-owned code, documentation, build and release processes, deployment templates, AI components, and supported configurations, including:

- authentication, session handling, account recovery, and authorization;
- repository access controls, Git operations, and data isolation;
- command execution, path handling, archive processing, and unsafe repository content;
- privilege separation between the platform, administration, security AI, Sentinel, and recovery components;
- AI context selection, local permissions, prompt injection, tool access, data retention, and training-data handling;
- confidentiality of code and metadata sent to or processed by remote AI services;
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

## 6. AI Use, User Data, and Model Training

### 6.1 No training on user projects by default

Using AI features on a project must **not train, fine-tune, update, or otherwise modify the parameters of any model using that user's source code, prompts, repository contents, or generated results**.

The AI features are intended to perform inference using an existing model. Inference means processing an input to generate an output; it does not, by itself, update the model's weights. User content must not be silently added to a training dataset, used for fine-tuning, used to update adapters, or used for continuous learning.

Any future proposal to train or fine-tune a model using existing user code must be treated as a separate, explicit, and ethically reviewed activity. It must be clearly disclosed in advance and must not occur without the affected user's informed, specific, affirmative consent and the necessary rights to use the data. Consent to use an AI feature is not consent to train a model. Declining training must not prevent ordinary use of the platform's AI features. Any such program must document its purpose, data scope, retention, access controls, withdrawal process where applicable, and applicable legal obligations.

Training on public or third-party code must also respect the applicable licenses, contractual obligations, privacy rights, and other relevant legal requirements. Public availability alone does not automatically grant unrestricted training rights.

### 6.2 Local context and user authorization

The AI must only read or receive project files and other local content that the user has explicitly authorized it to access, subject to the platform's access controls.

- The AI must not scan an entire workspace or repository by default when the task does not require it.
- File access must be scoped to the user's authorization and the task's declared context.
- The AI must not gain access to a file merely because it can guess its path, reference it in a prompt, or invoke a tool.
- Access to files, tools, commands, and remote services must be checked by trusted application or server-side controls, not solely by the model's own decision.
- The user must be able to understand what context is being sent for a request and, where applicable, approve or refuse external processing.

A model's context window is a temporary processing context, not a license to retain or learn from the content.

### 6.3 Local processing and central model architecture

The intended privacy architecture separates the local processing component from the central model service:

- **Local component:** obtains only the files and context authorized by the user, applies local access rules, and prepares the minimum information needed for the requested operation.
- **Central model service:** hosts and executes the model's inference engine. Its model weights are online on the inference server, but the service must not train on user content or update model weights from user requests.
- **Communication boundary:** only information explicitly permitted by the selected privacy mode may cross from the local component to the central service.

In the **strict-confidentiality mode**, source code must not be sent to the central model service in plaintext. The central service should receive only the minimum permitted metadata, such as opaque identifiers, cryptographic hashes, file extensions, or other explicitly approved metadata. These values may help identify or route a request, but they do not reveal the full source code and cannot, on their own, allow the model to analyze code it has not received.

Consequently, when the central service receives only such metadata and no code or reversible representation of it, it cannot directly inspect the source code. Code analysis requiring source content must be performed locally, or use a separately designed privacy-preserving computation mechanism whose actual security properties have been independently evaluated.

Encryption in transit protects data while it is transmitted; it does not make plaintext visible only as a hash to the receiving endpoint. If a different operating mode sends code or code excerpts to a remote inference service, that mode must be explicitly identified, must explain what is transmitted and to whom, and must not be described as a mode in which the central service never receives the code. Remote processing must follow the user's selected policy and the applicable disclosure and consent requirements.

### 6.4 No retention by default

The intended default is not to persist user source code, prompts, model context, or generated content after the task has completed, except where the user explicitly requests a saved artifact or where a clearly disclosed feature requires storage.

The implementation should minimize or disable content retention in:

- application and server logs;
- request tracing and error reports;
- conversation histories and caches;
- temporary files and queues;
- model-serving buffers and key-value caches;
- analytics, telemetry, backups, and diagnostic exports.

Inference may temporarily hold code-derived information in RAM, GPU memory, model activations, buffers, or a key-value cache. Such temporary processing is distinct from model training and persistent storage. The project must not claim that no representation of code exists during processing. Where technically feasible, temporary data should be isolated, its lifetime minimized, and buffers cleared or released after use. Releasing memory does not necessarily guarantee immediate physical overwriting, so any stronger erasure claim must be supported by implementation-specific verification.

Operational metadata that is retained must be documented, minimized, protected, and assigned a defined retention period. Logs should not include source code, secrets, or complete prompts by default.

### 6.5 Model integrity and verification

The central inference service must use an identified model version and must not expose ordinary user requests to a training or fine-tuning path. Model updates must be controlled, versioned, and auditable.

Where technically practical, the project should verify that model weights and training-related artifacts remain unchanged during normal inference operation. Any deliberate model update must follow a separate release or training procedure and must not silently incorporate user project data.

Claims about data isolation, absence of training, and deletion must be backed by code review, configuration review, tests, and operational controls. A policy statement alone is not proof of implementation.

## 7. Triage and Remediation

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

## 8. Severity and Prioritization

Severity should be assessed using the practical impact and exploitability of the issue, including:

- the privileges needed to exploit it;
- whether exploitation requires user interaction;
- confidentiality, integrity, and availability impact;
- the number and type of affected deployments;
- whether the issue crosses a defined trust boundary;
- whether the issue compromises Sentinel, recovery, signing, or audit controls;
- whether private source code or secrets are disclosed to an unauthorized party, retained contrary to policy, or used for training without consent;
- the availability and reliability of mitigations.

A vulnerability that allows an AI component or ordinary service to disable independent supervision, alter its own authorization policy, bypass required approval, access unauthorized repository content, train on user data contrary to policy, or erase protected audit evidence should receive particularly careful review.

Severity labels are triage aids, not guarantees of a particular response time.

## 9. Confidentiality and Disclosure

Please keep vulnerability details private until the maintainers and reporter have had a reasonable opportunity to assess and address the issue.

Where practical, coordinated disclosure should occur after a fix or mitigation is available. Disclosure timing should account for active exploitation, the severity of the issue, the availability of updates, and risks to affected users.

The project does not promise a bug bounty, monetary reward, public credit, or a fixed disclosure schedule unless a separate written program explicitly provides one. A reporter's identity or report details should not be publicly disclosed without permission, except where disclosure is required by applicable law or is necessary to address an immediate safety or security concern.

A request for confidentiality does not justify concealing information where disclosure is legally required. The project should disclose only what is necessary in such circumstances.

## 10. Security AI, Sentinel, and Containment

The security AI is intended to analyze authorized events and provide findings or recommendations. It must not be treated as the final security authority.

The design target is that the AI cannot, by itself:

- disable Sentinel or its watchdog;
- grant itself additional privileges or change its own authorization policy;
- rewrite or erase protected audit records;
- authorize financial operations;
- independently release critical containment.

Enforcement of critical actions must be handled by a separately controlled policy and authorization path. Privileged operations must be checked server-side, and approvals must be bound to the exact action and parameters. Any phone-based approval mechanism must verify signatures, expiration, and replay protection.

These are design requirements, not claims that the controls are already implemented. Their effectiveness must be demonstrated by tests and security review before production use.

## 11. Secrets and Sensitive Information

Never commit real secrets to the repository, including:

- private signing keys or wallet keys;
- passwords, access tokens, session secrets, or API keys;
- production credentials or recovery codes;
- real onion-service private keys or credentials;
- unredacted security logs containing sensitive user data.

Use clearly marked example values in documentation and configuration templates. If a secret is committed accidentally, removing it from the latest commit is not sufficient: treat it as exposed, revoke or rotate it, assess possible access, and follow the incident-response procedure. Repository history may retain the original value.

## 12. Dependencies and Supply Chain

The project should prefer maintained, reviewed dependencies and avoid implementing production cryptographic primitives from scratch merely to eliminate dependencies.

As the build and release process matures, it should include appropriate measures such as:

- dependency and vulnerability auditing;
- review of new or updated dependencies;
- reproducible or verifiable build practices where practical;
- protected release permissions and signing keys;
- integrity checks for release artifacts;
- controlled updates and tested rollback procedures.

The presence of a tool or workflow in this policy does not mean it is already configured. Actual controls should be documented in the repository and verified in CI or release procedures.

## 13. Incident Handling

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

If an incident involves AI data handling, investigate whether code or prompts were transmitted, logged, retained, exposed, or used in a training pipeline. Preserve evidence without unnecessarily duplicating or exposing the affected content.

## 14. Supported Versions

During early development, there may be no formally supported production release. Security fixes should target the current development version unless maintainers explicitly designate additional supported versions.

When releases and support commitments are established, this section should identify supported versions and the process for receiving security updates.

## 15. Legal and Safe-Harbor Note

This policy describes the project's preferred reporting and testing process. It is not a grant of authorization to access systems, data, or services without permission, and it does not replace applicable law or agreements governing a deployment.

The project will consider good-faith reports in accordance with the scope and procedures described here. No unconditional immunity or legal safe harbor is promised by this document.

## 16. Policy Maintenance

This policy should be reviewed when the project introduces production releases, new trust boundaries, remote administration, CI/CD execution, wallet functionality, VPN functionality, AI model training, a new inference provider, or a materially different incident-response process.

Changes to the policy should be recorded in version control. Before publishing this file, replace the contact placeholders and ensure that the reporting channel is active and monitored. Verify every AI privacy claim against the actual implementation, including local context selection, network payloads, server logs, model-serving caches, telemetry, and any third-party inference provider.

---

**Last updated:** 2026-10-18  
**Policy status:** Initial draft; operational procedures, AI data-handling controls, and contact details must be validated before production deployment.
