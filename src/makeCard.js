function makeCard(toy, collection){
    const card = document.createElement('div')
    const list = document.createElement('ul')
    const toyImage = document.createElement('img')
    const toyName = document.createElement('h2')
    const toyLikes = document.createElement('p')
    const likeButton = document.createElement('button')

    card.className = "card"

    toyImage.src = toy.image
    toyImage.className = "toy-avatar"

    toyName.innerText = toy.name

    toyLikes.id = `likes${toy.id}`
    toyLikes.innerText = `Likes: ${toy.likes}`

    likeButton.className = "like-btn"
    likeButton.innerText = "Like"

    collection.appendChild(card)
    card.appendChild(toyImage)
    card.appendChild(toyName)
    card.appendChild(toyLikes)
    card.appendChild(likeButton)
    addLikes(toy, likeButton)
}
