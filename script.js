let timeoutId;
function validarTexto() {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(() => {
    let texto = document.getElementById("texto-encriptador").value;
    if (/[^a-z\s.,!?;:()\-]/.test(texto)) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Solo letras minúsculas sin tildes y no se permiten numeros.",
        confirmButtonText: "OK",
        timer: 4000,
      }).then((result) => {
        if (result.isConfirmed) {
          document.getElementById("texto-encriptador").value = texto.replace(
            /[^a-z\s.,!?;:()\-]/g,
            ""
          );
        }
      });
    }
  }, 100);
}
function encryptar() {
  let texto = document.getElementById("texto-encriptador").value;
  var lupa = document.getElementById('lupa');

  if (texto.trim() === "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "El campo de texto está vacío. Por favor, ingresa algo para encriptar.",
      confirmButtonText: "OK",
      timer: 4000,
    });
    return; // Detener la función si el campo está vacío
  }
  let textoEncriptado = texto
    .replace(/e/g, "enter")
    .replace(/i/g, "imes")
    .replace(/a/g, "ai")
    .replace(/o/g, "ober")
    .replace(/u/g, "ufat");
  document.getElementById("texto-encriptado").value = textoEncriptado;
  lupa.style.display = 'none'; // Ocultar la lupa
  limpiarTexto();
}
function desencriptar() {
  let textoEncriptado = document.getElementById("texto-encriptador").value;
  var lupa = document.getElementById('lupa');

  if (textoEncriptado.trim() === "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "El campo de texto está vacío. Por favor, ingresa algo para desencriptar.",
      confirmButtonText: "OK",
      timer: 4000,
    });
    return; // Detener la función si el campo está vacío
  }
  let textoDesencriptado = textoEncriptado
    .replace(/enter/g, "e")
    .replace(/imes/g, "i")
    .replace(/ai/g, "a")
    .replace(/ober/g, "o")
    .replace(/ufat/g, "u");

  document.getElementById("texto-encriptado").value = textoDesencriptado;
  lupa.style.display = 'none'; // Ocultar la lupa
  limpiarTexto();
}
function copiarTexto() {
  let copiarTexto = document.getElementById("texto-encriptado").value;

  if (copiarTexto.trim() === "") {
    Swal.fire({
      position: "center",
      icon: "error",
      title: "El campo de texto está vacío.",
      confirmButtonText: "OK",
      timer: 4000,
    });
    return; 
  }
                    
  navigator.clipboard
    .writeText(copiarTexto)
    .then(() => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "success",
        title: "Texto copiado",
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    })
    .catch((err) => {
      Swal.fire({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        title: "Error al copiar el texto",
        text: err.message,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
    });
    var lupa = document.getElementById('lupa');
    lupa.style.display = 'block'; // Mostrar la lupa nuevamente
    document.getElementById("texto-encriptado").value = "";
}
function limpiarTexto() {
  document.getElementById("texto-encriptador").value = "";
}