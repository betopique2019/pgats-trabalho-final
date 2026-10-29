const seletores = {
  acessoLogin: 'a[href="/login"]',
  tituloFormulario: '.login-form h2',
  email: '[data-qa="login-email"]',
  senha: '[data-qa="login-password"]',
  botaoEntrar: '[data-qa="login-button"]',
  mensagemErro: '.login-form form p'
};

function acessarLogin() {
  cy.intercept({
    method: 'GET',
    pathname: '/login'
  }).as('carregarLogin');

  cy.get(seletores.acessoLogin).click();
  cy.wait('@carregarLogin');

  cy.location('pathname').should('equal', '/login');
  cy.get(seletores.email).should('be.visible');
}

function validarFormularioVisivel() {
  cy.get(seletores.tituloFormulario)
    .should('be.visible')
    .and('have.text', 'Login to your account');
}

function efetuarLogin(email, senha) {
  cy.intercept({
    method: 'POST',
    pathname: '/login'
  }).as('enviarLogin');

  cy.get(seletores.email).type(email);
  cy.get(seletores.senha).type(senha, {
    log: false,
    parseSpecialCharSequences: false
  });

  cy.get(seletores.botaoEntrar).click();
  cy.wait('@enviarLogin');
}

function validarCredenciaisInvalidas() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Your email or password is incorrect!');
}

module.exports = {
  acessarLogin,
  validarFormularioVisivel,
  efetuarLogin,
  validarCredenciaisInvalidas
};