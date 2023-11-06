let profile;
let second;
let saveText;
setInterval(()=>{
    profile = document.querySelector(".css-18bdrlk");
    if(profile===null){

    }else{
        profile=profile.href;
        if(document.querySelectorAll('.css-g386mi').length>0){if(document.querySelectorAll('.css-g386mi')[0].textContent==="도배 방지를 위해 게시물 작성이 제한되었습니다.\n10분 후에 다시 시도해주세요.확인"){
            chrome.runtime.sendMessage({"type":"setSecond","profile":profile}, response => {});
            check = document.querySelector(".css-14leu9c");
            check.textContent="작성하던 글 복사";
            check.addEventListener("click",()=>{navigator.clipboard.writeText(saveText);});
        }}
        else{saveText=document.querySelector("#Write").textContent;}
    }

},10);


setInterval(()=>{
    profile = document.querySelector(".css-18bdrlk");
    if(profile===null){

    }else{
        profile=profile.href;
        chrome.runtime.sendMessage({"type":"getSecond","profile":profile}, response => {
            second = response.time;
            if (second===undefined) {
                chrome.runtime.sendMessage({"type":"createSecond","profile":profile}, response => {});
            }else{
                second = (new Date().getTime()-second)/1000;
                if(second<60*10){
                    second=60*10-second;
                    document.querySelector("#Write").placeholder="도배 방지를 위해 게시물 작성이 제한되었습니다. " + Math.floor(second/60) + "분 " + Math.floor(second%60) + "초 후에 다시 시도해주세요.";
                }else{
                    document.querySelector("#Write").placeholder="무슨 생각을 하고 있나요?";
                }
            }
        });
    }

},100);

setInterval(()=>{
    profile = document.querySelector(".css-18bdrlk");
    if(profile===null){

    }
},100);


