//referencias a los elementos
var operando1Element = document.getElementById("operando1");
var operando2Element = document.getElementById("operando2");
var operadorElement = document.getElementById("operador");
var resultadoElement = document.getElementById("resultado");
var mensajes = document.getElementById("mensajes");
var boton = document.getElementById("boton");
var numeroPartidaElement = document.getElementById("numeroPartida");
var botonIniciarJuego = document.getElementById("iniciarJuego");
var tiempoRestanteElement = document.getElementById("tiempoRestante");

//declaración de variables
var inicial = true;
var partidas = 0;
var arrayOperadores = new Array();
var operando1 = new Number();
var operando2 = new Number();
var operador = new String();
var resultado = new Number();
var tiempo = 30;
var stop = new Number();

//desactivamos input y botón hasta que no se haga click en iniciar juego
desactivarBotonComprobar();
desactivarInput();

//al hacer click en iniciar juego, se inicia la cuenta atrás y el juego
function cuentaAtras() {
  stop = setInterval(function() {
    tiempo -= 1;
    tiempoRestanteElement.innerHTML = tiempo;
    if (tiempo == 0) {
      mensajes.innerHTML = "El tiempo ha finalizado. FIN JUEGO. HAS PERDIDO.";
      pararTiempo();
      finJuego();
    }
  }, 1000); // la función se ejecuta cada segundo y hace una cuenta atrás de 30 segundos

  iniciarJuego();
}

function iniciarJuego() {
  //desactivamos el botón de iniciar juego.
  desactivarBotonIniciarJuego();

  //jugaremos un máximo de 5 partidas
  if (partidas < 5) {
    //imprimimos el número de partidas jugadas
    numeroPartidaElement.innerHTML = partidas;

    //activamos el input para escribir la respuesta
    activarInput();

    //damos el foco al input
    focoInput();

    //creamos los números
    crearNumeros();

    //colocamos los números en sus lugares
    colocarNumeros();

    //realizamos la operación
    calcular();

    //cuando tenemos datos en el input, activamos el botón comprobar
    resultadoElement.addEventListener("input", function() {
      activarBotonComprobar();
    });
  } else {
    //ya se han jugado 5 partidas
    mensajes.innerHTML = "5 partidas correctas. FIN JUEGO, HAS GANADO";
    //paramos el tiempo
    pararTiempo();
    //desactivamos input y botón comprobar
    finJuego();
  }
}

function colocarNumeros() {
  operando1Element.value = operando1;
  operadorElement.value = operador;
  operando2Element.value = operando2;
}

function crearNumeros() {
  if (inicial) {
    //primer operando -- número aleatorio entre 1 Y 20, solo la primera vez
    operando1 = Math.floor(Math.random() * 20) + 1;
    //la partida inicial ya se ha jugado
    inicial = false;
  } else {
    //las siguientes veces el operando1 será el resultado de la operación.
    operando1 = resultado;
  }

  //segundo operando -- número aleatorio entre 20 Y 80
  operando2 = Math.floor(Math.random() * 60 + 21);

  //operador -- número aleatorio entre 0 Y 1, será la posición del array de operandos
  var posicion = Math.floor(Math.random() * 2);

  arrayOperadores.push("+");
  arrayOperadores.push("-");

  operador = arrayOperadores[posicion];
}

function calcular() {
  //pasamos los números a string para usar la función eval
  var operando1String = operando1.toString();
  var operando2String = operando2.toString();
  resultado = eval(operando1String + operador + operando2String);
  console.log(resultado); //podemos ver el resultado en la consola para comprobaciones
}

function comprobarResultado() {
  //al hacer click en botón comprobar

  //recogemos el resultado. EL INPUT ES DE TIPO NUMBER, NO DEJA ESCRIBIR TEXTO.
  var resultadoJugador = resultadoElement.value;

  //comprobamos que sea correcto
  if (resultadoJugador == resultado) {
    //si la respuesta es correcta
    mensajes.innerHTML = "Resultado correcto";
    //sumamos la partida
    partidas++;
    numeroPartidaElement.innerHTML = partidas;
    //vaciamos el input
    vaciarInputResultado();
    //colocamos el foco
    focoInput();
    //seguimos jugando
    iniciarJuego();
  } else {
    //si la respuesta es incorrecta
    mensajes.innerHTML = "Respuesta incorrecta. FIN JUEGO. HAS PERDIDO";
    pararTiempo();
    finJuego();
  }
}
//al pulsar intro cuando acabamos de introducir la respuesta, se hace click en el botón comprobar a través de onkeypress en el html.
function pulsar(e) { 
  if (e.keyCode === 13) {
    comprobarResultado();
  }
}

function desactivarBotonComprobar() {
  boton.disabled = true;
}
function desactivarBotonIniciarJuego() {
  botonIniciarJuego.disabled = true;
}
function activarBotonComprobar() {
  boton.disabled = false;
}
function desactivarInput() {
  resultadoElement.disabled = true;
}
function activarInput() {
  resultadoElement.disabled = false;
}
function reiniciarPartida() {
  location.reload();
}
function vaciarInputResultado() {
  resultadoElement.value = "";
}
function focoInput() {
  resultadoElement.focus();
}
function pararTiempo() {
  clearInterval(stop);
}
function finJuego() {
  desactivarBotonComprobar();
  desactivarBotonIniciarJuego();
  desactivarInput();
}
