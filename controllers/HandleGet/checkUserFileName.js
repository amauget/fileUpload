const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function existingFileNames(files, user){

    const fileNameQuery = await prisma.userFiles.findMany({
        where: {
            username: user.username,
            originalname: {
                in: files
            }
        }
    })
    return fileNameQuery.map(file => {return file.originalname})
}



module.exports = existingFileNames