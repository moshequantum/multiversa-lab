-- DDL de Inicialización del Ecosistema Multiversa en Postgres de InsForge
-- Habilitar extensión vector de pgvector si está disponible para embeddings semánticos
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "vector";

-- 1. Tabla heredada de solicitudes públicas
CREATE TABLE IF NOT EXISTS founders_waitlist (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(200) NOT NULL,
    email VARCHAR(320) NOT NULL UNIQUE,
    plan_interest VARCHAR(100) NOT NULL,
    source VARCHAR(200) DEFAULT 'lab.multiversa.group',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indexar correo para búsquedas rápidas en el registro heredado
CREATE INDEX IF NOT EXISTS idx_founders_waitlist_email ON founders_waitlist(email);

-- 2. Tabla de Nodos de Identidad / Grafo de Conocimiento (Graphify)
CREATE TABLE IF NOT EXISTS identity_nodes (
    id VARCHAR(255) PRIMARY KEY,
    label VARCHAR(100) NOT NULL,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Tabla de Conexiones / Aristas de Identidad (Graphify)
CREATE TABLE IF NOT EXISTS identity_edges (
    id VARCHAR(255) PRIMARY KEY,
    source_id VARCHAR(255) NOT NULL REFERENCES identity_nodes(id) ON DELETE CASCADE,
    target_id VARCHAR(255) NOT NULL REFERENCES identity_nodes(id) ON DELETE CASCADE,
    type VARCHAR(100) NOT NULL,
    properties JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_identity_edges_source ON identity_edges(source_id);
CREATE INDEX IF NOT EXISTS idx_identity_edges_target ON identity_edges(target_id);

-- 4. Tabla de Decisiones e Hitos de Simulación (MiroFish)
CREATE TABLE IF NOT EXISTS identity_decisions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    simulation_name VARCHAR(200) NOT NULL,
    decision TEXT NOT NULL,
    metrics JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 5. Tabla de Memoria Semántica L2/L3 (Sincronización de Engram)
CREATE TABLE IF NOT EXISTS l2_semantic_memory (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    session_id VARCHAR(255) NOT NULL,
    project VARCHAR(100) NOT NULL,
    content TEXT NOT NULL,
    embedding VECTOR(1536), -- Vector de 1536 dimensiones para embeddings de OpenAI
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_l2_semantic_memory_session ON l2_semantic_memory(session_id);
CREATE INDEX IF NOT EXISTS idx_l2_semantic_memory_project ON l2_semantic_memory(project);

-- 6. Tabla de Bitácoras de Auditoría del Agente
CREATE TABLE IF NOT EXISTS audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    agent_id VARCHAR(100) NOT NULL,
    operation VARCHAR(100) NOT NULL,
    details JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_agent_op ON audit_logs(agent_id, operation);
