const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false

addBtn.addEventListener('click', function() {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'

    const addToyForm = document.querySelector(".add-toy-form");
    addToyForm.addEventListener('submit', myAddToy);
    function myAddToy(e) {
        e.preventDefault();
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
          //Accept: "application/json"
        },
        body: JSON.stringify({
          name: document.getElementsByName('name')[0].value,
          image: document.getElementsByName('image')[0].value,
          likes: 0
        })
      })
        .then(function (response) {
          return response.json();
        })
        .then(function () {
          window.location.reload()
        });
    }
    
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
});


fetch("http://localhost:3000/toys")
  .then(function (response) {
    return response.json()
  })
  .then(function (toyData) {
    toyData.forEach(makeCard);

    //make card Toys
    function makeCard(toy) {
      const div = document.querySelector("#toy-collection")
      const card = document.createElement("div")
      div.append(card)
      card.className = "card"

      //add toy info
      const toyName = document.createElement('h2')
      card.append(toyName)
      toyName.innerText = toy.name

      const toyImg = document.createElement('img')
      toyImg.src = toy.image
      card.append(toyImg)
      toyImg.className = 'toy-avatar'

      const likes = document.createElement('p')
      card.append(likes)
      likes.innerText = toy.likes

      const likeButton = document.createElement('button')
      card.append(likeButton)
      likeButton.innerText = 'Likes'
      likeButton.className = 'like-btn'

      //click on button

      likeButton.addEventListener('click', function () {
        toy.likes += 1;


        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ likes: toy.likes })
        }).then(function (response) {
          return response.json();
        })
          .then(function () {
            window.location.reload();
          })
      })
    }
  });
