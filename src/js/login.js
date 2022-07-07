class LoginDados {
  static token = "";
  static capturarDadosLogin() {
    const formDadosLogin = document.getElementById("form_login").elements;
    const dadosLogin = {
      email: formDadosLogin[0].value,
      password: formDadosLogin[1].value,
    };
    return JSON.stringify(dadosLogin);
  }
  static async validarUsuario(validarCadastroLogin) {
    const response = await fetch("https://blog-m2.herokuapp.com/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: validarCadastroLogin,
    })
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("@dadosUser", JSON.stringify(res));
      })
      .then(() => {
        window.location.href = "./home_html.html";
      })
      .catch((error) => alert(error));
    return response;
  }
}
let validarCadastroLogin = undefined;
const botaoLogin = document.getElementById("botao_form_login");

botaoLogin.addEventListener("click", async (event) => {
  event.preventDefault();
  validarCadastroLogin = await LoginDados.capturarDadosLogin();
  await LoginDados.validarUsuario(validarCadastroLogin);
});
