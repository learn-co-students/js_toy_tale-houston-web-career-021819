const addBtn = document.querySelector('#new-toy-btn')
const toyCollection = document.querySelector('#toy-collection')
const nameInput = document.querySelector('.name-input')
const imageInput = document.querySelector('.image-input')
const toyForm = document.querySelector(".container");//used for the css styling of the doumnent??
let addToy = false;

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
});

//fetch all toys
fetch ("http://localhost:3000/toys")
    .then(function(response){
      return response.json()
    })
    .then(function(toyData){
      toyData.forEach(function(toy){
        makeToyCard(toy)
      })
    })

    //create funciton makeToyCard
    function makeToyCard(toy){
    const cardDiv = document.createElement('div')
    cardDiv.className = 'card'
    toyCollection.append(cardDiv)
      //cards should be on the page

    const nameTag = document.createElement('h2')
    nameTag.innerText = toy.name 

    const imageTag = document.createElement('img')
    imageTag.src = toy.image 
    imageTag.className = 'toy-avatar'

    const likesTag = document.createElement('p')
    likesTag.innerText = toy.likes

    const likeBtn = document.createElement('button')
    likeBtn.innerText = "Like<3"
    likeBtn.className = 'like-btn'
    likeBtn.addEventListener('click', function(){
      likeToy(toy, likesTag)
    })

    cardDiv.append(nameTag, imageTag, likesTag, likeBtn)
}

    const likeToy = function(toy, likesTag){
      //toy.likes++
      toy.likes = toy.likes + 1
      likesTag.innerText = `${toy.likes}`
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          likes : toy.likes
        })
        })
        .then(function(response){

        })
    }

const addNewToy = function(e) {
  e.preventDefault()
  fetch ("http://localhost:3000/toys",{
    method: "POST",
    headers: {
      "Content-Type" : "application/json"
    },
    body: JSON.stringify({
      name: nameInput.value,
      image: imageInput.value,
      likes : 0
    })
  })
  .then(function(response){
    return response.json()
  })
  .then(function(response){
    console.log(response)
    
    makeToyCard(response)
  })
}
toyForm.addEventListener('submit', addNewToy)

    