function textFormatter(str){
    let words = str.split(" ");
    let newText = words.map(word=>{
      let newL = word[0].toUpperCase()
      return word.replace(word[0],newL)
      console.log(word)
    }).join(" ")
    return newText;
}
export default textFormatter;