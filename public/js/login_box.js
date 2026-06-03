let nickname = "";
button.addEventListener('click', async () => {
    nickname = inputLogin.value.trim();

    if(!/^[a-zA-Z0-9]{1,4}$/.test(nickname)) {
        window.alert('O nickname deve ter entre 1 a 4 caracteres válidos!');
        return;
    }
    if(typeof nickname != 'string') {
        window.alert('O valor inserido deve ser uma string');
        return;
    }

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({nickname})
        });

        const data = await response.json();

        if (response.ok) {
            let divLogin = document.querySelector(".login");
            divLogin.style.display = "none";

            if (data.message === 'cadastrado com sucesso') {
                pausarTimer();
                divWelcome.style.display = "flex";
            }
        } else {
            alert('Erro ao logar');
        }

    } catch (networkError) {
        console.log(`Não foi possível se conectar ao servidor: ${networkError}`);
    }
});