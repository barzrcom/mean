## Prerequisites
1. Node.js
2. MongoDB
3. Angular CLI: `npm i -g @angular/cli`
4. From project root: `npm install`
5. In case of MongoDB issues run: `npm install webpack --save-dev --save-exact`

## Run
### Development mode
export MONGODB_URI=mongodb://localhost:27017
`npm run dev`: execute MongoDB, Angular build, TypeScript compiler and Express server.
### Production mode
`npm run prod`: run the project with a production bundle and AOT compilation listening at [localhost:3000](http://localhost:3000) 

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