const express = require('express')
const authenticateModel = require('./model/authenticate')
const bodyParser = require('body-parser')
const passport = require('passport')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const flash = require('connect-flash')
const dbConfig = require('./config/dbConfig')
const initializePassport = require('./passport-config/passportConfig')

var app = express()


dbConfig.authenticate().then(() => {
    console.log("database connected")
}).catch(err => console.log('Error: '+ err))



initializePassport(passport)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:true}))
app.use( session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

app.use(cookieParser('secret'))
app.use(passport.initialize())
app.use(passport.session())

app.post('/login',(req, res, next) =>{
    passport.authenticate("local", (err, user, info) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            res.send("Successfully Authenticated");
            console.log(req.user);
          });
        }
      })(req, res, next);
})

app.post("/saveproduct",checkAuthentication , (req, res)=>{
    res.send("successfully reached to saveProduct")
})

function checkAuthentication(req, res, next){
    if(req.isAuthenticated()){
        res.send("successfull")
    }
}

app.listen(9000, () => console.log("servier is running"))

