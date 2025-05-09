function uploadBytes(files){
    let uploadSize = 0
    for(let file of files){
        uploadSize += file.size
    }
    return uploadSize
}

function fileSizeValid(user, uploadSize){
    const userMax = 5 * 1000 **3
           //5 gB = 5 * 1000 mB * 1000 kB * 1000 B

    const enoughSpace = (user.usedStorage + uploadSize <= userMax)
                        //prev used space + sum of upload <= 5GB allowed per user
    return enoughSpace
}

function renameFiles(files){
    files.forEach(file => {
        const newName = crypto.randomUUID()
        const fileType = getFileTypes(file.originalname)
        file.storageName = `${newName}${fileType}`
        file.path = `uploads/${file.storageName}`
    })
    return files
}

function getFileTypes(filename){
    let filetype = []
    for(let i = filename.length - 1; i >= 0; i--){
        filetype.splice(0,0, filename[i])
        if(filename[i] === '.'){ //starts at end of file. '.' marks start of fileType
            break
        }
    }
    return filetype.toString().replaceAll(',','')
}

function fileNamesValid(files){
    for(let i = 0; i < files.length; i ++){
        if(files[i].name.length > 55)
            return false
    }
    return true
}

module.exports = { uploadBytes, fileSizeValid, renameFiles, fileNamesValid }