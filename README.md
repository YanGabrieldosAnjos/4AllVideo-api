# 4AllVideo-api TEST
- Esse projeto consiste no processo seletivo da softdesign

# Pré-requisitos
- prisma 2
-  npm 6.12.x
-  node 12.3.x

# Instalação
Instalar node e npm
# Como rodar
criar um arquivo .env e preencher como mostrado em env.example

docker-compose up --build

# Testes

npm test (só alguns cases, e ainda está itermitente)

# Endpoints

em todas as requisições, menos login, e criação de usuário é necessário passar o token no header: (auth: "token"), que é retornado no login
## usuário: 


POST /api/usuario/inserir => request: {name: string, username: string, password: string}, response: {name}
POST /api/usuario/login => request: {email: string, password: string}, response: { auth: true, token, userId }
GET /api/usuario/filmes => request:  {email: string }, response: {filme - (objeto filme)}

## filme: 


POST /api/filme/inserir => 
request: {
    title: string;
    director: string;
}, 
response: {title}

GET /api/filme =>
request: {},
response: {movie[]}

GET /api/filme/filtrar =>
request: {
    title: string | null;
    director: string | null;
}, response: {filme[]}

PUT /api/filme/ =>
request: {
    title: string;
    director: string;
}, response: {status: "filme atualizado com sucesso!" }

DELETE /api/filme/ => 
request: {
    title: string;
    director: string;
}, response: {status: "filme deletado com sucesso!" }

## aluguel


POST /api/aluguel/ =>
request:  {
    userId: string,
    title: string
}, response: {title: string}

POST /api/aluguel/devolucao => 
request:  {
    userId: string,
    title: string
}, response: {title: string}