const buttonProxFilme = document.getElementById('buttonProxFilme');
const buttonScore = document.getElementById('buttonScore');

//segue para o próximo filme
buttonProxFilme.addEventListener('click', async () => {
    
    //sorteando o novo filme
    sortearFront();
    divAnswer.style.display = "none";
});

buttonScore.addEventListener('click', () => {
    window.location.href = "./score.html"
})