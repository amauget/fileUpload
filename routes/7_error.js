const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    res.send('<h1>Something Went Wrong. Please Try Again Later.</h1><a href="/">Go Home</a>')
})

module.exports = router