const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const TOY_URL = 'http://localhost:3000/toys'

// YOUR CODE HERE

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    addToyEventListener()
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!

function  addToyCard(toy) {

  //finds main div
  const toyDiv = document.querySelector('#toy-collection')

  // create div for each card
  const toyCardDiv = document.createElement('div')
  toyCardDiv.className = 'card'
  toyDiv.append(toyCardDiv)

  //creates h2 tag with name input
  const toyName = document.createElement('h2')
  toyName.innerText = toy.name

  // creates image tag with image input
  const toyImage = document.createElement('img')
  toyImage.className = 'toy-avatar'
  toyImage.src = toy.image

  // creates p tag with number of likes
  const numberOfLikes = document.createElement('p')
  numberOfLikes.innerText = `${toy.likes} likes`

  // creates like button
  const likesButton = document.createElement('button')
  likesButton.className = 'like-btn'
  likesButton.innerText = 'Like <3'

  toyCardDiv.append(
    toyName,
    toyImage,
    numberOfLikes,
    likesButton
  )

  addLikeButtonEventListener(likesButton, toy)
}

function fetchToys() {
  fetch(TOY_URL)
  .then(function(resp){
    return resp.json()
  })
  .then(function(toys){   
    toys.forEach(addToyCard)
  })
}

function addLikeButtonEventListener(likesButton, toy, numberOfLikes) {
  toy.likes++
  likesButton.addEventListener('click', function(){
    fetch(`${TOY_URL}/${toy.id}`, {
      method: "PATCH",
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        likes: toy.likes
      })
    })
    .then(function(res){
      return res.json()
    })
    .then(function(toy, numberOfLikes){
      numberOfLikes.innerText = `${toy.likes} likes`
    })
  })

}

function addToyEventListener() {
  const toyNameInput = document.querySelector('#toy-name-input')
  const toyImageInput = document.querySelector('#toy-image-input')
  let toy = {
    name: toyNameInput.value,
    image: toyImageInput.value,
    likes: 0
  }
  const createToyButton = document.querySelector('#create-toy-button')
  createToyButton.addEventListener('submit', function(e){
    e.preventDefault()
    fetch(TOY_URL, {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        "name": toy.name,
        "image": toy.image,
        "likes": toy.likes
      })
    })
    .then(function(resp){
      return resp.json
    })
    .then (function(toy){
      addToyCard(toy)
    }) 
  })
}



fetchToys()