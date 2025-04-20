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

// [
//     {
//       fieldname: 'fileUpload',
//       originalname: 'AaronMauget_Resume.pdf',
//       encoding: '7bit',
//       mimetype: 'application/pdf',
//       buffer: <Buffer 25 50 44 46 2d 31 2e 37 0a 25 b5 ed ae fb 0a 34 20 30 20 6f 62 6a 0a 3c 3c 20 2f 4c 65 6e 67 74 68 20 35 20 30 20 52 0a 20 20 20 2f 46 69 6c 74 65 72 ... 536157 more bytes>,
//       size: 536207
//     }
//   ]

module.exports = { uploadBytes, fileSizeValid, renameFiles }