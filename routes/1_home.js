const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    const files = []
    res.render('home', {files:files })
})

module.exports = router