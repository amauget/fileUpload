const { Router } = require('express')
const router = Router()

const multer = require("multer")
const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})

const { uploadBytes, fileSizeValid, renameFiles }  = require('../controllers/fileHandlers/fileAuditors.js')
const writeFiles = require('../controllers/fileHandlers/writeFiles.js')

router.get('/', (req, res) => {
    //what is a quick access to get total storage used by user?
    res.render('upload', {message:''})
})

router.post('/', upload.any(), async (req, res) => {
    if(! req.files){
     res.status(400).render('upload', {message: 'No files received. Try again.'}) 
    }
    const uploadSize = uploadBytes(req.files)
    if(fileSizeValid(req.user, uploadSize)){
        const safeFileNames = renameFiles(req.files)
        if(await writeFiles(safeFileNames)){
            // update usedSpace
        }

    }
   
})

module.exports = router