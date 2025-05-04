const { PrismaClient } = require('../../generated/prisma')
const prisma = new PrismaClient()

async function usedSpaceUpdated(user, uploadSize){
    try{
        await prisma.users.update({
            where: {
                username: user.username
            },
            data: {
                usedStorage: user.usedStorage += uploadSize
            }
        })
        return true
    }
    catch(err){
        console.error('Error updating user', err)
        //add error handling to delete uploaded files..
        return false
    }
}

async function userFilesUpdate(user, files){
    try{
        await Promise.all(
            files.map( async (file) => {
                await prisma.userFiles.create({
                    data: {
                        username: user.username,
                        originalname: file.originalname,
                        storageName: file.storageName,
                        size: file.size
                    }
                })
            })
        )
        console.log('done')
    }
    catch(err){
        console.log('could not update user file db', err)
    }
}

module.exports = { usedSpaceUpdated, userFilesUpdate }