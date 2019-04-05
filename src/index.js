const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
  } else {
    toyForm.style.display = 'none'
  }
})

//PART 1: create card for each toy
const createToyCard = function createToyCard(toy) {
  const collection = document.querySelector('#toy-collection')
  //make card for each toy
  const card = document.createElement('div')
  card.setAttribute('class', 'card')
  //set up html for each card
  //set up h2 title
  let h2 = document.createElement('h2')
  h2.innerText = toy.name
  card.appendChild(h2)
  //set up img
  let img = document.createElement('img')
  img.setAttribute('class', 'toy-avatar')
  img.src = toy.image
  card.appendChild(img)
  //set up p likes
  let p = document.createElement('p')
  p.innerText = `${toy.likes} Likes`
  card.appendChild(p)
  //set up like button
  let button = document.createElement('button')
  button.setAttribute('class', 'like-btn')
  button.innerHTML = "Like"
  card.appendChild(button)
  
  //PART 4: set up activity for like button
  button.addEventListener('click', function (e) {
    e.preventDefault()
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
    .then(function (response) {
      return response.json()
    })
    .then(function (newData) {
      //change the html page of the toy likes
      p.innerText = `${newData.likes} Likes`
    })
  })

  //append card to div
  collection.appendChild(card)
}


// PART 2: add event to document to display all toys
document.addEventListener('DOMContentLoaded', function(){
  //select the div where we will add toy information
  fetch('http://localhost:3000/toys')
    .then(function(response){
      return response.json()
    })
    .then(function(allToys){
      allToys.forEach(createToyCard) //call the createcard function for each toy
    })
})

//PART 3: create new toy to the database, and create card for each new toy
//select form element
const form = toyForm.querySelector('.add-toy-form')

//3.1. create new Toy, post to server
function newToy(){
  //set up const for input value
  let name = form.querySelectorAll('.input-text')[0].value;
  let image = form.querySelectorAll('.input-text')[1].value;
  //post data
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body:JSON.stringify({
     name: name, //get name input
     image: image, //get image input
     likes: 0 //get likes input
    })
  })
  //get the new toy data from the server
  .then((res) => res.json())
  //call create card function for the new toydata
  .then((newToy)=> createToyCard(newToy))
}

//3.2. add event to form after submitted
form.addEventListener('submit', function (e) {
  e.preventDefault()
  //make the form invisible
  toyForm.style.display = 'none'
  //call newToy function, create new Toy, post to server
  newToy()
})

