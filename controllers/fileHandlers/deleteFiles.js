const fs = require('fs')

function deleteFiles(files){
    files.map((file) =>{
        const filePath = __dirname +'/../../uploads/' + file.storageName

        fs.unlink(filePath, (err) => {
            if(err){
                console.log(__dirname)
                console.error(`Error removing file: ${err}`)
            }
            
        })
    })
}


module.exports = deleteFiles