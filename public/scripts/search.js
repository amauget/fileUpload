function searchFiles(event){
    const files = document.querySelectorAll('#fileLabel')
 
    for(let i of files){
        const fileName = i.textContent.toLowerCase()
        const fileContainer = i.parentElement.parentElement
        const fileRadio = fileContainer.querySelector('input')
       
       if(fileName.includes(event.target.value.toLowerCase()) || fileRadio.checked){
            fileContainer.style.display = 'grid'
       }
       else{
            fileContainer.style.display = 'none'
      
       }
    }
}