const inicio = require('../modules/inicio/inicio');
const login = require('../modules/login/login');
const cadastro = require('../modules/cadastro/cadastro');
const conta = require('../modules/conta/conta');
const logout = require('../modules/logout/logout');
const preparacao = require('../modules/usuario/preparacao');
const consulta = require('../modules/produto/consulta');
const assinatura = require('../modules/assinatura/assinatura');
const carrinho = require('../modules/pedido/carrinho');
const checkout = require('../modules/pedido/checkout');
const pagamento = require('../modules/pedido/pagamento');
const usuarios = require('../fixtures/usuarios.json');
const produtos = require('../fixtures/produtos.json');
const pedido = require('../fixtures/pedido.json');

describe('Trabalho final — Automation Exercise', () => {
  it('TC01 — deve cadastrar um usuário e excluir a conta', () => {
    const usuario = {
      ...usuarios.novoUsuario,
      email: `pgats-${Date.now()}@example.com`
    };

    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    cadastro.validarFormularioInicialVisivel();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarFormularioCompletoVisivel();
    cadastro.cadastrarUsuario(usuario);
    cadastro.validarContaCriada();
    cadastro.continuarAposCadastro();

    conta.validarUsuarioAutenticado(usuario.nome);
    conta.excluirConta();
    conta.validarContaExcluida();
    conta.continuarAposExclusao();
  });

  it('TC02 — deve efetuar login com email e senha corretos', () => {
    const usuario = {
      ...usuarios.novoUsuario,
      email: `pgats-${Date.now()}@example.com`
    };

    preparacao.prepararUsuarioParaLogin(usuario);

    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    login.validarFormularioVisivel();
    login.efetuarLogin(usuario.email, usuario.senha);
    conta.validarUsuarioAutenticado(usuario.nome);

    conta.excluirConta();
    conta.validarContaExcluida();
  });

  it('TC03 — deve rejeitar login com email e senha incorretos', () => {
    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    login.validarFormularioVisivel();
    login.efetuarLogin(
      usuarios.loginInvalido.email,
      usuarios.loginInvalido.senha
    );
    login.validarCredenciaisInvalidas();
  });

  it('TC04 — deve efetuar logout e retornar à página de login', () => {
    const usuario = {
      ...usuarios.novoUsuario,
      email: `pgats-${Date.now()}@example.com`
    };

    preparacao.prepararUsuarioParaLogin(usuario);

    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    login.validarFormularioVisivel();
    login.efetuarLogin(usuario.email, usuario.senha);
    conta.validarUsuarioAutenticado(usuario.nome);

    logout.efetuarLogout();
    logout.validarUsuarioDesconectado();

    login.efetuarLogin(usuario.email, usuario.senha);
    conta.excluirConta();
    conta.validarContaExcluida();
  });

  it('TC05 — deve rejeitar cadastro com email já existente', () => {
    const usuario = {
      ...usuarios.novoUsuario,
      email: `pgats-${Date.now()}@example.com`
    };

    preparacao.prepararUsuarioParaLogin(usuario);

    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    cadastro.validarFormularioInicialVisivel();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarEmailJaCadastrado();

    login.efetuarLogin(usuario.email, usuario.senha);
    conta.excluirConta();
    conta.validarContaExcluida();
  });

  it('TC08 — deve exibir a lista de produtos e os detalhes do primeiro produto', () => {
    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    consulta.acessarProdutos();
    consulta.validarListagemVisivel();
    consulta.consultarPrimeiroProduto();
    consulta.validarDetalhesProduto(produtos.primeiroProduto);
  });

  it('TC09 — deve pesquisar produtos e exibir os resultados correspondentes', () => {
    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    consulta.acessarProdutos();
    consulta.validarListagemVisivel();
    consulta.pesquisarProduto(produtos.pesquisa.termo);
    consulta.validarResultadosPesquisa(produtos.pesquisa.nomesEsperados);
  });

  it('TC10 — deve realizar assinatura de novidades na página inicial', () => {
    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    assinatura.validarAssinaturaNoRodape();
    assinatura.assinarNovidades(`pgats-assinatura-${Date.now()}@example.com`);
    assinatura.validarAssinaturaRealizada();
  });

  it('TC15 — deve realizar um pedido com cadastro antes do checkout', () => {
    const usuario = {
      ...usuarios.novoUsuario,
      email: `pgats-${Date.now()}@example.com`
    };

    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    cadastro.validarFormularioInicialVisivel();
    cadastro.iniciarCadastro(usuario.nome, usuario.email);
    cadastro.validarFormularioCompletoVisivel();
    cadastro.cadastrarUsuario(usuario);
    cadastro.validarContaCriada();
    cadastro.continuarAposCadastro();
    conta.validarUsuarioAutenticado(usuario.nome);

    carrinho.adicionarPrimeiroProduto();
    carrinho.acessarCarrinho();
    carrinho.validarProdutoNoCarrinho(produtos.primeiroProduto);
    carrinho.prosseguirParaCheckout();

    checkout.validarEnderecos(usuario);
    checkout.validarResumoPedido(produtos.primeiroProduto);
    checkout.finalizarPedido(pedido.comentario);

    pagamento.realizarPagamento(pedido.pagamento);
    pagamento.validarPedidoConfirmado();

    conta.excluirConta();
    conta.validarContaExcluida();
    conta.continuarAposExclusao();
  });

  it('TC16 — deve realizar um pedido com login antes do checkout', () => {
    const usuario = {
      ...usuarios.novoUsuario,
      email: `pgats-${Date.now()}@example.com`
    };

    preparacao.prepararUsuarioParaLogin(usuario);

    inicio.acessarInicio();
    inicio.validarPaginaInicialVisivel();

    login.acessarLogin();
    login.validarFormularioVisivel();
    login.efetuarLogin(usuario.email, usuario.senha);
    conta.validarUsuarioAutenticado(usuario.nome);

    carrinho.adicionarPrimeiroProduto();
    carrinho.acessarCarrinho();
    carrinho.validarProdutoNoCarrinho(produtos.primeiroProduto);
    carrinho.prosseguirParaCheckout();

    checkout.validarEnderecos(usuario);
    checkout.validarResumoPedido(produtos.primeiroProduto);
    checkout.finalizarPedido(pedido.comentario);

    pagamento.realizarPagamento(pedido.pagamento);
    pagamento.validarPedidoConfirmado();

    conta.excluirConta();
    conta.validarContaExcluida();
    conta.continuarAposExclusao();
  });
});