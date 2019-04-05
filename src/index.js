const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

// YOUR CODE HERE
    addBtn.addEventListener('click', () => {
    // hide & seek with the form
    addToy = !addToy
      if (addToy) {
        toyForm.style.display = 'block'
        let createBtn = document.querySelector('.add-toy-form .submit')
           createBtn.addEventListener('click', function(e){
            let nameInput = document.querySelectorAll('.add-toy-form input')[0].value
            let imgUrl = document.querySelectorAll('.add-toy-form input')[1].value
            createToy(nameInput, imgUrl)
          })    
        
       
        // submit listener here
      } else {
        toyForm.style.display = 'none'
      }
    })


// add toy function
function createToy(nameInput, imgUrl){
   console.log('you reached me')
  fetch('http://localhost:3000/toys',
        {method: "POST",
         headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body:JSON.stringify({
          "name": nameInput,
          "image": imgUrl,
          "likes": 0
        })
       })
}

// OR HERE!


//1. fetch all the toys and display them
  fetch('http://localhost:3000/toys')
  .then(function(response){
    return response.json()
  })
  .then(function(toyData){
    toyData.forEach(function(toy){
      display(toy)
    })
  })

//2. display all the toys function
  function display(toy){
    const toyCollectionDiv = document.querySelector('#toy-collection')
    const toyCard = document.createElement('div')
    toyCard.className = "card"
    toyCollectionDiv.appendChild(toyCard)

    const toyName = document.createElement('h2')
    toyCard.appendChild(toyName)
    toyName.innerText = toy.name


    const toyImg = document.createElement('img')
    toyImg.className = "toy-avatar"
    toyCard.appendChild(toyImg)
    toyImg.src = toy.image
   
    let p = document.createElement('p')
    p.innerText = `${toy.likes} Likes` 
    toyCard.appendChild(p)

    const likeBtn = document.createElement('button')
    likeBtn.innerText = "Like"
    likeBtn.className = "like-btn"
    toyCard.append(likeBtn)
    likeBtn.addEventListener('click', function(e){
     addLikes(toy)
     p.innerText = `${toy.likes + 1} Likes` 
    })
    
  }


  //like function

  function addLikes(toy){
   fetch(`http://localhost:3000/toys/${toy.id}`,{
       method: "PATCH",
       headers:
        {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
       body:JSON.stringify({
          "likes": toy.likes + 1 
       })
      })
      .then(function(response){
        response.json()
      })
      .then(function(data){
        toy.likes += 1
        console.log(toy)
      })
  }

