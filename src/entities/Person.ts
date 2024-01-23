type ID = number;

export interface User {
  pessoa: ID;
  telefone: string;
  email: string;
}

export interface Person {
  id: ID;
  nome: string;
}
