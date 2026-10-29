const seletores = {
  logo: '.logo img',
  destaqueInicial: '#slider'
};

function acessarInicio() {
  cy.visit('/');
}

function validarPaginaInicialVisivel() {
  cy.get(seletores.logo).should('be.visible');
  cy.get(seletores.destaqueInicial).should('be.visible');
}

module.exports = {
  acessarInicio,
  validarPaginaInicialVisivel
};