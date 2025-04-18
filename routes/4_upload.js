const { Router } = require('express')
const router = Router()

const multer = require("multer")
const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})

router.get('/', (req, res) => {
    //what is a quick access to get total storage used by user?
    res.render('upload')
})

router.post('/', upload.any(), async (req, res) => {
    if(! req.files){console.log(true)}
})

module.exports = router