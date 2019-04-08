const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection")
const BASE_URL = "http://localhost:3000"
const TOYS_URL = `${BASE_URL}/toys`
let addToy = false

fetch(TOYS_URL)
  .then(function(res){
    return res.json()
  })
  .then(function(toyData){
    toyData.forEach(function(toy){
      makeCard(toy, toyCollection)
    })
  })

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    let form = document.querySelector(".add-toy-form")
    let submitButton = document.querySelector(".submit")
    let name = document.querySelector("#name")
    let image = document.querySelector("#image")
    form.addEventListener('submit', function(e){
      e.preventDefault()
      let toy = {name:name.value, image:image.value};
      console.log('We got here :)')
      createToy(toy)
    })
  } else {
    toyForm.style.display = 'none'
  }
})


// OR HERE!
