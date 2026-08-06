<script lang="ts">
  import { onDestroy, onMount } from 'svelte';

  /** Volumen inicial como porcentaje, limitado a 0–12. */
  let { initialVolume = 6 } = $props<{ initialVolume?: number }>();

  type AudioGraph = {
    context: AudioContext;
    master: GainNode;
    sources: AudioScheduledSourceNode[];
    nodes: AudioNode[];
  };

  const MAX_VOLUME = 12;
  const FADE_SECONDS = 0.38;

  let enabled = $state(false);
  let muted = $state(false);
  let volume = $state(6);
  let reducedMotion = $state(false);
  let graph: AudioGraph | null = null;
  let resumeWhenVisible = false;
  let suspendTimer: number | undefined;
  let mediaQuery: MediaQueryList | undefined;

  function clamp(value: number) {
    return Math.max(0, Math.min(MAX_VOLUME, Number.isFinite(value) ? value : 6));
  }

  function targetGain() {
    return enabled && !muted ? volume / 100 : 0;
  }

  function fadeTo(value: number, seconds = FADE_SECONDS) {
    if (!graph || graph.context.state === 'closed') return;

    const now = graph.context.currentTime;
    const gain = graph.master.gain;
    gain.cancelScheduledValues(now);
    gain.setValueAtTime(gain.value, now);
    gain.linearRampToValueAtTime(value, now + seconds);
  }

  function createNoiseBuffer(context: AudioContext) {
    const seconds = 3;
    const buffer = context.createBuffer(1, context.sampleRate * seconds, context.sampleRate);
    const data = buffer.getChannelData(0);

    // Ruido marrón suave: menos brillo y fatiga que el ruido blanco directo.
    let last = 0;
    for (let index = 0; index < data.length; index += 1) {
      const white = Math.random() * 2 - 1;
      last = (last + 0.02 * white) / 1.02;
      data[index] = last * 3.2;
    }

    return buffer;
  }

  function createPanner(context: AudioContext, pan: number): AudioNode {
    // Fallback silencioso para navegadores Web Audio antiguos sin StereoPanner.
    if (typeof context.createStereoPanner !== 'function') return context.createGain();
    const panner = context.createStereoPanner();
    panner.pan.value = pan;
    return panner;
  }

  function connectPannedTone(
    context: AudioContext,
    master: GainNode,
    frequency: number,
    pan: number,
    level: number,
    sources: AudioScheduledSourceNode[],
    nodes: AudioNode[]
  ) {
    const oscillator = context.createOscillator();
    const toneGain = context.createGain();
    const panner = createPanner(context, pan);

    oscillator.type = 'sine';
    oscillator.frequency.value = frequency;
    toneGain.gain.value = level;

    oscillator.connect(toneGain).connect(panner).connect(master);
    oscillator.start();

    sources.push(oscillator);
    nodes.push(toneGain, panner);
  }

  function createGraph() {
    const context = new AudioContext();
    const master = context.createGain();
    const sources: AudioScheduledSourceNode[] = [];
    const nodes: AudioNode[] = [master];

    master.gain.value = 0;
    master.connect(context.destination);

    const noise = context.createBufferSource();
    const noiseFilter = context.createBiquadFilter();
    const noiseGain = context.createGain();
    const noisePan = createPanner(context, -0.18);

    noise.buffer = createNoiseBuffer(context);
    noise.loop = true;
    noiseFilter.type = 'lowpass';
    noiseFilter.frequency.value = 410;
    noiseFilter.Q.value = 0.42;
    noiseGain.gain.value = 0.023;

    noise.connect(noiseFilter).connect(noiseGain).connect(noisePan).connect(master);
    noise.start();

    sources.push(noise);
    nodes.push(noiseFilter, noiseGain, noisePan);

    // Dos tonos muy bajos, paneados y sin modulación rítmica.
    connectPannedTone(context, master, 87, -0.28, 0.009, sources, nodes);
    connectPannedTone(context, master, 131, 0.24, 0.006, sources, nodes);

    return { context, master, sources, nodes } satisfies AudioGraph;
  }

  async function activate() {
    if (!graph) graph = createGraph();
    if (graph.context.state === 'suspended') await graph.context.resume();

    enabled = true;
    resumeWhenVisible = false;
    clearSuspendTimer();
    fadeTo(targetGain());
  }

  async function deactivate() {
    enabled = false;
    resumeWhenVisible = false;
    fadeTo(0, 0.28);
    scheduleSuspend(320);
  }

  async function toggleAmbient() {
    if (enabled) {
      await deactivate();
    } else {
      await activate();
    }
  }

  function toggleMute() {
    muted = !muted;
    fadeTo(targetGain(), 0.22);
  }

  function updateVolume(event: Event) {
    volume = clamp(Number((event.currentTarget as HTMLInputElement).value));
    fadeTo(targetGain(), 0.14);
  }

  function clearSuspendTimer() {
    if (suspendTimer !== undefined) {
      window.clearTimeout(suspendTimer);
      suspendTimer = undefined;
    }
  }

  function scheduleSuspend(delay: number) {
    clearSuspendTimer();
    suspendTimer = window.setTimeout(() => {
      if (graph && (!enabled || document.hidden) && graph.context.state === 'running') {
        void graph.context.suspend();
      }
    }, delay);
  }

  function handleVisibilityChange() {
    if (!graph || !enabled) return;

    if (document.hidden) {
      resumeWhenVisible = true;
      fadeTo(0, 0.16);
      scheduleSuspend(190);
      return;
    }

    if (resumeWhenVisible) {
      resumeWhenVisible = false;
      clearSuspendTimer();
      void graph.context.resume().then(() => fadeTo(targetGain(), 0.3));
    }
  }

  function setReducedMotion() {
    reducedMotion = mediaQuery?.matches ?? false;
  }

  function dispose() {
    clearSuspendTimer();
    if (!graph) return;

    fadeTo(0, 0.03);
    for (const source of graph.sources) {
      try {
        source.stop();
      } catch {
        // Una fuente ya detenida no requiere acción adicional.
      }
      source.disconnect();
    }
    for (const node of graph.nodes) node.disconnect();
    void graph.context.close();
    graph = null;
  }

  onMount(() => {
    volume = clamp(initialVolume);
    mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion();
    mediaQuery.addEventListener('change', setReducedMotion);
    document.addEventListener('visibilitychange', handleVisibilityChange);
  });

  onDestroy(() => {
    if (typeof document !== 'undefined') {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    }
    mediaQuery?.removeEventListener('change', setReducedMotion);
    dispose();
  });
</script>

<div
  class:reduced-motion={reducedMotion}
  class="ambient-sound"
  aria-label="Controles de ambiente sonoro"
  role="group"
>
  <div class="status-row">
    <span aria-hidden="true" class:active={enabled && !muted} class="status-dot"></span>
    <span class="label">Ambiente</span>
    <span aria-live="polite" class="state">{enabled ? (muted ? 'Silenciado' : 'Activado') : 'Desactivado'}</span>
  </div>

  <div class="controls">
    <button
      aria-pressed={enabled}
      class="toggle"
      onclick={toggleAmbient}
      type="button"
    >
      {enabled ? 'Desactivar' : 'Activar'}
    </button>

    <button
      aria-label={muted ? 'Activar sonido ambiente' : 'Silenciar ambiente'}
      aria-pressed={muted}
      class="mute"
      disabled={!enabled}
      onclick={toggleMute}
      type="button"
    >
      {muted ? 'Activar sonido' : 'Silenciar'}
    </button>

    <label class="volume">
      <span>Volumen <output>{volume}%</output></span>
      <input
        aria-label="Volumen del ambiente, máximo 12 por ciento"
        max={MAX_VOLUME}
        min="0"
        oninput={updateVolume}
        step="1"
        type="range"
        value={volume}
      />
    </label>
  </div>
</div>

<style>
  .ambient-sound {
    align-items: center;
    border: 1px solid color-mix(in srgb, #bdeb34 30%, transparent);
    border-radius: 0.75rem;
    color: #f1f0df;
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem 1rem;
    justify-content: space-between;
    max-width: 42rem;
    padding: 0.75rem 0.9rem;
  }

  .status-row,
  .controls {
    align-items: center;
    display: flex;
    gap: 0.55rem;
  }

  .label {
    font-size: 0.78rem;
    font-weight: 650;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  .state {
    color: #c7c5ba;
    font-size: 0.8rem;
  }

  .status-dot {
    background: #75756f;
    border-radius: 999px;
    height: 0.5rem;
    width: 0.5rem;
  }

  .status-dot.active {
    background: #bdeb34;
    box-shadow: 0 0 0.5rem rgb(189 235 52 / 42%);
  }

  button {
    background: #11110f;
    border: 1px solid #45453d;
    border-radius: 0.45rem;
    color: #f1f0df;
    cursor: pointer;
    font: inherit;
    padding: 0.45rem 0.65rem;
  }

  button:hover:not(:disabled) {
    border-color: #bdeb34;
  }

  button:disabled {
    cursor: not-allowed;
    opacity: 0.46;
  }

  button:focus-visible,
  input:focus-visible {
    outline: 2px solid #bdeb34;
    outline-offset: 3px;
  }

  .volume {
    color: #c7c5ba;
    display: grid;
    font-size: 0.74rem;
    gap: 0.22rem;
    min-width: 8.5rem;
  }

  output {
    color: #f1f0df;
  }

  input[type='range'] {
    accent-color: #bdeb34;
    cursor: pointer;
    max-width: 10rem;
    width: 100%;
  }

  /* No hay animación pulsante: esta clase documenta y respeta reduce motion. */
  .reduced-motion .status-dot.active {
    box-shadow: none;
  }

  @media (max-width: 42rem) {
    .ambient-sound {
      align-items: flex-start;
      flex-direction: column;
    }

    .controls {
      align-items: flex-start;
      flex-wrap: wrap;
    }
  }
</style>
