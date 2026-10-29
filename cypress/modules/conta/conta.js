const seletores = {
  usuarioAutenticado: '.navbar-nav li',
  botaoExcluirConta: 'a[href="/delete_account"]',
  contaExcluida: '[data-qa="account-deleted"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

function validarUsuarioAutenticado(nome) {
  cy.contains(seletores.usuarioAutenticado, `Logged in as ${nome}`)
    .should('be.visible');
}

function excluirConta() {
  cy.get(seletores.botaoExcluirConta).click();
}

function validarContaExcluida() {
  cy.get(seletores.contaExcluida)
    .should('be.visible')
    .and('contain.text', 'Account Deleted!');
}

function continuarAposExclusao() {
  cy.get(seletores.botaoContinuar).click();
}

module.exports = {
  validarUsuarioAutenticado,
  excluirConta,
  validarContaExcluida,
  continuarAposExclusao
};