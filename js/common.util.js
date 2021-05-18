const deleteHTMLTag = function(str){
  return str.replace(/<(\/)?([a-zA-Z]*)(\s[a-zA-Z]*=[^>]*)?(\s)*(\/)?>/ig, "")
}
module.exports = { deleteHTMLTag };
