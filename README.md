# Automação de Testes de API - ServeRest

Projeto de automação de testes de API utilizando **Cypress**, **Cucumber/Gherkin** e **Mochawesome**, com a API pública **ServeRest** como ambiente de estudos.

O objetivo é manter uma arquitetura simples, organizada e escalável, separando os cenários BDD, implementação dos steps, chamadas da API, massas de dados e validações.

## Tecnologias

Versões utilizadas no desenvolvimento:

```text
Node.js                                  22.14.0
npm                                      10.9.2
Cypress                                  15.21.1
@badeball/cypress-cucumber-preprocessor  27.0.0
@bahmutov/cypress-esbuild-preprocessor   2.2.8
cypress-mochawesome-reporter             5.0.0
esbuild                                  0.28.2
```

Para consultar as versões instaladas:

```bash
node -v
npm -v
npm list --depth=0
```

## API utilizada

A automação utiliza a API pública ServeRest:

```text
https://serverest.dev
```

A API disponibiliza recursos para testes de:

- Login
- Usuários
- Produtos
- Carrinhos

## Estrutura do projeto

```text
cypress/
├── features/          # Cenários BDD escritos em Gherkin
├── fixtures/          # Massas de dados
├── schemas/           # Contratos das respostas
├── steps/             # Implementação dos passos BDD
│   ├── Compartilhados/
│   └── Usuarios/
└── support/
    ├── Requests/      # Chamadas HTTP da API
    ├── commands.js
    └── e2e.js
```

O fluxo principal da automação segue a estrutura:

```text
Feature
   ↓
Steps
   ↓
Requests
   ↓
API
   ↓
Validações
```

## Configuração do ambiente

O projeto utiliza variáveis de ambiente para definir a URL da API e informações de autenticação.

Crie o arquivo:

```text
cypress.env.json
```

com:

```json
{
  "baseUrl": "https://serverest.dev",
  "token": ""
}
```

O arquivo `cypress.env.json` não deve ser versionado.

Como referência, o projeto possui:

```text
cypress.env.json.example
```

com a estrutura esperada das variáveis.

## Instalação

Clone o repositório:

```bash
git clone https://github.com/uebersantos/serverest-api-cypress.git
```

Entre na pasta do projeto:

```bash
cd serverest-api-cypress
```

Instale as dependências:

```bash
npm install
```

## Execução

Executar toda a suíte em modo headless:

```bash
npm test
```

ou:

```bash
npm run cy:run
```

Executar uma Feature específica:

```bash
npx cypress run --spec "cypress/features/Usuarios.feature"
```

Abrir a interface do Cypress:

```bash
npm run cy:open
```

## Primeiro cenário implementado

Atualmente o projeto possui automação para o endpoint:

```http
GET /usuarios
```

O cenário realiza inicialmente as seguintes validações:

- Status HTTP igual a `200`
- Presença da propriedade `usuarios`
- Validação de que `usuarios` é um array

Arquivos envolvidos:

```text
cypress/features/Usuarios.feature
cypress/steps/Usuarios/index.js
cypress/support/Requests/GetUsuarios.js
```

## Organização das Requests

As chamadas HTTP ficam separadas dos Steps dentro da pasta:

```text
cypress/support/Requests/
```

Exemplo:

```text
GetUsuarios.js
```

As Requests são centralizadas em:

```text
cypress/support/Requests/index.js
```

e disponibilizadas através do objeto global:

```javascript
Cypress.automacao.Requests
```

Exemplo:

```javascript
Cypress.automacao.Requests.GetUsuarios()
```

## Padrão para novos testes

Para novas funcionalidades, o projeto seguirá o padrão:

```text
features/Nome.feature
steps/Nome/index.js
support/Requests/GetNome.js
fixtures/Nome.json
schemas/Nome.json
```

A responsabilidade de cada camada é:

- **Features:** definição dos cenários BDD
- **Steps:** implementação dos passos Given, When e Then
- **Requests:** comunicação com a API
- **Fixtures:** massas de teste
- **Schemas:** validação dos contratos das respostas
- **Support:** recursos compartilhados pela automação

## Relatórios

O projeto utiliza:

```text
cypress-mochawesome-reporter
```

para geração dos relatórios das execuções.

A configuração do reporter está localizada em:

```text
cypress.config.js
```
