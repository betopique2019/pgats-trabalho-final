const seletores = {
  botaoSair: 'a[href="/logout"]',
  formularioLogin: '.login-form'
};

function efetuarLogout() {
  cy.get(seletores.botaoSair).click();
}

function validarUsuarioDesconectado() {
  cy.location('pathname').should('equal', '/login');
  cy.get(seletores.formularioLogin).should('be.visible');
  cy.get(seletores.botaoSair).should('not.exist');
}

module.exports = {
  efetuarLogout,
  validarUsuarioDesconectado
};