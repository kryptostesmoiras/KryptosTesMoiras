# Desktop application and encrypted source vault

Status: requirements. No desktop client, editor, vault, provider connection or release binary is implemented in this repository. The React/TSX public web interface is separate from the desktop implementation.

## Purpose

The desktop application manages connections between users and the onion server. It is the official publishing client for the remote repository assigned to an anonymous account. It combines a lightweight editor inspired by VS Code, local source custody, provider policy management and explicit repository publication.

## Lightweight editor

The editor must support creating, generating, adding and editing source files in any programming language. A file explorer, tabs, syntax support and local history form the initial direction; the exact MVP, editor engine, extension model and resource budget remain to be selected. VS Code compatibility, its extension ecosystem and an embedded terminal are not promised by choosing a similar layout.

All source files created, generated or imported through the application must enter the local vault. Temporary files, editor recovery data, provider responses and history must follow the same confidentiality policy. A deliberate plaintext export must be a separate user-authorized action.

## Local vault: encryption and integrity

The owner's objective is an inviolable digital vault. This is a security goal, not a claim that software can guarantee absolute invulnerability.

Source content must be stored locally using authenticated encryption. Hashes serve integrity, change detection and content identification; they cannot reconstruct the source and are not a substitute for encryption. An implementation must define:

- encryption format, vetted primitives and versioning;
- local keys, passphrase derivation, OS keystore integration and lock/unlock behavior;
- encrypted file content, filenames, history, generated code and relevant metadata;
- integrity verification, corruption handling and authenticated manifests;
- encrypted backups, recovery and the consequences of losing keys;
- handling of editor caches, temporary files, crash reports and logs;
- threat boundaries for an unlocked client, compromised operating system or malicious plugin.

A plain hash can reveal equality and allow guesses about known content. The protocol must define domain separation, keyed or salted identifiers where appropriate, and limits on cross-account correlation; hashes are not a blanket confidentiality guarantee.

No chosen primitive, verified cryptographic implementation or tested vault is delivered here. The threat model and independent review must precede security claims.

## Provider management and source restrictions

Users must be able to configure local or external providers and inspect their effective permissions per project. Provider policy must define permitted artifact types, destinations, retention/training restrictions, request limits and revocation. A provider setting cannot override the source-confidentiality boundary.

AI and external providers have no direct access to user source code or vault storage. Potential sharing must use authorized hashes and minimized, filtered analysis artifacts. Raw CST output, patches, prompts, filenames, logs or diagnostics may contain source or identifying information and must not be treated as safe merely because they are called artifacts.

Hashes identify or verify data; they do not enable a provider to infer arbitrary unseen source. The useful tasks possible under these restrictions and the artifact schema must be specified explicitly. Any stronger source-sharing capability would require a separate, explicit policy decision, not a silent fallback to plaintext.

The client must enforce restrictions before a request leaves the device. Unsupported provider behavior must block the request. Changes in effective permissions and the disclosure preview must be visible to the user without collecting civil identity information.

## Official publication and remote repository

The desktop client is the official source of authorized publication to the account's assigned remote repository. The future protocol must bind each publication to that repository, the permitted content, a verified client credential and the user's explicit action. Anonymous authentication need not disclose a real name, email or phone number.

The server must independently verify authorization, repository binding, integrity, replay protection and revocation. A client claiming to be official is not sufficient evidence. Device loss, credential rotation, competing devices, interrupted synchronization and rollback require defined behavior.

Local plaintext must not be sent to an AI/provider. Remote vault synchronization must distinguish hashes/manifests from the encrypted content needed to recover files. Hashes alone cannot transfer usable source. If the server stores opaque encrypted objects, ordinary server-side Git browsing, diffing and builds cannot simply be assumed to work on plaintext; the repository format and client/server responsibilities remain open design decisions.

Public search includes only projects and fields deliberately published by their owners. A project becoming searchable must not expose vault content, other repositories or private account metadata. Making project metadata public and publishing actual source are distinct permissions; no source becomes public implicitly.

## Downloads and platform support

The public interface must provide platform-specific downloads when verified builds exist. Initial desktop targets are Windows, macOS and Linux; processor architectures, package formats and minimum OS versions require a release matrix.

Android and iOS/iPadOS are tracked as additional device targets, with delivery and feature parity to validate separately. Listing a target is not evidence of a working port. A browser build is not a replacement for the desktop vault.

Release publication must define build provenance, artifact hashes, signatures, supported versions, update verification and rollback. Platform controls remain visibly unavailable until a real, owner-published artifact URL is configured. No placeholder executable or simulated download is supplied.

## Verification required

Before operation, verify encrypted persistence and recovery; absence of plaintext in caches, logs and provider requests; artifact filtering; provider-policy enforcement; authenticated repository publication; replay and revocation handling; withdrawal from public indexing; and signed installation/update integrity on each supported target.

These are acceptance requirements for future implementation, not passing test claims for the current web interface.
