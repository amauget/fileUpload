const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    console.log(req.user)
    const files = []
    res.render('home', {files:files })
})

module.exports = router