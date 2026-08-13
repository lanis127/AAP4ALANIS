// Acessando os elementos do formulário pelo DOM

const formulario = document.getElementById("formulario");

const nome = document.getElementById("nome");
const email = document.getElementById("email");
const numero = document.getElementById("numero");
const senha = document.getElementById("senha");

const cep = document.getElementById("cep");
const rua = document.getElementById("rua");
const bairro = document.getElementById("bairro");
const cidade = document.getElementById("cidade");
const estado = document.getElementById("estado");

const erroNome = document.getElementById("erroNome");
const erroEmail = document.getElementById("erroEmail");
const erroNumero = document.getElementById("erroNumero");
const erroSenha = document.getElementById("erroSenha");
const erroCep = document.getElementById("erroCep");

const mensagem = document.getElementById("mensagem");


// ======================================================
// BUSCA ASSÍNCRONA DO ENDEREÇO PELO CEP
// ======================================================

// O evento "blur" é executado quando o usuário
// sai do campo de CEP.

cep.addEventListener("blur", async function () {

    // Remove caracteres que não sejam números
    const valorCep = cep.value.replace(/\D/g, "");

    // Verifica se o CEP possui exatamente 8 números
    if (valorCep.length !== 8) {

        erroCep.textContent = "Digite um CEP válido.";

        // Limpa os campos de endereço
        rua.value = "";
        bairro.value = "";
        cidade.value = "";
        estado.value = "";

        return;
    }

    erroCep.textContent = "";

    try {

        // Requisição assíncrona para a API ViaCEP
        const resposta = await fetch(
            `https://viacep.com.br/ws/${valorCep}/json/`
        );

        // Verifica se a requisição foi realizada corretamente
        if (!resposta.ok) {
            throw new Error("Erro na requisição.");
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se o CEP existe
        if (dados.erro) {

            erroCep.textContent = "CEP não encontrado.";

            rua.value = "";
            bairro.value = "";
            cidade.value = "";
            estado.value = "";

            return;
        }

        // Preenche automaticamente os campos
        rua.value = dados.logradouro;
        bairro.value = dados.bairro;
        cidade.value = dados.localidade;
        estado.value = dados.uf;

    } catch (erro) {

        erroCep.textContent =
            "Não foi possível consultar o CEP. Tente novamente.";

        console.error("Erro:", erro);
    }
});


// ======================================================
// VALIDAÇÃO DO FORMULÁRIO
// ======================================================

// O evento "submit" é executado quando o usuário
// clica no botão Cadastrar.

formulario.addEventListener("submit", function (event) {

    // Impede que a página seja recarregada
    event.preventDefault();

    // Limpa mensagens anteriores
    erroNome.textContent = "";
    erroEmail.textContent = "";
    erroNumero.textContent = "";
    erroSenha.textContent = "";
    erroCep.textContent = "";
    mensagem.textContent = "";

    mensagem.className = "mensagem";

    let formularioValido = true;


    // ==================================================
    // VALIDAÇÃO DO NOME
    // ==================================================

    if (nome.value.trim() === "") {

        erroNome.textContent = "Digite seu nome.";
        formularioValido = false;

    } else if (nome.value.trim().length < 3) {

        erroNome.textContent =
            "O nome deve possuir pelo menos 3 caracteres.";

        formularioValido = false;
    }


    // ==================================================
    // VALIDAÇÃO DO E-MAIL
    // ==================================================

    const emailValido =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value.trim() === "") {

        erroEmail.textContent = "Digite seu e-mail.";
        formularioValido = false;

    } else if (!emailValido.test(email.value)) {

        erroEmail.textContent =
            "Digite um e-mail válido.";

        formularioValido = false;
    }


    // ==================================================
    // VALIDAÇÃO DO TELEFONE
    // ==================================================

    const telefoneLimpo =
        numero.value.replace(/\D/g, "");

    if (telefoneLimpo === "") {

        erroNumero.textContent =
            "Digite seu telefone.";

        formularioValido = false;

    } else if (telefoneLimpo.length < 10 ||
               telefoneLimpo.length > 11) {

        erroNumero.textContent =
            "Digite um telefone válido.";

        formularioValido = false;
    }


    // ==================================================
    // VALIDAÇÃO DA SENHA
    // ==================================================

    if (senha.value === "") {

        erroSenha.textContent =
            "Digite uma senha.";

        formularioValido = false;

    } else if (senha.value.length < 6) {

        erroSenha.textContent =
            "A senha deve possuir pelo menos 6 caracteres.";

        formularioValido = false;
    }


    // ==================================================
    // VALIDAÇÃO DO CEP
    // ==================================================

    const cepLimpo =
        cep.value.replace(/\D/g, "");

    if (cepLimpo === "") {

        erroCep.textContent =
            "Digite seu CEP.";

        formularioValido = false;

    } else if (cepLimpo.length !== 8) {

        erroCep.textContent =
            "Digite um CEP válido.";

        formularioValido = false;
    }


    // ==================================================
    // RESULTADO DA VALIDAÇÃO
    // ==================================================

    if (formularioValido) {

        mensagem.textContent =
            "Cadastro realizado com sucesso!";

        mensagem.className =
            "mensagem sucesso";

        console.log("Dados do formulário:", {
            nome: nome.value,
            email: email.value,
            telefone: numero.value,
            cep: cep.value,
            rua: rua.value,
            bairro: bairro.value,
            cidade: cidade.value,
            estado: estado.value
        });

    } else {

        mensagem.textContent =
            "Corrija os campos indicados antes de cadastrar.";

        mensagem.className =
            "mensagem erro";
    }

});