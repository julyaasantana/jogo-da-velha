const casas = document.querySelectorAll(".casa");
const botaoReiniciar = document.querySelector("#reiniciar");
const telaVitoria = document.querySelector("#telaVitoria");
const textoVitoria = document.querySelector("#textoVitoria");
const botaoJogarNovamente = document.querySelector("#jogarNovamente");
const mensagem = document.querySelector("#mensagem");

let jogadorAtual = "X";
let jogoAtivo = true;

let tabuleiro = ["", "", "", "", "", "", "", "", ""];

const combinacoesVencedoras = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Jogadas do jogo
casas.forEach((casa, indice) => {
    casa.addEventListener("click", () => {

        if (!jogoAtivo || tabuleiro[indice] !== "") {
            return;
        }

        tabuleiro[indice] = jogadorAtual;
        casa.textContent = jogadorAtual;

        verificarVencedor();
    });
});

// Verificar vencedor ou empate
function verificarVencedor() {

    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;

        if (
            tabuleiro[a] !== "" &&
            tabuleiro[a] === tabuleiro[b] &&
            tabuleiro[a] === tabuleiro[c]
        ) {
            textoVitoria.textContent =
                "Jogador " + jogadorAtual + " ganhou!";

            telaVitoria.style.display = "flex";

            jogoAtivo = false;
            return;
        }
    }

    // Verificar empate
    if (tabuleiro.every(casa => casa !== "")) {
        textoVitoria.textContent = "Empate!";
        telaVitoria.style.display = "flex";
        jogoAtivo = false;
        return;
    }

    // Trocar jogador
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";

    const numeroJogador = jogadorAtual === "X" ? 1 : 2;

    mensagem.textContent =
        "Vez do Jogador " + numeroJogador +
        " (" + jogadorAtual + ")";
}

// Função para reiniciar o jogo
function reiniciarJogo() {

    jogadorAtual = "X";
    jogoAtivo = true;

    tabuleiro = ["", "", "", "", "", "", "", "", ""];

    // Limpar as casas
    casas.forEach(casa => {
        casa.textContent = "";
    });

    // Atualizar mensagem
    mensagem.textContent = "Vez do Jogador 1 (X)";

    // Esconder a tela de vitória
    telaVitoria.style.display = "none";
}

// Botão "Reiniciar jogo"
botaoReiniciar.addEventListener("click", reiniciarJogo);

// Botão "Jogar novamente"
botaoJogarNovamente.addEventListener("click", reiniciarJogo);
