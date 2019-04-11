const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.add-toy-form')
const toyFormContainer = document.querySelector('.container')
const toyCollection = document.querySelector("#toy-collection");


let addToy = false

// YOUR CODE HERE

document.addEventListener('DOMContentLoaded', function(){
  fetch("http://localhost:3000/toys")
      .then(function(response){
          return response.json();
      })
      .then(function(toys){  
        //console.log(toys);
        toys.forEach(function(toy){
          display_toy(toy); 
        })
      });
})


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
    // submit listener here
    //console.log("add toy clicked")
    add_toy();
    
  } else {
    toyFormContainer.style.display = 'none'
  }
})




//FUNCTION TO ADD THE TOY FROM THE INPUT VALUE OF ADD-NEW-TOY-FORM

function add_toy(){   

    toyForm.addEventListener('submit',function(e){
      e.preventDefault();
      const name = document.getElementsByTagName("input")[0].value
      const image = document.getElementsByTagName("input")[1].value
      //console.log(name);
      //console.log(image);

      fetch("http://localhost:3000/toys",{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: "application/json"
        },
        body: JSON.stringify({
          "name": name,
          "image": image,
          "likes": 0
        })
      }).then(res=> res.json())
        .then(function(toy){
         
          // toyCollection.append(toy);
          // WHEN I HAD THE ABOVE LINE, IT ADDED THE TOY AS WELL I HAD [object Object] on top of the newtoy which was created successfully
          //when I commented that one out, it had gone.
          //toys.push(toy);
          //the post method is enough for that.So commenting out above line
          display_toy(toy);
        }) 
      });
}

//FUNCTION TO DISPLAY ALL THE TOYS

function display_toy(toy){
      const div = document.createElement('div');
      div.className = "card";
      //div.class = "card";
      //when I had the above line, the images were not in the boxes and they were arranged from top to bottom on the left side of the screen.
      

      const h2 = document.createElement('h2');
      h2.innerText = toy.name;

      const img = document.createElement('img');
      img.className = "toy-avatar";
      img.src = toy.image;
      //img.setAttribute("className","toy_avatar");
      //when I had the above line, the images were like too big.So I had to have the following two lines
      //img.style.width = '50%';
      //img.style.height = 'auto';
      

      const p = document.createElement('p');
      p.innerText = `${toy.likes} Likes`;

      const likeButton = document.createElement("BUTTON");
      likeButton.append('Like <3');
      likeButton.setAttribute("class", "like-btn");

      
      // div.append(h2);
      // div.append(img);
      // div.append(p);
      // div.append(likeButton);
      //appending all of them to div can be done on a single line. 
      div.append(h2,img,p,likeButton);
      toyCollection.append(div);

      
      // ~~`div-append`
      // ~~`h2-append`
      // ~~`img append`
      // ~~`p append`
      //~~ `likeButton append`""

      likeButton.addEventListener('click',function(){
        addLikes(toy);
        p.innerText = `${toy.likes} Likes`;
      })
}

//FUNCTION TO INCREASE TOY LIKES

function addLikes(toy){
  toy.likes++;
  //const likeButton = document.querySelector(".like-btn")
  fetch(`http://localhost:3000/toys/${toy.id}`,{
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
       Accept: 'application/json'
    },
    body: JSON.stringify({
      "likes": toy.likes
    })
  })
}