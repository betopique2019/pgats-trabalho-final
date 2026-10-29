const seletores = {
  tituloSecao: '.step-one h2',
  enderecoEntrega: '#address_delivery',
  enderecoCobranca: '#address_invoice',
  produtoPedido: '#product-1',
  nomeProduto: '.cart_description h4 a',
  precoProduto: '.cart_price p',
  quantidadeProduto: '.cart_quantity button',
  totalProduto: '.cart_total_price',
  comentario: 'textarea[name="message"]',
  botaoFinalizarPedido: 'a[href="/payment"]'
};

function validarEnderecos(usuario) {
  cy.location('pathname').should('equal', '/checkout');

  cy.contains(seletores.tituloSecao, 'Address Details')
    .should('be.visible');

  const dadosEndereco = [
    `${usuario.primeiroNome} ${usuario.sobrenome}`,
    usuario.empresa,
    usuario.endereco,
    usuario.complemento,
    `${usuario.cidade} ${usuario.estado} ${usuario.cep}`,
    usuario.pais,
    usuario.telefone
  ];

  [
    seletores.enderecoEntrega,
    seletores.enderecoCobranca
  ].forEach((endereco) => {
    cy.get(endereco)
      .should('be.visible')
      .should(($endereco) => {
        const textoEndereco = $endereco.text().replace(/\s+/g, ' ').trim();

        dadosEndereco.forEach((dado) => {
          expect(textoEndereco).to.include(dado);
        });
      });
  });
}

function validarResumoPedido(produto) {
  cy.contains(seletores.tituloSecao, 'Review Your Order')
    .should('be.visible');

  cy.get(seletores.produtoPedido).within(() => {
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

function finalizarPedido(comentario) {
  cy.get(seletores.comentario).type(comentario);
  cy.get(seletores.botaoFinalizarPedido).click();
}

module.exports = {
  validarEnderecos,
  validarResumoPedido,
  finalizarPedido
};