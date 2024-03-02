let intentos = 6;
let palabras = ["APPLE", "NIGHT", "BEACH", "HAPPY", "UNDER"];
let palabra = palabras[Math.floor(Math.random() * palabras.length)];
const BOTON = document.getElementById("guess-button");
const VALOR = document.getElementById("guess-input");
const ERROR = document.getElementById("error");
window.addEventListener('load', init);
const API = "https://random-word-api.herokuapp.com/word?number=1&lang=es&length=5"
fetch(API).then((response)=>{
    response.json().then((body) =>{
        palabra = body[0].toUpperCase();
    })
})

function init(){
    BOTON.addEventListener("click", intentar);
    VALOR.addEventListener('keypress', function(event){
        if(event.key=="Enter"){
   
            event.preventDefault();
            intentar();
        }
    });
    
}

function intentar(){
    
    const GRID = document.getElementById("grid");
    const ROW =  document.createElement('div');
    ROW.className = "row";
    let intento = leerIntento();


    if(intento.length < 5 || intento.length > 5 || intento.length == 0){
        
        ERROR.style.display = 'block';
    }else{
        ERROR.style.display = 'none';
    if (intento === palabra ) {
        imprimir("<h1>GANASTE!</h1>");
        return;
    }
    for (const index in palabra ) {
        let aux = 0;
        const SPAN = document.createElement('div');
        SPAN.className = "letter"

        if(intento[index] === palabra[index]  ){
            SPAN.innerHTML = intento[index];
            SPAN.style.background = "green";
            aux += 1;
        }else if( palabra.includes(intento[index])){
            SPAN.innerHTML = intento[index];
            SPAN.style.background = "yellow";
        }else{
            SPAN.innerHTML = intento[index];
            SPAN.style.background = "gray";
        }
        ROW.appendChild(SPAN);
    }

    GRID.appendChild(ROW);
    intentos--;
    if(intentos == 0){
        imprimir("<h1>PERDISTE!😖</h1>");
    }
    }
}

function leerIntento(){
    let valor = VALOR;
    valor = valor.value;
    valor = valor.toUpperCase();
    return valor;

   
}

// function comparar(intento){
//     let intent = intento;
//     for (const index in intent) {
        
//     }
// }

function imprimir(mensaje){
    const INPUT = document.getElementById("guess-input");
    INPUT.disabled= true;
    BOTON.disabled = true;
    let contenedor = document.getElementById("guesses");
    contenedor.innerHTML = mensaje;
}


