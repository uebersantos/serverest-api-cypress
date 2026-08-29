# language: pt

Funcionalidade: Consulta de usuários

  Cenário: Listar usuários cadastrados
    Quando realizo uma consulta de usuários
    Então o status code deve ser 200
    E a resposta deve possuir a lista de usuários