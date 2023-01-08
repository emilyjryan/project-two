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
    // const [drug, create] = await db.drug.findOrCreate({
    //   where: {
    //     brand_name: req.body.brand_name
    //   },
    //   defaults: {
    //       generic_name: req.body.generic_name,
    //       route: req.body.route,
    //       active_ingredient: req.body.active_ingredient,
    //       dosage: req.body.dosage,
    //       indications_and_usage: req.body.indications_and_usage,
    //       caution: req.body.caution,
    //       ask_doctor: req.body.ask_doctor,
    //       api_id: req.body.api_id
    //   }
    // })
    // if (!create){
      res.render('./drugs/detail.ejs', {
        drug: response.data.results[0],
        comments: response.data.results[0].comments
      //})
    })
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