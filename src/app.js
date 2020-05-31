const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
// GET
app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

//POST Rep
app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);

  return response.json(repository);
});

//PUT
app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );

  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  //const repository = { title, url, techs }; Arrumar
  const repository = { id, title, url, techs, likes: 0 };
  repositories[repositoryIndex] = repository;
  return response.json(repository);
});

//DELETE
app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(
    (repository) => repository.id === id
  );
  if (repositoryIndex < 0) {
    return response.status(400).send();
  }

  //splice pega da posição que eu quero alterar
  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

// POST LIKE
app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  const repository = repositories.find((repository) => repository.id === id);

  if (!repository) {
    return response.status(400).send();
  }

  repository.likes += 1;

  return response.json(repository);
});

module.exports = app;
