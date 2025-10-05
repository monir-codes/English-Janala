const createElement = (arr)=>{
  const htmlElement = arr.map((el)=> `<span class="btn">${el}</span>`);
  return htmlElement.join(" ")
}

const spinner = (status)=>{
  if (status == true){
    document.getElementById("spinner").classList.remove("hidden");
    document.getElementById("word-container").classList.add("hidden")
  }else{
        document.getElementById("spinner").classList.add("hidden")
       document.getElementById("word-container").classList.remove("hidden")

  }
}

function pronounceWord(word) {
  const utterance = new SpeechSynthesisUtterance(word);
  utterance.lang = "en-EN"; // English
  window.speechSynthesis.speak(utterance);
}

const lessonsLoad = ()=> {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(data=> dataLoad(data.data))
}

const wordsLoad = (id)=>{
  spinner(true)
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url)
    .then(res => res.json())
    .then(data => {
      const lessonBtns = document.getElementById(`btn-active${id}`);
      removeActive()
    lessonBtns.classList.add("active")
    wordsLoadDisplay(data.data)})


}


const removeActive = ()=>{
const btnLessons = document.querySelectorAll(".btn-lessons");
btnLessons.forEach(btns => {
btns.classList.remove("active")  
});
}

const wordModal =  async(id)=>{

const url = `https://openapi.programming-hero.com/api/word/${id}`
const res = await fetch(url);
const details = await res.json()
const data = await wordModalDisplay(details.data)

}


const wordModalDisplay = (data)=>{
const modalParent = document.getElementById("my_modal_5");
modalParent.showModal()
modalParent.innerHTML = ` <div class="modal-box ">
    <div class="space-y-5">
      <div>
        <h2 class="text-2xl font-bold">${data.word} ( <i class="fa-solid fa-microphone-lines"></i> :${data.pronunciation})</h2>
      </div>
      <div>
         <h2 class="font-semibold">Meaning</h2>
         <p>${data.meaning}</p>
      </div>
      <div>
         <h2 class="font-semibold">Example</h2>
         <p>${data.sentence}</p>
      </div>
      <div>
         <h2 class="">সমার্থক শব্দ গুলো</h2>
         <div>${createElement(data.synonyms)}</div>
      </div>
    </div>
    <div class="modal-action">
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  </div>`
}

const wordsLoadDisplay = (words)=>{

const wordContainer = document.getElementById("word-container");

wordContainer.innerHTML = "";

if (words.length == 0){
wordContainer.innerHTML= `<div class=" col-span-3 text-center font-bangla">
    <img class="mx-auto mb-3" src="./assets/alert-error.png" />
  <p class="mb-4 font-medium text-lg text-[#79716B]">এই Lesson এ এখনো কোন Vocabulary যুক্ত করা হয়নি।</p>
  <h2 class="font-semibold text-5xl ">নেক্সট Lesson এ যান</h2>
</div>`
spinner(false)
return
}


words.forEach(word => {
    let cards = document.createElement("div")
    cards.innerHTML = `
      <div class="bg-white md:p-10 text-center items-center justify-center rounded-lg">
    <h2 class="font-bold text-2xl">
      ${word.word ? word.word : "শব্দ খুজে পাওয়া যায়নি"}
    </h2>
    <p class="font-medium py-3">Meaning /Pronounciation</p>
    <div class="font-semibold font-bangla text-2xl py-3">"${word.meaning ? word.meaning : "অর্থ খুজে পাওয়া যায়নি"
    } / ${word.pronunciation ? word.pronunciation : "উচ্চারণ খুজে পাওয়া যায়নি"}"</div>

    <div class="flex justify-between mt-3 ">
      <button onclick="wordModal(${word.
id})" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] transition-all rounded-lg p-3"><i class="fa-solid fa-circle-info"></i></button>
      <button onclick="pronounceWord('${word.word}')" class="bg-[#1A91FF10] hover:bg-[#1A91FF80] transition-all p-3 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
    `
    wordContainer.appendChild(cards)
  });
  spinner(false)


}



const dataLoad = (lesson)=> {
    console.log(lesson)
const levelContainer = document.getElementById("level-container")
levelContainer.innerHTML = "";
for (let lessons of lesson){
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
     <button id="btn-active${lessons.
level_no}" onclick="wordsLoad(${lessons.
level_no})" class="btn btn-lessons btn-outline btn-primary"><i class="fa-solid fa-circle-question"></i>Lesson - ${lessons.
level_no}</button>
    `;

    levelContainer.appendChild(btnDiv)
}

}

lessonsLoad()

document.getElementById("search").addEventListener("click", ()=>{
  removeActive()
const input = document.getElementById("search-input");
const searchValue = input.value.trim().toLowerCase();

fetch("https://openapi.programming-hero.com/api/words/all")
.then(res=> res.json())
.then(data=> {

  const allWords = data.data
  const filterWords = allWords.filter((word)=> word.word.toLowerCase().includes(searchValue));
  wordsLoadDisplay(filterWords)
})

})