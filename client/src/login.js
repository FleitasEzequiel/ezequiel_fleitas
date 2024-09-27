import "./style.css";

// Obtener el formulario de inicio de sesión
const $form = document.getElementById("login-form");

// Añadir un evento de submit al formulario
$form.addEventListener("submit", async (e) => {
  // Evitar que el formulario recargue la página
  e.preventDefault();

  // Crear un objeto FormData con los datos del formulario
  const formData = new FormData($form);

  // Convertir el objeto FormData a un objeto plano
  const entries = Object.fromEntries(formData.entries());

  // Realizar una solicitud POST a la API de inicio de sesión
  try {
    fetch("http://localhost:4321/auth/sign-in", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(entries),
    }).then((response) => {
      if (response.ok == true) {
        setTimeout(() => {
          response.json().then((json) => {
            localStorage.setItem("token", json.token);
          });
          window.location.href = "/";
        }, 200);
      } else {
        response.json().then((json) => {
          if (json.errors) {
            const { msg, path } = json.errors[0];
            alert("Error: " + msg + " in " + path);
          } else {
            alert(json.message);
          }
        });
      }
    });
  } catch (error) {
    console.log("Error");
    window.location.reload();
  }
});
