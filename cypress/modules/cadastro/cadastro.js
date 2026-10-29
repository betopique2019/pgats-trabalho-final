const seletores = {
  tituloCadastro: '.signup-form h2',
  nome: '[data-qa="signup-name"]',
  email: '[data-qa="signup-email"]',
  botaoIniciarCadastro: '[data-qa="signup-button"]',
  mensagemErro: '.signup-form form p',
  tituloInformacoes: '.login-form h2',
  tratamento: '#id_gender1',
  senha: '[data-qa="password"]',
  diaNascimento: '[data-qa="days"]',
  mesNascimento: '[data-qa="months"]',
  anoNascimento: '[data-qa="years"]',
  newsletter: '#newsletter',
  ofertas: '#optin',
  primeiroNome: '[data-qa="first_name"]',
  sobrenome: '[data-qa="last_name"]',
  empresa: '[data-qa="company"]',
  endereco: '[data-qa="address"]',
  complemento: '[data-qa="address2"]',
  pais: '[data-qa="country"]',
  estado: '[data-qa="state"]',
  cidade: '[data-qa="city"]',
  cep: '[data-qa="zipcode"]',
  telefone: '[data-qa="mobile_number"]',
  botaoCriarConta: '[data-qa="create-account"]',
  contaCriada: '[data-qa="account-created"]',
  botaoContinuar: '[data-qa="continue-button"]'
};

function validarFormularioInicialVisivel() {
  cy.get(seletores.tituloCadastro)
    .should('be.visible')
    .and('have.text', 'New User Signup!');
}

function iniciarCadastro(nome, email) {
  cy.get(seletores.nome).type(nome);
  cy.get(seletores.email).type(email);
  cy.get(seletores.botaoIniciarCadastro).click();
}

function validarFormularioCompletoVisivel() {
  cy.contains(seletores.tituloInformacoes, 'Enter Account Information')
    .should('be.visible');
}

function cadastrarUsuario(usuario) {
  cy.get(seletores.tratamento).check();
  cy.get(seletores.senha).type(usuario.senha, {
    log: false,
    parseSpecialCharSequences: false
  });

  cy.get(seletores.diaNascimento).select(usuario.diaNascimento);
  cy.get(seletores.mesNascimento).select(usuario.mesNascimento);
  cy.get(seletores.anoNascimento).select(usuario.anoNascimento);

  cy.get(seletores.newsletter).check();
  cy.get(seletores.ofertas).check();

  cy.get(seletores.primeiroNome).type(usuario.primeiroNome);
  cy.get(seletores.sobrenome).type(usuario.sobrenome);
  cy.get(seletores.empresa).type(usuario.empresa);
  cy.get(seletores.endereco).type(usuario.endereco);
  cy.get(seletores.complemento).type(usuario.complemento);
  cy.get(seletores.pais).select(usuario.pais);
  cy.get(seletores.estado).type(usuario.estado);
  cy.get(seletores.cidade).type(usuario.cidade);
  cy.get(seletores.cep).type(usuario.cep);
  cy.get(seletores.telefone).type(usuario.telefone);

  cy.get(seletores.botaoCriarConta).click();
}

function validarContaCriada() {
  cy.get(seletores.contaCriada)
    .should('be.visible')
    .and('contain.text', 'Account Created!');
}

function continuarAposCadastro() {
  cy.get(seletores.botaoContinuar).click();
}

function validarEmailJaCadastrado() {
  cy.get(seletores.mensagemErro)
    .should('be.visible')
    .and('have.text', 'Email Address already exist!');
}

module.exports = {
  validarFormularioInicialVisivel,
  iniciarCadastro,
  validarFormularioCompletoVisivel,
  cadastrarUsuario,
  validarContaCriada,
  continuarAposCadastro,
  validarEmailJaCadastrado
};