// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')

// mount our routes on the router

// GET /users/new -- serves a form to create a new user
router.get('/new', (req,res) => {
    res.render('./users/new.ejs', {
        user: res.locals.user
    })
})

// POST /users -- creates a new user from the form @ /users/new
router.post('/', async (req,res) => {
    try {
        //based on the info in the req.body
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
        })
        // if the user is found, redirect user to login
        if (!created) {
            console.log('user exists!')
            res.redirect('/users/login?message=Please log in to continue.')
        } else {
            // here we know it's a new user
            // hash the supplied password
            const hashedPassword = bcrypt.hashSync(req.body.password, 12)
            // save the user with the new password
            newUser.password = hashedPassword
            await newUser.save() // actually save the new password into the db
            // encrypt the new user's id and convert it to a string
            const encryptedId = crypto.AES.encrypt(String(newUser.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            // place the encrypted id in a cookie
            res.cookie('userId', encryptedIdString)
            // redirect to user's profile
            res.redirect('users/profile')
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// GET /users/login -- render a login form that posts to /users/login
router.get('/login', (req,res) => {
    res.render('users/login.ejs', {
        message: req.query.message ? req.query.message : null,
        user: res.locals.user
    })
})

// POST /users/login -- ingest data from form rendered @ GET /users/login
router.post('/login', async (req,res) => {
    try {
        // look up the user based on their email
        const user = await db.user.findOne({
            where: {
                email: req.body.email
            }
        })
        //boilerplate msg if login fails
        const badCredentialsMessage = 'Sorry, but your username or password is incorrect!'
        if (!user) {
            // if user isn't found in the db
            res.redirect('/users/login?message=' + badCredentialsMessage)
            
        } else if (!bcrypt.compareSync(req.body.password,user.password)) {
            //if user pw is incorrect
            res.redirect('/users/login?message=' + badCredentialsMessage)
        } else {
            // if the user is found and their PW matches, log them in
            console.log('logging user in') 
            // encrypt the new user's id and convert it to a string
            const encryptedId = crypto.AES.encrypt(String(user.id), process.env.SECRET)
            const encryptedIdString = encryptedId.toString()
            // place the encrypted id in a cookie
            res.cookie('userId', encryptedIdString)
            res.redirect('/users/profile')
        }
        
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// GET users/logout -- clear any cookies and redirect to the homepage
router.get('/logout', (req,res) => {
    //log the user out by removing the cookie
    //make a get req to /
    res.clearCookie('userId')
    res.redirect('/')
})

// GET /users/profile -- show the user their profile page
router.get('/profile', (req,res) => {
    // if the user is not logged in then they are not allowed to be here
    if (!res.locals.user) {
        res.redirect('/users/login?message=You must authenticate before you are authorized to view this resource!')
    } else {
        res.render('users/profile.ejs', {
            user: res.locals.user
        })
    }
})

// export the router
module.exports = router