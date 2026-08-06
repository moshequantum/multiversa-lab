# Sobre los hombros de quienes construyen antes

> *"Crédito donde corresponde."* — DNA Brand · Cap I · Principios

**Multiversa Lab no inventa la rueda — orquesta.** Los pilares arquitectónicos
de este laboratorio se apoyan en (o se inspiran en) código abierto de
otros constructores. Esta página existe para nombrarlos con claridad.

---

## Pilares y autores de origen

| Pilar | Proyecto de origen | Autor | Licencia |
|---|---|---|---|
| **Engram** | [`Gentleman-Programming/engram`](https://github.com/Gentleman-Programming/engram) | **Alan Buscaglia** ([@Gentleman-Programming](https://github.com/Gentleman-Programming)) | MIT |
| **Gentle AI** | [`Gentleman-Programming/gentle-ai`](https://github.com/Gentleman-Programming/gentle-ai) | **Alan Buscaglia** ([@Gentleman-Programming](https://github.com/Gentleman-Programming)) | MIT |
| **Gentle PI** | [`Gentleman-Programming/gentle-pi`](https://github.com/Gentleman-Programming/gentle-pi) | **Alan Buscaglia** ([@Gentleman-Programming](https://github.com/Gentleman-Programming)) | MIT |
| **Graphify** | [`safishamsi/graphify`](https://github.com/safishamsi/graphify) | **Safi** ([@safishamsi](https://github.com/safishamsi)) — AI Engineer · Londres | MIT |
| **codegraph** *(complemento de código para Graphify)* | [`colbymchenry/codegraph`](https://github.com/colbymchenry/codegraph) | **Colby McHenry** ([@colbymchenry](https://github.com/colbymchenry)) | MIT |
| **MiroFish** | [`666ghj/MiroFish`](https://github.com/666ghj/MiroFish) · [`mirofish.homes`](https://mirofish.homes/) | **BaiFu** ([@666ghj](https://github.com/666ghj)) — Shanghái | **AGPL-3.0** ⚠️ |
| **InsForge** | [`insforge.dev`](https://insforge.dev) | InsForge (BaaS) | Comercial · plan gestionado |

---

## ⚠️ Importante — MiroFish y la licencia AGPL-3.0

**MiroFish está bajo GNU Affero General Public License v3.0.** Esta licencia es
"copyleft viral por servicio de red": si Multiversa Lab (código abierto, también
copyleft-compatible) la usa, no hay fricción. Si **Multiversa Group**
(cerrado, comercial) embebe el código de MiroFish y lo factura como servicio,
la AGPL exige publicar el código fuente correspondiente.

**Decisión actual de Multiversa:**

- El **Lab** orquesta MiroFish localmente bajo AGPL — compatible y celebrado.
- El **Group** puede mencionar MiroFish, pero no integra su código en un producto cerrado.
- Si en el futuro Group quiere incrustar MiroFish, abrirá esa porción de código para cumplir con AGPL.

Esto respeta tanto la licencia upstream como nuestro propio principio
*"Apertura sobre opacidad."*

---

## Qué es de Multiversa, qué no lo es

**De Multiversa Lab (nuestro):**

- El **Multiversa CLI** ([`moshequantum/multiversa-cli`](https://github.com/moshequantum/multiversa-cli)) — orquestador en Go + asistente TUI
- El conector, la capa de orquestación y el sistema de diseño **Liquid Glass Pro + Onion UI**
- La narrativa de marca, el DNA Brand book, la voz
- Los manifestos, principios, decisiones arquitectónicas
- Los esquemas de integración entre pilares, el instalador y las plantillas
- La landing pública en `lab.multiversa.group`
- Sus propios contenedores `~/.multiversa/{engram_db,graphify_context,gentle_personas}/` con configuración local

**De los autores upstream (no nuestro):**

- El código del runtime de Engram (Alan Buscaglia)
- El motor de Gentle AI y Gentle PI (Alan Buscaglia)
- El indexador de contenido a grafo de Graphify (Safi)
- El indexador semántico de código de codegraph (Colby McHenry)
- El simulador de enjambre MiroFish (BaiFu), AGPL e invocado como servicio externo

---

## Cómo contribuir al proyecto de origen

Si vas a mejorar uno de estos pilares, abre una contribución **en el repositorio original**.
Multiversa Lab no es una bifurcación ni un control de proveedor: somos usuarios
agradecidos que documentan. La forma más útil de retribuir es contribuir
al upstream directamente.

---

*Última revisión: 2026-05-21 — se añadió codegraph (Colby McHenry) y Multiversa CLI.*
