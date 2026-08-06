<script lang="ts">
  import { WAITLIST_INTERESTS } from '$lib/domain/waitlist';

  let name = $state('');
  let email = $state('');
  let planInterest = $state(WAITLIST_INTERESTS[0].value);
  let website = $state('');
  let loading = $state(false);
  let status: 'idle' | 'success' | 'error' = $state('idle');
  let errorMessage = $state('');

  async function handleSubmit(e: Event) {
    e.preventDefault();
    if (!name || !email) {
      errorMessage = 'Por favor, rellena todos los campos.';
      status = 'error';
      return;
    }

    loading = true;
    status = 'idle';
    errorMessage = '';

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, plan_interest: planInterest, website }),
        signal: controller.signal
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        throw new Error(data?.error || 'No pudimos registrarte ahora.');
      }

      status = 'success';
      name = '';
      email = '';
    } catch (err: unknown) {
      errorMessage =
        err instanceof DOMException && err.name === 'AbortError'
          ? 'La solicitud tardó demasiado. Inténtalo de nuevo.'
          : err instanceof Error
            ? err.message
            : 'Error de red. Inténtalo de nuevo más tarde.';
      status = 'error';
    } finally {
      window.clearTimeout(timeout);
      loading = false;
    }
  }
</script>

<section id="waitlist" class="waitlist-section">
  <div class="mv-liquid-glass-pro form-card">
    <div class="glow-orb" aria-hidden="true"></div>

    <div class="form-header">
      <span class="mv-mono-label">Acceso anticipado</span>
      <h3 class="form-title">Lista de acceso</h3>
      <p class="form-subtitle">
        Prueba <strong>Multiversa CLI</strong>, sigue los releases del Lab o súmate a construir integraciones abiertas.
      </p>
    </div>

    {#if status === 'success'}
      <div class="success-alert" role="status" aria-live="polite">
        <span class="success-glyph">✓</span>
        <div class="success-text">
          <h4>Registro exitoso</h4>
          <p>Tu registro quedó recibido. Te contactaremos cuando exista una ruta concreta para tu interés.</p>
        </div>
      </div>
    {:else}
      <form onsubmit={handleSubmit} class="waitlist-form">
        {#if status === 'error'}
          <div class="error-alert" role="alert">
            <span class="error-glyph">✕</span>
            <p>{errorMessage}</p>
          </div>
        {/if}

        <div class="input-group">
          <label for="name">Tu Nombre</label>
          <input
            id="name"
            type="text"
            name="name"
            autocomplete="name"
            maxlength="120"
            placeholder="Tu nombre"
            bind:value={name}
            disabled={loading}
            required
          />
        </div>

        <div class="input-group">
          <label for="email">Correo Electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            autocomplete="email"
            inputmode="email"
            maxlength="254"
            placeholder="tu@correo.com"
            bind:value={email}
            disabled={loading}
            required
          />
        </div>

        <div class="input-group">
          <label for="plan">Área de Interés</label>
          <div class="select-wrapper">
            <select id="plan" name="plan_interest" bind:value={planInterest} disabled={loading}>
              {#each WAITLIST_INTERESTS as interest}
                <option value={interest.value}>{interest.label}</option>
              {/each}
            </select>
          </div>
        </div>

        <div class="honeypot" aria-hidden="true">
          <label for="website">Sitio web</label>
          <input
            id="website"
            name="website"
            type="text"
            tabindex="-1"
            autocomplete="off"
            bind:value={website}
          />
        </div>

        <button
          type="submit"
          class="mv-btn mv-btn-primary submit-btn"
          disabled={loading}
          aria-busy={loading}
        >
          {#if loading}
            <span class="spinner" aria-hidden="true"></span>
            Procesando...
          {:else}
            Unirse a la Waitlist  →
          {/if}
        </button>
      </form>
    {/if}
  </div>
</section>

<style>
  .waitlist-section {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: clamp(60px, 8vh, 100px) var(--space-4);
    position: relative;
    overflow: hidden;
  }

  .form-card {
    width: 100%;
    max-width: 580px;
    padding: clamp(32px, 5vw, 48px);
    border-radius: var(--radius-xl);
    z-index: 2;
    position: relative;
  }

  .glow-orb {
    position: absolute;
    top: -20%;
    right: -20%;
    width: 250px;
    height: 250px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(189, 235, 52, 0.12) 0%, transparent 70%);
    filter: blur(40px);
    z-index: -1;
    pointer-events: none;
  }

  .form-header {
    margin-bottom: 36px;
    text-align: center;
  }

  .form-title {
    margin: 12px 0 16px;
    font-size: clamp(2rem, 3.5vw, 2.5rem);
    line-height: 1.1;
    letter-spacing: var(--tracking-tight);
    font-family: var(--font-serif);
    color: var(--mv-ivory);
  }

  .form-subtitle {
    font-size: 0.95rem;
    line-height: 1.5;
    color: rgba(250, 252, 232, 0.65);
    margin: 0;
  }
  .form-subtitle strong {
    color: var(--mv-primary);
  }

  .waitlist-form {
    display: flex;
    flex-direction: column;
    gap: 22px;
  }

  .honeypot {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip-path: inset(50%);
    white-space: nowrap;
  }

  .input-group {
    display: flex;
    flex-direction: column;
    gap: 8px;
    text-align: left;
  }

  .input-group label {
    font-family: var(--font-mono);
    font-size: 11px;
    letter-spacing: var(--tracking-wide);
    text-transform: uppercase;
    color: rgba(250, 252, 232, 0.55);
  }

  .input-group input,
  .input-group select {
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.08);
    border-radius: var(--radius-sm);
    color: var(--mv-ivory);
    padding: 14px 18px;
    font-size: 0.98rem;
    font-family: var(--font-sans);
    transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .input-group input::placeholder {
    color: rgba(250, 252, 232, 0.25);
  }

  .input-group input:focus,
  .input-group select:focus {
    outline: none;
    border-color: var(--mv-primary);
    background: rgba(189, 235, 52, 0.02);
    box-shadow: var(--shadow-ring-primary);
  }

  .select-wrapper {
    position: relative;
    width: 100%;
  }

  .select-wrapper::after {
    content: '↓';
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
    color: rgba(250, 252, 232, 0.4);
    font-family: var(--font-mono);
    font-size: 12px;
    pointer-events: none;
  }

  .input-group select {
    appearance: none;
    width: 100%;
    padding-right: 40px;
    cursor: pointer;
  }
  .input-group select option {
    background: var(--mv-surface);
    color: var(--mv-ivory);
  }

  .submit-btn {
    width: 100%;
    margin-top: 12px;
    padding: 16px;
    font-size: 0.98rem;
    font-weight: 500;
    justify-content: center;
    border: none;
    white-space: nowrap;
  }

  .success-alert {
    display: flex;
    gap: 20px;
    align-items: flex-start;
    background: rgba(189, 235, 52, 0.06);
    border: 1px solid rgba(189, 235, 52, 0.2);
    border-radius: var(--radius-md);
    padding: 24px;
    text-align: left;
    animation: fadeIn 0.4s ease-out;
  }

  .success-glyph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: var(--mv-primary);
    color: #000;
    font-size: 16px;
    font-weight: bold;
    flex-shrink: 0;
  }

  .success-text h4 {
    margin: 0 0 6px 0;
    color: var(--mv-primary);
    font-family: var(--font-serif);
    font-size: 1.15rem;
  }

  .success-text p {
    margin: 0;
    color: rgba(250, 252, 232, 0.75);
    font-size: 0.92rem;
    line-height: 1.45;
  }

  .error-alert {
    display: flex;
    align-items: center;
    gap: 12px;
    background: rgba(255, 69, 58, 0.08);
    border: 1px solid rgba(255, 69, 58, 0.2);
    border-radius: var(--radius-sm);
    padding: 12px 18px;
    text-align: left;
    color: var(--mv-destructive);
    font-size: 0.9rem;
  }

  .error-glyph {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--mv-destructive);
    color: #fff;
    font-size: 10px;
    font-weight: bold;
    flex-shrink: 0;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Spinner */
  .spinner {
    width: 16px;
    height: 16px;
    border: 2px solid rgba(0, 0, 0, 0.1);
    border-top: 2px solid #000;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    display: inline-block;
    margin-right: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
</style>
