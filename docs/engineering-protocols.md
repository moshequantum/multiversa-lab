# Protocolos de Ingeniería y Orquestación de Modelos

> Fuente de verdad para el diseño, refactorización y verificación con modelos en Multiversa.Lab.
> Principio rector: **La persona lidera. La IA propone; la persona decide.** Memoria + Estructura + Criterio.

---

## 1. Manifiesto: De Prompts Mágicos a Disciplina de Ingeniería

El ecosistema de desarrollo con modelos de lenguaje suele caer en la trampa de los *prompts* monolíticos de un solo turno: instrucciones extensas que solicitan arquitectura, base de datos, APIs, interfaz y código completo en una única respuesta.

En sistemas de misión crítica, ese enfoque genera:
1. **Colapso de contexto**: Se satura la ventana de atención del modelo, provocando omisiones y código incompleto o simulado.
2. **Ausencia de arnés de verificación**: Pretender refactorizar o construir sin pruebas automatizadas previas garantiza regresiones silenciosas.
3. **Teatro multiagente**: Forzar a un único hilo de conversación a simular cuatro roles distintos acumula sesgos y elimina la verificación independiente.

Multiversa.Lab reemplaza la inmediatez ilusoria por **8 protocolos de ingeniería estructurados**, ejecutables mediante agentes acotados, contratos formales y evidencia comprobable (*receipts*).

---

## 2. Los 8 Protocolos Canónicos

### Protocolo 01 · Greenfield Scaffolding (Desarrollo Incremental)

* **Anti-patrón superado:** Pedir una aplicación completa lista para producción en un solo *prompt*.
* **Riesgo técnico:** Arquitectura de juguete, contratos de datos rotos, falta de manejo de errores y código truncado.
* **Flujo Multiversa:**
  1. **Fase de Especificación (Spec-First):** Redactar la propuesta de arquitectura, modelos de dominio y límites de bounded contexts en un documento de diseño (RFC).
  2. **Contratos antes de Frameworks:** Tipar las entidades del núcleo de negocio de forma agnóstica a la base de datos o transporte.
  3. **Unidades de Trabajo Acotadas:** Implementar en lotes de no más de 400 líneas modificadas, cada una con sus correspondientes pruebas unitarias y de integración.
  4. **Verificación:** Ejecución de suite de compilación, linters y tests de contrato antes del siguiente módulo.

---

### Protocolo 02 · Exploración y Auditoría de Arquitectura

* **Anti-patrón superado:** Pedirle al modelo que "entienda la base de código y la mejore" en la misma interacción.
* **Riesgo técnico:** Modificaciones ciegas sin visibilidad de acoplamientos cruzados ni dependencias cíclicas.
* **Flujo Multiversa:**
  1. **Mapeo Estructural con Grafos:** Utilizar motores de análisis estático y AST (`Graphify`) para generar el grafo de conocimiento de dependencias e identificar *God Nodes*.
  2. **Inspección de Solo Lectura:** Explorar el flujo de datos y puntos de acoplamiento sin modificar archivos.
  3. **Diagnóstico Documentado:** Registrar cuellos de botella estructurales, duplicación de lógica y riesgos de mantenibilidad con rutas exactas.
  4. **Plan de Acción:** Definir los límites de refactorización antes de realizar cualquier cambio en código.

---

### Protocolo 03 · Systematic Root-Cause Debugging (Depuración Sistemática)

* **Anti-patrón superado:** Compartir un stacktrace o error y pedir "código corregido listo para producción".
* **Riesgo técnico:** Soluciones superficiales que silencian el síntoma pero ocultan la causa raíz o rompen casos límite (*edge cases*).
* **Flujo Multiversa:**
  1. **Aislamiento y Reproducción:** Formular hipótesis técnicas comprobables sobre el fallo.
  2. **Test de Regresión Previo:** Escribir una prueba automatizada mínima que reproduzca el fallo de forma determinista (la prueba debe fallar en rojo).
  3. **Corrección Mínima:** Modificar el código estrictamente necesario para que la prueba pase a verde.
  4. **Verificación de Frontera:** Comprobar que no se hayan introducido efectos colaterales en módulos adyacentes.

---

### Protocolo 04 · Diseño de Sistemas y Aislamiento de Dominio

* **Anti-patrón superado:** Mezclar diagramas de alto nivel con generación inmediata de código de persistencia.
* **Riesgo técnico:** Filtración de detalles de infraestructura (ORM, HTTP, SDKs de terceros) dentro de la lógica del negocio.
* **Flujo Multiversa:**
  1. **Arquitectura Hexagonal (Puertos y Adaptadores):** La lógica de dominio no importa frameworks, transportes ni librerías de persistencia.
  2. **Contratos de API Tipados:** Definición formal de esquemas (OpenAPI, gRPC o interfaces TypeScript compartidas).
  3. **Estrategia de Persistencia y Caché:** Esquemas versionados mediante migraciones idempotentes; invalidación de caché explícita y monitoreada.
  4. **Revisión de Seguridad:** Aplicación de políticas de denegación por defecto (*deny-by-default*) y aislamiento por tenant.

---

### Protocolo 05 · Ingeniería de Rendimiento (Profiling First)

* **Anti-patrón superado:** "Optimiza este código para velocidad y memoria" a partir de una lectura superficial de sintaxis.
* **Riesgo técnico:** Optimización prematura, pérdida de legibilidad y desatención de los verdaderos cuellos de botella (I/O, serialización, N+1 queries).
* **Flujo Multiversa:**
  1. **Línea Base Cuantitativa:** Medir el comportamiento del sistema con herramientas de telemetría y profiling (DevTools, `explain analyze`, heap snapshots, benchmarks).
  2. **Identificación de Cuellos de Botella:** Aislar la operación crítica (tiempo en CPU vs. bloqueo de red o base de datos).
  3. **Intervención Quirúrgica:** Aplicar optimizaciones puntuales (memoización con límites, streaming de buffers, índices de base de datos).
  4. **Validación Comparativa:** Demostrar la mejora con métricas antes/después demostrables.

---

### Protocolo 06 · Refactorización a Arquitectura Limpia

* **Anti-patrón superado:** Pedir "reestructuración limpia" asegurando que el comportamiento no cambia sin tener pruebas que lo garanticen.
* **Riesgo técnico:** Corrupción silenciosa de reglas de negocio en producción.
* **Flujo Multiversa:**
  1. **Arnés de Pruebas de Caracterización (Golden Master):** Capturar el comportamiento actual del sistema mediante tests antes de modificar la estructura interna.
  2. **Inversión de Dependencias:** Introducir interfaces y adaptadores paso a paso sin modificar el comportamiento externo observable.
  3. **Modularización Incremental:** Desplazar código hacia carpetas de dominio, aplicación e infraestructura de forma atómica.
  4. **Auditoría de Invariantes:** Confirmar la aprobación del 100% de la suite de pruebas en cada paso de la migración.

---

### Protocolo 07 · Topología Multiagente Real

* **Anti-patrón superado:** Simular en un solo prompt que el modelo asume 4 personalidades (Arquitecto, Ingeniero, Revisor, Optimizador).
* **Riesgo técnico:** Sesgo cognitivo idéntico en un único contexto, ausencia de auditoría real y ceguera de confirmación.
* **Flujo Multiversa:**
  1. **Orquestador Central:** Mantiene el contexto global, desglosa tareas y delega trabajo a agentes especializados.
  2. **Worker Acotado:** Ejecuta una tarea técnica puntual en un contexto aislado, devolviendo únicamente el resultado observable y su diff.
  3. **Revisor Independiente:** Evalúa el cambio en un contexto fresco contra los contratos de diseño y seguridad, sin compartir el sesgo del implementador.
  4. **Evidencia y Receipts:** Ningún cambio se da por completado sin la salida reproducible de linters, compilación y pruebas.

---

### Protocolo 08 · Componentes de UI de Alta Fidelidad y Accesibilidad

* **Anti-patrón superado:** Generar componentes sin sistema de diseño, sin contratos de tokens ni consideración de accesibilidad.
* **Riesgo técnico:** Interfaz frágil, falta de soporte para lectores de pantalla, desbordes en viewport móvil y estados de error no contemplados.
* **Flujo Multiversa:**
  1. **Desacoplamiento Contenedor / Presentacional:** La lógica de obtención de datos y estado vive separada de la vista visual pura.
  2. **Cobertura Exhaustiva de Estados:** Todo componente debe resolver de forma explícita: Vacío (*Empty*), Cargando (*Loading*), Error (*Error*), Éxito (*Success*) y Casos Límite (*Edge Cases*).
  3. **Accesibilidad Nativa:** Cumplimiento de WAI-ARIA, navegación por teclado, jerarquía semántica y contraste de color auditado con Axe Core.
  4. **Tokens Centralizados:** Uso de variables tipadas para espaciado, color, tipografía y transiciones motion coherentes.

---

## 3. Matriz de Correspondencia en Multiversa

| Rol / Intención | Anti-patrón (Prompt Monolítico) | Herramienta / Estándar en Multiversa | Salida Requerida |
|---|---|---|---|
| **01. Greenfield** | Un único prompt con todo el código | ODD / SDD (`Gentle AI`) | RFC + Contratos de dominio + Commits atómicos |
| **02. Exploración** | "Explica y refactoriza a la vez" | `Graphify` + AST | Grafo de dependencias + Mapa de God Nodes |
| **03. Debugging** | "Encuentra el bug y arréglalo" | Systematic Debugging + Red-to-Green | Test de regresión fallido + Fix mínimo verificado |
| **04. Arquitectura** | Mezclar dominio con base de datos | Puertos y Adaptadores (Hexagonal) | Contratos puros + Migraciones versionadas |
| **05. Rendimiento** | Optimización intuitiva sin métricas | Telemetría + Profiling + Benchmarks | Medición baseline + Benchmark post-cambio |
| **06. Clean Arch** | Refactorizar sin tests previos | Characterization Tests + Inversión de Control | Suite verde antes, durante y después del refactor |
| **07. Multiagente** | 1 chat simulando 4 personas | Agent Teams Lite (Orchestrator/Worker/Reviewer) | Contextos aislados + Receipts independientes |
| **08. UI Craft** | Componentes estáticos de chat | Atomic Design + Axe Core + Motion tokens | Componente tipado + Manejo de 5 estados + a11y |
