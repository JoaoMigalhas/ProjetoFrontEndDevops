const timer = document.querySelector('.timer');

const TEMPO = 50;
let tempoRestante;
let intervalo;

function pausarTimer() {
    clearInterval(intervalo);
}

function inicializarTimer() {
    clearInterval(intervalo);
    tempoRestante = TEMPO;
    
    intervalo = setInterval(() => {
 
    let minutos = Math.floor(tempoRestante / 60);
    let segundos = tempoRestante % 60;

    timer.innerHTML = `<p>${minutos}:${segundos}</p>`;

    tempoRestante--;
    
    if(tempoRestante == -1) {
        clearInterval(intervalo);
        divTempoEsgotado.style.display = "flex";
        divTempoEsgotado.innerHTML = `
            <div class="patolino">
                <p>TEMPO ESGOTADO! ⏳</p>
                <img src="patolino_tempo_esgotado.gif">
            </div>
            `
        setTimeout(() => {    
            divTempoEsgotado.style.display = "none";
            divTempoEsgotado.innerHTML = '';
            //retirando as imagens do moviedle
            cardMoviedle.innerHTML = "";
            sortearFront();
            inicializarTimer();
        }, 5000);
    }}, 1000);
}
