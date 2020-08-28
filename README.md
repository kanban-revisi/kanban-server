# kanban-server
repo server for kanban

Client-Side Deploy Link:
https://kanban-idz.web.app/

Server-Side Deploy Link /
API Endpoint Base URL:
https://kanban-idz.herokuapp.com/

Complete API Documentation Link
(w/ example requests & responses):
https://documenter.getpostman.com/view/12245283/T1LSA5N9

---

## __Introduction__
This app was written in Javascript & made using NodeJS along with the following core NPM packages:
- bcrypt
- cors
- dotenv
- express
- http-errors
- jsonwebtoken
- pg
- sequelize
- nodemailer

---

## __Features__
What you can do with / get from this API:
- register
- login
- login google and send generated password to user email
- add new task
- show all your tasks
- find one task
- edit task
- delete task

---

## __Data__
The JSON-formatted data being read and written by this API comprises 2 types:

1. user

    - "email" (string) Contains user email address.
    - "password" (string) Contains user password

2. task

    - "title" (string) Contains the title of the task
    - "category" (string) Contains the phase of the task. The default options are:
        - "Planning"
        - "Development"
        - "Testing"
        - "Production"
    - "description" (text) contains further explanation & details of the task.

---

## __Env Template__
- PORT=
- JWT_SECRET=
- BCRYPT_SALTROUNDS=
- GOOGLE_CLIENT_ID=
- BASE_URL=
- EMAIL_SEND=
- PASSWORD_SEND=
