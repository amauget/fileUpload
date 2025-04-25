const fs = require('fs')
const writeFiles = require('./writeFiles')

async function deleteFiles(files){
    try{
        files.map(async (file) =>{
            const filePath = __dirname +'/../../uploads/' + file.storageName
            console.log(filePath)

            fs.unlink(filePath, (err) => {
                if(err){
                    console.log(__dirname)
                    console.error(`Error removing file: ${err}`)
                    return
                }
                console.log(filePath + ' has been removed')
            })
        })
    }
    catch(err){
        console.error(err)
        return false
    }

  

}

module.exports = deleteFiles