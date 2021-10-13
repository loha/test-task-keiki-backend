# keiki-test-task-backend

## Build Setup

Copy .env.example in .env file

```bash
# docker setup
$ docker pull postgres
$ docker-compose up -d

# install dependencies
$ yarn install

# DB migrate and fill
$ yarn command db:migrate
$ yarn command db:seed 

# build for production and launch server
$ yarn build:prod
$ yarn start
```