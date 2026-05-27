let objFilmeSorteado = "";

//evento de sorteio do filme
//o sorteio acontece apartir do momento que o usuário
//logar no site
button.addEventListener('click', async () => {
    //sorteando um novo filme
    inicializarTimer();
    sortearFront();
});


buttonWelcomeBox.addEventListener('click', async () => {
    //fechando a div de boas vindas
    divWelcome.style.display = "none";
    
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