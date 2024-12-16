// Controls click events
document.querySelector('.dark').addEventListener('click', function (e){
    document.getElementById('theme').setAttribute('href', 'css/dark.css');
    translator.currentTheme = 'dark';
    translator.buildPageList();
    localStorage.setItem("textTheme","dark");
});
document.querySelector('.light').addEventListener('click', function (e){
    document.getElementById('theme').setAttribute('href', 'css/light.css');
    translator.currentTheme = 'light';
    translator.buildPageList();
    localStorage.setItem("textTheme","light");
});
document.querySelector('.leftJustified').addEventListener('click', function (e){
    document.querySelector('.translatedTextWrapper').style.textAlign = 'left';
    localStorage.setItem("textAlignment","left");
});
document.querySelector('.centeredText').addEventListener('click', function (e){
    document.querySelector('.translatedTextWrapper').style.textAlign = 'center';
    localStorage.setItem("textAlignment","center");
});
document.querySelector('.rightJustified').addEventListener('click', function (e){
    document.querySelector('.translatedTextWrapper').style.textAlign = 'right';
    localStorage.setItem("textAlignment","right");
});

document.querySelector('.newPage').addEventListener("click", function (e){
    //console.log('create new page save');
    translator.saveAndCreateNewpage();
});

document.querySelector(".savePage").addEventListener("click", function (e){
    var newDataElement = document.querySelector(".translatedTextWrapper").innerHTML;
    // Change content in page array to new content upon save.
    translator.savedPages[translator.currentPage-1] = newDataElement;

});

document.querySelector(".removePage").addEventListener("click", function (e){
    translator.savedPages.splice((translator.currentPage-1),1);
    translator.buildPageList();
});

document.querySelector(".exportButton").addEventListener("click", function (e){
    superUtil.sendJSON(translator.savedPages, "/api/export", function(status, response){
        if(response.redirect == true){
            window.location = "/exportedWorkspace.json";
        }
    }, "POST");
});

document.querySelector('.importFileForm').addEventListener("submit", function (e){        
    e.preventDefault();

    var importFileInput = document.querySelector("#importFileInput");

    if(!importFileInput.value.length) return;

    let reader = new FileReader();
    reader.onload = logFile;
    reader.readAsText(importFileInput.files[0]);

    function logFile(event){
        let str = event.target.result;
        let json = JSON.parse(str);

        translator.savedPages = json;
        translator.buildPageList();

        closeModal(document.querySelector(".importDialogClose"));

        document.querySelector(".translatedTextWrapper").innerHTML = translator.savedPages[0];
        document.querySelector('.loading').style.display = 'none';
    }
});

document.querySelector(".importButton").addEventListener("click", function (e){
    // show input dialog
    document.querySelector('.importDialog').style.display = "block";
});

function closeModal(modalCloseBtn){
    modalCloseBtn.parentNode.parentNode.parentNode.style.display = "none";
}

// Set Default text alignment and styles
document.querySelector('.newPage').click();
// load kept settings if they exist
if(localStorage.getItem("textAlignment") == "left"){
    document.querySelector('.leftJustified').click();
}
if(localStorage.getItem("textAlignment") == "center"){
    document.querySelector('.centeredText').click();
}
if(localStorage.getItem("textAlignment") == "right"){
    document.querySelector('.rightJustified').click();
}
if(localStorage.getItem("textTheme") == "dark"){
    document.querySelector('.dark').click();
}
if(localStorage.getItem("textTheme") == "light"){
    document.querySelector('.light').click();
}

// toggle controls hide and show button
var viewControls = document.querySelector(".viewControls");
var controlBar = document.querySelector(".controls");
var isShownControls = true;
viewControls.addEventListener("click", function(e){
    if(isShownControls == true){
        controlBar.style.display = "none";
        isShownControls = false;
        viewControls.innerHTML = "Show Control Bar";
    } else if(isShownControls == false){
        controlBar.style.display = "block";
        isShownControls = true;
        viewControls.innerHTML = "Hide Control Bar";
    }
});