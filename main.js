/*
PONTOS DA AV1:    
    JOGO SÓ PODE COMEÇAR QUANDO O NOME DE AMBOS JOGADORES FOREM INFORMADOS
    O BOTAO PARA JOGAR AO ESTAR INATIVADO DEVE APRESENTAR OUTRA ESTILIZAÇÃO
    APOS INICIAR AS PARTIDAS DO MELHOR DE TRES, OS NOMES NAO PODEM SER ALTERADOS

    
    O MELHOR DE TRES CONSISTE EM 3 VITORIAS DE UM MESMO JOGADOR
    DEVE SER IMPLEMENTADO UM MECANISMO PARA RESETAR O JOGO AO FINAL DO MELHOR DE TRES
    AS CORES DO (X) E (O) DEVEM SER DIFERENTES
    AO FINAL DO MELHOR DE TRES O VENCEDOR DEVERÁ TER O NOME APRESENTADO NO LUGAR DO JOGO DA VELHA
    DEVERÁ SER ATUALIZADO O HISTÓRICO DAS PARTIDAS 
*/

let jogador1;
let jogador2;
let txtJogador1 = document.getElementById('jogador1');
let txtJogador2 = document.getElementById('jogador2');
let botaoIniciar = document.getElementById("botao-iniciar");
let jogadorVencedor = document.getElementById("jogador-vencedor");
let tabuleirosJogadas = document.getElementsByClassName("tabuleiro-jogada");
txtJogador1.addEventListener('keyup', checkComecar);
txtJogador2.addEventListener('keyup', checkComecar);
let verificaJogada = 'O';
var tabuleiro = [[], [], []];
bloquearTabuleiro(true);
let contEmpate = 0;

function limparTabuleiro() {

    for (let x = 0; x < tabuleiro.length; x++) {
        for (let y = 0; y < tabuleiro.length; y++) {
            tabuleiro[x][y] = '-'
        }
    }



    for (let index = 0; index < tabuleirosJogadas.length; index++) {
        tabuleirosJogadas[index].innerText = " ";
    }
}

function bloquearTabuleiro(controle) {
    for (let index = 0; index < tabuleirosJogadas.length; index++) {
        tabuleirosJogadas[index].disabled = controle;
    }
}

function checkComecar() {
    var nome1 = txtJogador1.value.trim();
    var nome2 = txtJogador2.value.trim();

    jogador1 = { nome: nome1, x: "X", vitorias: 0 };
    jogador2 = { nome: nome2, o: "O", vitorias: 0 };

    if (jogador1.nome.length > 0 && jogador2.nome.length > 0)
        botaoIniciar.disabled = false;
    else
        botaoIniciar.disabled = true;
}

function restart() {
    limparTabuleiro();
    verificaJogada = 'O'
    jogador1 = '';
    jogador2 = '';
    botaoIniciar.disabled = true;
    txtJogador1.disabled = false;
    txtJogador2.disabled = false;
    txtJogador1.value = '';
    txtJogador2.value = '';
    document.getElementById("placar-jogadores").innerHTML = '(Jogador 1) 0 X 0 (Jogador 2)';
    bloquearTabuleiro(true);
}

function comecar() {
    verificaJogada = 'O'
    bloquearTabuleiro(false);
    botaoIniciar.disabled = true;
    txtJogador1.disabled = true;
    txtJogador2.disabled = true;
    let placarJogadores = document.getElementById("placar-jogadores");
    placarJogadores.innerHTML = `${jogador1.nome} ${jogador1.vitorias} X ${jogador2.vitorias} ${jogador2.nome}`;
    limparTabuleiro();
}

function jogada(posX, posY) {
    let pos = posX + "," + posY
    let historicoJogadores = document.getElementById("historico-jogadores");
    contEmpate++;

    if (verificaJogada == 'X') {
        verificaJogada = 'O';
        document.getElementById(pos).innerText = verificaJogada;
        document.getElementById(pos).classList.add("tabuleiro-jogada2");
        document.getElementById(pos).disabled = true;
        tabuleiro[posX][posY] = verificaJogada;

    } else {
        verificaJogada = 'X';
        document.getElementById(pos).innerText = verificaJogada;
        document.getElementById(pos).classList.remove("tabuleiro-jogada2");
        document.getElementById(pos).disabled = true;
        tabuleiro[posX][posY] = verificaJogada;
    }
    if (verificaLinha() || verificaDiagonalInvertida() ||
        verificaColuna() || verificaDiagonal()) {
        if (verificaJogada === 'X') {
            jogador1.vitorias++;
            openModal('dv-modal');
            jogadorVencedor.innerText = `${jogador1.nome} ganhou ${jogador1.vitorias}/3!!`;
            comecar();
            contEmpate = 0;
        } else {
            jogador2.vitorias++;
            openModal('dv-modal');
            jogadorVencedor.innerText = `${jogador2.nome} ganhou ${jogador2.vitorias}/3!!`;
            comecar();
            contEmpate = 0;
        }
    }

    if (jogador1.vitorias === 3) {
        openModal('dv-modal');
        botaoIniciar.disabled = false;
        jogadorVencedor.innerText = `${jogador1.nome} venceu!!`;

        historicoJogadores.innerHTML += `<p>${jogador1.nome} ${jogador1.vitorias} X ${jogador2.vitorias} ${jogador2.nome}</p>`;
        restart();
    } else if (jogador2.vitorias === 3) {
        botaoIniciar.disabled = false;
        jogadorVencedor.innerText = `${jogador2.nome} venceu!!`;

        historicoJogadores.innerHTML += `<p>${jogador1.nome} ${jogador1.vitorias} X ${jogador2.vitorias} ${jogador2.nome}</p>`;
        restart();
    } else if (contEmpate === 9) {
        openModal('dv-modal');
        jogadorVencedor.innerText = `Empatou!!`;
        comecar();
        contEmpate = 0;
    }
}

function verificaLinha() {
    let cont = 0;
    for (let x = 0; x < tabuleiro.length; x++) {
        for (let y = 0; y < tabuleiro.length; y++) {
            if (tabuleiro[x][y] === verificaJogada) cont++;
            if (cont === 3) {
                return true;
            }
        }
        cont = 0;
    }
    return false;
}

function verificaColuna() {
    let cont = 0;
    for (let x = 0; x < tabuleiro.length; x++) {
        for (let y = 0; y < tabuleiro.length; y++) {
            if (tabuleiro[y][x] === verificaJogada) cont++;
            if (cont === 3) {
                return true;
            }
        }
        cont = 0;
    }
    return false;
}

function verificaDiagonalInvertida() {
    if (tabuleiro[0][2] === verificaJogada
        && tabuleiro[1][1] === verificaJogada
        && tabuleiro[2][0] === verificaJogada) {
        return true;
    }
    return false;
}


function verificaDiagonal() {
    if (tabuleiro[0][0] === verificaJogada
        && tabuleiro[1][1] === verificaJogada
        && tabuleiro[2][2] === verificaJogada) {
        return true;
    }
    return false;
}

function openModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal(mn) {
    let modal = document.getElementById(mn);

    if (typeof modal == 'undefined' || modal === null)
        return;

    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}
