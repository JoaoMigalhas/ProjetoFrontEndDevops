//elementos do html
const inputMovie = document.getElementById('inputNomeFilme');
const buttonMovieName = document.getElementById('buttonNomeFilme');
const dataList = document.getElementById('datalistNomeFilme');
const cardDicas = document.querySelector('.card-dicas');
const divNomeFilme = document.querySelector('.nome-filme');
const divAnswer = document.querySelector('.correct-answer');


let objFilmeSorteado = "";

//evento de sorteio do filme
//o sorteio acontece apartir do momento que o usuário
//logar no site

//tornando reutilizavel o sorteio do filme
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

button.addEventListener('click', async () => {
    //sorteando um novo filme
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
    const dataResposta = data.message;

    if(dataResposta == "resposta correta") {
        divNomeFilme.innerHTML = `<p>${objFilmeSorteado.filme}</p>`
        divAnswer.style.display = "block";
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