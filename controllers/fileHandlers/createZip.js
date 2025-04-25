const fs = require('fs')
const path = require('path')
const JSZip = require("jszip")

async function createZip(res, targetFiles){
    const uploadsPath = path.join(__dirname, '/../../uploads/')
    const downloadPath = path.join(__dirname, '../../downloads')

    const zipFile = new JSZip()

    if (!fs.existsSync(downloadPath)) {
        fs.mkdirSync(downloadPath, { recursive: true });
    }

    try{
        for(let file of targetFiles){
            const fileData = fs.readFileSync(uploadsPath + file.storageName)
            zipFile.file(file.storageName, fileData)
        }
        res.setHeader('Content-Type', 'application/zip');
        res.setHeader('Content-Disposition', 'attachment; filename="fileDownload.zip"');
        
        const zipStream = zipFile.generateNodeStream({ type: 'nodebuffer', streamFiles: true })
        zipStream.pipe(res).on('finish', () => {
            console.log('ZIP sent to user')
        })
    }
    catch(err){
        console.log('error ' + err)
    }
 
}
// [
//   {
//     id: '9f23da8d-257e-48e4-8966-08bdc7807189',
//     username: 'ron',
//     originalname: 'xmasList.xlm',
//     date: 2025-04-25T16:41:44.797Z,
//     storageName: '6ef76007-91fd-4a57-b4b1-7dd86d1c4af4.xlm'
//   }
// ]

module.exports = createZip