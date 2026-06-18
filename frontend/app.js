const API_URL = "https://backend-p2l2.onrender.com/api/multimedia";

// CARGAR AL INICIO
document.addEventListener("DOMContentLoaded", () => {
  cargarDatos();
});

// CREAR
document.getElementById("formulario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  await fetch(API_URL, {
    method: "POST",
    body: formData
  });

  e.target.reset();
  cargarDatos();
});

// LEER
async function cargarDatos() {
  const res = await fetch(API_URL);
  const data = await res.json();

  const galeria = document.getElementById("galeria");
  galeria.innerHTML = "";

  data.forEach(item => {
    galeria.innerHTML += `
      <div class="tarjeta">

        <input type="text" id="titulo-${item._id}" value="${item.titulo}">
        <textarea id="descripcion-${item._id}">${item.descripcion || ""}</textarea>

        <img src="https://backend-p2l2.onrender.com/${item.imagenUrl}" width="200">

        <audio controls>
          <source src="https://backend-p2l2.onrender.com/${item.audioUrl}">
        </audio>

        <br><br>

        <input type="file" id="imagen-${item._id}">
        <input type="file" id="audio-${item._id}">

        <button onclick="editar('${item._id}')">💾 Guardar</button>
        <button onclick="eliminar('${item._id}')">🗑️ Eliminar</button>

      </div>
    `;
  });
}

// EDITAR
async function editar(id) {
  const formData = new FormData();

  formData.append("titulo", document.getElementById(`titulo-${id}`).value);
  formData.append("descripcion", document.getElementById(`descripcion-${id}`).value);

  const imagen = document.getElementById(`imagen-${id}`).files[0];
  const audio = document.getElementById(`audio-${id}`).files[0];

  if (imagen) formData.append("imagen", imagen);
  if (audio) formData.append("audio", audio);

  await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    body: formData
  });

  cargarDatos();
}

// ELIMINAR
async function eliminar(id) {
  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  cargarDatos();
}