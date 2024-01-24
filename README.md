# 📝 Projeto Next MUI Users

Este projeto tem o objetivo de cadastro de usuários a partir do Next JS utilizando a biblioteca Material UI e React Hook Form.

## 👩‍💻 Tecnologias

- [TypeScript](https://www.typescriptlang.org/)
- [NextJS](https://nextjs.org/)
- [Material UI](https://mui.com/material-ui)
- [React Hook Form](https://react-hook-form.com/)
- [Json Server](https://www.npmjs.com/package/json-server)
- [Eslint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Zod](https://zod.dev/)


## 💻 Inicializando o projeto

1. Para instalar o projeto localmente, é necessário instalar todos os pacotes de dependências com o comando:

```bash
npm i
```

2. Suba o servidor local com:
```bash
npm run dev
```

3. Também execute ao mesmo tempo o simulador de servidor de API:
```bash
npm run server
```

3. Além disso, é possível gerar uma build:
   
```bash
npm run build
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador para visualizar o projeto.

### 🚀 Comandos

- `dev`:  executa o projeto em `localhost:3000`
- `server`:  executa o simulador de servidor de API
- `build`: gera uma versão build do projeto
- `start`: inicia um servidor simples com o código de compilação de produção
- `lint`: executa o linter em todos os componentes e páginas

### 💠 Rotas do projeto
- `/`:  página inicial onde os usuários podem ser cadastrados, inserindo:
  - Nome;
  - Telefone;
  -  Email;
 
  O formulário possui todas as validações necessárias dos campos a partir da biblioteca [Zod](https://zod.dev/) mas na atual versão ainda não há uma conexão com um banco de dados para salvar os dados, ficando como implementação futura, assim como a listagem desses dados cadastrados e mais validações.
