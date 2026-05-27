//elementos do html
const inputMovie = document.getElementById('inputNomeFilme');
const buttonMovieName = document.getElementById('buttonNomeFilme');
const dataList = document.getElementById('datalistNomeFilme');
const cardDicas = document.querySelector('.card-dicas');
const cardMoviedle = document.querySelector('.card-moviedle');
const divNomeFilme = document.querySelector('.nome-filme');
const divAnswer = document.querySelector('.correct-answer');

let objFilmeSorteado = "";

//função para sortear um novo filme no front-end
async function sortearFront() {
    try {
        const response = await fetch('/api/filmeSorteado');

        //pega o NOME do filmeSelecionado
        const data = await response.json();
        objFilmeSorteado = data.objFilmeSorteado;

        if(response.ok) {
            const response = await fetch('/api/dicaInicial', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({ objFilmeSorteado })
            })

            const dataDica = await response.json();
            const dica = dataDica.dicaInicial;

            cardDicas.innerHTML = (`
                <p class="dicas">${dica}</p>
            `);

        }
    } catch(err) {
        console.error(`deu erro ai: ${err}`);
    }
};

//função para gerar a comparação do filme que o usuário fez a tentativa com o sorteado
function compararFilmes(filmeUsuario, filmeSorteado) {
    //variáveis do resultado das comparações
    let comparacao_lancamento = "";
    let comparacao_qntd_filmes = 0;

    //comparação da data de lançamento
    if(filmeUsuario.ano_lancamento > filmeSorteado.ano_lancamento) {
        comparacao_lancamento = 'mais_novo.png';
    } else if(filmeUsuario.ano_lancamento == filmeSorteado.ano_lancamento) {
        comparacao_lancamento = 'igual.png';
    } else {
        comparacao_lancamento = 'mais_velho.png';
    }

    //comparação da quantidade de filmes da franquia
    comparacao_qntd_filmes = filmeUsuario.qntd_filmes - filmeSorteado.qntd_filmes;
switch (comparacao_qntd_filmes) {
    //condição se tiver mais filmes na franquia sorteada
    case 1:
        comparacao_qntd_filmes = '1_filme_amais.png';
        break;
    case 2:
        comparacao_qntd_filmes = '2_filme_amais.png';
        break;
    case 3:
        comparacao_qntd_filmes = '3_filme_amais.png';
        break;
    case 4:
        comparacao_qntd_filmes = '4_filme_amais.png';
        break;
    case 5:
        comparacao_qntd_filmes = '5_filme_amais.png';
        break;
    case 6:
        comparacao_qntd_filmes = '6_filme_amais.png';
        break;

    //condição se tiver menos filmes na franquia sorteada
    case -1:
        comparacao_qntd_filmes = '1_filme_amenos.png';
        break;
    case -2:
        comparacao_qntd_filmes = '2_filme_amenos.png';
        break;
    case -3:
        comparacao_qntd_filmes = '3_filme_amenos.png';
        break;
    case -4:
        comparacao_qntd_filmes = '4_filme_amenos.png';
        break;
    case -5:
        comparacao_qntd_filmes = '5_filme_amenos.png';
        break;
    case -6:
        comparacao_qntd_filmes = '6_filme_amenos.png';
        break;

    default:
        comparacao_qntd_filmes = 'igual.png';
        break;
    }

    cardMoviedle.innerHTML += (`
        <h1>Comparado ao filme sorteado...</h1>
        <div class="moviedle">
            <img src="${comparacao_lancamento}">
            <img src="${comparacao_qntd_filmes}">
        </div>
        `)
}

//evento de sorteio do filme
//o sorteio acontece apartir do momento que o usuário
//logar no site
button.addEventListener('click', async () => {
    //sorteando um novo filme
    inicializarTimer();
    sortearFront();
});
    
//evento para validar se é o filme certo
buttonMovieName.addEventListener('click', async () => {
    const filme = inputMovie.value.trim().toLowerCase(); //pega o valor inserido pelo usuário

    //enviando para a rota que vai validar a resposta
    const response = await fetch('api/nomeFilme', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify( { filme , objFilmeSorteado, nickname } )
    })

    //limpando o imput a cada tentativa
    inputMovie.value = "";

    const data = await response.json();
    const dataMessage = data.message;
    const dataObjFilmeUsuario = data.objFilmeUsuario;

    //evento caso o usuário acerte a resposta
    if(dataMessage == "resposta correta") {
        divNomeFilme.innerHTML = `<p>${objFilmeSorteado.filme}</p>`
        divAnswer.style.display = "block";
    } 
    //evento caso o usuário erre a resposta
    else {
        const dataFilme = data.objFilmeUsuario;
        compararFilmes(dataObjFilmeUsuario, objFilmeSorteado);
        console.log(dataFilme);
    }

});
//datalist
inputMovie.addEventListener('focus', async () => {
    dataList.innerHTML = "";

    const response = await fetch('/api/filmes');

    const movies = await response.json();
    movies.filmes.forEach(movie => {
        const option = document.createElement('option');
        option.value = movie;
        dataList.appendChild(option);
    });
});

//o enter funciona como enviar
inputMovie.addEventListener('keydown', () => {
    if(event.key === 'Enter') {
        event.preventDefault();
        buttonMovieName.click();
    }
})