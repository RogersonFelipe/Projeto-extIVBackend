# Sistema de Encaminhamento e Acompanhamento — Backend

API REST para gestão do processo de encaminhamento de candidatos ao mercado de
trabalho e do acompanhamento pós-colocação.

Desenvolvido e apresentado para uma instituição de inclusão no mercado de
trabalho, como projeto de extensão.

O frontend está em [Projeto-extIV](https://github.com/RogersonFelipe/Projeto-extIV).

## O problema

A instituição acompanha candidatos desde o cadastro até a colocação e o
período posterior. Isso envolve dados de pessoas, empresas parceiras,
encaminhamentos feitos, avaliações e fichas de acompanhamento — informações que
antes viviam espalhadas em planilhas, sem histórico nem controle de acesso.

## Stack

- **NestJS** com TypeScript
- **TypeORM** sobre **PostgreSQL**
- **JWT** com Passport para autenticação
- **bcrypt** para hash de senha
- **class-validator** para validação de entrada
- **Swagger** para documentação da API
- **Nodemailer** para recuperação de senha

## Módulos

| Módulo                  | Responsabilidade                                             |
| ----------------------- | ------------------------------------------------------------ |
| `auth`                  | Login, emissão de JWT, guard de perfis, recuperação de senha |
| `usuarios`              | Contas de acesso e níveis de permissão                       |
| `pessoas`               | Cadastro de candidatos                                       |
| `empresas`              | Empresas parceiras que recebem encaminhamentos               |
| `encaminhamentos`       | Vínculo entre candidato e empresa                            |
| `avaliacoes`            | Avaliações aplicadas ao candidato                            |
| `fichas-acompanhamento` | Registro do acompanhamento pós-colocação                     |
| `mail`                  | Envio de e-mail transacional                                 |

São 37 endpoints no total.

## Segurança

- Senha com hash em bcrypt, nunca em texto plano
- JWT validado por guard global, com rotas públicas marcadas explicitamente
- Controle de acesso por nível de usuário (`RolesGuard` + decorator `@Roles`)
- Validação de payload com `class-validator` em todos os DTOs
- Credenciais fora do repositório — ver `.env.example`

## Como rodar

```bash
# 1. dependências
npm install

# 2. banco
#    crie o banco e rode o script de estrutura
psql -U postgres -d nome_do_banco -f BANCO.sql

# 3. variáveis de ambiente
cp .env.example .env
#    preencha conexão do banco, segredo do JWT e credenciais de e-mail

# 4. subir em desenvolvimento
npm run start:dev
```

A documentação da API fica disponível em `/api` depois que a aplicação sobe.
