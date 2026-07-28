# Multiversa Lab — Infrastructure: InsForge Backend

**InsForge** is an optional Backend-as-a-Service (BaaS) adapter for Multiversa.Lab.
It can provide database access, authentication, file storage, edge functions and
AI model gateways without becoming a requirement for local operation.

---

## Cerebro + Worker

El Cerebro es la frontera de integración del Lab: puede usar InsForge para datos,
autenticación, storage o IA y un Cloudflare Worker para tareas públicas y efímeras.
Ambos son opcionales y se configuran por entorno. El Worker no recibe vaults ni
secretos de tenants; el Cerebro coordina contratos, no centraliza el contexto privado.

## Ecosystem Architecture

The SvelteKit site can use a separately configured InsForge project for its public
waitlist. An OS instance may use its own backend for sync, but Lab does not prescribe
or publish a shared production project:

```
[SvelteKit Frontend] ──(InsForge SDK)──> [InsForge Cloud BaaS] ──> [PostgreSQL / Storage / Auth]
```

---

## Example schemas

An implementation can define schemas such as:

1. `lab_waitlist`: Tracks requests to build with Lab or explore Group accompaniment.
2. `identity_nodes` & `identity_edges`: Persists Graphify indices in the cloud.
3. `identity_decisions`: Stores decision metrics for MiroFish simulations.
4. `l2_semantic_memory`: Syncs Engram memories across devices.
5. `audit_logs`: General audit trail of agent operations.

Neither Lab nor its installer ships project URLs, keys or credentials. Every remote
adapter must be configured explicitly by the operator and isolated per environment.

---

## Installation & SDK Setup

The TypeScript SDK is installed in the frontend workspace:

```bash
pnpm add @insforge/sdk@latest
```

> Multiversa policy: **pnpm only, npm is banned across the stack.**

### Client Initialization

> ⚠️ **Security note:** the SDK on the client side reads the **anon key**
> (public, scoped by Row-Level Security), never the admin API key. The
> admin key is service-role; if it lands in the browser bundle, anyone
> can read it. Keep it in `.env` (gitignored), expose it only to
> server-side `+server.ts` files.

The client is initialized in [`landing/src/lib/insforge.ts`](../landing/src/lib/insforge.ts):

```typescript
import { createClient } from '@insforge/sdk';
import { PUBLIC_INSFORGE_URL, PUBLIC_INSFORGE_ANON_KEY } from '$env/static/public';

export const insforge = createClient({
  baseUrl: PUBLIC_INSFORGE_URL,
  anonKey: PUBLIC_INSFORGE_ANON_KEY
});
```

`.env` (gitignored):

```bash
PUBLIC_INSFORGE_URL=https://<your-project>.us-east.insforge.app
PUBLIC_INSFORGE_ANON_KEY=<anon-key-from-dashboard-or-cli>

# Server-only (NEVER prefix with PUBLIC_):
INSFORGE_API_KEY=<admin-key-server-side-only>
INSFORGE_API_BASE_URL=https://<your-project>.us-east.insforge.app
```

Get the anon key:

```bash
npx @insforge/cli secrets get ANON_KEY
```

### Writing Data (Example: Waitlist Form)

```typescript
const { data, error } = await insforge.database
  .from('lab_waitlist')
  .insert([{
    name: userName,
    email: userEmail,
    plan_interest: selectedPlan
  }]);
```

For this to work without surfacing admin permissions, the `founders_waitlist`
table needs RLS that allows public insert (and restricts read/update/delete
to authenticated owners only).
