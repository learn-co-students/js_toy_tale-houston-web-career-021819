function createToyCard(toy){
  const toyDiv = document.createElement('div')
  toyDiv.className = "card"

  const nameHeader = document.createElement('h2')
  nameHeader.textContent = toy.name
  toyDiv.append(nameHeader)

  const img = document.createElement('img')
  img.src = toy.image
  img.className = "toy-avatar"
  toyDiv.append(img)

  const likes = document.createElement('p')
  const likesInteger = toy.likes

  likes.textContent = convertLikesToString(likesInteger)
  toyDiv.append(likes)

  const likeButton = document.createElement('button')
  likeButton.className = "like-btn"
  likeButton.textContent = "Like <3"
  likeButton.addEventListener('click', function(){
    let numberOfLikes = parseInt(likes.textContent.split(' ')[0])
    numberOfLikes += 1
    likes.textContent = convertLikesToString(numberOfLikes)
    fetch(`http://localhost:3000/toys/${toy.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        "likes": numberOfLikes
      })
    })
  })
  toyDiv.append(likeButton)
  return toyDiv
}
