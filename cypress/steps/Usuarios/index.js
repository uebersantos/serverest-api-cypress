const {
  When,
  Then,
} = require("@badeball/cypress-cucumber-preprocessor");

let response;

When("realizo uma consulta de usuários", () => {
  Cypress.automacao.Requests.GetUsuarios().then((res) => {
    response = res;
  });
});

Then("o status code deve ser 200", () => {
  expect(response.status).to.eq(200);
});

Then("a resposta deve possuir a lista de usuários", () => {
  expect(response.body).to.have.property("usuarios");
  expect(response.body.usuarios).to.be.an("array");
});