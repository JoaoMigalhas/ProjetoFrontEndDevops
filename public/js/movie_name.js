const inputMovie = document.getElementById('inputNomeFilme');
const buttonMovieName = document.getElementById('buttonNomeFilme');
let filmeSelecionado = "";

//evento de sorteio do filme
//o sorteio acontece apartir do momento que o usuário
//logar no site
button.addEventListener('click', async () => {

    //sorteio do id
    const id = Math.floor(Math.random() * 2);

    //envia o número sorteado para a rota que vai puxar do BD qual filme foi sorteado
    const response = await fetch('/api/filmeSorteado', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({id})
    })

    //pega o NOME do filmeSelecionado
    const data = await response.json();
    filmeSelecionado = data.nomeFilmeSorteado;
});

//evento para validar se é o filme certo
buttonMovieName.addEventListener('click', async () => {
    const filme = inputMovie.value.trim().toLowerCase(); //pega o valor inserido pelo usuário

    //enviando para a rota que vai validar a resposta
    const response = await fetch('api/nomeFilme', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify( { filme , filmeSelecionado, nickname } )
    })

    //limpando o imput a cada tentativa
    inputMovie.value = "";
});