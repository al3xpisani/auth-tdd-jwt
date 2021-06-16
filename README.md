# auth-tdd-jwt
authentication with jwt using tdd sequelize

  yarn init -y
 yarn add express
 yarn add sequelize pg   (sequelize we will utilize this ORM (Object relational Mapper). Sequelize maps relational data  to javascript objects.

 yarn add sequelize-cli -D  (install only as dev. Dependency)

 yarn sequelize ini  (remember to run it to create the files inside the project)

Its mandatory to isolate the port listening, express with the business rule because we want to apply TDD (Test Driven Development) only to the business rule and not to the server logic and others stuffs.

Project structure :

 ![image](https://user-images.githubusercontent.com/14879580/122140556-f84d7300-ce21-11eb-8de5-a40aa46dc5ed.png)






Finishing project structure : Observe the explorer side window. The files and folders that were created and moved.

 <img width="982" alt="image" src="https://user-images.githubusercontent.com/14879580/122140569-03080800-ce22-11eb-9fd5-479cdecd84cf.png">
 <img width="1108" alt="image" src="https://user-images.githubusercontent.com/14879580/122140581-09967f80-ce22-11eb-809b-cd606acc845c.png">






Migrations does DB version control and guarantee the db is always functional and dont break due version issues.

 yarn sequelize migration:create --name=create-users

Move the files created by sequelize to the right folders : 

 ![image](https://user-images.githubusercontent.com/14879580/122140594-12875100-ce22-11eb-8a1c-a545cfde64dd.png)





Download postgress and setup it in your local machine

docker pull postgres:9.6.22-alpine

On terminal:

docker run --name tdd-jwt-auth -e POSTGRES_PASSWORD=12345 -d -p 5432:5432 postgres

Create DB as indicated on the database.js property

docker exec -it 42e0186df1c1 bash

docker exec -it 05b3a3471f6f bash
root@05b3a3471f6f:/# psql -U postgres
postgres-# CREATE DATABASE nodeauth;

Results: 

➜ yarn sequelize db:migrate
yarn run v1.22.5
warning ../../package.json: No license field
$ /Users/apantbr.ibm.com/projetos/tdd-jwt-auth/node_modules/.bin/sequelize db:migrate

Sequelize CLI [Node: 14.17.0, CLI: 6.2.0, ORM: 6.6.2]

Loaded configuration file "src/config/database.js".
== 20210615121231-create-users: migrating =======
== 20210615121231-create-users: migrated (0.188s)

✨  Done in 2.33s.

 <img width="537" alt="image" src="https://user-images.githubusercontent.com/14879580/122140658-2df25c00-ce22-11eb-9df1-433fcf6a2a9c.png">




Creating Models

 <img width="776" alt="image" src="https://user-images.githubusercontent.com/14879580/122140668-321e7980-ce22-11eb-8813-34b9e0da3cbf.png">



Doing some small changes on the auto generated model/index up to line 16

 <img width="1156" alt="image" src="https://user-images.githubusercontent.com/14879580/122140673-36e32d80-ce22-11eb-9b94-0d668392be1b.png">



Lets test :
 <img width="616" alt="image" src="https://user-images.githubusercontent.com/14879580/122140680-3a76b480-ce22-11eb-849e-b8093f73e71d.png">





Ops....
 <img width="1027" alt="image" src="https://user-images.githubusercontent.com/14879580/122140687-3ea2d200-ce22-11eb-9822-1e41e91380da.png">



Lets run undo and migrate again

yarn sequelize db:migrate:undo
yarn sequelize db:migrate

Yep.... It worked................
 <img width="563" alt="image" src="https://user-images.githubusercontent.com/14879580/122140702-4498b300-ce22-11eb-8384-e035f6a206d1.png">


I checked on Postico
 <img width="928" alt="image" src="https://user-images.githubusercontent.com/14879580/122140710-48c4d080-ce22-11eb-8825-d28135daeef0.png">


Lets install Nodemon as Dev. Dependency

yarn add nodemon -D


Starting setup JEST
 <img width="949" alt="image" src="https://user-images.githubusercontent.com/14879580/122140717-4cf0ee00-ce22-11eb-96f9-65cd559172d0.png">

Lets set nodemon to watch changes, except any change did on the __tests__ folder.



Lets install jest as dependency of development

 yarn add jest -D

 <img width="761" alt="image" src="https://user-images.githubusercontent.com/14879580/122140771-698d2600-ce22-11eb-988b-141308f5288c.png">




Lets change the file created by jest init

 <img width="886" alt="image" src="https://user-images.githubusercontent.com/14879580/122140782-6e51da00-ce22-11eb-9aa7-2a4fadcddfd0.png">
 <img width="582" alt="image" src="https://user-images.githubusercontent.com/14879580/122140801-76117e80-ce22-11eb-866a-243119729b0e.png">





Testing

 <img width="756" alt="image" src="https://user-images.githubusercontent.com/14879580/122140821-7b6ec900-ce22-11eb-857f-436052672913.png">
 <img width="373" alt="image" src="https://user-images.githubusercontent.com/14879580/122140834-8164aa00-ce22-11eb-9e70-66ca99f3d76d.png">






Lets create .env and .env.test
 <img width="642" alt="image" src="https://user-images.githubusercontent.com/14879580/122140840-8590c780-ce22-11eb-863c-ec6fcf2be6a8.png">




  yarn add dotenv
yarn add sqlite3 -D
 <img width="784" alt="image" src="https://user-images.githubusercontent.com/14879580/122140845-89244e80-ce22-11eb-89cf-672aec69af5c.png">




Setup package.json test entry to node_env

 <img width="696" alt="image" src="https://user-images.githubusercontent.com/14879580/122140860-904b5c80-ce22-11eb-98c4-2421373a0799.png">
 <img width="1055" alt="image" src="https://user-images.githubusercontent.com/14879580/122140872-95101080-ce22-11eb-95fa-f2c16c087d05.png">






Its important to run before all the migrations to the sqlite test database so we can run tests after that

 <img width="612" alt="image" src="https://user-images.githubusercontent.com/14879580/122140879-98a39780-ce22-11eb-958e-4b7c5ace1979.png">



Lets change package.json

"scripts": {
"start": "node src/server.js",
"dev": "nodemon src/server.js --ignore __tests__",
"pretest": "NODE_ENV=test sequelize db:migrate",
"test": "NODE_ENV=test jest",
"posttest": "NODE_ENV=test sequelize db:migrate:undo:all"


And test it : Check that the preTest, test and posttest was executed fine.

 <img width="546" alt="image" src="https://user-images.githubusercontent.com/14879580/122140895-9f320f00-ce22-11eb-8ce8-83c791ccc482.png">
 <img width="479" alt="image" src="https://user-images.githubusercontent.com/14879580/122140903-a48f5980-ce22-11eb-9027-3fb9cc33ebee.png">





We can create our tests. Remember that Jest does not implement routes and we need to create on the tests a user and try to return it thru our post.

Lets install yarn add supertest -D

And begin implementing tests

 <img width="803" alt="image" src="https://user-images.githubusercontent.com/14879580/122140917-a9540d80-ce22-11eb-9151-07afd3fe1a83.png">



Lets encrypt password 

  yarn add bcryptjs

 <img width="599" alt="image" src="https://user-images.githubusercontent.com/14879580/122140927-aeb15800-ce22-11eb-9d10-72194e586035.png">




Implementing jwt token

 yarn add jsonwebtoken

 <img width="611" alt="image" src="https://user-images.githubusercontent.com/14879580/122140935-b40ea280-ce22-11eb-9d97-e8ef24ac2ba4.png">




Coverage Tests

<img width="923" alt="image" src="https://user-images.githubusercontent.com/14879580/122140941-b83ac000-ce22-11eb-9cac-7ecc2cda751b.png">



First type of coverage output : 
We can check how much in percentage was tested.

<img width="776" alt="image" src="https://user-images.githubusercontent.com/14879580/122140952-bc66dd80-ce22-11eb-98ac-1ae9e380b4e6.png">


A better coverage output by html provided: Jest generates a folder inside __tests__

<img width="1067" alt="image" src="https://user-images.githubusercontent.com/14879580/122140962-c12b9180-ce22-11eb-9798-92c4f19c6ec8.png">


Opening index.html generated by Jest : 

![image](https://user-images.githubusercontent.com/14879580/122140971-c688dc00-ce22-11eb-8593-45c844b9de21.png)



![image](https://user-images.githubusercontent.com/14879580/122140533-e4097600-ce21-11eb-85fe-580347f1de09.png)
