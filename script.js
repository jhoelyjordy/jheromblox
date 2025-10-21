// Variables globales
let preguntas = [];
let preguntaActual = 0;
let puntuacion = 0;
let respuestaSeleccionada = null;

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    cargarPreguntas();
});

// Cargar las preguntas
function cargarPreguntas() {
    preguntas = [
        {
            enunciado: "¿Cuál es la interpretación física de la función de onda Ψ en la ecuación de Schrödinger?",
            opciones: [
                "Representa la trayectoria exacta de una partícula",
                "Es una medida de la energía cinética de la partícula",
                "Su cuadrado módulo |Ψ|² da la densidad de probabilidad de encontrar la partícula",
                "Representa la velocidad de la partícula en un punto dado"
            ],
            respuestaCorrecta: 2,
            tema: "Teoría Cuántica"
        },
        {
            enunciado: "El principio de incertidumbre de Heisenberg establece que:",
            opciones: [
                "No se puede medir simultáneamente la posición y el momento con precisión infinita",
                "La energía no se conserva en escalas cuánticas",
                "Las partículas pueden viajar más rápido que la luz",
                "El tiempo es discreto a nivel cuántico"
            ],
            respuestaCorrecta: 0,
            tema: "Teoría Cuántica"
        },
        {
            enunciado: "En el experimento de la doble rendija, ¿qué fenómeno demuestra la naturaleza dual onda-partícula?",
            opciones: [
                "El patrón de interferencia incluso con electrones individuales",
                "El efecto fotoeléctrico",
                "La radiación de cuerpo negro",
                "El espectro de emisión atómica"
            ],
            respuestaCorrecta: 0,
            tema: "Teoría Cuántica"
        },
        {
            enunciado: "La ley de Boyle establece que para una masa fija de gas a temperatura constante:",
            opciones: [
                "P × V = constante (presión y volumen son inversamente proporcionales)",
                "P / V = constante (presión y volumen son directamente proporcionales)",
                "V / T = constante (volumen y temperatura son directamente proporcionales)",
                "P / T = constante (presión y temperatura son directamente proporcionales)"
            ],
            respuestaCorrecta: 0,
            tema: "Leyes de los Gases"
        },
        {
            enunciado: "En la ecuación de los gases ideales PV = nRT, ¿qué representa la constante R?",
            opciones: [
                "La resistencia del gas al flujo",
                "La constante de Boltzmann por molécula",
                "La constante universal de los gases (8.314 J/mol·K)",
                "La relación entre presión y temperatura"
            ],
            respuestaCorrecta: 2,
            tema: "Leyes de los Gases"
        },
        {
            enunciado: "La ley de Graham sobre efusión establece que:",
            opciones: [
                "La velocidad de efusión es inversamente proporcional a la raíz cuadrada de la masa molar",
                "Todos los gases se expanden igual a la misma temperatura",
                "La presión de un gas mezclado es la suma de las presiones parciales",
                "La energía cinética promedio de las moléculas es proporcional a la temperatura"
            ],
            respuestaCorrecta: 0,
            tema: "Leyes de los Gases"
        }
    ];
}

// Mostrar información del tema
function mostrarInfoTema(tema) {
    const modal = document.getElementById('modal-info');
    const titulo = document.getElementById('modal-titulo');
    const texto = document.getElementById('modal-texto');
    
    if (tema === 'cuantica') {
        titulo.textContent = 'Teoría Cuántica';
        texto.innerHTML = `
            <p><strong>La teoría cuántica</strong> estudia el comportamiento de la materia a escalas subatómicas.</p>
            <br>
            <p><strong>Temas incluidos:</strong></p>
            <ul>
                <li>Función de onda y ecuación de Schrödinger</li>
                <li>Principio de incertidumbre de Heisenberg</li>
                <li>Dualidad onda-partícula</li>
                <li>Entrelazamiento cuántico</li>
                <li>Superposición cuántica</li>
                <li>Colapso de la función de onda</li>
            </ul>
        `;
    } else {
        titulo.textContent = 'Leyes de los Gases';
        texto.innerHTML = `
            <p><strong>Las leyes de los gases</strong> describen el comportamiento termodinámico de los gases.</p>
            <br>
            <p><strong>Temas incluidos:</strong></p>
            <ul>
                <li>Ley de Boyle-Mariotte</li>
                <li>Ley de Charles y Gay-Lussac</li>
                <li>Ley de los gases ideales</li>
                <li>Teoría cinética molecular</li>
                <li>Ley de Graham</li>
                <li>Presión y temperatura absoluta</li>
            </ul>
        `;
    }
    
    modal.style.display = 'block';
}

// Cerrar modal
function cerrarModal() {
    document.getElementById('modal-info').style.display = 'none';
}

// Cerrar modal al hacer clic fuera
window.onclick = function(event) {
    const modal = document.getElementById('modal-info');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

// Iniciar la prueba
function iniciarPrueba() {
    preguntaActual = 0;
    puntuacion = 0;
    respuestaSeleccionada = null;
    
    // Cambiar a pantalla de prueba
    document.getElementById('pantalla-inicio').classList.remove('activa');
    document.getElementById('pantalla-prueba').classList.add('activa');
    
    mostrarPreguntaActual();
}

// Mostrar la pregunta actual
function mostrarPreguntaActual() {
    const pregunta = preguntas[preguntaActual];
    
    // Actualizar información de la pregunta
    document.getElementById('info-pregunta').textContent = 
        `Pregunta ${preguntaActual + 1} de ${preguntas.length} - ${pregunta.tema}`;
    
    // Actualizar barra de progreso
    const progreso = ((preguntaActual) / preguntas.length) * 100;
    document.getElementById('progreso').style.width = `${progreso}%`;
    
    // Mostrar enunciado
    document.getElementById('texto-pregunta').textContent = pregunta.enunciado;
    
    // Generar opciones
    const contenedorOpciones = document.getElementById('opciones');
    contenedorOpciones.innerHTML = '';
    
    pregunta.opciones.forEach((opcion, index) => {
        const botonOpcion = document.createElement('button');
        botonOpcion.className = 'opcion';
        botonOpcion.innerHTML = `<strong>${String.fromCharCode(65 + index)}.</strong> ${opcion}`;
        botonOpcion.onclick = () => seleccionarOpcion(index, botonOpcion);
        contenedorOpciones.appendChild(botonOpcion);
    });
    
    // Actualizar texto del botón siguiente
    const botonSiguiente = document.getElementById('boton-siguiente');
    if (preguntaActual === preguntas.length - 1) {
        botonSiguiente.textContent = '🔚 Ver Resultados';
    } else {
        botonSiguiente.textContent = '➡️ Siguiente Pregunta';
    }
    
    // Reiniciar selección
    respuestaSeleccionada = null;
}

// Seleccionar una opción
function seleccionarOpcion(index, elemento) {
    // Remover selección anterior
    document.querySelectorAll('.opcion').forEach(opcion => {
        opcion.classList.remove('seleccionada');
    });
    
    // Seleccionar nueva opción
    elemento.classList.add('seleccionada');
    respuestaSeleccionada = index;
}

// Siguiente pregunta
function siguientePregunta() {
    if (respuestaSeleccionada === null) {
        alert('❌ Por favor selecciona una respuesta antes de continuar.');
        return;
    }
    
    // Verificar respuesta
    if (respuestaSeleccionada === preguntas[preguntaActual].respuestaCorrecta) {
        puntuacion++;
    }
    
    // Avanzar a siguiente pregunta o mostrar resultados
    preguntaActual++;
    
    if (preguntaActual < preguntas.length) {
        mostrarPreguntaActual();
    } else {
        mostrarResultados();
    }
}

// Mostrar resultados
function mostrarResultados() {
    const porcentaje = (puntuacion / preguntas.length) * 100;
    
    // Cambiar a pantalla de resultados
    document.getElementById('pantalla-prueba').classList.remove('activa');
    document.getElementById('pantalla-resultados').classList.add('activa');
    
    // Mostrar resultados
    const contenedorResultado = document.getElementById('contenedor-resultado');
    const color = obtenerColorPorPorcentaje(porcentaje);
    const mensaje = obtenerMensajeResultado(porcentaje);
    
    contenedorResultado.innerHTML = `
        <div class="puntuacion" style="color: ${color};">
            📊 ${puntuacion}/${preguntas.length}
        </div>
        <div class="porcentaje" style="color: ${color};">
            ⭐ ${porcentaje.toFixed(1)}%
        </div>
        <div class="mensaje-resultado">
            ${mensaje}
        </div>
    `;
}

// Obtener color según porcentaje
function obtenerColorPorPorcentaje(porcentaje) {
    if (porcentaje >= 90) return '#00FF00';
    if (porcentaje >= 70) return '#FFFF00';
    if (porcentaje >= 50) return '#FFA500';
    return '#FF0000';
}

// Obtener mensaje de resultado
function obtenerMensajeResultado(porcentaje) {
    if (porcentaje >= 90) {
        return "¡Excelente! 🎉 Dominas ambos temas por completo.<br><strong>Nivel: Experto</strong>";
    } else if (porcentaje >= 70) {
        return "¡Buen trabajo! 👍 Tienes buen conocimiento, pero hay conceptos que repasar.<br><strong>Nivel: Avanzado</strong>";
    } else if (porcentaje >= 50) {
        return "Aprobado ✅ Necesitas estudiar más estos temas.<br><strong>Nivel: Intermedio</strong>";
    } else {
        return "Necesitas dedicar más tiempo al estudio 📚.<br><strong>Nivel: Principiante</strong>";
    }
}

// Reiniciar prueba
function reiniciarPrueba() {
    document.getElementById('pantalla-resultados').classList.remove('activa');
    document.getElementById('pantalla-inicio').classList.add('activa');
}

// Salir de la aplicación
function salir() {
    if (confirm('¿Estás seguro de que quieres salir?')) {
        // En un entorno real, aquí podrías cerrar la ventana
        // window.close(); // Solo funciona si la ventana fue abierta por script
        alert('¡Gracias por usar la aplicación!');
        // Recargar la página como alternativa
        location.reload();
    }
}