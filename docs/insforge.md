# Multiversa Lab — Infrastructure: InsForge Backend

**InsForge** serves as the Backend-as-a-Service (BaaS) and cloud infrastructure foundation for Multiversa Lab. It provides database access, authentication, file storage, edge functions, and AI model gateways.

---

## Ecosystem Architecture

InsForge puede operar como backend remoto opcional para superficies web y sincronización autorizada. El runtime local no depende de él:

```
[SvelteKit Frontend] ──(InsForge SDK)──> [InsForge Cloud BaaS] ──> [PostgreSQL / Storage / Auth]
```

---

## Frontera de datos

Este repositorio público no documenta identificadores de proyectos, URLs privadas, credenciales ni schemas de tenants. Las capacidades se diseñan por contrato:

1. formularios públicos con permisos mínimos;
2. memoria remota sólo mediante opt-in y aislamiento por tenant;
3. auditoría sin secretos ni contenido sensible;
4. almacenamiento de archivos separado de sus metadatos y políticas.

---

## Installation & SDK Setup

The TypeScript SDK is installed in the frontend workspace:

```bash
pnpm add @insforge/sdk@latest
```

> Multiversa policy: **pnpm only, npm is banned across the stack.**

### Regla de implementación

Antes de escribir o editar una integración se debe consultar `fetch-docs` o `fetch-sdk-docs` de InsForge. La documentación cambia y este archivo no congela firmas de API. Las invariantes estables son:

- `pnpm` es el único gestor JS/TS permitido;
- las operaciones SDK devuelven `{ data, error }`;
- los inserts usan formato de arreglo;
- claves administrativas y secretos permanecen exclusivamente del lado servidor;
- RLS, aislamiento y mínimo privilegio se verifican antes de habilitar escritura pública.
