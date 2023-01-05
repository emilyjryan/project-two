// required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const db = require('./models')
// const axios = require('axios')
const crypto = require('crypto-js')
const methodOverride = require('method-override')

// app config
const app = express()
app.use(methodOverride('_method'))
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
        // decrypt user id and turn it into a string:
        const decryptedId = crypto.AES.decrypt(req.cookies.userId, process.env.SECRET)
        const decryptedString = decryptedId.toString(crypto.enc.Utf8)
        // the user is logged in, let's find them in the db
        const user = await db.user.findByPk(decryptedString)
        // mount the logged in user on the res.locals
        res.locals.user = user
    } else {
        res.locals.user = null
    }
    //move on to next middleware route
    next()
} catch (err) {
    console.log('error in auth middleware 🔥🔥🔥🔥🔥')
    res.locals.user = null
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

// ===== /// ===== ROUTES ===== /// ===== //

// ===== HOME ===== //

app.get('/', (req,res) => {
    console.log(res.locals.user)
    res.render('home.ejs', {
        user: res.locals.user
    })
})

// ===== FAVORITES ===== //

// GET /users/drugs -- READ all faves from DB
app.get('/users/drugs', async (req, res) => {
    try {
      const user = await db.user.findByPk(res.locals.user.id)
        const allFaves = await user.getDrugs()
      // res.send(allFaves)
      res.render('faves.ejs', {
        allFaves: allFaves
      })
    } catch (err) {
      console.log('error in the get users/drugs route', err)
      res.status(500).send('api error')
    }
  })
  
// POST /users/drugs -- CREATE a new fave in the DB
app.post('/users/drugs', async (req, res) => {
    try {
      //create a new fave in the DB
      const [fave, create] = await db.drug.findOrCreate({
        where: {
          brand_name: req.body.brand_name
        },
        defaults: {
            generic_name: req.body.generic_name,
            route: req.body.route,
            active_ingredient: req.body.active_ingredient,
            dosage: req.body.dosage,
            indications_and_usage: req.body.indications_and_usage,
            caution: req.body.caution,
            ask_doctor: req.body.ask_doctor,
            api_id: req.body.api_id
        },
    })
    await fave.addUser(res.locals.user.id)
      res.redirect('/')
    } catch (err) {
      console.log('error in the post to favorites route', err)
      res.status(500).send('api error')
    }
  })

  // DELETE a favorite drug
app.delete('/favorites', async (req,res) => {
  try {
    const user = await db.user.findByPk(res.locals.user.id)
    const drug = await db.drug.findByPk(req.body.drugId)
    await user.removeDrugs(drug)
  } catch (error) {
    res.send('delete favorites route error' + error)
  console.log(error)
 } 
 res.redirect('/favorites')
})

 // PUT/Change the nickname of a favorite drug
 app.patch('/favorites', async (req,res) => {
  try {
    const user = await db.user.findByPk(res.locals.user.id)
    const drug = await db.drug.findByPk(req.body.drugId)
    drug.nickname = req.body.nickname
    await drug.save()
    console.log(drug.nickname)
    res.redirect('/favorites')
  } catch (error) {
    res.send('error in put/nickname favorites route' + error)
  console.log(error)
 } 
})




// ===== COMMENTS ===== //

 // POST /drugs/:drug.api_id -- CREATE a comment on a specific drug

/////// STILL NEEDS WORKS ////////

//  app.post('/drugs/:api_id', async (req, res) => {
//     try {
//       //create a new comment on a specific drugB
//       const [newComment, post] = await db.comment.findOrCreate({
//         where: {
//           comment: req.body.comment,
//           userId: USERID,
//           drugId: DRUGID,
//         },
//       })
//       console.log(fave)
//       await fave.addUser(res.locals.user)
  
//       // redirect to /favorites to show the user their faves
//       res.redirect('/favorites')
//     } catch (err) {
//       console.log('annoying', err)
//       res.status(500).send('api error')
//     }
//   })


// ===== CONTROLLERS ===== //

app.use('/users', require('./controllers/users'))
app.use('/drugs', require('./controllers/drugs'))


// ===== PORT ===== //

app.listen(PORT, () => {
    console.log(`authenticating users on PORT ${PORT} 🔐`)
})