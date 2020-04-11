const express = require("express");
const cors = require("cors");

 const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const {title, url, techs} = request.body;

    const repository = {
      id: uuid(),
      title,
      url,
      techs,
      likes: 0
    }
    repositories.push(repository);
    response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
    const {id} = request.params;
    console.log(request.body)
    const {title, url, techs} = request.body;

    let repository = repositories.find(value => value.id == id);
    if(repository == undefined){
        response.status(400).send();
    }else{
        repository.title = title;
        repository.url = url;
        repository.techs = techs;

        response.json(repository);
    }

});

app.delete("/repositories/:id", (request, response) => {
    const {id} = request.params;
    const index = repositories.findIndex(v => v.id == id);
    if(index == -1){
        response.status(400).send();
    }else{
        repositories.splice(index, 1);
        response.status(204).send();
    }
});

app.post("/repositories/:id/like", (request, response) => {
  const {id} = request.params;

  const repository = repositories.find(v => v.id == id)
  if(repository == undefined){
      response.status(400).send();
  }else{
    repository.likes += 1;
    response.json(repository);
  }
});

module.exports = app;
