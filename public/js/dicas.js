const buttonDicas = document.getElementById('buttonDicas');
let contadorDicas = 1;

buttonDicas.addEventListener('click', async () => {
    if(contadorDicas <= 3) {
        try {
            const response = await fetch('/api/dicas', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({nickname, contadorDicas, objFilmeSorteado})
            });

            const data = await response.json();
            dica = data.dica;

            cardDicas.innerHTML += (`
                <p class="dicas">${dica}</p>
            `);

        } catch(err){
            alert('limite de dicas alcançado');
        }
    contadorDicas++;
    } else {
        alert('Número máximo de dicas para esse filme reivindicado');
    }
})