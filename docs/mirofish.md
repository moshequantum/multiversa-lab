# Multiversa Lab — Simulation Layer: MiroFish

**MiroFish** is the predictive simulation engine of Multiversa Lab. It creates a "parallel digital world" populated by thousands of autonomous agents to test decisions, policies, marketing strategies, or creative stories before deploying them to reality.

---

## Parallel Scenario Testing

Traditional software testing checks if code crashes. It cannot check if a new feature will convert users, if a pricing change will trigger backlash, or if a policy change will succeed.

MiroFish solves this by creating simulations of human behavior using swarm intelligence.

---

## Technical Foundation

- **OASIS Integration:** Built upon the **Open Agent Social Interaction Simulations** (OASIS) framework.
- **Neo4j / Graph database:** Stores agent relationships, long-term memories, and logs of social interactions.
- **Local Execution:** Community forks (like `MiroFish-Offline`) use local LLMs (Ollama) and Neo4j databases for complete offline confidentiality.
- **God's-eye View:** Provides an interactive interface where users can observe agent discussions, view relationships, and inject variables (e.g. "inject competitor price drop") to forecast outcomes.

---

## Integration in Multiversa Lab

Within the Lab, MiroFish is an optional, external simulation adapter. It is not a
required layer and access is not conditioned by a product tier:
- Before releasing a major landing page update or pricing structure, we upload the design systems and copy.
- The MiroFish simulator populates agents reflecting our user target profiles.
- Agents interact, write reviews, and simulate conversions.
- The data is analyzed and saved in InsForge (`audit_logs` and `identity_decisions` tables) to rank which copy or design performs best.
