# Política de Segurança

O **Casa de Jogos** leva a segurança a sério. Este documento descreve quais versões recebem correções e como reportar vulnerabilidades.

## Versões suportadas

O projeto está em desenvolvimento inicial (v0.1.0) e não possui lançamentos formais. Enquanto estiver nessa fase, apenas o estado mais recente do código recebe correções de segurança:

| Versão / Branch          | Suporte        |
| ------------------------ | -------------- |
| `main` (estado atual)    | ✅ Suportada   |
| `develop` (integração)   | ✅ Suportada   |
| Versões anteriores       | ❌ Sem suporte |

Quando versões estáveis forem publicadas, esta política será atualizada para refletir o ciclo de suporte.

## Reportando uma vulnerabilidade

**Não abra Issues públicas sobre vulnerabilidades de segurança.** Isso pode expor o problema antes que ele seja corrigido.

Para reportar uma vulnerabilidade:

- Utilize o recurso **privado de segurança do GitHub** (seção **Security** do repositório → **Report a vulnerability**), caso esteja habilitado para o projeto.
- Inclua uma descrição clara do problema, passos para reproduzir e o impacto possível.
- O reporte será tratado de forma confidencial.

Você também pode reportar via Issues *privadas* se o repositório estiver configurado para isso.

## Considerações de segurança para contribuidores

Ao contribuir com o projeto, siga estas orientações:

- **Nunca adicione secrets ao repositório** — senhas, tokens ou chaves não pertencem ao código.
- **Não coloque API keys no código** — nem em componentes, nem em arquivos de configuração.
- **Não commite `.env`** — arquivos de ambiente já estão no `.gitignore`. Use variáveis de ambiente quando necessário.
- **Valide inputs** — se o jogo aceitar entradas do usuário, trate-as com cuidado (especialmente em jogos que usam URL, storage ou qualquer processamento).
- **Evite dependências suspeitas** — prefira bibliotecas conhecidas e amplamente utilizadas. Ao adicionar uma nova dependência, avalie o risco.
- **Mantenha dependências atualizadas** — dependências desatualizadas são uma fonte comum de vulnerabilidades.

> Dica: este projeto é 100% executado no navegador (frontend). Nenhum dado sensível deve ser armazenado no cliente — nem em `localStorage`, nem em cookies, nem em qualquer outro mecanismo.