const BASE_URL = "http://localhost:3000"
const TOY_URL = `${BASE_URL}/toys`
const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE

const toyCollectionDiv = document.querySelector("#toy-collection")

fetch(TOY_URL)
  .then(function (response) {
    return response.json()
  })
  .then(function (toyData) {
    toyData.forEach(addToyInfo)
  })


function addToyInfo(toy) {
  const cardDiv = document.createElement('div')
  cardDiv.className = "card"
  toyCollectionDiv.append(cardDiv)

  const headerTag = document.createElement('h2')
  headerTag.append(toy.name)

  const imgTag = document.createElement('img')
  imgTag.className = "toy-avatar"
  imgTag.src = toy.image

  const pTag = document.createElement('p')
  pTag.className = `toy-likes-${toy.id}`
  pTag.append(`${toy.likes} Likes`)

  const likeButton = document.createElement('button')
  likeButton.className = `like-btn-${toy.id}`
  likeButton.append("Like <3")

  cardDiv.append(
    headerTag,
    imgTag,
    pTag,
    likeButton
  )

  likeButton.addEventListener('click', (e) => {
    e.preventDefault()
    addLikes(toy)
    pTag.innerText = `${toy.likes} likes`
  })


}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

    // submit listener here
    const createNewToyButton = document.querySelector('.submit')

    createNewToyButton.addEventListener('click', (e) => {
      e.preventDefault()

      let inputName = document.querySelector('input[name="name"]')
      let inputImage = document.querySelector('input[name="image"]')

      let toy = {
        name: inputName.value,
        image: inputImage.value,
        likes: 0
      }

      fetch(TOY_URL, {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            Accept: "application/json"
          },
          body: JSON.stringify({
            "name": toy.name,
            "image": toy.image,
            "likes": toy.likes
          })
        })
        .then(function (response) {
          return response.json()
        })
        .then(function (toy) {
          addToyInfo(toy)
        })
    })
  } else {
    toyForm.style.display = 'none'
  }
})

function addLikes(toy) {
  fetch(`${TOY_URL}/${toy.id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json', //tells the server how to parse the data in json
      Accept: "application/json" 
    },
    body: JSON.stringify({
      "likes": ++toy.likes
    })
  })
}

// OR HERE!