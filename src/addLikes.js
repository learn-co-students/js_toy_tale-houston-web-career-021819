function addLikes(toy, button){
  button.addEventListener('click', () => {
    fetch(`${TOYS_URL}/${toy.id}`, {
      method: 'PATCH',
      headers:
      {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify(
      {
        "name": toy.name,
        "image": toy.image,
        "likes": toy.likes += 1
      })
    })
      .then(function(res){
        return res.json()
      })
      .then(function(toy){
        console.log(toy)
      })
      let likeCount = document.querySelector(`#likes${toy.id}`)
      likeCount.innerText = `Likes: ${toy.likes}`
    })
}
