# Multiversa Lab — gentle-ai, gentle-pi y VoiceProfile

`gentle-ai` y `gentle-pi` son proyectos de origen distintos. Multiversa los integra sin redefinirlos:

- `gentle-ai` admite configuración `custom`; allí puede aplicarse un contrato de identidad de Multiversa.
- `gentle-pi` es un arnés SDD para el agente Pi. No descubre identidad humana ni decide por sí solo cómo debe hablar un Project OS.
- `VoiceProfile v1`, publicado en `multiversa-sdk`, es el contrato de Multiversa para idioma BCP-47, tuteo/voseo/usted, regionalidad, léxico, tono, objetivos y foco actual.

El perfil se confirma con la persona. No se infieren voseo, identidad regional ni atributos sensibles.

## Desarrollo guiado por especificación (SDD)

Los agentes de construcción con IA pueden escribir código antes de entender los requisitos. Eso produce deriva de código, regresiones y refactorizaciones innecesarias. SDD aplica un flujo de tres fases:

```text
[Investigación] ──> [Plan] ──> [Ejecución y verificación]
```

1. **Investigación:** analiza código, dependencias y requisitos. No edita código.
2. **Planificación (especificación):** crea un plan de implementación (`implementation_plan.md`) con archivos, cambios y verificación. **Espera aprobación humana.**
3. **Ejecución y verificación:** tras aprobarse, compila una lista de seguimiento (`task.md`), ejecuta los cambios, corre pruebas y crea un recorrido del código (`walkthrough.md`).

## Configuración de origen

gentle-ai puede configurar un agente con una postura de trabajo, por ejemplo:

- **Orientado a enseñar:** explica las compensaciones arquitectónicas, no escribe en silencio.
- **Seguridad primero:** no deja archivos privados expuestos, sanea entradas y audita reglas de seguridad.
- **Verificación rigurosa:** valida los cambios con pruebas unitarias y compilaciones de desarrollo.

## gentle-pi: arnés de ingeniería

Para agentes nativos de Pi, `gentle-pi` entrega comandos dentro de la terminal del agente:

```bash
# Instala gentle-pi en tu proyecto (política Multiversa: solo pnpm)
pi install pnpm:gentle-pi

# Inicializa especificaciones SDD
/sdd-init
```

El arnés organiza disciplina de ingeniería. La capa identitaria permanece en VoiceProfile y también puede aplicarse a Claude, Codex, otros agentes MCP y ayudantes internos.
