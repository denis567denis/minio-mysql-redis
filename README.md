<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

```bash
$ npm install
$ docker-compose up -d
```

then go to http://localhost:9001/ and create a bucket named items

## Compile and run the project

```bash
# development
$ npm run start

admin 
email : user@mail.com
password: root

get itmes by id  (Amministratore, Operatore)
curl --location 'http://localhost:3000/items?id=2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g'

get all items (Amministratore, Operatore)
curl --location 'http://localhost:3000/items' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g'

update item by id (Amministratore)
curl --location --request PATCH 'http://localhost:3000/items/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g' \
--form 'images=@"/C:/Users/Denis/Downloads/737df109-75c2-4454-a659-25bfa82acf6d.png"' \
--form 'images=@"/C:/Users/Denis/Downloads/737df109-75c2-4454-a659-25bfa82acf6d.png"' \
--form 'tipo="asdasd"' \
--form 'stato="123123"' \
--form 'incaricato="denis"'

delete item by id  (Amministratore)
curl --location --request DELETE 'http://localhost:3000/items/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g'

user create   (Amministratore)
curl --location 'http://localhost:3000/users' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g' \
--data-raw '{
    "email": "den4ick@mail.ru",
    "password": "denisdenis",
    "role": "Amministratore"
}'

update user  (Amministratore)
curl --location --request PUT 'http://localhost:3000/users/1' \
--header 'Content-Type: application/json' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g' \
--data '{
    "password": "denisdenis",
    "role": "Amministratore"
}'

get all users  (Amministratore)
curl --location 'http://localhost:3000/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g' \
--data ''

get user by id  (Amministratore)
curl --location 'http://localhost:3000/users/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g' \
--data ''

delete user by id  (Amministratore)
curl --location --request DELETE 'http://localhost:3000/users/3' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImVtYWlsIjoiZGVuaXNAbWFpbC5ydSIsInJvbGUiOiJPcGVyYXRvcmUiLCJpYXQiOjE3NDM0NDMxNjYsImV4cCI6MTc0MzQ0Njc2Nn0.7Ej_MoUiiUhR8DQgTuFD37CGb5wSexHUqUipzre7M6g' \
--data ''

register user 
curl --location 'http://localhost:3000/auth/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"denis@mail.ru",
    "password": "denis"
}'

login user 
curl --location 'http://localhost:3000/auth/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"denis@mail.ru",
    "password": "denis"
}'