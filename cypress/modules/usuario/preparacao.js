const inicio = require('../inicio/inicio');
const login = require('../login/login');
const cadastro = require('../cadastro/cadastro');
const logout = require('../logout/logout');

function prepararUsuarioParaLogin(usuario) {
  inicio.acessarInicio();
  login.acessarLogin();

  cadastro.iniciarCadastro(usuario.nome, usuario.email);
  cadastro.cadastrarUsuario(usuario);
  cadastro.validarContaCriada();
  cadastro.continuarAposCadastro();

  logout.efetuarLogout();
  logout.validarUsuarioDesconectado();
}

module.exports = {
  prepararUsuarioParaLogin
};