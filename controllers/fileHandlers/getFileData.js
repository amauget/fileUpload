const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function getFileData(files, user){
    const targetFiles = await prisma.userFiles.findMany({
        where: {
            username: user.username,
            originalname: {
                in: files    
            }

        }
    })
    const fileType = getFileType(targetFiles[0].originalname) 
    // console.log(fileType)
    return { targetFiles, fileType } 
}

function getFileType(file){
    let fileType = []
    for(let i = file.length - 1; i > -1; i--){
        if(file[i] === '.'){
            break
        }
        fileType.splice(0, 0, file[i])
    }

    return fileType.join().replaceAll(',','').replace('.png', '')
    
}

module.exports = getFileData