function validateForm(event) {
  event.preventDefault();

  const user = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!user) {
    alert("Please enter a username.");
    return;
  }

  if (password === "123456") {
    document.getElementById("banner").classList.add("hidden");
    document.getElementById("nv").classList.remove("hidden");
  } else {
    alert("Incorrect password. Please enter 123456.");
  }
}
function logout() {
  document.getElementById("banner").classList.remove("hidden");
  document.getElementById("nv").classList.add("hidden");
}
