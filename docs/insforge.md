# Multiversa Lab — Infraestructura: servicio de datos InsForge

**InsForge** es un adaptador opcional de infraestructura como servicio (BaaS, por su sigla técnica) para Multiversa.Lab. Puede ofrecer base de datos, autenticación, almacenamiento, funciones de borde y pasarelas de modelos de IA sin ser un requisito para operar localmente.

## Cerebro + Worker

Cerebro es la frontera de integración del Lab: puede usar InsForge para datos, autenticación, almacenamiento o IA, y un Worker de Cloudflare para tareas públicas y efímeras. Ambos son opcionales y se configuran por entorno. El Worker no recibe bóvedas ni secretos de los perfiles; Cerebro coordina contratos, no centraliza contexto privado.

## Frontera de datos

Este repositorio público no documenta identificadores de proyectos, URL privadas, credenciales ni esquemas de perfiles. Las capacidades se diseñan por contrato: permisos mínimos para superficies públicas, memoria remota solo mediante consentimiento y aislamiento por perfil, auditoría sin secretos y almacenamiento separado de metadatos y políticas.

El sitio SvelteKit puede usar un proyecto InsForge configurado por separado para integraciones públicas heredadas. Una instancia del Sistema Operativo de Proyecto puede usar su propio servicio de datos para sincronizar, pero el Lab no prescribe ni publica un proyecto de producción compartido:

```text
[Sitio SvelteKit] ──(SDK InsForge)──> [InsForge BaaS] ──> [PostgreSQL / almacenamiento / autenticación]
```

## Esquemas de ejemplo

Una implementación puede definir esquemas como:

1. `lab_waitlist`: registro heredado para formularios públicos que todavía lo requieran; el sitio actual no lo expone.
2. `identity_nodes` e `identity_edges`: índices Graphify en la nube.
3. `identity_decisions`: métricas de decisión para simulaciones MiroFish.
4. `l2_semantic_memory`: sincronización opcional de memorias Engram entre dispositivos.
5. `audit_logs`: rastro general de operaciones de agentes.

Ni el Lab ni su instalador incluyen URL de proyectos, claves o credenciales. Cada adaptador remoto se configura de manera explícita y se aísla por entorno.

## SDK y seguridad

El SDK de TypeScript vive en el espacio de trabajo del frontend. Usa `pnpm` para añadirlo cuando el proyecto lo requiera:

```bash
pnpm add @insforge/sdk@latest
```

> Política Multiversa: **solo pnpm; no uses npm**.

> ⚠️ **Nota de seguridad:** el SDK del cliente puede leer la clave anónima, pública y limitada por Row-Level Security (RLS), nunca la clave de administración. La clave de administración tiene rol de servicio: si llega al paquete del navegador, cualquier persona podría leerla. Guárdala en `.env`, excluida de git, y úsala únicamente desde archivos `+server.ts`.

```typescript
import { createClient } from '@insforge/sdk';
import { PUBLIC_INSFORGE_URL, PUBLIC_INSFORGE_ANON_KEY } from '$env/static/public';

export const insforge = createClient({
  baseUrl: PUBLIC_INSFORGE_URL,
  anonKey: PUBLIC_INSFORGE_ANON_KEY
});
```

```bash
PUBLIC_INSFORGE_URL=https://<tu-proyecto>.us-east.insforge.app
PUBLIC_INSFORGE_ANON_KEY=<clave-anonima>

# Solo servidor: nunca uses el prefijo PUBLIC_
INSFORGE_API_KEY=<clave-administrador-solo-servidor>
INSFORGE_API_BASE_URL=https://<tu-proyecto>.us-east.insforge.app
```

Para una superficie pública heredada, la tabla debe usar RLS para permitir únicamente la operación necesaria y restringir lectura, actualización y eliminación a identidades autorizadas.
