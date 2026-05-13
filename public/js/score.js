//callback da função apresentarScore
//apenas pega os dados dos usuários no banco de dados
async function carregarScore() {
    try {
        const response = await fetch('/api/scoreUsers');

        return await response.json();
    } catch (error) {
        console.log(`Erro ao carregar score: ${error}`);
    }   
}

async function apresentarScore() {
    const response = await carregarScore();
    let usuarios = response.dados;

    //odenação bubbleSort do maior score
    let aux = '';
    for(let i = 0; i < (usuarios.length - 1); i++) {
        for(let j = (i + 1); j < usuarios.length; j++) {
            if(usuarios[i].score < usuarios[j].score) {
                aux = usuarios[i];
                usuarios[i] = usuarios[j];
                usuarios[j] = aux;
            }
        }
    }

    //carregando os usuários na página
    for(let i = 0; i < usuarios.length; i++) {
        document.getElementById('lista-ranking').innerHTML += 
        `<tr>
            <td>${i}</td>
            <td>${usuarios[i].nickname}</td>
            <td>${usuarios[i].score}</td>
        </tr>`
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    apresentarScore();
});