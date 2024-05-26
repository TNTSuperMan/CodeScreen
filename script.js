(()=>{
    const $=e=>document.querySelector(e);
    $(".code").style.display = "none";
    $("code#import").addEventListener("click",()=>$("input.importer").click())
    $("input.importer").accept = "text/*,." + [
        "svg","json","xml","php","java","py","c","h","cpp","hpp","cs",
        "bat"
    ].join(",.");
    document.onkeydown=e=>{
        switch(e.key){
            case " ":
            case "Home":
            case "End":
            case "PageUp":
            case "PageDown":
            case "ArrowUp":
            case "ArrowDown":
                return false;
        }
    }
    $("code#load").addEventListener("click",e=>{
        fetch("./lib/" + $("select").value + "/license").then(e=>e.text()).then(license=>{
            $(".wind>pre").innerText = license;
            $(".wind").style.display = "block";
        })
    })
    function show(text){
        $(".code>code").innerText = text;
        $(".code").style.display = "block";
        $(".home").style.display = "none";
        setInterval(e=>{
            if($(".code>code").getBoundingClientRect().height < scrollY + innerHeight){
                scrollTo(0,0)
            }
            scrollBy(0,1)
        },10)
    }
    $("input.importer").addEventListener("change",event=>{
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = event => show(event.target.result)
        reader.readAsText(file);
    })
    $("code#ok").addEventListener("click",e=>{
        fetch("./lib/" + $("select").value + "/script.js").then(e=>e.text()).then(source=>{
            $("div.wind").style.display = "none";
            show(source);
        })
    })
})()