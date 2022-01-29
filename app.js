const userCardTemplate = document.querySelector("[data-user-template]");
const userCardContainer = document.querySelector("[data-user-cards-container]");
const searchInput = document.querySelector("[data-search]");

let usersData = [];

searchInput.addEventListener("input", (e) => {
    // Tolowercase to remove case sensitivity during input search process
    const value = e.target.value.toLowerCase();
    usersData.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value); // Filter out header or body by comparing to input value
        user.element.classList.toggle("hide" , !isVisible);
    });
});

fetch('https://jsonplaceholder.typicode.com/users')
  .then(response => response.json())
  .then(data => {

    usersData = data.map((user) => {
        const card = userCardTemplate.content.cloneNode(true).children[0];
        const header = card.querySelector("[data-header]");
        const body = card.querySelector("[data-body]");

        header.textContent = user.name;
        body.textContent = user.email;
        
        userCardContainer.append(card);

        return { name: user.name, email: user.email, element: card }
    });
})