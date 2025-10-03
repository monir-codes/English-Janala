const lessonsLoad = ()=> {
    fetch("https://openapi.programming-hero.com/api/levels/all").then(res => res.json()).then(data=> dataLoad(data.data))
}

const dataLoad = (lesson)=> {
    console.log(lesson)
const levelContainer = document.getElementById("level-container")
levelContainer.innerHTML = "";
for (let lessons of lesson){
    const btnDiv = document.createElement("div")
    btnDiv.innerHTML = `
     <button class="btn btn-outline btn-primary"><i class="fa-solid fa-circle-question"></i>Lesson - ${lessons.
level_no}</button>
    `

    levelContainer.appendChild(btnDiv)
}

}

lessonsLoad()