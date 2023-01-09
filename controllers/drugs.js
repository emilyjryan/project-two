// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')
const methodOverride = require('method-override')
const app = express()
const https = require('https')
app.use(methodOverride('_method'))

// ===== // ===== DRUG CONTROLLER ===== // ===== //

// GET /drugs/results -- sends results of input search to /results
router.get('/results', async (req,res) => {
  try {
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    let input = req.query.drug
    // console.log(input)
    const drugsUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${input}&limit=10`
  // Use request to call the API
    const response = await axios.get(drugsUrl, {httpsAgent: agent});
    // console.log(response.data)
    // res.json(response.data)
    res.render('./drugs/results.ejs', {
      results: response.data.results,
      drug: req.query.drug
    })
    user: res.locals.user
  } catch(error) {
  console.log('🔥🔥🔥🔥🔥🔥🔥🔥', error)
  res.status(500).send('internal server error')
  }
})

// GET /drugs/:drug_id -- renders a single drug's detail
router.get('/:id', async (req,res) => {
  try {
    const agent = new https.Agent({  
      rejectUnauthorized: false
    });
    const drugURL = `https://api.fda.gov/drug/label.json?search=id:${req.params.id}`
    const response = await axios.get(drugURL, {httpsAgent: agent});

    console.log(response.data.results[0].id)
    const foundDrug= await db.drug.findOne({
      where: {
        api_id: response.data.results[0].id
      },
      include: [{
        model:db.comment,
        include: [
          db.user]
        }]
      })

    res.render ('./drugs/detail.ejs', {
      drug: response.data.results[0],
      foundDrug: foundDrug
    })

    // const [drug, create] = await db.drug.findOrCreate({
    //   where: {
    //     drug: response.data.results[0]}
    //   })
    //   res.render('./drugs/detail.ejs', {
    //     drug: response.data
    // })

    // if (!create) {
    //   const comments = await drug.getComments()
    //   res.render('./drugs/detail.ejs', {
    //     drug: response.data
    //   })
    // }
      // res.render('./drugs/detail.ejs', {
      //   drug: response.data.results[0],
      //   include: [{
      //     model:db.drug,
      //     include: [{
      //     model:db.comment,
      //     include: [
      //       db.user
      //     ]
      //     }]
      //   }] 
      // })
    // else {
    //   res.send("No comments yet")
    // }
    user: res.locals.user
  } catch(error) {
    // console.log specifics of the error but keep them private)
    console.log('Error in drug detail route 🔥🔥🔥🔥🔥🔥🔥🔥', error)
    // generic internal server error code
    res.status(500).send('internal server error')
}
})

// export the router
module.exports = router