function login(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  //   console.log(user);
  const password = document.getElementById("password").value;
  if (!user) {
    alert("Please enter a username.");
    return;
  }
  if (password === "123456") {
    document.getElementById("banner").classList.add("hidden");
    document.getElementById("nv").classList.remove("hidden");
    document.getElementById("voca").classList.remove("hidden");
    document.getElementById("faq").classList.remove("hidden");
    document.getElementById("foot").classList.remove("hidden");
  } else {
    alert("Incorrect password. Please enter 123456.");
  }
}
function logout() {
  document.getElementById("banner").classList.remove("hidden");
  document.getElementById("nv").classList.add("hidden");
  document.getElementById("voca").classList.add("hidden");
  document.getElementById("faq").classList.add("hidden");
  document.getElementById("foot").classList.add("hidden");
}

const vocabulariesBtn = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayLevel(data));
};
const displayLevel = (levels) => {
  //   console.log(levels.data[0].level_no);
  const vocabulariesBtnContainer = document.getElementById(
    "vocabularies-btn-container"
  );
  for (let i = 0; i < levels.data.length; i++) {
    // console.log(levels.data[i].level_no);
    const div = document.createElement("div");
    div.innerHTML = `
    <button class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${levels.data[i].level_no}</button>
    `;
    vocabulariesBtnContainer.append(div);
  }
};

vocabulariesBtn();
