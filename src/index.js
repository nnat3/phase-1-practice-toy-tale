let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  fetchToys(); // Step 2
  setupForm(); // Step 3
});


function fetchToys() {
  fetch("http://localhost:3000/toys")
    .then((res) => res.json())
    .then((toys) => {
      toys.forEach(renderToyCard);
    });
}

function renderToyCard(toy) {
  const toyCollection = document.getElementById("toy-collection");

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <h2>${toy.name}</h2>
    <img src="${toy.image}" class="toy-avatar" />
    <p>${toy.likes} Likes</p>
    <button class="like-btn" id="${toy.id}">Like ❤️</button>
  `;

  const likeButton = card.querySelector(".like-btn");
  likeButton.addEventListener("click", () => handleLike(toy, card));

  toyCollection.appendChild(card);
}

function setupForm() {
  const form = document.querySelector(".add-toy-form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = e.target.name.value;
    const image = e.target.image.value;

    const toyData = {
      name: name,
      image: image,
      likes: 0,
    };

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(toyData),
    })
      .then((res) => res.json())
      .then((newToy) => {
        renderToyCard(newToy); // Add it to DOM
        form.reset(); // Clear form fields
      });
  });
}
