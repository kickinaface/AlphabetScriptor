function Editor(){
    var textBlocks = [];
    this.init = function(){
        // Redirect to editor if user was working in it and clicked update entry.
        var redirectToEditor = sessionStorage.getItem("redirectToEditor");
        if(redirectToEditor == "true"){
            document.querySelector(".navigation ul li:nth-child(3)").click();
            sessionStorage.removeItem("redirectToEditor");
        }
        // Add Block button click event listener
        var addTextBlockBtn = document.querySelector(".addTextBlockBtn");
        addTextBlockBtn.addEventListener("click", function(e){
            showModal(document.querySelector(".addTextBlockWrapper"));
            //document.querySelector("#newBlockTextEntry").blur();
            document.querySelector("#newBlockTextEntry").focus();
        });

        // Import button click event listener
        var importTextBlockBtn = document.querySelector(".importTextBlockBtn");
        importTextBlockBtn.addEventListener("click", function(e){
            showModal(document.querySelector(".importListWorkspace"));
            setTimeout(function(){
                document.querySelector("#importListFileForm").addEventListener("change", onChange);
            },1000);
        });
                function onChange(event){
                    var reader = new FileReader();
                    reader.onload = onReaderLoad;
                    reader.readAsText(event.target.files[0]);
                    // close modal not sure why isnt working as written
                    document.querySelector(".importListWorkspace").style.opacity = 0;
                    document.querySelector(".importListWorkspace").style.display = "none";
                    isModalOpen = false; 
                }
                function onReaderLoad(event){
                    var obj = JSON.parse(event.target.result);
                    textBlocks = obj;
                    document.querySelector(".noTextBlocksMessage").style.display = "none";
                    // Start building blocks out after receiving stored textblocks
                    // clear out the html and rebuild with new imported content
                    var textBlockWrapper = document.querySelector(".textBlockWrapper");
                    textBlockWrapper.innerHTML = "";
                    transformTextToImages();
                    editContentBlock();
                    // Clear out the import form value
                    document.querySelector("#importListFileForm").value = "";
                }

        // Export button click event listener
        var exportTextBtn = document.querySelector(".exportTextBtn");
        exportTextBtn.addEventListener("click", function(e){
            ManageStorage.exportListWorkspace(textBlocks);
            alert("Your list workspace file has been exported to your downloads folder.")
        });

        //Check get stored blocks if they exist
        getStoredTextBlocks();
        document.querySelector(".loading").style.opacity = 1;

        // click event for title toggle
        document.querySelector(".listTitleToggleBtn").addEventListener("click", toggleListTitle);
        // set title title display prefreence
        if(isListTitleShowing == true){
            document.querySelector(".collapseListTitle").style.display = "block";
        } else if(isListTitleShowing == false){
            document.querySelector(".collapseListTitle").style.display = "none";
        }
    };

    this.createNewTextBlock = function(modal){
        var newBlockTextEntry = modal.parentElement.parentElement.querySelector("#newBlockTextEntry").value;
        
        if(newBlockTextEntry.length ==0){
            modal.parentElement.parentElement.querySelector(".modalMessages").innerHTML = "<h3 style='color:red;'>You must not leave the entry blank.</h3>"
        } else {
            var preparedContentBlock = {
                content:newBlockTextEntry,
                mainContent: "",
                font:"traditional",
                size:"37"
            }
            textBlocks.push(preparedContentBlock);
            document.querySelector(".closeModalBtn").click();
            document.querySelector(".noTextBlocksMessage").style.display = "none";
            // Save text block array to system
            saveTextBlocks(textBlocks);
        }
    };
    
    this.updateBlockTextEntry = function(modal){
        var editBlockTextEntry = modal.parentElement.parentElement.querySelector("#editBlockTextEntry").value;
        var editBlockTextEntryContent = modal.parentElement.parentElement.querySelector("#editBlockTextEntryContent").value;
        if(editBlockTextEntry.length ==0 || editBlockTextEntryContent.length== 0){
            modal.parentElement.parentElement.querySelector(".modalMessages").innerHTML = "<h3 style='color:red;'>You must not leave the entry blank.</h3>"
        } else {
            var preparedContentBlock = {
                content:editBlockTextEntry,
                mainContent: editBlockTextEntryContent,
                font:modal.parentElement.parentElement.querySelector("#fontDropDown").value,
                size:modal.parentElement.parentElement.querySelector("#setFontSize").value
            }
            textBlocks[modal.parentElement.parentElement.querySelector("#storedBlockId").value] = preparedContentBlock;
            modal.parentElement.parentElement.querySelector(".closeModalBtn").click();
            document.querySelector(".noTextBlocksMessage").style.display = "none";
            // Save text block array to system
            
            saveTextBlocks(textBlocks);
        }
    };

    this.deleteBlockTextEntry = function (modal){
        if(confirm("Are you sure you want to delete this text block? You must refocus the application in order to reset the input field.")){
            textBlocks.splice(modal.parentElement.parentElement.querySelector("#storedBlockId").value,1);
            saveTextBlocks(textBlocks);
        }
    }

    this.sendToTypeWriter = function (modal){
        var editBlockTextEntry = modal.parentElement.parentElement.querySelector("#editBlockTextEntry").value;
        var editBlockTextEntryContent = modal.parentElement.parentElement.querySelector("#editBlockTextEntryContent").value;
        if(editBlockTextEntry.length ==0 || editBlockTextEntryContent.length== 0){
            modal.parentElement.parentElement.querySelector(".modalMessages").innerHTML = "<h3 style='color:red;'>You must not leave the entry blank.</h3>"
        } else {
            var preparedContentBlock = {
                content:editBlockTextEntry,
                mainContent: editBlockTextEntryContent,
                font:modal.parentElement.parentElement.querySelector("#fontDropDown").value,
                size:modal.parentElement.parentElement.querySelector("#setFontSize").value
            }
            textBlocks[modal.parentElement.parentElement.querySelector("#storedBlockId").value] = preparedContentBlock;
            modal.parentElement.parentElement.querySelector(".closeModalBtn").click();
            document.querySelector(".noTextBlocksMessage").style.display = "none";
            // Save text block array to system
            ManageStorage.saveEditorData({"textBlocks":textBlocks});
            //saveTextBlocks(textBlocks);
            sendObjectToTypeWriter  = preparedContentBlock;
            // Click the Type Writer program
            var navLinks = document.querySelectorAll(".navigation ul li");
            navLinks[3].click();
        }
        
    }

    function getStoredTextBlocks(){
        ManageStorage.readEditorData().then(function(d){
            //console.log('d: ',d);
            if(d != undefined && d.textBlocks.length != 0){
                textBlocks = d.textBlocks;
                document.querySelector(".noTextBlocksMessage").style.display = "none";
                // Start building blocks out after receiving stored textblocks
                transformTextToImages();
                editContentBlock();
            }
            //
            setTimeout(function(){
                document.querySelector(".loading").style.opacity = 0;
            },2000);
        }).catch(function(e){
            console.log("There was an error.",e);
        });
    };

    function editContentBlock(){
        var contentWrappers = document.querySelectorAll(".contentWrapper");
        contentWrappers.forEach(function(element, i){
            element.addEventListener("click", function(e){
                var modal = document.querySelector(".editTextBlockWrapper");
                showModal(modal);
                modal.querySelector("#editBlockTextEntry").value = textBlocks[i].content;
                modal.querySelector("#editBlockTextEntryContent").value = textBlocks[i].mainContent;
                auto_grow(modal.querySelector("#editBlockTextEntry"));
                modal.querySelector("#storedBlockId").value = i;
                modal.querySelector("#fontDropDown").value = textBlocks[i].font;
                modal.querySelector("#setFontSize").value = textBlocks[i].size;
            });
        });
    }

    function saveTextBlocks(blocks){
        ManageStorage.saveEditorData({"textBlocks":blocks});
        sessionStorage.setItem("redirectToEditor", "true");
        location.reload();
    };

    function transformTextToImages(){
        var textBlockWrapper = document.querySelector(".textBlockWrapper");
        for(var i = 0; i<= textBlocks.length-1; i++){
            var contentWrapper;
            var charactersInElement = textBlocks[i].content.trim();
            var totalCharactersInElement = textBlocks[i].content.length;
            var fontSize = textBlocks[i].size;
            var font = textBlocks[i].font;
            textBlockWrapper.innerHTML += "<div class='contentWrapper' id='textBlock_"+i+"'></div>";
            contentWrapper = document.querySelector("#textBlock_"+i);
            contentWrapper.style.fontSize = (fontSize+"px");
            contentWrapper.innerHTML = renderFontImages(charactersInElement, totalCharactersInElement, font, fontSize);
        }
    };

    function renderFontImages(charactersInElement, totalCharacters, font, fontSize){
        var outputString = "";
        for(var i = 0 ; i<= totalCharacters-1; i++){
            var fontPath;
            if(font == "traditional"){
                fontPath ="images/traditional/"
            } else {
                fontPath = "images/default/"
            }
            outputString += renderLetter(font, fontPath, charactersInElement[i], fontSize);
        }
        return outputString;
    };

    function renderLetter(font, fontPath, letter, imageWidth){
        if(font == 'default'){
            // Check each letter and return the symbol back for later storing.
            if(letter == "a" || letter == "A"){
                return "<img src="+fontPath+"a.png width="+imageWidth+"/>";
            } else if(letter == "b" || letter =="B"){
                return "<img src="+fontPath+"b.png height="+imageWidth+"/>";
            } else if(letter == "c" || letter == "C"){
                return "<img src="+fontPath+"c.png height="+imageWidth+"/>";
            } else if(letter == "d" || letter == "D"){
                return "<img src="+fontPath+"d.png height="+imageWidth+"/>";
            } else if(letter == "e" || letter == "E"){
                return "<img src="+fontPath+"e.png height="+imageWidth+"/>";
            } else if(letter == "f" || letter == "F"){
                return "<img src="+fontPath+"f.png height="+imageWidth+"/>";
            } else if(letter == "g" || letter == "G"){
                return "<img src="+fontPath+"g.png height="+imageWidth+"/>";
            } else if(letter == "h" || letter == "H"){
                return "<img src="+fontPath+"h.png height="+imageWidth+"/>";
            } else if(letter == "i" || letter == "I"){
                return "<img src="+fontPath+"i.png height="+imageWidth+"/>";
            } else if(letter == "j" || letter == "J"){
                return "<img src="+fontPath+"j.png height="+imageWidth+"/>";
            } else if(letter == "k" || letter == "K"){
                return "<img src="+fontPath+"k.png height="+imageWidth+"/>";
            } else if(letter == "l" || letter == "L"){
                return "<img src="+fontPath+"l.png height="+imageWidth+"/>";
            } else if(letter == "m" || letter == "M"){
                return "<img src="+fontPath+"m.png height="+imageWidth+"/>";
            } else if(letter == "n" || letter == "N"){
                return "<img src="+fontPath+"n.png height="+imageWidth+"/>";
            } else if(letter == "o" || letter == "O"){
                return "<img src="+fontPath+"o.png height="+imageWidth+"/>";
            } else if(letter == "p" || letter == "P"){
                return "<img src="+fontPath+"p.png width="+imageWidth+"/>";
            } else if(letter == "q" || letter == "Q"){
                return "<img src="+fontPath+"q.png width="+imageWidth+"/>";
            } else if(letter == "r" || letter == "R"){
                return "<img src="+fontPath+"r.png height="+imageWidth+"/>";
            } else if(letter == "s" || letter == "S"){
                return "<img src="+fontPath+"s.png height="+imageWidth+"/>";
            } else if(letter == "t" || letter == "T"){
                return "<img src="+fontPath+"t.png height="+imageWidth+"/>";
            } else if(letter == "u" || letter == "U"){
                return "<img src="+fontPath+"u.png height="+imageWidth+"/>";
            } else if(letter == "v" || letter == "V"){
                return "<img src="+fontPath+"v.png height="+imageWidth+"/>";
            } else if(letter == "w" || letter == "W"){
                return "<img src="+fontPath+"w.png height="+imageWidth+"/>";
            } else if(letter == "x" || letter == "X"){
                return "<img src="+fontPath+"x.png width="+imageWidth+"/>";
            } else if(letter == "y" || letter == "Y"){
                return "<img src="+fontPath+"y.png width="+imageWidth+"/>";
            } else if(letter == "z" || letter == "Z"){
                return "<img src="+fontPath+"z.png width="+imageWidth+"/>";
            } else if(letter == "."){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"period.png />";
            } else if(letter == ","){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"comma.png />";
            } else if(letter == ":"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"colon.png />";
            } else if(letter == "1"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"1.png />";
            } else if(letter == "2"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"2.png />";
            } else if(letter == "3"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"3.png />";
            } else if(letter == "4"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"4.png />";
            } else if(letter == "5"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"5.png />";
            } else if(letter == "6"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"6.png />";
            } else if(letter == "7"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"7.png />";
            } else if(letter == "8"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"8.png />";
            } else if(letter == "9"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"9.png />";
            } else if(letter == "0"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"0.png />";
            } else if(letter == " " || letter == " "){
                return "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ";
            } else{
                return "";
            }
        } else if(font == "traditional"){
            if(letter == "a" || letter == "A"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"a.png />";
            } else if(letter == "b" || letter =="B"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"b.png />";
            } else if(letter == "c" || letter == "C"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"c.png />";
            } else if(letter == "d" || letter == "D"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"d.png />";
            } else if(letter == "e" || letter == "E"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"e.png />";
            } else if(letter == "f" || letter == "F"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"f.png />";
            } else if(letter == "g" || letter == "G"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"g.png />";
            } else if(letter == "h" || letter == "H"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"h.png />";
            } else if(letter == "i" || letter == "I"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"i.png />";
            } else if(letter == "j" || letter == "J"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"j.png />";
            } else if(letter == "k" || letter == "K"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"k.png />";
            } else if(letter == "l" || letter == "L"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"l.png />";
            } else if(letter == "m" || letter == "M"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"m.png />";
            } else if(letter == "n" || letter == "N"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"n.png />";
            } else if(letter == "o" || letter == "O"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"o.png />";
            } else if(letter == "p" || letter == "P"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"p.png />";
            } else if(letter == "q" || letter == "Q"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"q.png />";
            } else if(letter == "r" || letter == "R"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"r.png />";
            } else if(letter == "s" || letter == "S"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"s.png />";
            } else if(letter == "t" || letter == "T"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"t.png />";
            } else if(letter == "u" || letter == "U"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"u.png />";
            } else if(letter == "v" || letter == "V"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"v.png />";
            } else if(letter == "w" || letter == "W"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"w.png />";
            } else if(letter == "x" || letter == "X"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"x.png />";
            } else if(letter == "y" || letter == "Y"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"y.png />";
            } else if(letter == "z" || letter == "Z"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"z.png />";
            } else if(letter == "."){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"period.png />";
            } else if(letter == ","){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"comma.png />";
            } else if(letter == ":"){
                return "<img style='height:"+(imageWidth)+"px;' src="+fontPath+"colon.png />";
            } else if(letter == "1"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"1.png />";
            } else if(letter == "2"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"2.png />";
            } else if(letter == "3"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"3.png />";
            } else if(letter == "4"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"4.png />";
            } else if(letter == "5"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"5.png />";
            } else if(letter == "6"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"6.png />";
            } else if(letter == "7"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"7.png />";
            } else if(letter == "8"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"8.png />";
            } else if(letter == "9"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"9.png />";
            } else if(letter == "0"){
                return "<img style='margin-bottom:6px; height:"+(imageWidth - 10)+"px;' src="+fontPath+"0.png />";
            } else if(letter == " " || letter == " "){
                return "&nbsp;&nbsp; ";
            } else{
                return "";
            }
        }
    };

};

var editor = new Editor();
document.addEventListener("DOMContentLoaded", function(e){
    editor.init();
});