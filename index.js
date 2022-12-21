// required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')

// app config
const app = express()
const PORT = process.env.PORT || 8200
app.set('view engine', 'ejs')

// parse request bodies from html forms
app.use(express.urlencoded({ extended: false }))
// tell express to parse incoming cookies
app.use(cookieParser())

// our goal is to have a custom auth middleware that checks the cookies for a user id and if it finds one, we look up the user in the db
// then tell all downstream routes about this user
app.use(async (req,res,next) => {
try {
    if (req.cookies.userId) {
        // the user is logged in, let's find them in the db
        const user = await db.user.findByPk(req.cookies.userId)
        // mount the logged in user on the res.locals
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    //move on to next middleware route
    next()
} catch (err) {
    console.log('error in auth middleware 🔥🔥🔥🔥🔥')
    next() //go to the next thing
}
})

//example custom middleware (incoming request logger)
app.use((req,res,next) => {
    //our code goes here
    // console.log('hello from inside of the middleware')
    console.log(`incoming request: ${req.method} - ${req.url}`)
    // res.locals are a place we can put data to share with downstream routes
    // res.locals.myData = 'hello I am data'
    // invoke next to tell express to go to the next route or middleware
    next()
})

// routes and controllers
app.get('/', (req,res) => {
    console.log(res.locals.user)
    res.render('home.ejs', {
        user: res.locals.user
    })
})

// controllers
app.use('/users', require('./controllers/users'))

// listen on a port
app.listen(PORT, () => {
    console.log(`authenticating users on PORT ${PORT} 🔐`)
})