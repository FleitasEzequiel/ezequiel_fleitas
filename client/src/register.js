const $signup = document.querySelector("#signup");
$signup.addEventListener("click", (e) => {
  e.preventDefault();
  const data = {
    username: document.querySelector("#username").value,
    email: document.querySelector("#email").value,
    password: document.querySelector("#password").value,
  };
  try {
    fetch("http://localhost:4321/auth/sign-up", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "Application/JSON",
      },
    }).then((response) => {
      if (response.ok) {
        alert("User created");
        window.location.href = "./login.html";
      } else {
        response.json().then((json) => {
          if (json.errors) {
            const { msg, path } = json.errors[0];
            alert("Error: " + msg + " in " + path);
          }
        });
      }
    });
  } catch (error) {
    alert("Error");
    window.location.reload();
  }
});

import "./style.css";
