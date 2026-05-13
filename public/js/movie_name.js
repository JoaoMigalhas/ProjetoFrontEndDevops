const inputMovie = document.getElementById('inputNomeFilme');
const buttonMovieName = document.getElementById('buttonNomeFilme');
const dataList = document.getElementById('datalistNomeFilme');
const cardDicas = document.querySelector('.card-dicas');
let filmeSelecionado = "";

//evento de sorteio do filme
//o sorteio acontece apartir do momento que o usuário
//logar no site
button.addEventListener('click', async () => {

    try {
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

        if(response.ok) {
            const response = await fetch('/api/dicaInicial', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({ filmeSelecionado })
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
