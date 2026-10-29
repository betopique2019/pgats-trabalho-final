const seletores = {
  primeiroProduto: '.features_items .product-image-wrapper',
  botaoAdicionar: '.productinfo .add-to-cart',
  modalAdicionado: '#cartModal',
  botaoContinuarComprando: '#cartModal .close-modal',
  acessoCarrinho: '.navbar-nav a[href="/view_cart"]',
  tabelaCarrinho: '#cart_info_table',
  produtoCarrinho: '#product-1',
  nomeProduto: '.cart_description h4 a',
  precoProduto: '.cart_price p',
  quantidadeProduto: '.cart_quantity button',
  totalProduto: '.cart_total_price',
  botaoCheckout: '.check_out'
};

function adicionarPrimeiroProduto() {
  cy.get(seletores.primeiroProduto)
    .first()
    .find(seletores.botaoAdicionar)
    .click();

  cy.get(seletores.modalAdicionado).should('be.visible');
  cy.get(seletores.botaoContinuarComprando).click();
  cy.get(seletores.modalAdicionado).should('not.be.visible');
}

function acessarCarrinho() {
  cy.get(seletores.acessoCarrinho).click();
}

function validarProdutoNoCarrinho(produto) {
  cy.location('pathname').should('equal', '/view_cart');
  cy.get(seletores.tabelaCarrinho).should('be.visible');

  cy.get(seletores.produtoCarrinho).within(() => {
    cy.get(seletores.nomeProduto)
      .should('have.text', produto.nome);

    cy.get(seletores.precoProduto)
      .should('have.text', produto.preco);

    cy.get(seletores.quantidadeProduto)
      .should('have.text', '1');

    cy.get(seletores.totalProduto)
      .should('have.text', produto.preco);
  });
}

function prosseguirParaCheckout() {
  cy.get(seletores.botaoCheckout).click();
}

module.exports = {
  adicionarPrimeiroProduto,
  acessarCarrinho,
  validarProdutoNoCarrinho,
  prosseguirParaCheckout
};