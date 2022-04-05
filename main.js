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
let verificaJogada = 'O';
document.getElementById('jogador1').addEventListener('keyup', checkComecar);
document.getElementById('jogador2').addEventListener('keyup', checkComecar);
var tabuleiro = [[], [], []];
bloquearTabuleiro(true);
let contEmpate = 0;
function limparTabuleiro() {

    for (let x = 0; x < tabuleiro.length; x++) {
        for (let y = 0; y < tabuleiro.length; y++) {
            tabuleiro[x][y] = '-'
        }
    }

    let tabuleiros = document.getElementsByClassName("tabuleiro-jogada");

    for (let index = 0; index < tabuleiros.length; index++) {
        tabuleiros[index].innerText = " ";
    }
}

function bloquearTabuleiro(controle) {
    let tabuleiros = document.getElementsByClassName("tabuleiro-jogada");
    
        for (let index = 0; index < tabuleiros.length; index++) {
            tabuleiros[index].disabled = controle;
        }
    
}

function checkComecar() {

    var nome1 = document.getElementById("jogador1").value.trim();
    var nome2 = document.getElementById("jogador2").value.trim();

    jogador1 = { nome: nome1, x: "X", vitorias: 0};
    jogador2 = { nome: nome2, o: "O", vitorias: 0};

    if (jogador1.nome.length > 0 && jogador2.nome.length > 0)
        document.getElementById("botao-iniciar").disabled = false;
    else
        document.getElementById("botao-iniciar").disabled = true;
}

function restart(){
    limparTabuleiro();
    jogador1 = '';
    jogador2 = '';
    document.getElementById("botao-iniciar").disabled = true;
    document.getElementById('jogador1').disabled = false;
    document.getElementById('jogador2').disabled = false;
    document.getElementById('jogador1').value = '';
    document.getElementById('jogador2').value = '';
    document.getElementById("placar-jogadores").innerHTML = '(Jogador 1) 0 X 0 (Jogador 2)';
    bloquearTabuleiro(true);
}

function comecar() {
    bloquearTabuleiro(false);
    document.getElementById("botao-iniciar").disabled = true;
    document.getElementById('jogador1').disabled = true;
    document.getElementById('jogador2').disabled = true;
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
        document.getElementById(pos).classList.toggle("tabuleiro-jogada2");
        document.getElementById(pos).disabled = true;
        tabuleiro[posX][posY] = verificaJogada;

    } else {
        verificaJogada = 'X';
        document.getElementById(pos).innerText = verificaJogada;
        document.getElementById(pos).disabled = true;
        tabuleiro[posX][posY] = verificaJogada;
    }
    if (verificaLinha() || verificaDiagonalInvertida() ||
        verificaColuna() || verificaDiagonal()){
            if (verificaJogada === 'X') {
                jogador1.vitorias++;
                openModal('dv-modal');
                document.getElementById("jogador-vencedor").innerText = `${jogador1.nome} ganhou ${jogador1.vitorias}/3!!`;
                comecar();
                contEmpate = 0;
            }else {
                jogador2.vitorias++;
                openModal('dv-modal');
                document.getElementById("jogador-vencedor").innerText = `${jogador2.nome} ganhou ${jogador2.vitorias}/3`;
                comecar();
                contEmpate = 0;
            }
    }

    if (jogador1.vitorias === 3) {
        openModal('dv-modal');
        document.getElementById("botao-iniciar").disabled = false;
        document.getElementById("jogador-vencedor").innerText = `${jogador1.nome} venceu!!`;
        
        historicoJogadores.innerHTML += `<p>${jogador1.nome} ${jogador1.vitorias} X ${jogador2.vitorias} ${jogador2.nome}</p>`;
        restart();
    } else if (jogador2.vitorias === 3){
        document.getElementById("botao-iniciar").disabled = false;
        document.getElementById("jogador-vencedor").innerText = `${jogador2.nome} venceu!!`;
        
        historicoJogadores.innerHTML += `<p>${jogador1.nome} ${jogador1.vitorias} X ${jogador2.vitorias} ${jogador2.nome}</p>`;
        restart();
    }else if (contEmpate === 9){
        openModal('dv-modal');
        document.getElementById("jogador-vencedor").innerText = `Empatou!!`;
        comecar();
        contEmpate = 0;
    }


    console.info(tabuleiro);
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
