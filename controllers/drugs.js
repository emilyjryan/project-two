// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')

// GET /results -- sends results of input search to /results
router.get('/results', async (req,res) => {
  try {
    let input = req.query.drug
    console.log(input)
    const drugsUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${input}&limit=4`
  // Use request to call the API
    const response = await axios.get(drugsUrl)
    console.log(response.data.Search)
    res.json(response.data)
    res.render('drugs/results.ejs', {
      results: response.data.results
    //   brandName: response.data.results[0].openfda.brand_name,
    //   genericName: response.data.results[0].openfda.generic,
    //   route: response.data.results[0].openfda.route,
    //   dosage: response.data.results[0].dosage_and_administration,
    //   activeIngredients: response.data.results[0].products.active_ingredients.name,
    //   strength: response.data.results[0].products.active_ingredients.strength
    })
    user: res.locals.user
  } catch(error) {
  console.log('🔥🔥🔥🔥🔥🔥🔥🔥', error)
  res.status(500).send('internal server error')
  }
})

// export the router
module.exports = router