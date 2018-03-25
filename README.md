# Guide

Make sure to run 'npm install' and create a .env. Then run the following, based upon your needs: 

"npm run dev-backend"     -> starts node.js server using nodemon. Use this for all server-side development.

"npm run dev-frontend"    -> starts webpack dev server for the front end. 

"npm run dev-db"          -> You will need to run this in a separate terminal to run mongodb.

"npm run prod"            -> Simulate production app. Useful for testing everything running together.

NODE_ENV will be set to either 'development' or 'production'. **When creating superagent requests to the backend, the production URL will be our heroku URL. The development URL will be localhost:BACKEND_PORT. Make sure you listen for NODE_ENV and change the URL accordingly.**

To run locally, you will need to create a .env file in root with the following properties:

BACKEND_PORT=8000

WEBPACK_PORT=3000

MONGODB_URI=

SECRET= 

These ports can be anything you want, just different from each other (and not the mongodb port 27017).

# Mongoose Trouble?

"pgrep mongo". Get the ID, then "kill ID" to terminate any open mongo connections that are hidden. 

# API

Baseball: https://fantasybaseballnerd.com/service/draft-rankings

Handegg: http://api.cbssports.com/fantasy/players/average-draft-position?version=3.0&response_format=JSON&SPORT=football

Proper Football (will have to rank players in order of points manually): https://fantasy.premierleague.com/drf/bootstrap-static

Basketball: https://www.fantasybasketballnerd.com/service/draft-rankings


# Backround Routes with data requirements and responses.

GET '/draft/:sport'
```
Needs: soccer, football, baseball, or basketball as parameter
code: superagent.get(URL + '/draft/sport'); Sport must be capital letter. URL means either localhost to draftkats url.
Responds with: [
    {name: name, team: team, adp: adp, position: position},
    {name: name, team: team, adp: adp, position: position},
    {name: name, team: team, adp: adp, position: position}
]
```

POST 'login/create'
```
Needs: Basic auth. username:password
code: superagent.post(URL + '/login/signup').auth(username, password);
Responds with: body.kats = {
    created: true or false,
    message: reason for false
}
```

POST 'login/login'
```
Needs: Basic auth. username:password
code: superagent.post(URL + '/login/signin').auth('david', 'password')
Responds with: body = {
    login: true or false,
    token: token if authenticated,
    message: reason for false
}
```

POST 'login/update'
```
Needs: Basic auth: username:oldPassword:newPassword
code: superagent.post(URL + '/login/update').auth('username:oldPassword', 'newPassword')
Responds with: body = {
    updated: true or false,
    message: reason for false
}
Invalidates token.
```

GET 'login/signout/JWTTokenHere'
```
Needs: jwt token in url
code: superagent.get(URL + `/login/signout/${token}`)
Responds with: body = {
    loggedOut: true or false,
}
Invalidates token.
```

POST 'history/save/:sport/:JWTTokenHere'
```
Needs: JWT Token in url, sport in url
code: superagent.post(URL + `/history/save/sport/${token}`).send({team: [{name: name, position: position, etc...}]})
Needs: post an object {team: [Array of players]}
Responds with: body.history = {
    saved: true or false
}
```

GET 'history/get/:sport/:JWTTokenHere'
```
Needs: soccer, football, baseball, or basketball as parameter
Needs: jwt token in url
code: superagent.get(URL + `/history/get/sport/${token}`)
Responds with: body.history = {
    searched: true or false,
    list: array of saved teams if searched is true
}
```
