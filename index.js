const inputEl = document.getElementById("input")
const infoTextEL = document.getElementById("info-text")
const meaningContainerEl = document.getElementById("meaning-container")
const titleEl = document.getElementById("title")
const meaningEl = document.getElementById("meaning")
const audioEl = document.getElementById("audio")

  async function fetchAPI (word){
    try {
        infoTextEL.style.display="block"
        meaningContainerEl.style.display = "none"  

        infoTextEL.innerText =`searching the meaning of "${word}"`
        const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
        const result = await fetch(url).then((res)=>      res.json()); 

        if(result.title){
            meaningContainerEl.style.display = "block";
            infoTextEL.style.display="none";
            titleEl.innerText = word;
            meaningEl.innerText = "N/A"
            audioEl.style.display="none";
        }
        else{
            infoTextEL.style.display="none";
            meaningContainerEl.style.display = "block";
            audioEl.style.display="inline-flex"
            titleEl.innerText = result[0].word;
            meaningEl.innerText = result[0].meanings[0].definitions[0].definition;
            audioEl.src = result[0].phonetics[0].audio;
 }

          } 
          catch (error) {
          console.log(error);
          infoTextEL.innerText= "check a network connection"
         }

}

inputEl.addEventListener("keyup",(e)=>{
    if(e.target.value && e.key === "Enter") {
       fetchAPI(e.target.value) 
    }}) 