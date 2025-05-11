const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function getFileData(files, user){ //files are array of string(s)
    const targetFiles = await prisma.userFiles.findMany({
        where: {
            username: user.username,
            originalname: {
                in: files    
            }

        }
    })
    
    return targetFiles
}
module.exports = getFileData