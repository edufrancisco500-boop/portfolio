/*
  CONFIGURAÇÃO DOS LINKS E CONTATOS
  ---------------------------------
  Para atualizar um endereço, troque o texto entre aspas.
  Se o valor estiver vazio ou ainda tiver o texto "COLE AQUI",
  o botão ou item correspondente fica oculto na página.
*/
var CONFIG = {
  links: {
    linkedin: "https://www.linkedin.com/in/eduardo-francisco-silva-da-paix%C3%A3o-6aaa80266/",
    github: "https://github.com/edufrancisco500-boop"
  },
  contato: {
    email: "edufrancisco500@gmail.com",
    telefone: "(73) 98150-0837"
  },
  // Links dos projetos: deixe vazio ("") até ter o endereço de cada um.
  projetos: {
    painel: "",
    calculadora: "",
    orcamento: "",
    notasFiscais: ""
  }
};

(function () {
  "use strict";

  function pendente(valor) {
    return typeof valor !== "string" || !valor.trim() || /cole aqui/i.test(valor);
  }

  function enderecoValido(valor) {
    if (pendente(valor)) return false;
    try {
      var url = new URL(valor.trim());
      return url.protocol === "https:" || url.protocol === "http:";
    } catch (erro) {
      return false;
    }
  }

  function emailValido(valor) {
    return !pendente(valor) && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor.trim());
  }

  function telefoneValido(valor) {
    return !pendente(valor) && valor.replace(/\D/g, "").length >= 10;
  }

  function aplicarLinks(seletor, atributo, mapa) {
    document.querySelectorAll(seletor).forEach(function (el) {
      var endereco = mapa[el.getAttribute(atributo)];
      if (enderecoValido(endereco)) {
        el.href = endereco.trim();
        el.target = "_blank";
        el.rel = "noopener noreferrer";
        el.hidden = false;
      } else {
        el.hidden = true;
      }
    });
  }

  aplicarLinks("[data-link]", "data-link", CONFIG.links);
  aplicarLinks("[data-project-link]", "data-project-link", CONFIG.projetos);

  // E-mail e telefone da seção de contato.
  document.querySelectorAll("[data-contact]").forEach(function (item) {
    var tipo = item.getAttribute("data-contact");
    var valor = CONFIG.contato[tipo];
    var link = item.querySelector("a");
    var ok = false;

    if (tipo === "email" && emailValido(valor)) {
      link.href = "mailto:" + valor.trim();
      link.textContent = valor.trim();
      ok = true;
    } else if (tipo === "telefone" && telefoneValido(valor)) {
      var digitos = valor.replace(/\D/g, "");
      if (digitos.length <= 11) digitos = "55" + digitos;
      link.href = "tel:+" + digitos;
      link.textContent = valor.trim();
      ok = true;
    }
    item.hidden = !ok;
  });

  // Aviso na seção de contato quando nada estiver disponível.
  var acoes = document.getElementById("contato-acoes");
  var lista = document.getElementById("contato-lista");
  var aviso = document.getElementById("contato-vazio");
  if (acoes && lista && aviso) {
    var botoes = acoes.querySelector("[data-link]:not([hidden])");
    var itens = lista.querySelector("[data-contact]:not([hidden])");
    acoes.hidden = !botoes;
    lista.hidden = !itens;
    aviso.hidden = !!(botoes || itens);
  }

  var ano = document.getElementById("ano");
  if (ano) ano.textContent = String(new Date().getFullYear());
})();
