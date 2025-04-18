const { Router } = require('express')
const router = Router()

router.get('/', (req, res) => {
    let user = {}
    let files = []
    if(req.user){
        user = req.user
    }
    
    res.render('home', {user: user, files: files })
})

module.exports = router