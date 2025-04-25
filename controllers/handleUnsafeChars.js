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
      fileNamesCleaned.push(htmlEscape(key))
  }
  return fileNamesCleaned
}

module.exports = { htmlEscape, htmlRestore, cleanListKeys }