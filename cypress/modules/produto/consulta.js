const seletores = {
  acessoProdutos: 'a[href="/products"]',
  tituloListagem: '.features_items h2.title',
  listaProdutos: '.features_items .product-image-wrapper',
  nomesProdutos: '.features_items .productinfo p',
  campoPesquisa: '#search_product',
  botaoPesquisar: '#submit_search',
  detalhesPrimeiroProduto: 'a[href="/product_details/1"]',
  informacoesProduto: '.product-information',
  nomeProduto: '.product-information h2',
  precoProduto: '.product-information span span'
};

function acessarProdutos() {
  cy.intercept({
    method: 'GET',
    pathname: '/products'
  }).as('carregarProdutos');

  cy.get(seletores.acessoProdutos).click();
  cy.wait('@carregarProdutos');
}

function validarListagemVisivel() {
  cy.location('pathname').should('equal', '/products');

  cy.contains(seletores.tituloListagem, 'All Products')
    .should('be.visible');

  cy.get(seletores.listaProdutos)
    .should('have.length.greaterThan', 0);

  cy.get(seletores.listaProdutos).first().should('be.visible');
}

function consultarPrimeiroProduto() {
  cy.get(seletores.detalhesPrimeiroProduto).click();
}

function validarDetalhesProduto(produto) {
  cy.location('pathname').should('equal', '/product_details/1');

  cy.get(seletores.nomeProduto)
    .should('be.visible')
    .and('have.text', produto.nome);

  cy.get(seletores.precoProduto)
    .should('be.visible')
    .and('have.text', produto.preco);

  cy.get(seletores.informacoesProduto).within(() => {
    cy.contains('p', `Category: ${produto.categoria}`)
      .should('be.visible');

    cy.contains('p', 'Availability:')
      .should('be.visible')
      .and('contain.text', produto.disponibilidade);

    cy.contains('p', 'Condition:')
      .should('be.visible')
      .and('contain.text', produto.condicao);

    cy.contains('p', 'Brand:')
      .should('be.visible')
      .and('contain.text', produto.marca);
  });
}

function pesquisarProduto(termo) {
  cy.get(seletores.campoPesquisa).clear().type(termo);
  cy.get(seletores.botaoPesquisar).click();
}

function validarResultadosPesquisa(nomesEsperados) {
  cy.contains(seletores.tituloListagem, 'Searched Products')
    .should('be.visible');

  cy.get(seletores.nomesProdutos).should(($nomes) => {
    const nomesEncontrados = Array.from(
      $nomes,
      (elemento) => elemento.textContent.trim()
    );

    expect(nomesEncontrados).to.have.members(nomesEsperados);
  });

  cy.get(seletores.nomesProdutos).each(($nome) => {
    cy.wrap($nome).should('be.visible');
  });
}

module.exports = {
  acessarProdutos,
  validarListagemVisivel,
  consultarPrimeiroProduto,
  validarDetalhesProduto,
  pesquisarProduto,
  validarResultadosPesquisa
};