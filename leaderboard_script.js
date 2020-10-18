const score = document.querySelector("#score")
const name = document.querySelector("#name")
const userData = JSON.parse(localStorage.getItem("user"))
console.log(userData)
if(userData){
    name.innerHTML = `Good job, ${userData.name}!`
    score.innerHTML = `${userData.score}/20`
}
