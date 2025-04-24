const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function getUserFileData(user){
    const userFiles = await prisma.userFiles.findMany({
        where: {
            username: user.username
        }
    })
    return userFiles.map(file => {
        return file.originalname
    })
}

module.exports = getUserFileData