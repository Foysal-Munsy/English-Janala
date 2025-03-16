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
    // document.getElementById("foot").classList.remove("hidden");
  } else {
    alert("Incorrect password. Please enter 123456.");
  }
}
function logout() {
  document.getElementById("banner").classList.remove("hidden");
  document.getElementById("nv").classList.add("hidden");
  document.getElementById("voca").classList.add("hidden");
  document.getElementById("faq").classList.add("hidden");
  //   document.getElementById("foot").classList.add("hidden");
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
    const div = document.createElement("div");

    // Create button element
    const button = document.createElement("button");
    button.id = `btn-${levels.data[i].level_no}`; // Unique ID
    button.className = "btn btn-outline btn-primary"; // Default classes
    button.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson- ${levels.data[i].level_no}`;

    button.addEventListener("click", async function () {
      // Removing active class
      document
        .querySelectorAll("#vocabularies-btn-container button")
        .forEach((btn) => {
          btn.classList.remove("btn-active");
          btn.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson- ${
            btn.id.split("-")[1]
          }`;
        });

      // Adding active class
      this.classList.add("btn-active");

      this.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Loading...`;

      await new Promise((resolve) => setTimeout(resolve, 200));
      await wordsByLevel(levels.data[i].level_no);

      // Restoring button text after loading
      this.innerHTML = `<i class="fa-solid fa-book-open"></i> Lesson- ${levels.data[i].level_no}`;
    });

    div.appendChild(button);
    vocabulariesBtnContainer.appendChild(div);
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
      //   displayModal(data);
    });
};
function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}
const displayWords = (lessons = null) => {
  console.log(lessons);
  const lessonContainer = document.getElementById("lesson-container");
  //   document.getElementById("lesson-container").classList.remove("grid");
  //   const noLessonContainer = document.getElementById("no-lesson-container");
  lessonContainer.innerHTML = "";
  //   console.log(lessons.data);
  //   if (lessons.data.length !== 0) {
  //     document.getElementById("lesson-container").classList.remove("grid");
  //     lessonContainer.innerHTML = `
  //              <div class="bg-gray-50 text-center py-20 rounded-2xl grid gap-3">
  //                             <p class="text-sm text-gray-400">আপনি এখনো কোন Lesson Select করেন নি।</p>
  //                             <h1 class="text-2xl">একটি Lesson Select করুন।</h1>
  //                         </div>
  //               `;
  //     return;
  //   }

  if (lessons.data.length === 0) {
    console.log(lessons.data.length);
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
    // console.log(lesson.id);
    document
      .getElementById("lesson-container")
      .classList.add("grid", "grid-cols-3", "gap-4");
    const lessonCard = document.createElement("div");
    lessonCard.innerHTML = `
          <div class="bg-white rounded-lg p-10 grid gap-7">
                            <div class="grid place-items-center">
                                <h1 class="font-bold text-xl">${lesson.word}</h1>
                                <p>Meaning /Pronunciation</p>
                                <h1 class="font-semi-bold text-gray-700 text-xl">"${lesson.meaning} / ${lesson.pronunciation}"</h1>
                            </div>
                            <div class="flex justify-between">
                           
                                <button onclick="displayModal(${lesson.id})"  class="btn btn-square"><i class="fa-solid fa-circle-info"></i></button>
                                <button onclick="pronounceWord('${lesson.word}')" class="btn btn-square"><i class="fa-solid fa-volume-high"></i></button>
                            </div>
                        </div>
          `;
    lessonContainer.append(lessonCard);
  });
};
const displayModal = (id) => {
  console.log(id);
  const url = `https://openapi.programming-hero.com/api/word/${id}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => displayWordDetails(data));
};

const displayWordDetails = (word) => {
  console.log(word.data.synonyms);
  const synonym = word.data.synonyms;
  const synonymContainer =
    synonym.length > 0
      ? synonym
          .map(
            (word) =>
              `<span class="px-3 py-1 bg-blue-100 rounded-md">${word}</span>`
          )
          .join("")
      : `<p class="text-gray-700">এখানে কোনো সমার্থক শব্দ খুঁজে পাওয়া যায় নি।</p>`;

  const wordDetails = document.getElementById("word_details");
  wordDetails.showModal();
  const detailsContainer = document.getElementById("word_details");
  detailsContainer.innerHTML = `
    <div class="modal-box">
        <div class="border border-blue-100 p-4 rounded-lg">
            <h2 class="text-xl font-bold">${word.data.word} <span class="text-gray-500">(<i class="fa-solid fa-microphone-lines"></i>: ${word.data.pronunciation} )</span></h2>
            <p class="mt-3 font-semibold">Meaning</p>
            <p class="text-gray-700">${word.data.meaning}</p>
            <p class="mt-3 font-semibold">Example</p>
            <p class="text-gray-700">${word.data.sentence}</p>
            <p class="mt-3 font-semibold">সমার্থক শব্দগুলো</p>
            <div class="flex space-x-2 mt-2">
                ${synonymContainer} 
            </div>
        </div>
        <form method="dialog">
            <button class="btn btn-active mt-5 btn-primary text-white py-2 rounded-lg">Complete
                Learning</button>
        </form>
    </div>
      `;
};
// wordsByLevel();
loadAllLevels();
