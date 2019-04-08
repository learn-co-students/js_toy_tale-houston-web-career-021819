function createToy(toy){
  console.log('Before fetch', toy)
fetch(TOYS_URL, {
  method: 'POST',
  headers:
  {
    "Content-Type": "application/json",
    Accept: "application/json"
  },
  body: JSON.stringify(
  {
    "name": toy.name,
    "image": toy.image,
    "likes": 0
  })
})
  .then(function(res){
    return res.json()
  })
  .then(function(toy){
    console.log('After fetch' ,toy)
    makeCard(toy, toyCollection)
  })
}
