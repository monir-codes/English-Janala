const lessonsLoad = ()=> {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(data=> dataLoad(data.data))
}

const wordsLoad = (id)=>{
    const url = `https://openapi.programming-hero.com/api/level/${id}`
    fetch(url).then(res => res.json()).then(data => wordsLoadDisplay(data.data))

}

const wordsLoadDisplay = (words)=>{
const wordContainer = document.getElementById("word-container");

wordContainer.innerHTML = "";


words.forEach(word => {
    let cards = document.createElement("div")
    cards.innerHTML = `
      <div class="bg-white md:p-10 text-center items-center justify-center rounded-lg">
    <h2 class="font-bold text-2xl">
      ${word.word}
    </h2>
    <p class="font-medium py-3">Meaning /Pronounciation</p>
    <div class="font-semibold font-bangla text-2xl py-3">"${word.pronunciation}"</div>

    <div class="flex justify-between mt-3 ">
      <button class="bg-[#1A91FF10] hover:bg-[#1A91FF80] transition-all rounded-lg p-3"><i class="fa-solid fa-circle-info"></i></button>
      <button class="bg-[#1A91FF10]  hover:bg-[#1A91FF80] transition-all p-3 rounded-lg"><i class="fa-solid fa-volume-high"></i></button>
    </div>
  </div>
    `
    console.log(words)
    wordContainer.appendChild(cards)
});
}

const dataLoad = (lesson)=> {
    console.log(lesson)
const levelContainer = document.getElementById("level-container")
levelContainer.innerHTML = "";
for (let lessons of lesson){
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
     <button onclick="wordsLoad(${lessons.
level_no})" class="btn btn-outline btn-primary"><i class="fa-solid fa-circle-question"></i>Lesson - ${lessons.
level_no}</button>
    `;

    levelContainer.appendChild(btnDiv)
}

}

lessonsLoad()