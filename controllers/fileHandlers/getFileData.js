const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function getFileData(files){
    const targetFiles = await prisma.userFiles.findMany({
        where: {
            originalname: {
                in: files    
            }
        }
    })
    return targetFiles
}

module.exports = getFileData