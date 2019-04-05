const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

document.addEventListener('DOMContentLoaded', function() {

  fetch('http://localhost:3000/toys')
    .then(function(res){
      return res.json()
    })
    .then(function(toys){
      toys.forEach(function(toy) {
        newToyCard(toy)
      })
    })

  function newToyCard(toy){
    let cards = document.querySelector('#toy-collection')
    let card = document.createElement('div')
    card.className = "card"
    cards.append(card)
    let toyName = document.createElement('h2')
    toyName.innerText = toy.name
    let pic = document.createElement('img')
    pic.classList.add('toy-avatar')
    pic.src = toy.image
    let likes = document.createElement('p')
    likes.innerText = `${toy.likes} Likes`
    likes.id = `toyLikes${toy.id}`
    let button = document.createElement('button')
    button.className = "like-btn"
    button.innerText = "Like"
    button.id = `000${toy.id}`
    button.addEventListener('click', function(){
      likeToy(parseInt(button.id))
    })
    card.append(toyName, pic, likes, button)
  }

  addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
    if (addToy) {
      toyForm.style.display = 'block'
      let inputs = document.querySelectorAll('.add-toy-form input')
      inputs[2].addEventListener('click', function(e){
        e.preventDefault()
        createNewToy(inputs)
      })
    } else {
      toyForm.style.display = 'none'
    }
  })

  function createNewToy(inputs){
    fetch('http://localhost:3000/toys', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "name": inputs[0].value,
        "image": inputs[1].value,
        "likes": 0
      })
    })
    .then(function(res){
      return res.json()
    })
    .then(function(toy){
      newToyCard(toy)
    })
  }

  function likeToy(toyId){
    let toyLikes = document.querySelector(`#toyLikes${toyId}`)
    let newLikes = parseInt(toyLikes.innerText[0]) + 1
        fetch(`http://localhost:3000/toys/${toyId}`, {
      method: 'PATCH',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "likes": newLikes
      })
    })
    .then(function(res){
      return res.json()
    })
    .then(function(toy){
      toyLikes.innerText = `${newLikes} Likes`
    })
  }



})

