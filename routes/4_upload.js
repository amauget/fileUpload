const { Router } = require('express')
const router = Router()

const multer = require("multer")
const storage = multer.memoryStorage() //prevents upload to server files until after the file is scrubbed/evaluated.
const upload = multer({storage: storage})

const { uploadBytes, fileSizeValid, renameFiles, invalidFileNames }  = require('../controllers/fileHandlers/fileAuditors.js')
const writeFiles = require('../controllers/fileHandlers/writeFiles.js')
const { usedSpaceUpdated, userFilesUpdate } = require('../controllers/userFunctions/updateUserData.js')
const deleteFiles = require('../controllers/fileHandlers/deleteFiles.js')
const existingFileNames = require('../controllers/HandleGet/checkUserFileName.js')

router.get('/', (req, res) => {
    res.redirect('/') //upload integrated into homepage. 
  
})

router.post('/', upload.any(), async (req, res) => {
    try{
        if(! req.files){
            res.status(400).render('unsuccessful', {message: 'No files received. Try again.'}) 
        }

        const uploadSize = uploadBytes(req.files)
        const safeFiles = renameFiles(req.files) 

        const invalidFileNameArray = invalidFileNames(req.files)

        if(fileSizeValid(req.user, uploadSize)  && invalidFileNameArray.length === 0){
            const fileNames = safeFiles.map(file => {return file.originalname})
            const existingFiles = await existingFileNames(fileNames, req.user)

            if(existingFiles.length !== 0){
                res.status(400).render('unsuccessful', {message: `File Name(s): [ ${existingFiles.toString().replaceAll(',', ', ')} ] already exist for this account. Please rename and try again.`})
            }
            else{
                if(await writeFiles(safeFiles)){
                    // update usedSpace in user db
                    usedSpaceUpdated(req.user, uploadSize)
                    
                    // add files names and user to userFiles db
                    userFilesUpdate(req.user, safeFiles) 
                    res.render('success', {user: req.user})
                }
                else{
                    throw EvalError
                }
            }
        }
        else{
                res.status(400).render('unsuccessful', {message: `File Name(s): [ ${invalidFileNameArray.toString().replaceAll(',', ', ')} ] has too many characters. Please shorten name and try again.`})

        }
    }
    catch(err){
        console.log('The following error occurred during upload', err)

        const safeFiles = renameFiles(req.files) 
        deleteFiles(safeFiles) //deletes any files that may have saved to server

        res.status(501).render('unsuccessful', {message: `Something has gone wrong on our end. Please try again later.`})

    }
})

module.exports = router