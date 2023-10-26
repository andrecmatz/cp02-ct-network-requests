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

function searchUsers() {
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
				alert('No users found.');
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
				console.log(users);
			}
		})
		.catch((error) => {
			console.error(`Erro: ${error}`);
			alert('Failed to search for users.');
		});
}

function updateUser() {
	const newLastName = 'Silva';
	fetch('https://dummyjson.com/users/1', {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
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
			console.log(updatedUser);
		})
		.catch((error) => {
			console.error(`Erro: ${error}`);
			alert("Failed to update the user's last name.");
		});
}

// Exemplo de requisição delete para deletar o usuário com ID 1.
fetch('https://dummyjson.com/users/1', {
	method: 'DELETE',
})
	.then((res) => res.json())
	.then(console.log);
