const buttonDicas = document.getElementById('buttonDicas');
let contadorDicas = 0;

buttonDicas.addEventListener('click', async () => {
    contadorDicas++;
    if(contadorDicas <= 3) {
        try {
            const response = await fetch('/api/dicas', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify({nickname, contadorDicas, filmeSelecionado})
            });
        } catch(err){
            console.error(`erro ao pedir dicas: ${err}`);
        }
    } else {
        alert('Número máximo de dicas para esse filme reivindicado');
    }
})