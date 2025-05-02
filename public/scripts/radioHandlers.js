function toggleRadio(){
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
        return label.style.color = 'blue'
    }
    label.style.color = 'black'
}

function evalFormRadios(event){ //ensures that at least 1 radio is selected to submit form
    event.preventDefault()
    const downloadForm = document.querySelector('.downloadForm')
    const radios = downloadForm.querySelectorAll('input')

    for(let i = 0; i < radios.length; i++){
        if(radios[i].checked){
            downloadForm.submit()
            break
        }
    }
    setTimeout(() => {
        window.location.reload() 
    }, 900) //allows enough time for download to show before reload
   
}


