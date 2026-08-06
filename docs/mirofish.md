# Multiversa Lab — Capa de simulación: MiroFish

**MiroFish** es un motor predictivo de simulación para Multiversa Lab. Crea escenarios paralelos con agentes autónomos para explorar decisiones, políticas, mensajes o historias antes de llevarlas a una operación real.

## Prueba de escenarios paralelos

Las pruebas de software pueden detectar si el código falla, pero no anticipan cómo responderán las personas a una función, un precio o una política. MiroFish permite simular comportamientos mediante inteligencia de enjambre. Sus resultados son señales para revisar, no garantías de resultado.

## Base técnica

- **Integración OASIS:** se apoya en el marco Open Agent Social Interaction Simulations (OASIS).
- **Neo4j / base de datos de grafos:** guarda relaciones entre agentes, memorias de largo plazo y registros de interacción.
- **Ejecución local:** bifurcaciones comunitarias como `MiroFish-Offline` pueden usar modelos locales (Ollama) y Neo4j para preservar confidencialidad sin conexión.
- **Vista de conjunto:** ofrece una interfaz para revisar conversaciones, relaciones e inyectar variables de escenario.

## Integración en Multiversa Lab

Dentro del Lab, MiroFish es un adaptador de simulación externo y opcional. No es una capa obligatoria ni se condiciona por nivel de producto:

- Antes de una actualización importante, se pueden cargar sistemas de diseño y mensajes para evaluar hipótesis.
- El simulador representa perfiles de uso definidos para ese ejercicio.
- Los agentes interactúan y ensayan reacciones o conversiones hipotéticas.
- Las conclusiones se revisan como parte de una decisión humana; no se usan para perfilar personas reales ni para publicar datos sensibles.
