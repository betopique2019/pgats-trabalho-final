const seletores = {
  rodape: '#footer',
  tituloAssinatura: '#footer .single-widget h2',
  email: '#susbscribe_email',
  botaoAssinar: '#subscribe',
  mensagemSucesso: '#success-subscribe'
};

function validarAssinaturaNoRodape() {
  cy.get(seletores.rodape).scrollIntoView();

  cy.get(seletores.tituloAssinatura)
    .should('be.visible')
    .and('have.text', 'Subscription');
}

function assinarNovidades(email) {
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoAssinar).click();
}

function validarAssinaturaRealizada() {
  cy.get(seletores.mensagemSucesso)
    .should('be.visible')
    .and('contain.text', 'You have been successfully subscribed!');
}

module.exports = {
  validarAssinaturaNoRodape,
  assinarNovidades,
  validarAssinaturaRealizada
};