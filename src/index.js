const addBtn = document.querySelector("#new-toy-btn");
const toyForm = document.querySelector(".container");
let addToy = false;

// YOUR CODE HERE
document.addEventListener("DOMContentLoaded", () => {
  fetch("http://localhost:3000/toys")
    .then(resp => {
      return resp.json();
    })
    .then(toysData => {
      toysData.forEach(toy => {
        addCard(toy);
      });
    });
});

addBtn.addEventListener("click", () => {
  // hide & seek with the form
  addToy = !addToy;
  if (addToy) {
    toyForm.style.display = "block";
    // submit listener here
    const submitButton = document.querySelector("#submit-button");
    submitButton.addEventListener("click", () => {
      nameBox = toyForm.querySelectorAll("input")[0];
      imageBox = toyForm.querySelectorAll("input")[1];
      fetch("http://localhost:3000/toys", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          name: nameBox.value,
          image: imageBox.value,
          likes: 0
        })
      })
        .then(resp => {
          return resp.json();
        })
        .then(toy => {
          addCard(toy);
        });
    });
  } else {
    toyForm.style.display = "none";
  }
});

// OR HERE!
function addCard(toy) {
  const toyCollection = document.querySelector("#toy-collection");

  const card = document.createElement("div");
  card.className = "card";

  const nameText = document.createElement("h2");
  nameText.textContent = toy.name;

  const img = document.createElement("img");
  img.src = toy.image;
  img.className = "toy-avatar";

  const likeCounter = document.createElement("p");
  likeCounter.textContent = `${toy.likes} Likes `;

  const likeButton = document.createElement("button");
  likeButton.className = "like-btn";
  likeButton.textContent = "Like <3";
  likeButton.addEventListener("click", () => {
    if (likeButton.textContent === "Like <3") {
      likeButton.textContent = "Liked!";
      likeCounter.textContent = `${parseInt(toy.likes) + 1} Likes `;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: parseInt(toy.likes) + 1
        })
      });
    } else {
      likeButton.textContent = "Like <3";
      likeCounter.textContent = `${toy.likes} Likes `;
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: parseInt(toy.likes)
        })
      });
    }
  });

  card.append(nameText, img, likeCounter, likeButton);

  toyCollection.append(card);
}
