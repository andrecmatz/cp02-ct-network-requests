'use strict';

class User {
  constructor(id, firstName, lastName, age, image) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
    this.image = image;
  }
}

let btnSearchUser = document.getElementById("btnSearchUser");
let btnUserUpdate = document.getElementById("btnUserIdUpdate");
let btnUserIdDelete = document.getElementById("btnUserIdDelete");

function searchUsers() {
  const query = document.getElementById("inputSearchUser").value;

  if (!query || !isNaN(query)) {
    alert("Please insert a valid name!");
    return;
  }

  fetch(`https://dummyjson.com/users/search?q=${query}`)
    .then((res) => {
      console.log(`Status Code: ${res.status}`);
      if (!res.ok) {
        return console.log(`HTTP error! Status Code: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data.users.length === 0) {
        alert("No users found.");
      } else {
        const users = data.users.map(
          (user) =>
            new User(
              user.id,
              user.firstName,
              user.lastName,
              user.age,
              user.image
            )
        );
        displayUsers(users);
      }
    })
    .catch((error) => {
      console.error(`Erro: ${error}`);
      alert("Failed to search for users.");
    });
}

btnSearchUser.addEventListener("click", searchUsers);

function updateUser() {
  const newLastName = document.getElementById("inputLastname").value;
  const userUpdate = document.getElementById("inputUserIdUpdate").value;

  if (!newLastName || !userUpdate || !isNaN(newLastName)) {
    alert("Please insert a valid last name or a user ID!");
    return;
  }

  fetch(`https://dummyjson.com/users/${userUpdate}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      lastName: newLastName,
    }),
  })
    .then((res) => {
      console.log(`Status Code: ${res.status}`);
      if (!res.ok) {
        return console.log(`HTTP error! Status Code: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then((data) => {
      const updatedUser = new User(
        data.id,
        data.firstName,
        newLastName,
        data.age,
        data.image
      );
      displayUsers([updatedUser]);
    })
    .catch((error) => {
      console.error(`Erro: ${error}`);
      alert("Failed to update the user's last name.");
    });
}

btnUserUpdate.addEventListener("click", updateUser);

function deleteUsers() {
  const inputUserIdDelete = document.getElementById("inputUserIdDelete").value;
  if (!inputUserIdDelete) {
    alert("Please insert a valid user ID!");
    return;
  }

  fetch(`https://dummyjson.com/users/${inputUserIdDelete}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log(`Status Code: ${res.status}`);
      if (!res.ok) {
        return console.log(`HTTP error! Status Code: ${res.status}`);
      } else {
        return res.json();
      }
    })
    .then(() => {
      document.querySelector(
        ".card"
      ).innerHTML = `<p>User ${inputUserIdDelete} succesfully deleted.</p>`;
    })
    .catch((error) => {
      console.error(`Erro: ${error}`);
      alert("Failed to delete the user");
    });
}

btnUserIdDelete.addEventListener("click", deleteUsers);

function displayUsers(users) {
  let html = "";

  users.forEach((user) => {
    html += `<div class="card-user">
		<img src="${user.image}" alt="">
		<p>${user.firstName} ${user.lastName}, ${user.age} years - ID ${user.id}</p>
	  	</div>`;
  });
  document.querySelector(".card").innerHTML = html;
}