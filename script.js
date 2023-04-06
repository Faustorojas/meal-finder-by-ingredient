const recipeLink = "https://www.themealdb.com/api/json/v1/1/filter.php?i="
const instructionLink = "https://www.themealdb.com/api/json/v1/1/lookup.php?i="
const inputBox = document.querySelector(".input-box")
const searchBtn = document.querySelector(".btn")
const searchResult = document.querySelector(".search-results")
const instruction = document.querySelector(".instructions")


//show the recipes on the dom
const searchItems = async (e) => {
   e.preventDefault()
   searchResult.innerHTML = ""
   storageResult(inputBox.value)
   try{
      let data = await fetch(`${recipeLink}${inputBox.value.trim()}`)
      let response = await data.json()
      response.meals.forEach(data => {
         searchResult.innerHTML += `<div class="search-item" data-id="${data.idMeal}">
         <img src="${data.strMealThumb}" alt="food" class="item-photo">
         <p class="hd-secundary fw-semi-bold">${data.strMeal}</p>
         <button class="btn">Get Recipe</button>
       </div>`

      
      });

      
   } catch{
      searchResult.innerHTML = `<h1>Meal Not Found</h1>`
   }

   inputBox.value = ""
}

const showDetails =  async (e) => {
 
  
   if(e.target.classList[0] == "btn"){
      let itemId = e.target.parentElement.dataset.id

      let data = await fetch(`${instructionLink}${itemId}`)
      let response = await data.json()
      response.meals.forEach(data => {
         instruction.innerHTML = ` <p class="instructions-x">x</p>
         <p class="instructions-name hd-secundary fw-semi-bold">${data.strMeal}</p>
         <p class="instructions-type">${data.strCategory}</p>
         <h5 class="instructions-starts">instructions:</h5>
         <p class="instructions-text">${data.strInstructions
         }</p>
         <img src="${data.strMealThumb}" alt="food" class="instructions-photo">
         <a href="${data.strYoutube}" class="instructions-link" target="_blank">Watch Video</a>`
         instruction.classList.add("show")
        
      });
   } 

}

//save last search in localStorage

const storageResult =  (data) =>{
  let meal 
  if(localStorage.getItem("meal") == null){
   meal = ""
  } else{
   meal = JSON.parse(localStorage.getItem("meal"))
  }

  meal = data
  localStorage.setItem("meal", JSON.stringify(meal))

   
}

//show last search in the dom from localStorage
const updateDom = async () => {
   try{
      let data = await fetch(`${recipeLink}${JSON.parse(localStorage.getItem("meal"))}`)
      let response = await data.json()
      response.meals.forEach(data => {
         searchResult.innerHTML += `<div class="search-item" data-id="${data.idMeal}">
         <img src="${data.strMealThumb}" alt="food" class="item-photo">
         <p class="hd-secundary fw-semi-bold">${data.strMeal}</p>
         <button class="btn">Get Recipe</button>
       </div>`
   
      
      });
   
      
   } catch{
      searchResult.innerHTML = `<h1>Meal Not Found</h1>`
   }
}




//Event Listeners
searchBtn.addEventListener("click", searchItems)
searchResult.addEventListener("click", showDetails)
instruction.addEventListener("click", (e) => {
   if(e.target.classList.contains("instructions-x")){
      instruction.classList.remove("show")
    }
})
document.addEventListener("DOMContentLoaded", updateDom)





































