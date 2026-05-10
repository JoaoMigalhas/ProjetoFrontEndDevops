//esse código contém o script necessário para o jogo de acertar o filme pelo nome
const inputMovie = document.getElementById('inputNomeFilme');
const buttonMovieName = document.getElementById('buttonNomeFilme');

buttonMovieName.addEventListener('click', async () => {
    const filme = inputMovie.value.trim().toLowerCase();

    const response = await fetch('api/nomeFilme', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify( {filme} )
    })
});


// evento de sorteio do filme
button.addEventListener('click', async () => {
    
    //sorteio do id
    const id = (Math.floor(Math.random() * 2)).toString();

    //envia o número sorteado para a rota que vai puxar do BD qual filme foi sorteado
    const response = await fetch('/api/filmeSorteado', {
        method: 'POST',
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({ id })
    })
});