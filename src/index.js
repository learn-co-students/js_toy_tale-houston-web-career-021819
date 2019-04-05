const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const newToyButton = document.querySelector('#the-new-toy-button')
let addToy = false
let divHolder = document.querySelector("#toy-collection")


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

    newToyButton.addEventListener("click", function(){
      let newToyDetails = document.querySelectorAll(".input-text")
      if (newToyDetails[0].value != "" && newToyDetails[1].value != ""){
        fetch("http://localhost:3000/toys", {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "name" : newToyDetails[0].value,
            "image" : newToyDetails[1].value,
            "likes" : 0
          })
      })} 
    })
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener("DOMContentLoaded", function(){
  fetch("http://localhost:3000/toys")
  .then(function(res){
    return res.json();
  })
  .then(function(toys){
    addToyDivs(toys)
  })
})

function addToyDivs(toys){
  for(let i = 0; i < toys.length; i++){
    let toyDivs = document.createElement("div")
    toyDivs.className = "card"

    let h2 = document.createElement("h2")
    h2.innerText = toys[i].name

    let toyImage = document.createElement("img")
    toyImage.className = "toy-avatar"
    toyImage.src = toys[i].image

    let toyP = document.createElement("p")
    toyP.innerText = `${toys[i].likes} Likes`

    let likeButton = document.createElement("button")
    likeButton.className = "like-btn"
    likeButton.innerText = "Like <3"
    
    likeButton.addEventListener("click", function(){
      fetch(`http://localhost:3000/toys/${toys[i].id}`, {
        method: "PATCH",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          "likes" : toys[i].likes += 1
        }) 
      })
      toyP.innerText = `${parseInt(toys[i].likes)} Likes`
    })

    toyDivs.append(h2, toyImage, toyP, likeButton)
    divHolder.append(toyDivs)
  }
}




