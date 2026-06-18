const API_URL = "https://backend-p2l2.onrender.com/api/multimedia";

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

        <img class="imagen" src="https://backend-p2l2.onrender.com/${item.imagenUrl}">

        <br><br>

        <label>📷 Nueva imagen:</label>
        <input type="file" id="imagen-${item._id}" accept="image/*">

        <br><br>

        <audio controls>
          <source src="https://backend-p2l2.onrender.com/${item.audioUrl}">
        </audio>

        <br><br>

        <label>🎧 Nuevo audio:</label>
        <input type="file" id="audio-${item._id}" accept="audio/*">

        <br><br>

        <button class="btn-editar" onclick="editar('${item._id}')">
          💾 Guardar cambios
        </button>

        <button class="btn-eliminar" onclick="eliminar('${item._id}')">
          🗑️ Eliminar
        </button>

      </div>
    `;
  });
}

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

  alert("✅ Registro actualizado");
  cargarDatos();
}

async function eliminar(id) {

  if (!confirm("¿Deseas eliminar este registro?")) return;

  await fetch(`${API_URL}/${id}`, {
    method: "DELETE"
  });

  cargarDatos();
}

cargarDatos();