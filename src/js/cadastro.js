class FormDados {
  static capturarDadosForm() {
    const formDadosCadastro = document.getElementById("form_cadastro").elements;
    const dados = {
      username: formDadosCadastro[0].value,
      email: formDadosCadastro[1].value,
      avatarUrl: formDadosCadastro[2].value,
      password: formDadosCadastro[3].value,
    };
    return JSON.stringify(dados);
  }
  static async cadastrarUsuario(dadosCadastroLogin) {
    const response = await fetch(
      "https://blog-m2.herokuapp.com/users/register",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: dadosCadastroLogin,
      }
    )
      .then((res) => res.json())
      .then(() => {
        window.location.href = "./src/html/login_html.html";
      })
      .catch((error) => alert(error));
    return response;
  }
}

let dadosCadastroLogin = undefined;
const botaoCadastro = document.getElementById("botao_form_cadastrar");

botaoCadastro.addEventListener("click", async (event) => {
  event.preventDefault();
  dadosCadastroLogin = FormDados.capturarDadosForm();
  await FormDados.cadastrarUsuario(dadosCadastroLogin);
});
