## Prerequisites
1. Node.js
2. MongoDB
2. Angular CLI: "npm i -g @angular/cli"
3. From project root: "npm install"

## Run
### Development mode
"npm run dev": execute MongoDB, Angular build, TypeScript compiler and Express server.
### Production mode
"npm run prod": run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

## Mongo
db name: mean
change user to admin:
```
db.users.update({username:"admin"}, {$set: {role : "admin"}})
```
z
create assets collection:
```
db.createCollection("assets")
db.assets.insert({})
```