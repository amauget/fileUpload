const { Router } = require('express')
const router = Router()

router.post('/', (req, res) => {
    console.log(req.body)
    for(let file in req.body){
        console.log(file)
    }
    res.render('download')
})

module.exports = router