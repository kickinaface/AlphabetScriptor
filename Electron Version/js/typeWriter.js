function TypeWriter(){
    this.isTyping = false;
    this.font = "default";
    var storedWorkSpace = null;
    var blinkerInterval = null;
    var lastClickedCharacter = null;
    var isCursorBlinking = false;
    var isCurrentlySaved = false;
    var isInit = false;
    var isSelectOn = false;
    var hasSelectedCharacters = false;
    //
    this.init = function(){
          if(isInit == false){
            var saveMessageElement = document.querySelector(".loading");
            saveMessageElement.innerHTML = "Saving Workspace...";
            saveMessageElement.style.display = "block";
            saveMessageElement.style.opacity = 0;
            console.log('Type Writer is initialized.');
            addEventListeners();
            autoSave();
            getStoredWorkSpace();
            buildBottomPanelMethods();
            isInit = true;
        }
        // Check if user is passing content from List(Editor) program
        if(sendObjectToTypeWriter)
            passTextFromListProgram(sendObjectToTypeWriter);
    }
    function clickedCharacter(e){
        var pleaseWaitDialogWrapper = document.querySelector(".pleaseWaitDialogWrapper");
        pleaseWaitDialogWrapper.style.display = "block";
        if(blinkerInterval != null){
            clearInterval(blinkerInterval);
            isCursorBlinking = false;
        }
        //reset all other blinkers
        resetBlinkers();
        var cursorBlink = false;
        lastClickedCharacter = e.target;
        isCursorBlinking = true;
        blinkerInterval = setInterval(function(){
            pleaseWaitDialogWrapper.style.display = "none";
            if(cursorBlink == false){
                cursorBlink = true;
                
                if(isSelectOn == true){
                    e.target.style.webkitFilter= "invert(0)";
                    e.target.style.backgroundColor = "greenyellow !important";
                    e.target.style.border = "3px solid greenyellow";
                } else {
                    e.target.style.webkitFilter= "invert(0)";
                    e.target.style.backgroundColor = "white !important";
                }
            } else if(cursorBlink == true){
                cursorBlink = false;
                
                if(isSelectOn == true){
                    e.target.style.webkitFilter= "invert(1)";
                    e.target.style.background = "purple !important";
                } else {
                    e.target.style.webkitFilter = "invert(1)";
                    e.target.style.backgroundColor = "black !important";
                }
            }
        },300);
        // If select is on, the user has selected the last character apply this.
        if(isSelectOn == true){
            var appButtonSelect = document.querySelector(".appButtonSelect");
            appButtonSelect.click();
            lastClickedCharacter.click();
            console.log("last character selected, generating selected text.")
            isSelectOn = false;
            lastClickedCharacter = null;
        }

        // Set the font size to whatever character the user selects, except for new lines
        if(e.target.height != undefined){
            typeWriter.setFontSize(e.target.height);
            // Set the font to whatever character the user selects, except for new lines
            //console.log("char font ", e.target.src)
            if(e.target.src.includes("/traditional/")){
                typeWriter.setFont("traditional");
            } else if(e.target.src.includes("/default/")){
                typeWriter.setFont("default");
            }
        }
    };

    function resetBlinkers(){
        var allCharacters = document.querySelectorAll(".trackedChar");
        allCharacters.forEach(function(e, i){
            if(isSelectOn == false){
                e.style.webkitFilter = "invert(1)";
                e.style.background = "white";
                e.style.border = "none";
            }
        });
    }
    function getStoredWorkSpace(){
        //If not passing text through List program, getting through storage...
        if(sendObjectToTypeWriter == null){
            ManageStorage.readTypeWriterData().then(function(d){
                if(d != undefined && d.typeWriterWorkSpace.length != 0){
                    storedWorkSpace = d.typeWriterWorkSpace;
                    document.querySelector(".typeWriterContentWrapper").innerHTML = storedWorkSpace.content;
                    isTitleShowing = storedWorkSpace.isTitleShowing;
                    if(isTitleShowing == false){
                        document.querySelector(".collapseTitle").style.display = "none";
                        //turn off list as well
                        isListTitleShowing = false;
                        document.querySelector(".collapseListTitle").style.display = "none";
                    }
                    resetBlinkers();
                    var trackedChars = document.querySelectorAll(".trackedChar");
                    trackedChars.forEach(function(element,i){
                        if(element.classList.contains("selectedText")){
                            hasSelectedCharacters = true;
                        }
                        element.addEventListener("click", function(e){
                            clickedCharacter(e);
                        });
                    });
                }
                //
                setTimeout(function(){
                    document.querySelector(".loading").style.opacity = 0;
                },2000);
            }).catch(function(e){
                console.log("There was an error.",e);
            });
        } else{
            console.log("do nothing, rendering from List program")
        }
    }
    
    function autoSave(){
        setInterval(function(){
            saveWorkspace();
        },30000);
    }

    function saveWorkspace(isButton){
        if(typeWriter.isTyping == false && isCurrentlySaved == false && document.querySelector(".typeWriterPage").style.display == "block" || isButton == true){
            var saveMessageElement = document.querySelector(".loading");
            saveMessageElement.innerHTML = "Saving Workspace...";
            saveMessageElement.style.opacity = 1;
            document.querySelector("#saveIcon").style.display ="block";
            // Save content
            ManageStorage.saveTypeWriterData({"typeWriterWorkSpace":{
                    content:document.querySelector(".typeWriterContentWrapper").innerHTML,
                    font:typeWriter.font,
                    fontSize:typeWriter.fontSize,
                    isTitleShowing:isTitleShowing
                }
            });
            setTimeout(function(){
                saveMessageElement.style.opacity = 0;
                document.querySelector("#saveIcon").style.display ="none";
                saveMessageElement.innerHTML = 'Please wait... Loading content';
                isCurrentlySaved = true;
                // setTimeout(function(){
                //     window.location.reload();
                // },2000);
            },4000);
            console.log('saving workspace')
        } else {
            console.log("still looping ")
        }
    }

    function addEventListeners(){
        window.onkeydown = function(event){
            //console.log("isModalOpen ", isModalOpen);
            if(isModalOpen == false){
                detectTyping(event);
            }
        }
        // and right click event listener
        window.oncontextmenu = function(e){
            e.preventDefault();
            if(e.target.classList.contains("trackedChar") && !hasSelectedCharacters){
                e.target.remove();
                isCurrentlySaved = false;
            } else if(hasSelectedCharacters == true){
                typeWriter.removeSelectedCharacters();
            }
        };

        document.querySelector(".toggleTitleBtnControl").addEventListener("click", toggleTitle);
    }

    function buildBottomPanelMethods(){
        // bottom panel buttons
        var appButtonImport = document.querySelector(".appButtonImport");
        var appButtonExport = document.querySelector(".appButtonExport");
        var appButtonNew = document .querySelector(".appButtonNew");
        var appButtonFont = document.querySelector(".appButtonFont");
        var appButtonFontSize = document.querySelector(".appButtonFontSize");
        var appButtonSave = document.querySelector(".appButtonSave");
        var appButtonSelect = document.querySelector(".appButtonSelect");
        var appButtonDeselect = document.querySelector(".appButtonDeselect");

        appButtonImport.addEventListener("click", function(e){
            showModal(document.querySelector(".importTextBlockWrapper"));
            // wait a second so that the animation isnt choppy
            setTimeout(function(){
                document.querySelector("#importFileForm").addEventListener("change", onChange);
            },1000);
        });
            function onChange(event){
                var reader = new FileReader();
                reader.onload = onReaderLoad;
                reader.readAsText(event.target.files[0]);
                // close modal not sure why isnt working as written
                document.querySelector(".importTextBlockWrapper").style.opacity = 0;
                document.querySelector(".importTextBlockWrapper").style.display = "none";
                isModalOpen = false;
            }
            function onReaderLoad(event){
                var obj = JSON.parse(event.target.result);
                document.querySelector(".typeWriterContentWrapper").innerHTML = obj[0];
                // Clear out the import form value
                document.querySelector("#importFileForm").value = "";
                // Reset the cursor blinkers
                resetBlinkers();
                lastClickedCharacter = null;
                isCursorBlinking = false;
                typeWriter.isTyping = true;
            }

        appButtonExport.addEventListener("click", function(e){
            var currentPage = [document.querySelector(".typeWriterContentWrapper").innerHTML];
            ManageStorage.exportWorkspace(currentPage);
            alert("Your workspace file has been exported to your downloads folder.")
        });

        appButtonNew.addEventListener("click", function(e){
            e.target.blur();
            lastClickedCharacter = null;
            isCursorBlinking = false;
            document.querySelector(".translatedTextWrapper").innerHTML= "";
            document.querySelector(".typeWriterContentWrapper").click();
        });

        appButtonFont.addEventListener("click", function(e){
            showModal(document.querySelector(".changeTypeWriterFont"));
        });

        appButtonFontSize.addEventListener("click", function(e) {
            showModal(document.querySelector(".changeTypeWriterFontSize"));
        });

        appButtonSave.addEventListener("click", function(e){
            saveWorkspace(true);
        });

        appButtonSelect.addEventListener("click", function(e){
            var selectButton = e.target;
            var allCharacters = document.querySelectorAll(".trackedChar");

            if(isSelectOn == false){
                if(lastClickedCharacter == null){
                    alert("You must select a starting character first.")
                }else {
                    console.log("turn on select", e.target);
                    selectButton.classList.add("isSelected");
                    isSelectOn = true;
                    console.log("START", lastClickedCharacter);
                    lastClickedCharacter.classList.add("markedSelectedChar");
                    //alert("Select the last character in the selection.")
                }
                
            } else if(isSelectOn == true && lastClickedCharacter != null){
                console.log("turn off select");
                selectButton.classList.remove("isSelected");
                isSelectOn = false;
                lastClickedCharacter.click();
                console.log("END ", lastClickedCharacter);
                lastClickedCharacter.classList.add("markedLastSelectedChar");
                lastClickedCharacter == null;
                //Create selection on elements
                var foundFirstMarker = false;
                for(var i = 0; i<=allCharacters.length-1; i++){
                    if(allCharacters[i].classList.contains("markedSelectedChar")){
                        foundFirstMarker = true;
                        allCharacters[i].classList.add("selectedText");
                    } else if(allCharacters[i].classList.contains("markedLastSelectedChar") && foundFirstMarker == true){
                        allCharacters[i].classList.add("selectedText");
                        foundFirstMarker = false;
                    } else if(foundFirstMarker == true && !allCharacters[i].classList.contains("markedSelectedChar")){
                        allCharacters[i].classList.add("selectedText");
                    }
                }

                hasSelectedCharacters = true;
            }
        });

        appButtonDeselect.addEventListener("click", function(e){
            var allCharacters = document.querySelectorAll(".trackedChar");
            for(var i = 0; i<=allCharacters.length-1; i++){
                if(allCharacters[i].classList.contains("selectedText")){
                    allCharacters[i].classList.remove("selectedText");
                    allCharacters[i].classList.remove("markedSelectedChar");
                    allCharacters[i].classList.remove("markedLastSelectedChar")
                }
            }
            hasSelectedCharacters = false;
        });
    }

    function passTextFromListProgram(listObject){
        // Scroll to position (end)
        setTimeout(function(){
            $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
        },500);
        // Set font and size
        typeWriter.setFont(listObject.font);
        typeWriter.setFontSize(listObject.size);
        // Append Title
        for(let l = 0; l<=listObject.content.length-1; l++){
            delayAnimation(listObject.content.charCodeAt(l));
            //simulateKeyPress(listObject.content.charCodeAt(l));
        }
        // Add 4 spaces
        for(let l = 0; l<=3; l++){
            delayAnimation(13);
        }
        // Append the main content
        for(let l = 0; l<=listObject.mainContent.length-1; l++){
            delayAnimation(listObject.mainContent.charCodeAt(l));
           // simulateKeyPress(listObject.mainContent.charCodeAt(l));
        }
        // turn the list to writer variable off.
        sendObjectToTypeWriter = null;
    }
    function delayAnimation(key){
        setTimeout(function(){
            simulateKeyPress(key);
        },500);
    }
    function simulateKeyPress(key){
        const event = new KeyboardEvent("keydown", {
            key:String.fromCharCode(key),
            keyCode:key,
            which:key,
        });
        window.dispatchEvent(event);
    }

    this.setFont = function (font) {
        this.font = font;
    };

    this.updateFont = function(e){
        var userSelectedValue = document.querySelector("#fontSelection").value;
        if(hasSelectedCharacters == true){
            // update only the selected characters and update all of them together.
            var selectedText = document.querySelectorAll(".selectedText");
            for(var s = 0; s<= selectedText.length-1; s++){
                let heldTextPath = selectedText[s].src;
                changeCharacterFont(heldTextPath, selectedText[s]);
            }

            setTimeout(function(){
                var updateFontButton = document.querySelector(".updateFontButton");
                closeModal(updateFontButton);
            }, 300);

            function changeCharacterFont(textPath, element){
                if(textPath){
                    var isTraditional = textPath.includes("images/traditional/");
                    var isDefault = textPath.includes("images/default/");
                    var newTextPath;
                    newTextPath = textPath.substring(textPath.lastIndexOf("/images/") +1);
                    if(isTraditional == true){
                        newTextPath = newTextPath.replace("images/traditional/",("images/"+userSelectedValue+"/"));
                        //console.log("traditional format: ", newTextPath.substring(newTextPath.lastIndexOf("/images/") +1));
                    } else if(isDefault == true){
                        newTextPath = newTextPath.replace("images/default/",("images/"+userSelectedValue+"/"));
                        //console.log("default format: ", newTextPath.substring(newTextPath.lastIndexOf("/images/") +1));
                    }
                    element.src = newTextPath;
                    typeWriter.setFont(userSelectedValue);
                }
            }
        } else {
            this.setFont(document.querySelector("#fontSelection").value);
            var updateFontButton = document.querySelector(".updateFontButton");
            closeModal(updateFontButton);
        }
        
        
    }

    this.setFontSize = function (size){
        this.fontSize = size;
    }

    this.updateFontSize = function(e){
        var userSelectedValue = document.querySelector("#fontSizeValue").value;
        if(hasSelectedCharacters == true){
            // update only the selected characters and update all of them together.
            var selectedText = document.querySelectorAll(".selectedText");
            for(var s = 0; s<= selectedText.length-1; s++){
                changeCharacterSize(selectedText[s]);
            }

            setTimeout(function(){
                var updateFontSizeButton = document.querySelector(".updateFontSizeButton");
                closeModal(updateFontSizeButton);
            }, 300);

            function changeCharacterSize(element){
                if(!element.classList.contains("typedNewLine")){
                    element.style.height = (userSelectedValue+"px");
                    element.height = (userSelectedValue+"px");
                    typeWriter.setFontSize(userSelectedValue);
                }
            }
        } else {
            this.setFontSize(document.querySelector("#fontSizeValue").value);
            var updateFontSizeButton = document.querySelector(".updateFontSizeButton");
            closeModal(updateFontSizeButton);
        }
    }

    this.removeSelectedCharacters = function(){
        var selectedText = document.querySelectorAll(".selectedText");
        for(var s = 0; s<= selectedText.length-1; s++){
            let charEl = selectedText[s];
            charEl.remove();
        }
        isCurrentlySaved = false;
        document.querySelector(".appButtonDeselect").click();
        hasSelectedCharacters = false;
    }
    function detectTyping(e){
        typeWriter.isTyping = true;
        var keynum = e.keyCode;
        var translatedTextWrapperElement = document.querySelector('.translatedTextWrapper');
        var nodeList = document.querySelectorAll('.trackedChar');
        // Make this path even more dynamic with the future multple images to be loaded.
        var fontImageDirectory = String('images/' + (typeWriter.font) + '/');
        //console.log("fontImageDirectory", fontImageDirectory)
        var imageWidth = typeWriter.fontSize;// var imageWidth = '17';

        if(keynum == 8) {
            // hitting backspace.
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.previousElementSibling.remove();
            } else {
                nodeList[nodeList.length-1].remove();
            }
            isCurrentlySaved = false;
            
        }else if(keynum == 13) {
            // User has pressed enter, add a new line break
            var characterString;
            characterString = '<div class="trackedChar typedNewLine"></div>';
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;

        }else if(keynum == 113 || keynum == 81){
            //Q
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'q.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"q.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 119 || keynum == 87){
            //W
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'w.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"w.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
       else if(keynum == 101 || keynum == 69){
            //E
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'e.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"e.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 114 || keynum == 82){
            //R
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'r.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"r.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 116 || keynum == 84){
            //T
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'t.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"t.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 121 || keynum == 89){
            //Y
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'y.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"y.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 117 || keynum == 85){
            //U
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'u.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"u.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 105 || keynum == 73){
            //I
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'i.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"i.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 111 || keynum == 79){
            //O
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'o.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"o.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 112 || keynum == 80){
            //P
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'p.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"p.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 97 || keynum == 65){
            //A
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'a.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"a.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 115 || keynum == 83){
            //S
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'s.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"s.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 100 || keynum == 68){
            //D
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'d.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"d.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 102 || keynum == 70){
            //F
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'f.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"f.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 103 || keynum == 71){
            //G
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'g.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"g.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 104 || keynum == 72){
            //H
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'h.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"h.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 106 || keynum == 74){
            //J
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'j.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"j.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 107 || keynum == 75){
            //K
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'k.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"k.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 108 || keynum == 76){
            //L
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'l.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"l.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
            
        }else if(keynum == 122 || keynum == 90){
            //Z
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'z.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"z.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 120 || keynum == 88){
            //X
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'x.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"x.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 99 || keynum == 67){
            //C
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'c.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"c.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 118 || keynum == 86){
            //V
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'v.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"v.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 98 || keynum == 66){
            //B
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'b.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"b.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 110 || keynum == 78){
            //N
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'n.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"n.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 109 || keynum == 77){
            //M
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'m.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"m.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        //Numerials
        else if(keynum == 48 ){ //|| keynum == 96
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'0.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"0.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 49 ){//|| keynum == 97
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'1.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"1.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 50){// || keynum == 98
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'2.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"2.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 51 ){//|| keynum == 99
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'3.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"3.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 52 ){//|| keynum == 100
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'4.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"4.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 53 ){//|| keynum == 101
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'5.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"5.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 54 ){//|| keynum == 102
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'6.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"6.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 55 ){//|| keynum == 103
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'7.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"7.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 56 ){//|| keynum == 104
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'8.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"8.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 57 ){//|| keynum == 105
            // numerial
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'9.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth-10)+"px;' src="+fontImageDirectory+"9.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        //Spaces
        else if(keynum == 32) {
            // space bar
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" width="30" src="'+fontImageDirectory+'default_space_block.png">';
            } else if(typeWriter.font == "traditional"){
                //characterString = "<span class='trackedChar'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>";
                characterString = '<img class="trackedChar" width="30" src="'+fontImageDirectory+'default_space_block.png">';
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        //Punctuation
        else if(keynum == 188 || keynum == 44){
            // comma
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'comma.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"comma.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 190 || keynum == 46){
            // period
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'period.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"period.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }
        else if(keynum == 186 || keynum ==58){
            // colon
            var characterString;
            if(typeWriter.font == "default"){
                characterString = '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'colon.png">';
            } else if(typeWriter.font == "traditional"){
                characterString = "<img class='trackedChar' style='height:"+(imageWidth)+"px;' src="+fontImageDirectory+"colon.png />";
            }
            if(lastClickedCharacter != null && isCursorBlinking == true){
                lastClickedCharacter.insertAdjacentHTML("beforebegin", characterString);
            } else {
                translatedTextWrapperElement.innerHTML += characterString;
            }
            isCurrentlySaved = false;
        }

        //console.log("keynum: ", keynum)
        // Assign new click event for all new characters. When new characters are added
        if(typeWriter.isTyping == true){
            var trackedChars = document.querySelectorAll(".trackedChar");
            trackedChars.forEach(function(element,i){
                //element.removeEventListener("click", clickedCharacter(e));
                element.addEventListener("click", function(e){
                    clickedCharacter(e);
                });
            });
        }
        // After 5 seconds of no typing, isTyping is set to false
        setTimeout(function(){
            typeWriter.isTyping = false;
        },5000);
    }
};
var typeWriter = new TypeWriter();
typeWriter.setFont('default');
typeWriter.setFontSize("15");
// typeWriter.setFont('traditional');
// typeWriter.setFontSize("37");
