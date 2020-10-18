const takeQuizbtn = document.querySelector("#sbtn")
const ctaButton = document.querySelector(".cta")
const answerChoices = document.querySelectorAll(".choice")
const answersBox = document.querySelector(".answers")
const questionBox = document.querySelector(".question")
const question = document.querySelector("#question")
const questionNum = document.querySelector("#questionNum")
const url = "https://quizapi.io/api/v1/questions?apiKey=N8Oj0IvV0uty64iH6wUwN794PYi2cqwnjAMhuZKo&limit=20"
var questions = []
const ansChoices = ["A", "B", "C", "D", "E", "F"] 
var index = 0
var score = 0


// Function to add countries to list
const addCountries = () =>{
    fetch("https://restcountries.eu/rest/v2/all")
    .then(res => res.json())
    .then(data =>{
        countries =""
        data.forEach(country =>{
            countries += `<option value=${country.name}>${country.name}</option>`
        })

        document.querySelector("#country_input").innerHTML = countries
    })

    
}
addCountries()

// Function to start Quiz
takeQuizbtn.addEventListener("click", ()=>{
    // Fetch questions
    let name = document.querySelector("#name_input").value
    if(name){
        try{
            fetch(url)
            .then(res => res.json())
            .then(data => {
                questions = data
                setQuestion(questions, index)
    
                document.querySelector(".content").classList.add("hide")
                questionBox.classList.remove("hide")
            })
        }catch(e){
            alert(e)
        }
    }else{
        document.querySelector("#error").innerHTML = "Please fill all fields"
    }

})


// Function to submit answer/Move to next question
ctaButton.addEventListener("click", ()=>{
    if(ctaButton.classList.contains("submit_answer")){
        ctaButton.classList.toggle('submit_answer')
        ctaButton.classList.toggle('next')
        ctaButton.innerHTML = "Next"

        document.querySelector(".true").classList.add("correct")
        if(document.querySelector('input[name="answer_choice"]:checked').value === "true"){
            score++
        }else{
            var inputId = document.querySelector('input[name="answer_choice"]:checked').id
            var labels = document.querySelectorAll('.answer');
            
            labels.forEach(label =>{
                var elem = document.getElementById(label.htmlFor);
                if (elem.id == inputId){
                    label.classList.add("wrong")       
                }

            })

        }

    }else{
        ctaButton.classList.toggle('submit_answer')
        ctaButton.classList.toggle('next')
        ctaButton.innerHTML = "Submit answer"
        if(index < 20){
            setQuestion(questions, index)
        }else{
            let name = document.querySelector("#name_input").value
            let country = document.querySelector("#country_input").value
            let category = document.querySelector("#category").value
            localStorage.setItem("user", JSON.stringify({
                name:name,
                category:category,
                country:country,
                score:score
            }))
            window.location.href = "leaderboard.html"
        }

    }

})

// Function to set question
const setQuestion = (questions, curIndex) =>{
    var currentQuestion = questions[curIndex]
    questionNum.innerHTML = curIndex + 1
    question.innerHTML = currentQuestion.question
    index++;

    var currentAnswers = Object.values(currentQuestion.answers)
    var currentCorrectAnswers = Object.values(currentQuestion.correct_answers)

    var answerInnerHtml = ""
    for(let i=0; i<currentAnswers.length; i++){
      if(currentAnswers[i]){
        let curAns = currentAnswers[i].replace(">","&gt").replace("<", "&lt")
        answerInnerHtml += `<div class="choice">
        <input type="radio" name="answer_choice" id="c${i}" value="${currentCorrectAnswers[i]}">
        <label for="c${i}" class="answer ${currentCorrectAnswers[i]}">${ansChoices[i]}. <span class="possible_answer">${curAns}</span></label>
        </div>`
      }
    }

    answersBox.innerHTML = answerInnerHtml

} 
