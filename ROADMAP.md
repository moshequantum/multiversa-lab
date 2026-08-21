# Multiversa.Lab — hoja de ruta pública

> **Research Preview · realineamiento en público**
> Última revisión: 2026-08-21.

Multiversa.Lab explora un dolor universal de los sistemas con IA: cada cambio de
agente, modelo o herramienta suele romper el contexto, la memoria y la forma de
trabajar. La dirección del Lab es convertir **memoria + estructura + criterio**
en un proceso portable, instalable y verificable para la IA que cada persona
prefiera usar.

El proyecto todavía **no está listo para uso general**. Hay piezas funcionales,
prototipos y documentación pública, pero la integración completa está siendo
realineada. Publicamos ese estado ahora porque construir en público también
significa mostrar lo que no está resuelto.

## La arquitectura hacia la que avanzamos

```text
Multiversa Pack        contexto y criterio portables
      ↓
Multiversa CLI         instala, audita, actualiza y revierte
      ↓
Multiversa MCP         expone el departamento al host elegido
      ↓
Receipts + checks      prueban qué ocurrió y qué es compatible
```

- **Pack:** contrato versionado para identidad del proyecto, instrucciones,
  fuentes, capacidades y políticas. No contiene secretos.
- **CLI:** plano de control. Coordina componentes de origen; no los reemplaza.
- **MCP:** puerta interoperable para que Codex, Claude, Gemini, Hermes,
  OpenClaw u otros hosts consuman el mismo contexto.
- **Receipts y checks:** evidencia de instalación, cambios, compatibilidad y
  rollback. Un adaptador no se declara compatible sin una prueba común.

Engram, GentleAI y Graphify son proyectos de origen recomendados que el Lab
quiere conectar y verificar, no duplicar. GentlePI, Hermes, OpenClaw, InsForge,
MiroFish y otros sistemas se tratan como adaptadores opcionales según el caso.

## Estado por fases

### F0 · Verdad pública — **en curso**

- [x] Auditar la diferencia entre la promesa pública y el estado local.
- [x] Retirar la idea de seis pilares obligatorios.
- [x] Definir Pack + CLI + MCP + receipts como arquitectura objetivo.
- [x] Marcar públicamente el proyecto como Research Preview.
- [ ] Publicar una matriz verificable de funciona / parcial / no soportado.

**Puerta de salida:** la landing, el README, la arquitectura y el estado del
repositorio cuentan la misma historia.

### F1 · Multiversa Pack v0.1 — **siguiente**

- [ ] Publicar el esquema mínimo del Pack.
- [ ] Añadir ejemplos sin credenciales ni datos privados.
- [ ] Validar el mismo Pack en dos proyectos distintos.
- [ ] Documentar exportación, importación y compatibilidad de versiones.

**Puerta de salida:** otro equipo puede inspeccionar el contrato y construir un
adaptador sin depender de contexto privado de Multiversa.Group.

### F2 · CLI + MCP de solo lectura — **siguiente**

- [ ] Hacer que CLI y MCP consuman la misma fuente de verdad.
- [ ] Añadir `dry-run`, receipt y rollback a cada operación mutante.
- [ ] Separar detectar de conectar: reconocer un host no implica soportarlo.
- [ ] Verificar instalación limpia en Linux y macOS.

**Puerta de salida:** una persona puede saber qué cambiará antes de aprobarlo y
puede revertirlo después.

### F3 · Prueba de portabilidad — **planeado**

- [ ] Ejecutar una prueba semántica común por adaptador.
- [ ] Verificar memoria, estructura, reglas y procedencia después del cambio de host.
- [ ] Publicar evidencia y fallos conocidos por plataforma.

**Puerta de salida:** la palabra “compatible” significa lo mismo en todos los
hosts y viene acompañada de evidencia reproducible.

### F4 · Dogfood y beta privada — **planeado**

- [ ] Usar el sistema en al menos dos ciclos reales de entrega.
- [ ] Corregir pérdidas de contexto y puntos de rollback.
- [ ] Invitar a un grupo pequeño de revisores técnicos.
- [ ] Contactar a mantenedores upstream antes de publicar compatibilidad estable.

### F5 · Versión pública MIT — **visión**

- [ ] Documentación de integración estable.
- [ ] Matriz de compatibilidad publicada.
- [ ] Ejemplos reproducibles y pruebas automatizadas.
- [ ] Política clara para contribuciones y adaptadores comunitarios.

## Cómo revisar o ayudar

No necesitas contratar a Multiversa.Group para usar, estudiar o cuestionar el
Lab. Puedes:

1. leer el código y esta hoja de ruta;
2. abrir un issue con una contradicción o un caso de integración;
3. proponer un adaptador mediante pull request;
4. contribuir directamente en el proyecto upstream cuando el cambio pertenezca allí.

- [Repositorio público](https://github.com/moshequantum/multiversa-lab)
- [Issues](https://github.com/moshequantum/multiversa-lab/issues)
- [Arquitectura](./docs/architecture.md)
- [Créditos y licencias](./docs/upstream.md)

## Regla de publicación

Las fechas orientan; las puertas de salida deciden. Si una fase se retrasa, se
actualiza aquí. Si una prueba falla, se publica como fallo conocido. Si una
capacidad todavía no existe, no se presenta como lista.

**Roto se arregla. Lo inmaduro se nombra. La evidencia manda.**
