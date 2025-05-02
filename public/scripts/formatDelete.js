function formatDelete(event){
    const label = event.target.parentNode.querySelector('label')
    
}

function toggleRadioDelete(event){
    event.preventDefault() //disable highlight of double clicked labels

    const radio = event.target.parentNode.querySelector('input') //targets radio if label or radio clicked
    if(radio.checked === true){
        radio.checked = false
    }
    else{
        radio.checked = true
    }
    toggleLabelColor(radio, event)
}

function toggleLabelColor(radio, event){
    const label = event.target.parentNode.querySelector('label')

    if(radio.checked){
        return label.style.color = 'red'
    }
    label.style.color = 'black'
}

function renderAreYouSure(event){
    const radios = document.querySelectorAll('input')
    const deleteList = document.querySelector('.deleteList')
    const blocker = document.querySelector('.blocker')
    
    radios.forEach(radio => {
        if(radio.checked){
            const listItem = document.createElement('li')
            listItem.className = 'deleteListItem'
            listItem.textContent = radio.name
            
            deleteList.appendChild(listItem)
        }
    })
    
    blocker.style.display = 'block'
}

function hideAreYouSure(){
    const deleteList = document.querySelector('.deleteList')
    const blocker = document.querySelector('.blocker')

    deleteList.innerHTML = ''
    blocker.style.display = 'none'
}

function submit(){
    const form = document.querySelector('#deleteForm')
    form.submit()
}