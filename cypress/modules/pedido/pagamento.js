const seletores = {
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoConfirmar: '[data-qa="pay-button"]',
  tituloConfirmacao: '[data-qa="order-placed"]',
  mensagemConfirmacao: '#form p'
};

function realizarPagamento(pagamento) {
  cy.location('pathname').should('equal', '/payment');

  cy.get(seletores.nomeCartao).type(pagamento.nomeCartao);
  cy.get(seletores.numeroCartao).type(pagamento.numeroCartao, {
    log: false
  });
  cy.get(seletores.cvc).type(pagamento.cvc, {
    log: false
  });
  cy.get(seletores.mesValidade).type(pagamento.mesValidade);
  cy.get(seletores.anoValidade).type(pagamento.anoValidade);

  cy.get(seletores.botaoConfirmar).click();
}

function validarPedidoConfirmado() {
  cy.get(seletores.tituloConfirmacao)
    .should('be.visible')
    .and('contain.text', 'Order Placed!');

  cy.contains(
    seletores.mensagemConfirmacao,
    'Congratulations! Your order has been confirmed!'
  ).should('be.visible');
}

module.exports = {
  realizarPagamento,
  validarPedidoConfirmado
};