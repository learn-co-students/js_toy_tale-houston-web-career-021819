const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function(){
  const toyCollection = document.querySelector('#toy-collection')
  fetch('http://localhost:3000/toys')
  .then(res => res.json())
  .then(function(toys){
    toys.forEach(function(toy){
      const toyCard = createToyCard(toy)
      toyCollection.append(toyCard)
    })
  })

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    toggleAddToy()
  })

  toyForm.addEventListener('submit', function(e){
    e.preventDefault()
    const newToyName = toyForm.firstElementChild.children[1].value
    const newToyUrl = toyForm.firstElementChild.children[3].value
    fetch('http://localhost:3000/toys', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "name": newToyName,
        "image": newToyUrl,
        "likes": 0
      })
    })
    .then(res => res.json())
    .then(toy => toyCollection.append(createToyCard(toy)))
    toggleAddToy()
  })
})

function convertLikesToString(likesInteger) {
  const numberOfLikes = likesInteger
  let likesString = numberOfLikes + " Like"
  if (numberOfLikes !== 1) {
    likesString += "s"
  }
  return likesString
}

function toggleAddToy() {
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
}













// OR HERE!
