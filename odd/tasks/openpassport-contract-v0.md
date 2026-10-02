# ODD Feature Plan: OpenPassport Contract V0

## Objective

Establish a versioned, portable OpenPassport contract that can be consumed consistently by TypeScript, Go, MCP, templates, and the commercial MultiversaOS product. The contract is the laboratory's primary deliverable; it must make Passport context explicit, testable, profile-scoped, and safe to export.

## Problem

The laboratory currently contains a real 7-layer Passport implementation, CLI, MCP server, template, and integrity workflow, but the commercial Passport target requires ten domains. The TypeScript core, Go CLI, MCP server, template, and MultiversaOS baseline also disagree on profile identifiers and visibility values. Separate implementations can therefore report different results for the same Passport. MCP profile misses fail open, Go export paths are not contained, and the CI fallback can claim complete integrity after checking only the manifest.

## Why

OpenPassport is the reusable standard and Build-in-Public surface. It must remain independent from the commercial consulting jurisdiction in MultiversaOS while providing a released contract that the commercial product can safely consume. A stable contract is the prerequisite for assisted builds, Context Health, governed exports, MCP access, and later Docker reproducibility.

## Scope

- Define the ten-domain OpenPassport Contract V0: Identity, Business, Brand & Voice, Offer, Customers, Operations, Knowledge, Governance, Evidence, and Current State.
- Define common field metadata, source/evidence references, confidence, visibility, validity, verification, profiles, versioning, and extension points.
- Publish JSON Schema and conformance fixtures.
- Define and implement a migration path from the existing seven-layer model.
- Align TypeScript core, Go CLI, MCP server, template, and workflow semantics.
- Make profile resolution fail closed.
- Make Go export path handling root-contained and symlink-safe.
- Make CI integrity checks honest and complete.
- Prepare, but do not assume, Docker reproducibility after the contract is stable.

## Non-scope

- Commercial consulting workflows, pricing, client onboarding, or delivery operations.
- InsForge, Vercel, or Cloudflare deployment configuration.
- Passport Live runtime, synchronization, connectors, or persistent operational memory.
- RAG, embeddings, vector stores, or replacement of Engram/Pi/Gentle AI/GGA.
- SmartOS, Aureon, or any retired terminology.
- Building a second design system or restoring deleted legacy assets.
- Remote services, production secrets, or deployment changes.

## Repository jurisdiction

`multiversa-lab` owns:

- OpenPassport specification and release artifacts.
- Experimental and Build-in-Public web surfaces.
- TypeScript passport-core.
- Go Passport CLI.
- MCP adapter for the released contract.
- OpenPassport template, conformance fixtures, and reproducibility experiments.
- Directives, skills, and laboratory-only integrations.

`MultiversaOs` owns the productized consulting application and must consume a released contract rather than fork its semantics.

## Constraints

- Preserve all pre-existing dirty and untracked user/Gemini changes.
- Do not add secrets, local Engram state, private Passport archives, or unrelated design assets.
- InsForge remains the managed backend standard; Supabase is not introduced.
- Python/FastAPI is reserved for punctual solutions and is not part of this infrastructure.
- No RAG subsystem is introduced.
- SmartOS/Aureon are deprecated terms and must not return.
- Keep each implementation work unit coherent; approximately 400 authored changed lines is a planning heuristic, not a hard cap.
- Remote access and deployment are out of scope unless separately authorized.

## Authorized scope

The current authorization covers ODD planning and implementation of the OpenPassport Contract V0 in this repository, subject to normal repository policy. This document itself is planning-only. It does not authorize remote operations, deployment, secret inspection, or changes outside the files owned by this feature.

## Delivery

- `delivery_strategy`: `ask-on-risk`
- `chain_strategy`: unresolved until the forecast or running authored count requires it.
- Forecast: approximately 900-1,400 authored lines across schema, fixtures, migration, parity, safety, and workflow changes; generated fixtures and lockfile noise are excluded from the authored forecast.
- Expected implementation slices: contract/schema; fixtures/migration; runtime parity; security hardening; CI/reproducibility.
- No artificial code-golfing to meet the 400-line heuristic.

## TDD and verification mode

- TDD mode: `unknown`
- Source: project/session configuration has not yet been resolved.
- Test runner: unresolved.
- Before implementation, resolve the effective TDD mode and exact test command from project configuration. Do not infer Standard Mode.
- Every completed task must record focused test output, runtime harness result or explicit `N/A`, and rollback boundary.

## Task checklist

### Contract and conformance

- [ ] **LAB-001 — Freeze contract vocabulary and version policy**
  - Define the ten domains, canonical names, common metadata, visibility vocabulary, profile identifiers, extension rules, and compatibility policy.
  - Acceptance: written contract decisions have stable identifiers and no unresolved `name`/`id` or visibility ambiguity.
  - Route: `delegated`; mapping/preparation requires 4+ contract and consumer files.

- [ ] **LAB-002 — Publish JSON Schema and canonical fixtures**
  - Add schema, valid fixtures, invalid fixtures, profile fixtures, visibility fixtures, and deterministic fixture expectations.
  - Acceptance: fixtures cover all domains, required metadata, profile boundaries, invalid values, and version behavior.
  - Route: `delegated`; multi-file schema/test work and shared contract reading trigger delegation.

- [ ] **LAB-003 — Define and implement seven-layer to ten-domain migration**
  - Preserve existing OpenPassport V1 material while providing explicit migration rules, loss reporting, and compatibility fixtures.
  - Acceptance: migration is deterministic, reports unmapped/ambiguous fields, and never silently invents commercial domains.
  - Route: `delegated`; cross-cutting transformation and fixture work exceeds bounded inline reading.

### Runtime parity and safety

- [ ] **LAB-004 — Align profile and visibility semantics**
  - Update template, TypeScript types, manifest handling, and MCP-facing contracts to use the released vocabulary.
  - Acceptance: the MultiversaOS baseline can be represented without ad hoc values, and unknown profiles/visibility values are rejected.
  - Route: `delegated`; multiple consumers and security-sensitive semantics require coordinated review.

- [ ] **LAB-005 — Make TypeScript core the canonical runtime behavior**
  - Implement build, validation, manifest, export, and receipt behavior against the schema and fixtures.
  - Acceptance: TypeScript behavior is covered by conformance fixtures and does not contradict the contract.
  - Route: `delegated`; implementation spans multiple non-trivial package files.

- [ ] **LAB-006 — Bring Go CLI to contract parity and contain exports**
  - Align Go init/lint/build/verify/export with schema fixtures and reject absolute, escaping, and unsafe symlink paths.
  - Acceptance: Go passes shared fixtures and cannot export files outside the Passport root.
  - Route: `delegated`; Go behavior and security tests span multiple files and require independent verification.

- [ ] **LAB-007 — Make MCP profile access fail closed**
  - Resolve profiles by canonical identifier, reject missing/malformed/unknown profiles, and apply allowed-file filtering to every resource/tool path.
  - Acceptance: unresolved profiles return an explicit error and never expose all canonical layers.
  - Route: `delegated`; security-critical cross-file change triggers delegated implementation and verification.

### Release and reproducibility

- [ ] **LAB-008 — Repair honest CI integrity verification**
  - Add/repair the declared context check and ensure fallback verification checks every declared layer or fails closed.
  - Acceptance: CI invokes existing commands, failure modes are truthful, and no fallback claims full integrity without full verification.
  - Route: `delegated`; workflow and verifier semantics must be checked together.

- [ ] **LAB-009 — Add Docker reproducibility after contract stabilization**
  - Define a minimal laboratory image and reproducible contract/fixture verification path.
  - Acceptance: a clean environment can run the released contract checks without managed-service credentials.
  - Route: `delegated`; deferred until LAB-001 through LAB-008 stabilize because it spans packaging and runtime assumptions.

- [ ] **LAB-010 — Package and document a versioned release**
  - Produce release notes, compatibility matrix, consumer guidance, and a machine-readable contract version.
  - Acceptance: MultiversaOS can pin and verify one released version without copying implementation internals.
  - Route: `delegated`; release documentation depends on completed contract and parity evidence.

## Acceptance criteria

- [ ] One canonical ten-domain contract exists and is versioned.
- [ ] JSON Schema and conformance fixtures are authoritative for TS, Go, MCP, and template behavior.
- [ ] Seven-layer migration is explicit, deterministic, and loss-reporting.
- [ ] Profile and visibility semantics are identical across consumers.
- [ ] Unknown profiles fail closed in MCP and exports.
- [ ] Go export cannot escape the Passport root.
- [ ] CI cannot claim complete integrity from incomplete checks.
- [ ] A released artifact can be consumed by MultiversaOS without source-level coupling.
- [ ] Docker reproducibility is either verified or explicitly deferred with evidence.

## Applicable checks

- Contract/schema validation and fixture suite.
- TypeScript package tests and type checks, once the runner is resolved.
- Go unit/integration tests for build, verify, export, and traversal rejection.
- MCP resource/tool tests for profile scoping and failure paths.
- Template integrity workflow checks.
- Static check that no retired SmartOS/Aureon terms are reintroduced.
- `git diff --check`, focused diffs, and clean separation from pre-existing worktree changes.
- Runtime harness result or explicit `N/A` for each task.

## Progress

- Status: planned; no implementation tasks completed.
- Branch: `codex/openpassport-contract-v0`.
- Existing dirty/untracked changes are preserved and must not be staged.
- No tests/builds/installs/remotes were run for this planning document.

## Verification evidence

- Branch created safely from `main`.
- Existing worktree status was captured before writing.
- This document is the only intended feature artifact.
- Commit identity will be reported after the document-only commit; the document will retain an evidence placeholder if recording the final hash would require an amend loop.

## Dependency and cross-repo contract

- LAB-001 through LAB-004 are prerequisites for MultiversaOS consumption.
- MultiversaOS must pin a released OpenPassport contract version and run the published conformance fixtures.
- Lab must not assume commercial tenant storage, InsForge identity, or consulting workflows.
- OS may propose contract extensions, but the Lab repository owns the standard and compatibility policy.
- Cross-repository changes must be coordinated through a released contract or explicit compatibility fixture, never by copying private implementation files.

## Next step

Resolve project TDD mode and test runner, then implement LAB-001 as the first work unit. Do not begin OS feature implementation against an unreleased or ambiguous contract.

## Work-unit evidence template

For each task, record:

- commit hash and message;
- focused test command and exact result;
- runtime harness command/scenario or `N/A` with reason;
- authored additions/deletions;
- rollback boundary;
- review assessment and delivery slice when applicable.
