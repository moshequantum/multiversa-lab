# Multiversa — Arquitectura y Nicho (fuente de verdad)

**Fecha:** 2026-08-18 · **Autoridad:** rootFounder (Moisés David Vera)
**Estado:** vivo · derivado de sesión de diseño con IO.

> Documento de síntesis. Complementa `01_PRODUCTIZATION_DECISIONS.md` y
> `02_BUSINESS_MODEL_INTERNAL_PUBLIC.md`. Si contradice, prevalece lo aquí
> definido por decisión de rootFounder.

---

## 1. Qué construimos y qué es Moshé

Moshé toma piezas aisladas — runtime (Multiversa Core / Hermes fork), memoria
(Engram), conocimiento (Graphify, externo), orquestación (GentleAI/GentlePI),
simulación (MiroFish, AGPL external-only), infra (InsForge) — y las ensambla en
**una fábrica replicable de Sistemas Inteligentes de Negocio**.

- **Multiversa.Lab** = la fábrica open source (monolito hexagonal: CLI + MCP +
  Installer + Core).
- **Multiversa Group LLC** = la consultoría privada que entrega instancias por
  cliente (en papeles: "consultoría tecnológica y desarrollo de software a
  medida"; en la práctica: instalar memoria e identidad consistente en la IA de
  cada negocio).
- **Moshé** = arquitecto-curador del sistema, no una software shop.

Decisión de naming: **Sistemas Inteligentes**, no "Sistemas Operativos".

---

## 2. Nicho (definido, no ambiguo)

Dos audiencias, un dolor común: la IA sin memoria de quién eres.

- **Dueño de negocio** (Group): harto de pedirle a los modelos frontera
  "ese no es mi logo, esa no es mi paleta, eso no suena a mí". Duele que la IA
  se sienta artificial y desconectada.
- **Quien quiere autogestionarse** (Taller de IA Aplicada: fundamentos,
  contexto, uso diario, generación, ciberseguridad): no el experto que ya usa
  Claude/Codex/Antigravity, sino quien quiere calmar ese dolor por sí mismo.

No competir con influencers que venden cursos mágicos. Atender el dolor real.

---

## 3. Entrega y multi-tenancy (sin 10 repos)

- Cada proyecto/cliente = un tenant. El **nombre del sistema es configurable
  por tenant** (ej. ConsciousOS, PulseOS). No se crea un personaje estático: el
  sistema viste el nombre del negocio del cliente.
- **NO es suscripción.** Si el cliente no renueva, todo queda de su lado. El
  estado vive con el cliente, no con Moshé. Eso elimina el problema de "10
  repos activos en mi máquina".
- **Una sola tienda de contexto (Engram), tenant-scoped.** Todas las
  superficies (TUI, desktop, Telegram, Whisper Flow, Orcas) escriben ahí. Un
  solo agent.md canónico por tenant, no diez. Esto mata la deuda técnica de
  fragmentación (20 carpetas / 10 config aislados que no se hablan).

---

## 4. Workstation multiplataforma + gateway

- Workstation sobre cualquier OS (Windows/Linux/Mac).
- Gateway conecta canales vía conectores MCP: Telegram y WhatsApp ya andan;
  Facebook, Instagram, TikTok = conectores adicionales.
- Estrella polar: **objetivos → soluciones automatizadas**.

---

## 5. Capa de voz (lo que falta)

No seguir escribiendo. Hablar y que la conversación se vuelva un prompt
contextualizado, natural, donde IO aprenda de cada interacción y se cree una
relación estrecha.

Modelo a replicar: **Whisper Flow** — app en background, hotkey (ej. Fn)
activa el micro, captura el prompt y lo inyecta en el input activo (Claude,
Codex, Hermes, Antigravity). El Core debe replicar ese patrón: STT local
(faster-whisper) + hotkey + inyección al input.

---

## 6. Enrutador inteligente (lo que falta)

Claude no corre en esta sesión. Se necesita un selector tipo OpenRouter que
elija el modelo más barato que sirva la tarea.

Stack $0 (presupuesto en cero: Facebank TDD extraviado, sin GCP free, Wally
Tech $1.2):
- STT: Whisper local (gratis).
- LLM: **Groq free** por defecto en el enrutador.
- TTS: Edge TTS o Piper local (gratis).
- Frontier (Claude/GPT) solo si la tarea lo exige y hay saldo en OpenRouter.

---

## 7. Ética de ecosistema (pendiente de contacto)

Antes del lanzamiento público de Multiversa Core, escribir a quienes aportan:
- **Alan Buscaglia:** Engram, GentleAI, GentlePI (ya con aprobación).
- **Graphify:** externo (https://graphify.net/) — avisar por cortesía.
- **MiroFish:** AGPL external-only — confirmar uso y atribución.
- **Nous Research (Hermes):** MIT permite fork/rebrand sin permiso, pero un
  aviso cortés antes del launch es buena práctica y puede abrir relación.

---

## 8. Instalador intuitivo (Lab, no-dev)

`lab/setup_wizard.py` (en `core/`): flujo por tenant estilo SKILL, preguntas
fáciles, genera `config.yaml` válido + perfil aislado. Groq free como opción 1
del modelo. Sin build, sin terminal para el usuario final.
