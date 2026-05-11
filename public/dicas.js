const buttonDicas = document.getElementById('buttonDicas');

buttonDicas.addEventListener('click', async () => {
    try {
        const response = await fetch('/api/dicas', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify(nickname)
        });
    } catch(err){
        console.error(`erro ao pedir dicas: ${err}`);
    }
})