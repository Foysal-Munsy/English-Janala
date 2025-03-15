function login(event) {
  event.preventDefault();
  const user = document.getElementById("username").value;
  //   console.log(user);
  const password = document.getElementById("password").value;
  if (user) {
    alert("Please enter a username.");
    return;
  }
  if (password === "") {
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
function removeActiveClass() {
  const activeBtns = document.getElementsByClassName("active");
  for (let btn of activeBtns) {
    btn.classList.remove("active");
  }
}
const loadAllLevels = () => {
  const url = "https://openapi.programming-hero.com/api/levels/all";
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayBtnLevel(data);
    });
};
const displayBtnLevel = (levels) => {
  const vocabulariesBtnContainer = document.getElementById(
    "vocabularies-btn-container"
  );
  for (let i = 0; i < levels.data.length; i++) {
    // console.log(levels.data[i].level_no);
    const div = document.createElement("div");
    div.innerHTML = `
    <button onclick="wordsByLevel(${levels.data[i].level_no})"  class="btn btn-outline btn-primary"><i class="fa-solid fa-book-open"></i> Lesson- ${levels.data[i].level_no}</button>
    `;
    vocabulariesBtnContainer.append(div);
  }
};

const wordsByLevel = (id) => {
  //   console.log(id);
  const url = `https://openapi.programming-hero.com/api/level/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      //   removeActiveClass();
      //   document.getElementById("btn-all").classList.add("active");
      displayWords(data);
      const ids = data.data.map((item) => item.id); // Extract all IDs
      //   console.log(ids);
    });
};

const displayWords = (lessons = "") => {
  //   console.log(lessons.data.length);
  const lessonContainer = document.getElementById("lesson-container");
  const noLessonContainer = document.getElementById("no-lesson-container");
  lessonContainer.innerHTML = "";
  //   console.log(lessons.data);
  if (lessons.data.length === undefined) {
    document.getElementById("lesson-container").classList.remove("grid");
    lessonContainer.innerHTML = `
    <div class="bg-gray-50 text-center py-20 rounded-2xl grid gap-3">
                    <p class="text-sm text-gray-400">আপনি এখনো কোন Lesson Select করেন নি।</p>
                    <h1 class="text-2xl">একটি Lesson Select করুন।</h1>
                </div>
          `;

    return;
  } else if (lessons.data.length === 0) {
    document.getElementById("lesson-container").classList.remove("grid");
    lessonContainer.innerHTML = `
         <div class="bg-gray-50 text-center py-20 rounded-2xl grid place-items-center gap-3">
                    <img src="./assets/alert-error.png" alt="alert">
                    <p class="text-sm text-gray-400">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
                    <h1 class="text-2xl">নেক্সট Lesson এ যান</h1>
                </div>
          `;
    return;
  }
  lessons.data.forEach((lesson) => {
    // console.log(lesson);
    document.getElementById("lesson-container").classList.add("grid");
    const lessonCard = document.createElement("div");
    lessonCard.innerHTML = `
      <div class="bg-white rounded-lg p-10 grid gap-7">
                        <div class="grid place-items-center">
                            <h1 class="font-bold text-xl">${lesson.word}</h1>
                            <p>Meaning /Pronunciation</p>
                            <h1 class="font-semi-bold text-gray-700 text-xl">"${lesson.meaning} / ${lesson.pronunciation}"</h1>
                        </div>
                        <div class="flex justify-between">
                            <button onclick="word_details.showModal()" class="btn btn-square"><i class="fa-solid fa-circle-info"></i></button>
                            <button class="btn btn-square"><i class="fa-solid fa-volume-high"></i></button>
                        </div>
                    </div>
      `;
    lessonContainer.append(lessonCard);
  });
};
const loadWordDetails = (id) => {
  //   console.log(id.id);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  //   fetch(url)
  //     .then((res) => res.json())
  //     .then((data) => console.log(data));
};
// const displayWordDetails = (word) => {
//   console.log(word);
//   //   const videoDetails = document.getElementById("video_details");
//   //   videoDetails.showModal();
//   //   const detailsContainer = document.getElementById("details_container");
//   //   detailsContainer.innerHTML = `

//   //     `;
// };
wordsByLevel();
loadAllLevels();
