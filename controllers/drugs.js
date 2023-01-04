// create an instance of express routers
const express = require('express')
const db = require('../models')
const router = express.Router()
const crypto = require('crypto-js')
const bcrypt = require('bcrypt')
const axios = require('axios')

// GET /drugs/results -- sends results of input search to /results
router.get('/results', async (req,res) => {
  try {
    let input = req.query.drug
    console.log(input)
    const drugsUrl = `https://api.fda.gov/drug/label.json?search=openfda.brand_name:${input}&limit=8`
  // Use request to call the API
    const response = await axios.get(drugsUrl)
    console.log(response.data)
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
    console.log(req.params)
    const drugURL = `https://api.fda.gov/drug/label.json?search=id:${req.params.id}`
    console.log(req.params)
    const response = await axios.get(drugURL)
    // res.json(response.data)
    res.render('./drugs/detail.ejs', {
      drug: response.data.results[0]
    })
    user: res.locals.user
  } catch(error) {
    // console.log specifics of the error but keep them private)
    console.log('🔥🔥🔥🔥🔥🔥🔥🔥', error)
    // generic internal server error code
    res.status(500).send('internal server error')
}
})



// export the router
module.exports = router