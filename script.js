"use strict";

// Exemplo de requisição get com parâmetro.
fetch("https://dummyjson.com/users/search?q=John")
  .then((res) => res.json())
  .then(console.log);

// Exemplo de requisição put para editar o sobrenome do usuário com ID 1.
fetch("https://dummyjson.com/users/1", {
  method: "PUT",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    lastName: "Owais",
  }),
})
  .then((res) => res.json())
  .then(console.log);

// Exemplo de requisição delete para deletar o usuário com ID 1.
fetch("https://dummyjson.com/users/1", {
  method: "DELETE",
})
  .then((res) => res.json())
  .then(console.log);
