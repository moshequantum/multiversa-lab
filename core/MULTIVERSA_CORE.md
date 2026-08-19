# Multiversa Core (vendored)

Este directorio contiene un fork MIT de [Hermes Agent](https://github.com/NousResearch/hermes-agent),
adaptado como el runtime de `Multiversa Core` dentro del monolito hexagonal de Multiversa.Lab.

- **Licencia:** MIT — Copyright (c) 2025 Nous Research, (c) 2026 Multiversa Group LLC.
  El texto MIT íntegro de Nous se conserva; no se elimina su aviso de copyright.
- **Marca:** los strings visibles dicen "Multiversa Core". El nombre interno del módulo
  (`hermes`) se mantiene intacto a propósito para no romper el build.
- **Toolchain:** contribuidores usan `pnpm` (nunca `npm`). El usuario final recibe binario
  prebuilt por CI y no compila nada.
- **Configurador del Lab:** `lab/setup_wizard.py` — 3 preguntas en lenguaje de negocio
  generan un `config.yaml` con memoria en Engram y knowledge graph en Graphify.

## Mantenimiento de upstream

Para traer mejoras de Hermes sin perder el fork:

```bash
git remote add nous-upstream https://github.com/NousResearch/hermes-agent.git
git fetch nous-upstream
# aplicar el diff de nous-upstream/main sobre core/ con cuidado de no pisar
# las marcas de Multiversa (LICENSE, productName, lab/setup_wizard.py).
```

El Core es una capa del Lab, no reemplaza el CLI/Cerebro existente.
