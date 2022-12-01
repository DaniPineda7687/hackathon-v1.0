function textFormatter(str){
    let strLowerCase = str.toLowerCase();
    let words = strLowerCase.split(" ");
    let newText = words.map(word=>{
      let newL = word[0].toUpperCase()
      return word.replace(word[0],newL)
      console.log(word)
    }).join(" ")
    return newText;
}

function findSchool(schools,position){
  return schools.find(school=>{
    return school.geometry[0]==position[0]&&school.geometry[1]==position[1]
  })
}

export {textFormatter,findSchool}