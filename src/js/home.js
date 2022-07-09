class DadosUserHome {
  static token = JSON.parse(localStorage.getItem("@dadosUser")) || "";
  static async userDados() {
    const response = await fetch(
      `https://blog-m2.herokuapp.com/users/${this.token.userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${this.token.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        localStorage.setItem("@dados", JSON.stringify(res));
        carregarDadosUser();
      })
      .catch((error) => alert(error));
    return response;
  }
}
DadosUserHome.userDados();

function carregarDadosUser() {
  const dadosUser = JSON.parse(localStorage.getItem("@dados"));

  const divHeader = document.getElementById("div_user_header");

  const imgUser = document.createElement("img");
  const nameUser = document.createElement("p");

  imgUser.className = "img_usuario";
  nameUser.className = "nome_usuario";

  imgUser.src = dadosUser.avatarUrl;
  nameUser.innerText = dadosUser.username;

  divHeader.append(imgUser, nameUser);
}

class PostUser {
  static token = JSON.parse(localStorage.getItem("@dadosUser")) || "";
  static async userPostDados() {
    const response = await fetch(`https://blog-m2.herokuapp.com/posts?page=1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.token.token}`,
      },
    })
      .then((res) => res.json())
      .then((res) => {
        carregarDadosPosts(res);
      })
      .catch((error) => alert(error));
    return response;
  }
}
PostUser.userPostDados();

class CreatePost {
  static token = JSON.parse(localStorage.getItem("@dadosUser")) || "";
  static async userNewPost(input) {
    const response = await fetch(`https://blog-m2.herokuapp.com/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CreatePost.token.token}`,
      },
      body: `{"content": "${input}"}`,
    })
      .then((res) => res.json())
      .then((res) => {
        location.reload();
        localStorage.setItem("@dados", JSON.stringify(res));
      })
      .catch((error) => alert(error));
  }
}

const botaoPostar = document.getElementById("botao_texto_post");

botaoPostar.addEventListener("click", () => {
  const input = document.getElementById("input_texto_post").value;
  CreatePost.userNewPost(input);
});

function carregarDadosPosts(dadosPost) {
  const ul = document.getElementById("post_user");

  const posts = dadosPost.data;

  posts.forEach((elem) => {
    const li = document.createElement("li");

    if (elem.user.id === CreatePost.token.userId) {
      editarPost(elem.id, li);
    }
    li.className = "li_user_post";
    li.id = "li_user_post";

    const imgUserPost = document.createElement("img");
    imgUserPost.className = "img_user_post";
    imgUserPost.src = elem.user.avatarUrl;

    const p_username = document.createElement("p");
    p_username.className = "p_user";
    p_username.innerText = elem.user.username;

    const p_post = document.createElement("p");
    p_post.className = "p_post_content";
    p_post.innerText = elem.content;

    const dataPost = document.createElement("p");
    dataPost.className = "data_post";
    dataPost.innerText = elem.createdAt;

    p_username.append(p_post);
    li.append(imgUserPost, p_username, dataPost);
    ul.append(li);
  });
}

function editarPost(id, li) {
  const divEditar = document.createElement("div");
  divEditar.className = "div_editar_post";

  const botaoEditar = document.createElement("button");
  botaoEditar.className = "botao_editar";
  botaoEditar.innerText = "Editar";

  botaoEditar.addEventListener("click", () => {
    novoConteudoPost(id, li);
  });

  const botaoApagar = document.createElement("button");
  botaoApagar.className = "botao_Apagar";
  botaoApagar.innerText = "Apagar";

  botaoApagar.addEventListener("click", () => {
    DeletePost.delete(id);
  });

  divEditar.append(botaoEditar, botaoApagar);
  li.append(divEditar);
}

class DeletePost {
  static token = JSON.parse(localStorage.getItem("@dadosUser")) || "";
  static async delete(id) {
    const response = await fetch(`https://blog-m2.herokuapp.com/posts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CreatePost.token.token}`,
      },
    })
      .then((res) => res.json())
      .then(() => {
        location.reload();
      });
  }
}

function novoConteudoPost(id, li) {
  const divInputConteudo = document.createElement("div");
  divInputConteudo.className = "div_input_novo";
  divInputConteudo.id = "div_input_novo";

  const novoInputValue = document.createElement("input");
  novoInputValue.className = "input_novo_conteudo";
  novoInputValue.id = "input_novo_conteudo";

  const botaoInputEnviar = document.createElement("button");
  botaoInputEnviar.innerText = "Enviar";
  botaoInputEnviar.className = "botao_input_enviar";
  botaoInputEnviar.id = "botao_input_enviar";

  botaoInputEnviar.addEventListener("click", async () => {
    const novoInput = document.getElementById("input_novo_conteudo").value;
    await EditarConteudo.editar(id, novoInput);
    location.reload();
  });

  divInputConteudo.append(novoInputValue, botaoInputEnviar);
  li.append(divInputConteudo);
}

class EditarConteudo {
  static token = JSON.parse(localStorage.getItem("@dadosUser")) || "";
  static async editar(id, novoInput) {
    const response = await fetch(`https://blog-m2.herokuapp.com/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CreatePost.token.token}`,
      },
      body: `{"content": "${novoInput}"}`,
    }).then((res) => res.json());
    return response;
  }
}

class Logout {
  static token = JSON.parse(localStorage.getItem("@dadosUser")) || "";
  static async logoutUser() {
    const response = await fetch(
      `https://blog-m2.herokuapp.com/posts/${this.token.userId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CreatePost.token.token}`,
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        localStorage.clear();
        window.location.href = "./login_html.html";
      });
  }
}
const botaoLogout = document.getElementById("botao_home_logout");
botaoLogout.addEventListener("click", () => {
  Logout.logoutUser();
});
