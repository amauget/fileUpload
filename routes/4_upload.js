const { Router } = require('express')
const router = Router()

const multer = require("multer")
const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})

const { uploadBytes, fileSizeValid, renameFiles, fileNamesValid }  = require('../controllers/fileHandlers/fileAuditors.js')
const writeFiles = require('../controllers/fileHandlers/writeFiles.js')
const { usedSpaceUpdated, userFilesUpdate } = require('../controllers/userFunctions/updateUserData.js')
const deleteFiles = require('../controllers/fileHandlers/deleteFiles.js')
const existingFileNames = require('../controllers/HandleGet/checkUserFileName.js')

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
    try{
        if(! req.files){
            res.status(400).render('unsuccessful', {message: 'No files received. Try again.'}) 
        }

        const uploadSize = uploadBytes(req.files)

        if(fileSizeValid(req.user, uploadSize) /* && fileNamesValid(req.files) */ ){
            const safeFiles = renameFiles(req.files) 
            const fileNames = safeFiles.map(file => {return file.originalname})
            const existingFiles = await existingFileNames(fileNames, req.user)

            if(existingFiles.length !== 0){
                res.status(400).render('unsuccessful', {message: `File Name(s): [ ${existingFiles.toString().replaceAll(',', ', ')} ] already exist for this account. Please rename and try again.`})
            }
            else{
                if(await writeFiles(safeFiles)){
                    console.log(safeFiles)
                    // update usedSpace in user db
                    usedSpaceUpdated(req.user, uploadSize)
                    
                    // add files names and user to userFiles db
                    userFilesUpdate(req.user, safeFiles) 
                    res.render('success', {user: req.user})
                }
                else{
                console.log('did not write')

                }
            }
        }
    }
    catch(err){
        console.log('The following error occurred during upload', err)
        deleteFiles(safeFiles) //deletes any files that may have saved to server

    }
})

module.exports = router