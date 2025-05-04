const fs = require('fs')

async function writeFiles(files){
    try{
        const uploadedFiles = await Promise.all(
            files.map( async (file) => {
                await fs.promises.writeFile(file.path, file.buffer)
                return {
                    filename: file.storageName,
                    path: file.path,
                }
            })
        )
        return true
    }
    catch(err){
        console.error(err)
        return false
    }

}

module.exports = writeFiles