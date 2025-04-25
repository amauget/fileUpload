const { Router } = require('express')
const router = Router()

const multer = require("multer")
const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})

const { uploadBytes, fileSizeValid, renameFiles }  = require('../controllers/fileHandlers/fileAuditors.js')
const writeFiles = require('../controllers/fileHandlers/writeFiles.js')
const { usedSpaceUpdated, userFilesUpdate } = require('../controllers/userFunctions/updateUserData.js')
const deleteFiles = require('../controllers/fileHandlers/deleteFiles.js')

router.get('/', (req, res) => {
    //what is a quick access to get total storage used by user?
    console.log(req.user)
    if(! req.user){
        res.redirect('/') //prevent non-user uploads
    }
    else{
        res.render('upload', {message:''})

    }
})

router.post('/', upload.any(), async (req, res) => {
    if(! req.files){
        res.status(400).render('upload', {message: 'No files received. Try again.'}) 
    }
  
    const uploadSize = uploadBytes(req.files)

    if(fileSizeValid(req.user, uploadSize)){
        const safeFiles = renameFiles(req.files)
        try{
            if(await writeFiles(safeFiles)){
                // update usedSpace in user db
                usedSpaceUpdated(req.user, uploadSize)
                
                //add files names and user to userFiles db
                userFilesUpdate(req.user, safeFiles) /* HOW DO I ACCOMMODATE FOR AN ERROR HERE, IF ABOVE DB DATA ALREADY CHANGED? */
                res.send('<h1>Success!</h1> <a href="/">Home </a>')
            }
        }
        catch(err){
            console.log('The following error occurred during upload', err)
            await deleteFiles(safeFiles) //deletes any files that may have saved to server

        }
      

    }
})

module.exports = router