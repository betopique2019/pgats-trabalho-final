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
- `cypress/support`: registro do reporter.
- `cypress.config.js`: URL base e configuração do relatório.
- `.github/workflows/testes.yml`: execução no GitHub Actions.

Os módulos utilizam funções em português e `module.exports`, sem classes ou Page Objects.

Os seletores ficam em constantes chamadas `seletores`. São utilizados seletores CSS, sem XPath.

As specs recebem os dados das fixtures e orquestram as ações. As interações e asserções ficam nos módulos.

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

## Relatório Mochawesome

Após `npm test`, abra:

```text
cypress/reports/index.html
```

O relatório apresenta os resultados dos testes e incorpora as capturas de tela disponíveis para falhas.

O diretório de relatórios é recriado a cada execução. Os relatórios não são versionados no Git.

No GitHub Actions, o relatório é disponibilizado no artefato `relatorio-cypress`. Para consultá-lo:

1. Abra a execução desejada na aba Actions.
2. Baixe o artefato `relatorio-cypress`.
3. Extraia o ZIP.
4. Abra `reports/index.html`.

Os artefatos ficam disponíveis por 30 dias. Para preservar a evidência da entrega, mantenha uma cópia do relatório da execução correspondente ao código entregue.

## GitHub Actions

O workflow executa em pushes e pull requests para `main`. Também permite execução manual pela aba Actions.

Etapas:

1. Obter o código do repositório.
2. Configurar o Node.js.
3. Instalar as dependências com `npm ci`.
4. Executar os testes no Chrome com `npm test`.
5. Disponibilizar relatórios e capturas de tela como artefato, inclusive se houver falhas nos testes.

## Validação do pagamento nos TC15 e TC16

O enunciado exige a mensagem:

```text
Your order has been placed successfully!
```

Na aplicação, essa mensagem começa oculta e é exibida pelo próprio site no evento de envio do formulário. Em seguida, ocorre a navegação para a página de confirmação.

O módulo de pagamento registra um observador do evento `submit` para verificar a visibilidade e o texto dessa mensagem antes da navegação. Uma variável local registra que a verificação foi executada; o teste falha se ela não acontecer.

O observador não impede o envio, não exibe a mensagem por conta própria e não altera a resposta do servidor.

Após a navegação, o teste também verifica as confirmações permanentes:

```text
Order Placed!
Congratulations! Your order has been confirmed!
```

Assim, os testes verificam tanto a mensagem solicitada no enunciado quanto a confirmação exibida na página seguinte.

## Dados e independência dos testes

Os cenários que precisam de uma conta criam seu próprio usuário, com e-mail gerado durante a execução. Não dependem de uma conta pessoal nem da execução de outro teste.

O módulo de preparação reutiliza o cadastro e o logout nos TC02, TC04, TC05 e TC16.

As contas são excluídas ao final dos cenários concluídos com sucesso. Uma interrupção ou falha anterior à exclusão pode deixar uma conta de teste na aplicação.

Os dados de endereço e pagamento são fictícios.

A consulta de detalhes e as verificações de compra utilizam o produto Blue Top, ID 1. A implementação considera a organização atual do catálogo, em que ele é o primeiro produto. Uma mudança nessa ordenação exige revisar os seletores e os dados esperados.

## Revisão e uso de IA

O desenvolvimento contou com apoio de IA. O código foi revisado e ajustado durante a implementação, considerando as diretrizes de arquitetura fornecidas na disciplina.

Foram realizadas as seguintes revisões:

- Remoção de cliques duplicados e validações redundantes dos exemplos utilizados como referência.
- Remoção do arquivo de comandos de exemplo sem uso e de sua importação.
- Separação entre cenários, dados e módulos de ações de negócio.
- Reutilização da preparação de usuários em quatro cenários.
- Centralização dos seletores dos módulos.
- Sincronização de navegação e login por requisições reais, sem pausas fixas.
- Comparação de endereços com normalização de espaços e quebras de linha.
- Validação da mensagem transitória do pagamento e da confirmação na página seguinte.

As interceptações observam as requisições; não simulam respostas da aplicação.

Os testes foram executados localmente e pelo GitHub Actions. O relatório de cada execução registra o resultado da versão executada.

## Entrega

Repositório: https://github.com/betopique2019/pgats-trabalho-final

O ZIP do projeto deve conter o código, as configurações e esta documentação, sem a pasta `node_modules`.

O relatório da execução final no GitHub Actions deve acompanhar a entrega como evidência, em arquivo separado ou incluído no pacote de entrega.