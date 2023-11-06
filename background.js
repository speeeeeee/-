chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	if (message.type === "getSecond") {
        let keys = ["profile","time"]
        chrome.storage.local.get(keys,function(res){
            let profile = res.profile;
            let time = res.time;

            for (let i = 0; i < profile.length; i++) {
                if (profile[i]===message.profile) {
                    sendResponse({"profile":profile[i], "time":time[i]});
                    return;
                }
            }
            sendResponse({"profile":undefined, "time":undefined});
        });
    };
    if(message.type === "setSecond"){
        let keys = ["profile","time"];
        chrome.storage.local.get(keys,function(res){
            let profile = res.profile;
            let time = res.time;

            for (let i = 0; i < profile.length; i++) {
                if (profile[i]===message.profile) {
                    time[i]=new Date().getTime();
                }
            }
            let items = {"profile": profile, "time":time}
            chrome.storage.local.set(items, function(){});
            sendResponse(true);

        });
        

    }
    if(message.type === "createSecond"){
        let keys = ["profile","time"];
        chrome.storage.local.get(keys,function(res){
            let profile = res.profile;
            let time = res.time;

            profile.push(message.profile)
            time.push(new Date().getTime()-1000*60*10)

            let items = {"profile": profile, "time":time};
            chrome.storage.local.set(items, function(){});
            sendResponse(true);

        });
        

    }
    return true;
});




chrome.runtime.onInstalled.addListener(function(details) {
    let items = {"profile": [], "time":[]};
    chrome.storage.local.set(items, function(){
    });
  });