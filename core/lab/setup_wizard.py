#!/usr/bin/env python3
"""
Multiversa Core — Configurador Guiado (para el entusiasta no-desarrollador)

Objetivo: en 3 preguntas en lenguaje de negocio, generar un config.yaml valido
y un perfil IO listo para empezar a experimentar. Cero codigo, cero build.

Uso:
    python lab/setup_wizard.py            # modo interactivo
    python lab/setup_wizard.py --dry-run  # no escribe archivos (demo)
"""
import os
import sys
import yaml
from pathlib import Path

HOME = Path(os.environ.get("HERMES_HOME", os.path.expanduser("~/.hermes")))
CONFIG_PATH = HOME / "config.yaml"
PROFILE_DIR = HOME / "profiles" / "default"

MODEL_PRESETS = {
    "1": ("nous/tencent-hy3-free", "Nous (gratis, entra y prueba)"),
    "2": ("openrouter/anthropic/claude-sonnet-4.6", "Claude Sonnet (calidad alta)"),
    "3": ("openrouter/openai/gpt-5", "OpenAI GPT-5 (razonamiento)"),
    "4": ("openrouter/google/gemini-2.5-pro", "Gemini Pro (largo contexto)"),
}


def ask(prompt, default=None):
    if "--dry-run" in sys.argv:
        return default if default is not None else ""
    suffix = f" [{default}]" if default else ""
    val = input(f"{prompt}{suffix}: ").strip()
    return val or (default or "")


def choose(prompt, options, default_key):
    print(prompt)
    for k, (_, label) in options.items():
        print(f"  {k}) {label}")
    if "--dry-run" in sys.argv:
        return options[default_key][0]
    while True:
        val = input(f"Elige [{default_key}]: ").strip() or default_key
        if val in options:
            return options[val][0]
        print("  Opcion no valida. Intenta de nuevo.")


def build_config(business_name, persona, model):
    return {
        "model": {"default": model, "provider": model.split("/")[0]},
        "agent": {"max_turns": 90},
        "display": {"interface": "tui", "language": "es", "skin": "default"},
        "memory": {"memory_enabled": True, "user_profile_enabled": True, "provider": "engram"},
        "approvals": {"mode": "smart"},
        "tools": {"knowledge_graph": "graphify"},
        "_meta": {
            "generated_by": "Multiversa Core setup wizard",
            "business": business_name,
            "persona": persona,
            "license_note": "Fork of Hermes Agent (MIT) — Copyright (c) 2025 Nous Research, (c) 2026 Multiversa Group LLC",
        },
    }


def main():
    print("=" * 64)
    print("  MULTIVERSA CORE — Bienvenido")
    print("  Tu fabrica de Sistemas Inteligentes para Negocios")
    print("=" * 64)
    print("Responde 3 preguntas simples y listo. Nada de codigo.")
    print()

    business = ask("1) ¿Cual es el nombre de tu negocio o proyecto?", "Mi Negocio")
    persona = ask("2) ¿Como quieres que tu sistema hable contigo? (ej: cercano, tecnico, formal)", "cercano y claro")
    model = choose(
        "3) ¿Que inteligencia usa tu sistema?",
        MODEL_PRESETS,
        "1",
    )

    cfg = build_config(business, persona, model)

    if "--dry-run" in sys.argv:
        print("\n--- config.yaml que se generaria ---")
        print(yaml.safe_dump(cfg, sort_keys=False, allow_unicode=True))
        print(f"Negocio: {business} | Persona: {persona} | Modelo: {model}")
        print("(dry-run: no se escribio nada)")
        return

    CONFIG_PATH.parent.mkdir(parents=True, exist_ok=True)
    with open(CONFIG_PATH, "w") as f:
        yaml.safe_dump(cfg, f, sort_keys=False, allow_unicode=True)

    # perfil IO por defecto (reglas de voz)
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    io_rules = {
        "voice": {
            "no_voseo": True,
            "language": "es",
            "persona": persona,
        },
        "branding": {"accent_chartreuse": "#BDEB34"},
    }
    with open(PROFILE_DIR / "io.yaml", "w") as f:
        yaml.safe_dump(io_rules, f, sort_keys=False, allow_unicode=True)

    print()
    print("✓ Listo. Tu sistema esta configurado.")
    print(f"  - Config: {CONFIG_PATH}")
    print(f"  - Perfil IO: {PROFILE_DIR / 'io.yaml'}")
    print()
    print("Ahora solo abre Multiversa Core y empieza a hablar con tu sistema.")
    print("Menos cosas en tu cabeza. Mas negocio funcionando con contexto.")


if __name__ == "__main__":
    main()
