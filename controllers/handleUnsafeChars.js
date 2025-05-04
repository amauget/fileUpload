function htmlEscape(text) {
    return text
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;")
}

function htmlRestore(text) {
  return text
    .replaceAll("&#39;", "'")
    .replaceAll("&quot;", '"')
    .replaceAll("&gt;", ">")
    .replaceAll("&lt;", "<")
    .replaceAll("&amp;", "&")
}

function cleanListKeys(list){
  let fileNamesCleaned = []
  for(let key in list){
    const cleanedKey = htmlEscape(key) 
    if(cleanedKey === key){ 
      fileNamesCleaned.push(cleanedKey) 
    }
    else{
      return [] 
      //breaks the connection between db and req if unsafe char encountered
    }
      
  }
  return fileNamesCleaned 
}

module.exports = { htmlEscape, htmlRestore, cleanListKeys }