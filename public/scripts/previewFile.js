

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
    png: {
        element: 'img',
        mimeType: 'image/png'
    },
    svg: {
        element: 'img',
        mimeType: 'image/svg'
    },
    webp:{
        element: 'img',
        mimetype: 'image/webp'
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
    const loader = document.querySelector('.loader')
 
    loader.style.display = 'block'
    //used to retrieve file on server, determine file type for rendering element front-end.

    const fileType = fileToElement[determineFileType(fileName)]

    fetch(`/preview/?id=${fileName}`)
        .then(res => res.text())
        .then(stream => {
            renderPreview(fileType, fileName, stream)
            loader.hidden = true
            
        })
        
            .catch(err =>{
               
                renderUnavailable(fileName, true)
                loader.hidden = true

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

function renderPreview(fileType, fileName, stream){
    if(fileType === undefined){
        renderUnavailable(fileName, false)
    }
    else{
        const filePreview = document.querySelector('.filePreview')
        filePreview.innerHTML = '<div id="previewLoader" class="loader" hidden></div>'
        
        const previewElement = document.createElement(fileType.element)
        previewElement.className = 'previewElement'
        previewElement.src = `data:${fileType.mimeType};base64,${stream}`

        if(fileType.element === 'video'){
            previewElement.controls = true
        }
        
        else if(fileType.element === 'img'){
            previewElement.id = 'imgPrev'
        }
    
        filePreview.appendChild(previewElement)
    }
  
}

function renderUnavailable(fileName, err){
    const filePreview = document.querySelector('.filePreview')
    filePreview.innerHTML = '<div id="previewLoader" class="loader" hidden></div>'

    const fileType = determineFileType(fileName)

    const prevNotAvail = document.createElement('h3')
    prevNotAvail.className = 'previewElement'

    if(err){
        prevNotAvail.textContent = 'An error occurred while retrieving this file. Please try again later.'
    }
    else if(fileType === 'docx' || fileType === 'xlsx'){
        prevNotAvail.textContent = `I really wanted to render "${fileType}" files. But not enough to get a MS Office license...`
    }
    else{
        prevNotAvail.textContent = 'No preview for this file type.'

    }

    filePreview.appendChild(prevNotAvail)
 

}