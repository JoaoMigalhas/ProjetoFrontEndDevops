const timer = document.querySelector('.timer');

let tempoRestante;

function pausarTimer() {
    
}

function inicializarTimer() {
    tempoRestante = 20;
    
    const intervalo = setInterval(() => {
 
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;

    timer.innerHTML = `<p>${minutos}:${segundos}</p>`;

    tempoRestante--;
    
    if(tempoRestante == 0) {
        sortearFront();
        tempoRestante = 20;
    }}, 1000);
}