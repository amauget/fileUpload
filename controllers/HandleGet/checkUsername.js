const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function checkUsername(username){
    const usernameSearch = await prisma.users.findMany({
        where:{
            username: username
        }
    }) 
    return usernameSearch.length === 0
}

module.exports = checkUsername

