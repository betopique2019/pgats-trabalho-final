# Trabalho final — Automação de Testes Web

Projeto individual da disciplina de Automação de Testes na Camada de Interface Web — PGATS.

Autor: Roberto Souza.

Aplicação utilizada: https://automationexercise.com

## Tecnologias

- Node.js 26.13.0
- Cypress 16.2.1
- Cypress Mochawesome Reporter 5.0.0
- Google Chrome
- GitHub Actions

## Casos implementados

| Caso | Cenário |
| --- | --- |
| TC01 | Cadastrar usuário e excluir a conta |
| TC02 | Login com e-mail e senha corretos |
| TC03 | Login com e-mail e senha incorretos |
| TC04 | Logout de usuário |
| TC05 | Cadastro com e-mail já existente |
| TC08 | Listagem de produtos e detalhes do primeiro produto |
| TC09 | Pesquisa de produtos |
| TC10 | Assinatura de novidades na página inicial |
| TC15 | Pedido com cadastro antes do checkout |
| TC16 | Pedido com login antes do checkout |

Os dez cenários estão em `cypress/e2e/trabalho-final.cy.js`.

## Organização

- `cypress/e2e`: organização dos cenários e chamadas das ações.
- `cypress/modules`: ações de negócio, seletores e validações, organizados por funcionalidade.
- `cypress/fixtures`: dados fictícios dos testes.
- `cypress/support`: suporte do Cypress e registro do reporter.
- `cypress.config.js`: URL base e configuração do relatório.
- `.github/workflows/testes.yml`: execução no GitHub Actions.

Os módulos utilizam funções em português e `module.exports`, sem classes ou Page Objects. Os seletores são CSS, sem XPath.

## Instalação

Com Node.js e Google Chrome instalados, abra um terminal na raiz do projeto:

```bash
npm ci
```

O `package-lock.json` mantém as versões das dependências. O script de instalação do Cypress está autorizado no `package.json`.

## Execução

Para executar os dez testes no Chrome e gerar o relatório:

```bash
npm test
```

Para abrir o modo interativo:

```bash
npm run cy:open
```

No modo interativo, selecione E2E Testing, Chrome e a spec `trabalho-final.cy.js`.

No PowerShell, caso exista restrição para executar `npm.ps1`, utilize `npm.cmd` no lugar de `npm`.

## Relatório

Após `npm test`, abra:

```text
cypress/reports/index.html
```

O relatório Mochawesome apresenta os resultados e incorpora as capturas de tela disponíveis para falhas.

Os relatórios são gerados a cada execução e não são versionados.

## GitHub Actions

O workflow executa em pushes e pull requests para `main`. Também permite execução manual pela aba Actions.

Etapas:

1. Obter o código do repositório.
2. Configurar o Node.js.
3. Instalar as dependências com `npm ci`.
4. Executar os testes no Chrome com `npm test`.
5. Disponibilizar relatórios e capturas de tela como artefato.

Para consultar o relatório do CI, abra a execução na aba Actions, baixe o artefato `relatorio-cypress`, extraia o ZIP e abra `reports/index.html`.

Os artefatos ficam disponíveis por 30 dias.

## Dados e independência dos testes

Os cenários que precisam de uma conta criam seu próprio usuário, com e-mail gerado durante a execução. Não dependem de uma conta pessoal nem da execução de outro teste.

As contas são excluídas ao final dos cenários concluídos com sucesso. Uma interrupção ou falha anterior à exclusão pode deixar uma conta de teste na aplicação.

Os dados de endereço e pagamento são fictícios.

## Revisão do código

Durante a implementação foram revisados:

- Cliques duplicados e validações redundantes presentes nos exemplos.
- Comentários e código sem uso.
- Separação entre cenários, dados e módulos.
- Reutilização da preparação de usuários em quatro cenários.
- Sincronização de navegação e login por requisições reais, sem pausas fixas.
- Comparação de endereços com normalização de espaços e quebras de linha.

As interceptações observam as requisições; não simulam respostas da aplicação.

## Entrega

Repositório: https://github.com/betopique2019/pgats-trabalho-final

Para entregar o projeto em ZIP, utilize o código do repositório, sem a pasta `node_modules`. O relatório do CI pode ser anexado separadamente como evidência da execução.