var text = document.querySelector(".title"),
    strText = text.textContent,
    splitText = strText.split(""),

    char = 0,
    timer = setInterval(onTick, 50);

text.textContent = "";

for(var i = 0; i < splitText.length; i++){
    text.innerHTML += "<span>" + splitText[i] + "</span>";
    // spanEl.classList.add("text-animation");
}

function onTick(){
    var spanEl = text.querySelectorAll("span")[char];
    // spanEl.classList.remove("text-animation");
    spanEl.classList.add("fade");
    char++

    if(char === splitText.length){
        complete();
        return;
    }
    // spanEl.classList.remove("fade");
}

function complete(){

}
