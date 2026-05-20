let fila = [];

// ===== LOCAL STORAGE =====

// Verificar si hay datos guardados
const datosGuardados = localStorage.getItem("turnos");

if (datosGuardados) {
  fila = JSON.parse(datosGuardados);
}

// ===== CAPTURA DE ELEMENTOS =====

const input = document.getElementById("inputNombre");

const btnAnotar = document.getElementById("btnAnotar");
const btnAtender = document.getElementById("btnAtender");
const btnReiniciar = document.getElementById("btnReiniciar");
const btnPausa = document.getElementById("btnPausa");

const visor = document.getElementById("clienteActual");
const lista = document.getElementById("lista");
const panel = document.getElementById("panelEntrada");

const contador = document.getElementById("contador");

// ===== FUNCION GUARDAR =====

function guardarDatos() {
  localStorage.setItem("turnos", JSON.stringify(fila));
}

// ===== FUNCION ACTUALIZAR LISTA =====

function actualizarLista() {

  lista.innerHTML = "";

  fila.forEach(nombre => {
    const li = document.createElement("li");
    li.textContent = nombre;
    lista.appendChild(li);
  });

  // ACTUALIZAR CONTADOR
  contador.textContent = fila.length;
}

// Mostrar lista al cargar página
actualizarLista();

// ===== ANOTAR =====

function anotarCliente() {

  const nombre = input.value.trim();

  if (nombre === "") {
    return;
  }

  // VALIDACION DUPLICADOS
  if (fila.includes(nombre)) {
    alert("Este cliente ya está en la fila.");
    return;
  }

  fila.push(nombre);

  guardarDatos();

  actualizarLista();

  input.value = "";

  input.focus();
}

// BOTON ANOTAR
btnAnotar.addEventListener("click", anotarCliente);

// ENTER EN INPUT
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    anotarCliente();
  }
});

// ===== ATENDER =====

btnAtender.addEventListener("click", () => {

  if (fila.length > 0) {

    const atendido = fila.shift();

    visor.textContent = atendido;

    guardarDatos();

    actualizarLista();
  }
});

// ===== PAUSA =====

btnPausa.addEventListener("click", () => {

  panel.classList.toggle("pausado");

  if (panel.classList.contains("pausado")) {
    btnPausa.textContent = "Reanudar Entrada";
  } else {
    btnPausa.textContent = "Pausar Entrada";
  }
});

// ===== REINICIAR =====

btnReiniciar.addEventListener("click", () => {

  const confirmar = confirm("¿Seguro que desea reiniciar el día?");

  if (confirmar) {

    localStorage.removeItem("turnos");

    location.reload();
  }
});