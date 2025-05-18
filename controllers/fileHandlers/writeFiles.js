const fs = require('fs')

async function writeFiles(files){
    try{
        const uploadPath = files[0].path 
        await fs.promises.mkdir(uploadPath, {recursive: true})

        const uploadedFiles = await Promise.all(
            files.map( async (file) => {
                await fs.promises.writeFile(file.path + file.storageName, file.buffer)
                return {
                    filename: file.storageName,
                    path: file.path + file.storageName,
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