// ============================================
// BLOQUE 1: Capturamos los elementos del DOM
// Buscamos cada elemento del HTML por su id
// y los guardamos en variables para usarlos
// ============================================

const formulario = document.getElementById("formulario");
const nombre = document.getElementById("nombre");
const correo = document.getElementById("correo");
const mensaje = document.getElementById("mensaje");

const errorNombre = document.getElementById("error-nombre");
const errorCorreo = document.getElementById("error-correo");
const errorMensaje = document.getElementById("error-mensaje");

const resultado = document.getElementById("resultado");


// ============================================
// BLOQUE 2: Función de validación de campos
// Usa la API nativa de HTML5 checkValidity()
// para verificar cada campo del formulario
// Si un campo no cumple sus reglas (required,
// minlength, format) muestra un error visible
// ============================================

function validarFormulario() {

    // Asumimos que todo está bien al inicio
    let esValido = true;

    // --- Validación del Nombre ---
    // checkValidity() revisa: required y minlength="3"
    if (!nombre.checkValidity()) {
        errorNombre.textContent = "El nombre es obligatorio (mínimo 3 caracteres)";
        esValido = false;
    } else {
        errorNombre.textContent = "";
    }

    // --- Validación del Correo ---
    // checkValidity() revisa: required y formato email
    if (!correo.checkValidity()) {
        errorCorreo.textContent = "Ingresa un correo electrónico válido";
        esValido = false;
    } else {
        errorCorreo.textContent = "";
    }

    // --- Validación del Mensaje ---
    // checkValidity() revisa: required y minlength="10"
    if (!mensaje.checkValidity()) {
        errorMensaje.textContent = "El mensaje es obligatorio (mínimo 10 caracteres)";
        esValido = false;
    } else {
        errorMensaje.textContent = "";
    }

    // Retorna true si todo está bien, false si hay errores
    return esValido;
}


// ============================================
// BLOQUE 3: Eventos DOM
// Escuchamos las acciones del usuario sobre
// el formulario y sus campos
// blur: se dispara cuando el usuario sale
// de un campo hacia otro
// submit: se dispara al hacer clic en Enviar
// ============================================

// --- Evento blur: campo Nombre ---
nombre.addEventListener("blur", function() {
    if (!nombre.checkValidity()) {
        errorNombre.textContent = "El nombre es obligatorio (mínimo 3 caracteres)";
    } else {
        errorNombre.textContent = "";
    }
});

// --- Evento blur: campo Correo ---
correo.addEventListener("blur", function() {
    if (!correo.checkValidity()) {
        errorCorreo.textContent = "Ingresa un correo electrónico válido";
    } else {
        errorCorreo.textContent = "";
    }
});

// --- Evento blur: campo Mensaje ---
mensaje.addEventListener("blur", function() {
    if (!mensaje.checkValidity()) {
        errorMensaje.textContent = "El mensaje es obligatorio (mínimo 10 caracteres)";
    } else {
        errorMensaje.textContent = "";
    }
});

// --- Evento submit: intercepta el envío ---
formulario.addEventListener("submit", function(e) {

    // Detenemos el comportamiento por defecto del navegador
    // Sin esto la página se recargaría al hacer clic en Enviar
    e.preventDefault();

    // Ejecutamos la validación completa
    // Si retorna false detenemos todo aquí
    if (!validarFormulario()) {
        return;
    }

    // Si la validación pasó, lanzamos la promesa
    enviarDatos();
});


// ============================================
// BLOQUE 4: Promesa - Simulación de envío
// Simula el envío de datos a un servidor
// con una espera artificial de 2 segundos
// Incluye posibilidad de error (rechazo)
// simulando un fallo en el servidor
// ============================================

function enviarDatos() {

    // Mientras espera, mostramos mensaje de carga
    resultado.textContent = "Enviando...";
    resultado.style.color = "black";

    // Creamos la promesa que simula el envío
    new Promise(function(resolve, reject) {

        // setTimeout simula la espera del servidor
        // 2000 milisegundos = 2 segundos
        setTimeout(function() {

            // Math.random() genera número aleatorio entre 0 y 1
            // Mayor a 0.3 = éxito (70% de las veces)
            // Menor a 0.3 = fallo (30% de las veces)
            const exito = Math.random() > 0.3;

            if (exito) {
                // Envío exitoso: resolvemos la promesa
                resolve("¡Mensaje enviado correctamente!");
            } else {
                // Fallo simulado: rechazamos la promesa
                reject("Error al conectar con el servidor. Intenta nuevamente.");
            }

        }, 2000);

    })
    // .then() se ejecuta si la promesa fue resuelta (resolve)
    .then(function(mensajeExito) {
        resultado.textContent = mensajeExito;
        resultado.style.color = "green";
        formulario.reset(); // limpia todos los campos
    })
    // .catch() se ejecuta si la promesa fue rechazada (reject)
    .catch(function(mensajeError) {
        resultado.textContent = mensajeError;
        resultado.style.color = "red";
    });
}