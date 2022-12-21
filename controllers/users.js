// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()

// mount our routes on the router

// GET /users/new -- serves a form to create a new user
router.get('/new', (req,res) => {
    res.render('./users/new.ejs')
})

// POST /users -- creates a new user from the form @ /users/new
router.post('/', async (req,res) => {
    try {
        //based on the info in the req.body
        const [newUser, created] = await db.user.findOrCreate({
            where: {
                email: req.body.email
            },
            // TODO: don't add plain text passwords to the db
            defaults: {
                password: req.body.password
            }
        })
        // TODO: redirect to the login page if the user is found
        // if not, log the user in (store user id in browser's cookies)
        res.cookie('userId', newUser.id)
        //redirect to home page (for now)
        res.redirect('/')
        
    } catch (err) {
        console.log(err)
        res.status(500).send('server error')
    }
})

// export the router
module.exports = router