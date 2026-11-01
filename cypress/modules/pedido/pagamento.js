const seletores = {
  formulario: '#payment-form',
  nomeCartao: '[data-qa="name-on-card"]',
  numeroCartao: '[data-qa="card-number"]',
  cvc: '[data-qa="cvc"]',
  mesValidade: '[data-qa="expiry-month"]',
  anoValidade: '[data-qa="expiry-year"]',
  botaoConfirmar: '[data-qa="pay-button"]',
  mensagemSucesso: '#success_message',
  tituloConfirmacao: '[data-qa="order-placed"]',
  mensagemConfirmacao: '#form p'
};

function realizarPagamento(pagamento) {
  let mensagemSucessoValidada = false;

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

  cy.get(seletores.formulario).then(($formulario) => {
    // A mensagem aparece no envio e desaparece com a navegação.
    $formulario[0].addEventListener('submit', () => {
      const mensagem = $formulario.find(seletores.mensagemSucesso);

      expect(mensagem, 'mensagem de sucesso do pagamento')
        .to.be.visible;

      expect(mensagem.text())
        .to.include('Your order has been placed successfully!');

      mensagemSucessoValidada = true;
    }, { once: true });
  });

  cy.get(seletores.botaoConfirmar).click();

  cy.then(() => {
    expect(
      mensagemSucessoValidada,
      'mensagem de sucesso validada antes da navegação'
    ).to.equal(true);
  });
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