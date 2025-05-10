const uploadContainer = document.querySelector('.uploadContainer')

const uploadForm = document.querySelector('.uploadForm')
const chooseFiles = document.querySelector('.chooseFiles')

const uploadBtn = document.querySelector('.uploadBtn')

const fileList = document.querySelector('.fileList')

let fileName = 'fileInput'
let increment = 1
    
    function handleInput(event){
        const newFileInput = document.createElement('input')
        newFileInput.type = 'file'
        newFileInput.multiple = true
        newFileInput.required = true
        newFileInput.name = `${fileName}${increment}`
        newFileInput.id = `${fileName}${increment}`
        newFileInput.style.display = 'none'
        increment++
        
        uploadForm.appendChild(newFileInput)


        newFileInput.click()
        listenInputs(newFileInput.id)
    }

    function listenInputs(id){
        const input = document.querySelector('#' + id)
        input.addEventListener('change', (e) => {
            displayFile(input.files)
        })
    }


    function displayFile(fileNames) {
        for(let i = 0; i < fileNames.length; i++){
            const fileName = fileNames[i].name
            // console.log(fileInput.files)
            // fileInput[fileName] = fileNames[i]

            const listItem = document.createElement('li')
            listItem.className = 'fileListItem'

            const fileNameEl = document.createElement('p')
            fileNameEl.className = 'fileName'
            fileNameEl.textContent = fileName

            const fileIcon = document.createElement('img')
            fileIcon.className = 'fileIcon'
            fileIcon.src = pairFileIcon(fileName)

            listItem.append(fileIcon, fileNameEl)
            fileList.appendChild(listItem)
        }
        if(fileInput.files){
            uploadBtn.style.display = 'block'
        }

       
    }
        function pairFileIcon(fileName) {
        const fileImgSrc = {
            pdf: '/icons/pdf.png',
            css: '/icons/css.png',
            html: '/icons/html.png',
            js: '/icons/js.png',
            jpg: '/icons/photo.png',
            jpeg: '/icons/photo.png',
            png: '/icons/photo.png',
            mp4: '/icons/video.png',
            mov: '/icons/video.png',
            avi: '/icons/video.png',
            wmv: '/icons/video.png',
            doc: '/icons/doc.png',
            docx: '/icons/doc.png',
            odt: '/icons/doc.png',
            rtf: '/icons/doc.png',
            xls: '/icons/xl.png',
            xlsx: '/icons/xl.png',
            xlm: '/icons/xl.png',
            ods: '/icons/xl.png',
            csv: '/icons/xl.png',
            tsv: '/icons/xl.png'
        }

        const ext = fileName.split('.').pop().toLowerCase()
        return fileImgSrc[ext] || '/icons/default.png'
    }
    function displayUploadForm(){
        const uploadContainer = document.querySelector('.uploadContainer')

        console.log(uploadContainer)
        uploadContainer.style.display = 'grid'
    }
    function hideUploadForm(){
        resetUploads() //cancel upload form before hiding
        uploadContainer.style.display = 'none'
    }
    function resetUploads(){
        const fileList = document.querySelector('.fileList')

        fileList.innerHTML = ''
        
        increment = 1

        const uploadForm = document.querySelector('.uploadForm')
        uploadForm.innerHTML = ' <label class="inputLabel" for="fileInput">Upload Files Here:</label> <h3 class="chooseFiles" onclick=handleInput(event)>Choose Files</h3>'

        uploadBtn.style.display = 'none'
    }
    function submitFiles(){
        uploadForm.submit()
    }     