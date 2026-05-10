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
})