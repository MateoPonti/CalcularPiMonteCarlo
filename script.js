function calcularPi() {
    const lienzo = document.getElementById("canvas");
    const contexto = lienzo.getContext("2d");
    const cantidadPuntos = parseInt(document.getElementById("numPuntos").value);
    const ancho = lienzo.width;
    const radio = ancho / 2;
    const maxPuntos= 5000;

    let dentroCirculo = 0;
    let puntosTotales = 0;



    if (cantidadPuntos>maxPuntos) {
        alert('La cantidad de puntos tiene que ser menor a '+maxPuntos);
        return;
    }
  
    contexto.clearRect(0, 0, ancho, ancho);

    contexto.beginPath();
    
    //  Paso 0 crear modelo
    contexto.arc(radio, radio, radio, 0, 2 * Math.PI);
    
    contexto.strokeStyle = "#888";
    contexto.stroke();
  
    // el set intervalo ya arranca el bucle para permitir generar iteraciones seria el que genera el Paso 3 de iterar y obtener salidas
    const intervalo = setInterval(() => {
      if (puntosTotales >= cantidadPuntos) {
        clearInterval(intervalo);
        return;
      }
     //  Paso 1 generar num aleatorio y tambien algo de paso 2 ya que lo transforma en un numero valido para el modelo
      const x = Math.random() * ancho;
      const y = Math.random() * ancho;
      const dx = x - radio;
      const dy = y - radio;
      const distanciaAlCuadrado = dx * dx + dy * dy;
  
      // obtiene las salidas correspondiente si esta dentro del circulo lo pinta de verde sino lo deja en rojo
      if (distanciaAlCuadrado <= radio * radio) {
        dentroCirculo++;
        contexto.fillStyle = "green";
      } else {
        contexto.fillStyle = "red";
      }
  
      contexto.fillRect(x, y, 2, 2);
  
      puntosTotales++;
  
      // Paso 4 resultados finales a través del analisis
      const estimacionPi = 4 * dentroCirculo / puntosTotales;
      document.getElementById("resultado").textContent =
        `Puntos: ${puntosTotales} · En círculo: ${dentroCirculo} · π ≈ ${estimacionPi.toFixed(6)}`;
    }, 1);
  }