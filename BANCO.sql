-- ──────────────────────────────────────────────────────────────
-- ENUMS
-- ──────────────────────────────────────────────────────────────
CREATE TYPE usuarios_nivel_acesso_enum          AS ENUM ('admin', 'usuario');
CREATE TYPE encaminhamentos_status_enum         AS ENUM ('ativo', 'desligado');
CREATE TYPE avaliacoes_tipo_enum                AS ENUM ('inicial', 'acompanhamento');
CREATE TYPE avaliacoes_resultado_controle_enum  AS ENUM ('em-andamento', 'aprovado', 'reprovado');
CREATE TYPE avaliacoes_status_avaliacao_enum    AS ENUM ('em_aberto', 'finalizado', 'cancelado');
CREATE TYPE fichas_acompanhamento_status_enum   AS ENUM ('em-aberto', 'finalizada');

-- ──────────────────────────────────────────────────────────────
-- TABELAS (sem FK)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE pessoas (
    id                   SERIAL PRIMARY KEY,
    nome                 VARCHAR(150) NOT NULL,
    cpf                  VARCHAR(14)  UNIQUE,
    foto_url             TEXT,
    data_nascimento      DATE,
    data_entrada         DATE,
    status               VARCHAR(10)  NOT NULL DEFAULT 'ativo',
    usa_medicamento      BOOLEAN      NOT NULL DEFAULT FALSE,
    info_medicamentos    TEXT,
    telefone             VARCHAR(20),
    nome_responsavel     VARCHAR(150),
    telefone_responsavel VARCHAR(20),
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW()
);

CREATE TABLE empresas (
    id               SERIAL PRIMARY KEY,
    nome_fantasia    VARCHAR(255),
    razao_social     VARCHAR(255),
    cnpj             VARCHAR(18) UNIQUE,
    endereco         VARCHAR(255),
    telefone         VARCHAR(20),
    contato_rh_nome  VARCHAR(255),
    contato_rh_email VARCHAR(255),
    created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE usuarios (
    id                 SERIAL PRIMARY KEY,
    nome               VARCHAR(150) NOT NULL,
    email              VARCHAR(150) NOT NULL UNIQUE,
    senha_hash         TEXT         NOT NULL,
    foto_url           TEXT,
    token_recuperacao  VARCHAR,
    validade_token     TIMESTAMP,
    nivel_acesso       usuarios_nivel_acesso_enum NOT NULL DEFAULT 'usuario',
    created_at         TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at         TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ──────────────────────────────────────────────────────────────
-- TABELAS (com FK)
-- ──────────────────────────────────────────────────────────────
CREATE TABLE encaminhamentos (
    id                        SERIAL PRIMARY KEY,
    pessoa_id                 INTEGER NOT NULL,
    empresa_id                INTEGER NOT NULL,
    data_admissao             DATE,
    funcao                    VARCHAR(255),
    contato_rh                VARCHAR(255),
    data_provavel_desligamento DATE,
    status                    encaminhamentos_status_enum NOT NULL DEFAULT 'ativo',
    observacoes               TEXT,
    motivo_desligamento       TEXT,
    created_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at                TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_enc_pessoa  FOREIGN KEY (pessoa_id)  REFERENCES pessoas(id)  ON DELETE CASCADE,
    CONSTRAINT fk_enc_empresa FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE CASCADE
);

CREATE TABLE avaliacoes (
    id                          SERIAL PRIMARY KEY,
    pessoa_id                   INTEGER NOT NULL,
    encaminhamento_id           INTEGER,
    data_avaliacao              DATE,
    tipo                        avaliacoes_tipo_enum,
    professor_responsavel       VARCHAR(255),
    data_ingresso               DATE,
    data_primeira_avaliacao     DATE,
    data_segunda_avaliacao      DATE,
    data_primeira_entrevista_pais DATE,
    data_segunda_entrevista_pais  DATE,
    resultado_controle          avaliacoes_resultado_controle_enum NOT NULL DEFAULT 'em-andamento',
    observacao_controle         TEXT,
    status_avaliacao            avaliacoes_status_avaliacao_enum   NOT NULL DEFAULT 'em_aberto',
    q01 SMALLINT, q02 SMALLINT, q03 SMALLINT, q04 SMALLINT, q05 SMALLINT,
    q06 SMALLINT, q07 SMALLINT, q08 SMALLINT, q09 SMALLINT, q10 SMALLINT,
    q11 SMALLINT, q12 SMALLINT, q13 SMALLINT, q14 SMALLINT, q15 SMALLINT,
    q16 SMALLINT, q17 SMALLINT, q18 SMALLINT, q19 SMALLINT, q20 SMALLINT,
    q21 SMALLINT, q22 SMALLINT, q23 SMALLINT, q24 SMALLINT, q25 SMALLINT,
    q26 SMALLINT, q27 SMALLINT, q28 SMALLINT, q29 SMALLINT, q30 SMALLINT,
    q31 SMALLINT, q32 SMALLINT, q33 SMALLINT, q34 SMALLINT, q35 SMALLINT,
    q36 SMALLINT, q37 SMALLINT, q38 SMALLINT, q39 SMALLINT, q40 SMALLINT,
    q41 SMALLINT, q42 SMALLINT, q43 SMALLINT, q44 SMALLINT, q45 SMALLINT,
    q46 SMALLINT,
    q47 VARCHAR(250),
    q48 VARCHAR(250),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_aval_pessoa FOREIGN KEY (pessoa_id)         REFERENCES pessoas(id)          ON DELETE CASCADE,
    CONSTRAINT fk_aval_enc   FOREIGN KEY (encaminhamento_id)  REFERENCES encaminhamentos(id)  ON DELETE SET NULL
);

CREATE TABLE fichas_acompanhamento (
    id           SERIAL PRIMARY KEY,
    pessoa_id    INTEGER NOT NULL,
    empresa_id   INTEGER,
    data_visita  DATE,
    data_admissao DATE,
    contato_rh   VARCHAR(255),
    contato_com  VARCHAR(255),
    status       fichas_acompanhamento_status_enum NOT NULL DEFAULT 'em-aberto',
    parecer_geral TEXT,
    created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT fk_ficha_pessoa  FOREIGN KEY (pessoa_id)  REFERENCES pessoas(id)  ON DELETE CASCADE,
    CONSTRAINT fk_ficha_empresa FOREIGN KEY (empresa_id) REFERENCES empresas(id) ON DELETE SET NULL
);

-- ──────────────────────────────────────────────────────────────
-- SEED: admin
-- ──────────────────────────────────────────────────────────────
INSERT INTO usuarios (nome, email, senha_hash, nivel_acesso)
VALUES (
    'Admin',
    'admin@gmail.com',
    '$2b$12$78F3CoLAMZLXIJ8.cuqyT.EhM4I/rAOwN23xXSZzWLgW63IHf1S4W',
    'admin'
);
