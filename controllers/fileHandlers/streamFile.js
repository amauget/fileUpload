const fs = require('fs')
const path = require('path')

async function streamFile(res, { storageName }){

    const filePath = __dirname + '/../../uploads/' + storageName
    try{
        const base64File = fs.readFileSync(filePath).toString('base64')
        res.send(base64File)
    }
    catch(err){
        res.send("file not found")
    }

}

module.exports = streamFile