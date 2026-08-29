function GetUsuarios() {
  return cy.request({
    method: "GET",
    url: `${Cypress.env("baseUrl")}/usuarios`,
    failOnStatusCode: false,
  });
}

module.exports = GetUsuarios;