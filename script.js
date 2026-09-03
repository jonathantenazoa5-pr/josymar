// =====================================
// ELEMENTOS GLOBALES
// =====================================
const audio = document.getElementById("audio");
const botonMusica = document.getElementById("musica");
const modal = document.getElementById("modal");
let musicaActiva = false;

// =====================================
// CAMBIAR DE PANTALLA
// =====================================
function mostrar(id) {
    const pantallas = [
        "inicio",
        "catalogo",
        "historia",
        "capitulo1pantalla",
        "capitulo2",
        "capitulo3",
        "recuerdoPantalla",
        "finalpantalla"
    ];

    pantallas.forEach(function(nombre) {
        const elemento = document.getElementById(nombre);
        if (elemento) {
            elemento.classList.add("oculto");
        }
    });

    const destino = document.getElementById(id);
    if (destino) {
        destino.classList.remove("oculto");
        window.scrollTo(0, 0);
    }
}

// =====================================
// COMENZAR (Garantiza pase de pantalla)
// =====================================
const btnComenzar = document.getElementById("comenzar");
if (btnComenzar) {
    btnComenzar.addEventListener("click", function() {
        mostrar("catalogo");
        intentarMusica();
    });
}

// =====================================
// CONTROL DE MÚSICA
// =====================================
function intentarMusica() {
    if (!audio) return;

    audio.play()
        .then(function() {
            musicaActiva = true;
            if (botonMusica) botonMusica.textContent = "♫";
        })
        .catch(function(error) {
            console.log("Audio no disponible o bloqueado por el navegador:", error);
            musicaActiva = false;
            if (botonMusica) botonMusica.textContent = "🔇";
        });
}

if (botonMusica) {
    botonMusica.addEventListener("click", function() {
        if (!audio) return;

        if (musicaActiva) {
            audio.pause();
            musicaActiva = false;
            botonMusica.textContent = "🔇";
        } else {
            audio.play()
                .then(function() {
                    musicaActiva = true;
                    botonMusica.textContent = "♫";
                })
                .catch(function() {
                    alert("Asegúrate de tener la canción en la carpeta 'musica/nuestra-cancion.mp3'");
                });
        }
    });
}

// =====================================
// NAVEGACIÓN DE HISTORIA Y CAPÍTULOS
// =====================================
const btnVerHistoria = document.getElementById("verHistoria");
if (btnVerHistoria) btnVerHistoria.addEventListener("click", () => mostrar("historia"));

const btnVolver = document.getElementById("volver");
if (btnVolver) btnVolver.addEventListener("click", () => mostrar("catalogo"));

const btnCap1 = document.getElementById("capitulo1");
if (btnCap1) btnCap1.addEventListener("click", () => mostrar("capitulo1pantalla"));

const btnVolverHist = document.getElementById("volverHistoria");
if (btnVolverHist) btnVolverHist.addEventListener("click", () => mostrar("historia"));

const btnSigCap1 = document.getElementById("siguienteCapitulo");
if (btnSigCap1) btnSigCap1.addEventListener("click", () => mostrar("capitulo2"));

const btnVolverCap1 = document.getElementById("volverCapitulo1");
if (btnVolverCap1) btnVolverCap1.addEventListener("click", () => mostrar("capitulo1pantalla"));

const btnSigCap2 = document.getElementById("siguienteCapitulo2");
if (btnSigCap2) btnSigCap2.addEventListener("click", () => mostrar("capitulo3"));

const btnVolverCap2 = document.getElementById("volverCapitulo2");
if (btnVolverCap2) btnVolverCap2.addEventListener("click", () => mostrar("capitulo2"));

// =====================================
// PANTALLA FINAL Y ALERTA
// =====================================
const btnFinal = document.getElementById("final");
if (btnFinal) {
    btnFinal.addEventListener("click", function() {
        mostrar("finalpantalla");
        setTimeout(function() {
            alert("❤️ ¡Has llegado al final de nuestra historia por hoy!\n\nRecuerda que este es solo el comienzo. Te amo.");
        }, 800);
    });
}

const btnVolverInicio = document.getElementById("volverInicio");
if (btnVolverInicio) btnVolverInicio.addEventListener("click", () => mostrar("inicio"));

// =====================================
// TARJETAS DE CAPÍTULOS
// =====================================
const tarjetasCapitulo = document.querySelectorAll(".tarjeta-capitulo");
tarjetasCapitulo.forEach(function(tarjeta) {
    tarjeta.addEventListener("click", function() {
        const numero = tarjeta.dataset.capitulo;
        if (numero === "1") mostrar("capitulo1pantalla");
        if (numero === "2") mostrar("capitulo2");
        if (numero === "3") mostrar("capitulo3");
    });
});

// =====================================
// FOTOS / RECUERDOS INDIVIDUALES
// =====================================
const datosFotos = {
    1: { numero: "RECUERDO 01", titulo: "Nuestro comienzo", texto: "Un recuerdo especial de nuestra historia.", imagen: "fotos/foto01.jpg" },
    2: { numero: "RECUERDO 02", titulo: "Un momento juntos", texto: "Un momento especial compartido.", imagen: "fotos/foto02.jpg" },
    3: { numero: "RECUERDO 03", titulo: "Una sonrisa", texto: "Un pequeño momento que se queda para siempre.", imagen: "fotos/foto03.jpg" },
    4: { numero: "RECUERDO 04", titulo: "Otro recuerdo", texto: "Un día inolvidable.", imagen: "fotos/foto04.jpg" },
    5: { numero: "RECUERDO 05", titulo: "Un día especial", texto: "Coleccionando momentos.", imagen: "fotos/foto05.jpg" },
    6: { numero: "RECUERDO 06", titulo: "Para recordar", texto: "Para guardarlo por siempre.", imagen: "fotos/foto06.jpg" }
};

const recuerdos = document.querySelectorAll(".recuerdo");
recuerdos.forEach(function(recuerdo) {
    recuerdo.addEventListener("click", function() {
        const numero = recuerdo.dataset.foto;
        const datos = datosFotos[numero];
        if (datos) {
            document.getElementById("recuerdoNumero").textContent = datos.numero;
            document.getElementById("recuerdoTitulo").textContent = datos.titulo;
            document.getElementById("recuerdoTexto").textContent = datos.texto;
            document.getElementById("recuerdoImagen").src = datos.imagen;
            mostrar("recuerdoPantalla");
        }
    });
});

const btnVolverRecuerdos = document.getElementById("volverRecuerdos");
if (btnVolverRecuerdos) btnVolverRecuerdos.addEventListener("click", () => mostrar("catalogo"));

// =====================================
// MODAL / SORPRESA
// =====================================
const btnSorpresa = document.getElementById("sorpresa");
if (btnSorpresa && modal) btnSorpresa.addEventListener("click", () => modal.classList.remove("oculto"));

const btnSorpresaHero = document.getElementById("sorpresaHero");
if (btnSorpresaHero && modal) btnSorpresaHero.addEventListener("click", () => modal.classList.remove("oculto"));

const btnCerrarModal = document.getElementById("cerrarModal");
if (btnCerrarModal && modal) btnCerrarModal.addEventListener("click", () => modal.classList.add("oculto"));

if (modal) {
    modal.addEventListener("click", function(e) {
        if (e.target === modal) modal.classList.add("oculto");
    });
}