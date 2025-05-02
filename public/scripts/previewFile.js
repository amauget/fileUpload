const fileToElement = { 
    pdf: {
        element: 'iframe', 
        mimeType: 'application/pdf',
    },
    jpg: {
        element: 'img',
        mimeType: 'image/jpeg',
    },
    jpeg: {
        element: 'img',
        mimeType: 'image/jpeg',
    },
    mp4: {
        element: 'video',
        mimeType: 'video/mp4',
    },
    mov: {
        element: 'video',
        mimeType: 'video/quicktime',
    },
    avi: {
        element: 'video',
        mimeType: 'video/x-msvideo', 
    },
    wmv: {
        element: 'video',
        mimeType: 'video/x-ms-wmv', 
    },  
}


function previewFile(){
    const imgContainer = event.target.parentNode
    const fileName = (imgContainer.parentNode).querySelector('label').textContent
    //used to retrieve file on server, determine file type for rendering element front-end.

    const fileType = fileToElement[determineFileType(fileName)]

    fetch(`/preview/?id=${fileName}`)
        .then(res => res.text())
        .then(stream => 
            renderPreview(fileType, stream)
        )
            .catch(err =>{
                renderUnavailable(fileName)
            })
}

function determineFileType(src){
    let fileType = []
    for(let i = src.length - 1; i > -1; i--){
        if(src[i] === '.'){
            break
        }
        fileType.splice(0, 0, src[i])
    }
    return fileType.join().replaceAll(',','').replace('.png', '')
}

function renderPreview(fileType, stream){
    const filePreview = document.querySelector('.filePreview')
    filePreview.innerHTML = ''
    
    const previewElement = document.createElement(fileType.element)
    previewElement.className = 'previewTest'
    previewElement.src = `data:${fileType.mimeType};base64,${stream}`

    if(fileType.element === 'video'){
        previewElement.controls = true
    }

    filePreview.appendChild(previewElement)
    return filePreview
}

function renderUnavailable(fileName){
    const fileType = determineFileType(fileName)

    const filePreview = document.querySelector('.filePreview')
    filePreview.innerHTML = ''

    const prevNotAvail = document.createElement('h3')
    prevNotAvail.className = 'previewTest'

    if(fileType === 'docx' || fileType === 'xlsx'){
        prevNotAvail.textContent = `I really wanted to render "${fileType}" files. But not enough to get a MS Office license...`
    }
    else{
        prevNotAvail.textContent = 'No preview for this file type.'

    }
    filePreview.appendChild(prevNotAvail)
}