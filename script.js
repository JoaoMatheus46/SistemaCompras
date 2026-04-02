// Preços dos produtos
const produtos = {
  100: { nome: "Album 2006", preco: 50.0 },
  101: { nome: "Album 2010", preco: 55.0 },
  102: { nome: "Album 2014", preco: 60.0 },
  103: { nome: "Album 2018", preco: 65.0 },
  104: { nome: "Album 2022", preco: 70.0 },
  105: { nome: "Album 2026", preco: 75.0 },
};

// Event listeners para atualizar o resumo
document.querySelectorAll('input[name="produto"]').forEach((radio) => {
  radio.addEventListener("change", atualizarResumo);
});

document.querySelectorAll('input[name="pagamento"]').forEach((radio) => {
  radio.addEventListener("change", atualizarResumo);
});

document.querySelectorAll('input[name="quantidade"]').forEach((radio) => {
  radio.addEventListener("change", atualizarResumo);
});

// Função para atualizar o resumo do pedido
function atualizarResumo() {
  // Produto selecionado
  const produtoSelecionado = document.querySelector(
    'input[name="produto"]:checked',
  );
  const pagamentoSelecionado = document.querySelector(
    'input[name="pagamento"]:checked',
  );
  const quantidadeSelecionada = document.querySelector(
    'input[name="quantidade"]:checked',
  );

  if (produtoSelecionado) {
    const idProduto = produtoSelecionado.value;
    const produto = produtos[idProduto];
    const quantidade = quantidadeSelecionada
      ? parseInt(quantidadeSelecionada.value)
      : 1;

    // Aplicar desconto por quantidade
    let precoFinal = produto.preco;
    if (quantidade === 5) {
      precoFinal = produto.preco * 0.95; // 5% desconto
    } else if (quantidade === 10) {
      precoFinal = produto.preco * 0.9; // 10% desconto
    } else if (quantidade === 50) {
      precoFinal = produto.preco * 0.8; // 20% desconto
    }

    const valorTotal = precoFinal * quantidade;

    document.getElementById("produto-selecionado").textContent = produto.nome;
    document.getElementById("quantidade-selecionada").textContent = quantidade;
    document.getElementById("valor-total").textContent =
      `R$ ${valorTotal.toFixed(2).replace(".", ",")}`;
  } else {
    document.getElementById("produto-selecionado").textContent = "Nenhum";
    document.getElementById("quantidade-selecionada").textContent = "0";
    document.getElementById("valor-total").textContent = "R$ 0,00";
  }

  // Forma de pagamento selecionada
  if (pagamentoSelecionado) {
    const formasPagamento = {
      credito: "Cartão de Crédito",
      debito: "Cartão de Débito",
      pix: "PIX",
      boleto: "Boleto",
    };
    document.getElementById("pagamento-selecionado").textContent =
      formasPagamento[pagamentoSelecionado.value];
  }
}

// Função para comprar produtos
function comprarProdutos() {
  const produtoSelecionado = document.querySelector(
    'input[name="produto"]:checked',
  );

  if (!produtoSelecionado) {
    alert("Por favor, selecione um produto!");
    return;
  }

  // Mostrar a seção de pagamento
  document.getElementById("forma-pagamento-section").classList.add("visible");
  document.getElementById("separador-pagamento").classList.add("visible");
}

// Função para confirmar compra após selecionar pagamento
function confirmarCompra() {
  const produtoSelecionado = document.querySelector(
    'input[name="produto"]:checked',
  );
  const pagamentoSelecionado = document.querySelector(
    'input[name="pagamento"]:checked',
  );
  const quantidadeSelecionada = document.querySelector(
    'input[name="quantidade"]:checked',
  );

  if (!pagamentoSelecionado) {
    alert("Por favor, selecione uma forma de pagamento!");
    return;
  }

  const idProduto = produtoSelecionado.value;
  const produto = produtos[idProduto];
  const quantidade = quantidadeSelecionada
    ? parseInt(quantidadeSelecionada.value)
    : 1;
  const formaPagamento = pagamentoSelecionado.value;

  // Aplicar desconto por quantidade
  let precoFinal = produto.preco;
  let desconto = "";

  if (quantidade === 5) {
    precoFinal = produto.preco * 0.95;
    desconto = " (5% de desconto)";
  } else if (quantidade === 10) {
    precoFinal = produto.preco * 0.9;
    desconto = " (10% de desconto)";
  } else if (quantidade === 50) {
    precoFinal = produto.preco * 0.8;
    desconto = " (20% de desconto)";
  }

  const valorTotal = precoFinal * quantidade;

  alert(
    `Compra realizada com sucesso!\n\nProduto: ${produto.nome}\nQuantidade: ${quantidade} pacote(s)\nValor unitário: R$ ${precoFinal.toFixed(2).replace(".", ",")}${desconto}\nValor Total: R$ ${valorTotal.toFixed(2).replace(".", ",")}\nForma de Pagamento: ${formaPagamento.toUpperCase()}`,
  );

  // Ocultar a seção de pagamento novamente
  document
    .getElementById("forma-pagamento-section")
    .classList.remove("visible");
  document.getElementById("separador-pagamento").classList.remove("visible");
}

// Inicializar resumo na carga da página
document.addEventListener("DOMContentLoaded", atualizarResumo);
