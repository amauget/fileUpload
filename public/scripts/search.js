function searchFiles(){
    const files = document.querySelectorAll('#fileLabel')

    for(let i of files){
        const fileName = i.textContent.toLowerCase()
        const fileContainer = document.getElementById(i.textContent)
        const fileRadio = fileContainer.querySelector('input')

       if(fileName.includes(event.target.value.toLowerCase()) || fileRadio.checked){
            fileContainer.style.display = 'flex'
       }
       else{
            fileContainer.style.display = 'none'
       }
    }
}