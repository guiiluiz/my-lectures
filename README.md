# Boas vindas ao repositório do projeto My Lectures!

---

### CASO QUEIRA COLABORAR COM O DESENVOLVIMENTO:

1. Clone o repositório

- `git clone git@github.com:guiiluiz/my-lectures.git`.
- Entre na pasta do repositório que você acabou de clonar.

2. Crie uma branch a partir da branch `master`

- `git checkout -b exemplo-branch`

3. Adicione as mudanças ao _stage_ do Git e faça um `commit`

- Verifique que as mudanças ainda não estão no _stage_
  - Exemplo: `git status` (deve aparecer listada a pasta _exemplo_ em vermelho)
- Adicione o novo arquivo ao _stage_ do Git
  - Exemplo:
    - `git add .` (adicionando todas as mudanças ao stage do Git)
- Faça o `commit` inicial
  - Exemplo:
    - `git commit -m 'alterações no header'`

4. Adicione a sua branch com o novo `commit` ao repositório remoto

- Usando o exemplo anterior: `git push -u origin exemplo-branch`

5. Crie um novo `Pull Request` _(PR)_

- Vá até a página de _Pull Requests_ do [repositório no GitHub](https://github.com/guiiluiz/my-lectures)
- Clique no botão verde _"New pull request"_
- Clique na caixa de seleção _"Compare"_ e escolha a sua branch **com atenção**
- Clique no botão verde _"Create pull request"_
- Adicione uma descrição para o _Pull Request_ e clique no botão verde _"Create pull request"_
- Volte até a [página de _Pull Requests_ do repositório](https://github.com/guiiluiz/my-lectures/pulls) e confira que o seu _Pull Request_ está criado

---

### PARA RODAR O PROJETO SIGA AS INSTRUÇÕES:

1. Crie o banco de dados com o arquivo `mylectures.sql` da raiz do projeto

2. Crie um arquivo `.env` na raiz do projeto para configurar o banco de dados

  - Deve seguir com as seguintes variáveis (exemplo de valores):
    - `DB_HOST=localhost`
    - `DB_USER=root`
    - `DB_PASS=password`
    - `DB_NAME=mylectures`

3. Instale as dependências e inicie o projeto front-end

  - Navegue até a pasta
    - `cd front-end`

  - Instale as dependências
    - `npm install`

  - Inicie o programa
    - `npm start`

4. Instale as dependências e inicie o projeto back-end

  - Navegue até a pasta
    - `cd back-end`

  - Instale as dependências
    - `npm install`

  - Inicie o programa
    - `npm start`
