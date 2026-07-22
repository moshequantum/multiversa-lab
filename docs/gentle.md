# Multiversa Lab — gentle-ai, gentle-pi y VoiceProfile

`gentle-ai` y `gentle-pi` son proyectos upstream separados. Multiversa los integra sin redefinirlos:

- `gentle-ai` admite configuración `custom`; ahí puede proyectarse un contrato de identidad de Multiversa.
- `gentle-pi` es un harness SDD para el agente Pi. No descubre la identidad humana ni define por sí solo cómo debe hablar un Project OS.
- `VoiceProfile v1`, publicado en `multiversa-sdk`, es el contrato Multiversa para idioma BCP-47, tuteo/voseo/usted, regionalidad, léxico, tono, objetivos y foco actual.

El perfil se confirma con la persona. No se infiere voseo, identidad regional ni atributos sensibles.

---

## Spec-Driven Development (SDD)

AI coding agents are fast, but they often rush to write code before fully understanding the requirements. This leads to code drift, regression, and messy refactors.

SDD enforces a strict three-phase pipeline:

```
[Phase 1: Research] ──> [Phase 2: Plan] ──> [Phase 3: Execute & Verify]
```

1. **Research Phase:** Analyze the codebase, dependencies, and requirements. No code editing allowed.
2. **Planning Phase (Specification):** Create an implementation plan (`implementation_plan.md`) describing exactly what files will be changed or created, and the verification plan. **Wait for human approval.**
3. **Execution & Verification Phase:** Once approved, compile a tracking task list (`task.md`) and execute the changes. Finally, run tests and create a code walkthrough (`walkthrough.md`).

---

## Configuración upstream

gentle-ai puede configurar un agente con una postura de trabajo, por ejemplo:
- **Teaching-Oriented:** Explains architectural trade-offs, does not just write code silently.
- **Security-First:** Never leaves private files exposed, sanitizes inputs, audits security rules.
- **Verification-Obsessed:** Validates that changes are working using unit tests and dev builds.

---

## gentle-pi: harness de ingeniería

For Pi-native agents, the `gentle-pi` package provides commands directly in the agent shell:

```bash
# Install gentle-pi inside your project (Multiversa policy: pnpm-only)
pi install pnpm:gentle-pi   # if your Pi runtime supports the pnpm: namespace

# Initialize SDD specifications
/sdd-init

```

El harness organiza disciplina de ingeniería. La capa identitaria permanece en VoiceProfile y puede proyectarse también sobre Claude, Codex, otros agentes MCP y minions internos.
