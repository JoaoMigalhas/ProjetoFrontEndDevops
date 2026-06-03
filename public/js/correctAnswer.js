//segue para o próximo filme
buttonProxFilme.addEventListener('click', async () => {
    
    //sorteando o novo filme
    sortearFront();
    inicializarTimer();
    divAnswer.style.display = "none";
});

buttonScore.addEventListener('click', () => {
    window.location.href = "./score.html"
})