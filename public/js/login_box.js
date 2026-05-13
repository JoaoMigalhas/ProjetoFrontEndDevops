const inputLogin = document.getElementById('inputLoginBox');
const button = document.getElementById('buttonLoginBox');
let nickname = "";

button.addEventListener('click', async () => {
    nickname = inputLogin.value.trim();

    //validações de dados
    if(!/^[a-zA-Z0-9]{0,4}$/.test(nickname)) {
        window.alert('O nickname deve ter entre 0 a 4 caracteres válidos!');
        return;
    }

    if(typeof nickname != 'string') {
        window.alert('O valor inserido deve ser uma string');
        return;
    }

    //enviando para a rota api/login
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({nickname})
        });

        //fechando a div login
        if (response.ok) {
            let divLogin = document.querySelector(".login");
            divLogin.style.display = "none";
        } else {
            alert('Erro ao logar');
        }

    } catch (networkError) {
        console.log(`Não foi possível se conectar ao servidor: ${networkError}`);
    }
});