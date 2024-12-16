function Translator() {
    var that = this;
    this.savedPages = [];
    this.currentPage = 1;
    this.currentTheme = 'light';
    this.init = function () {
        this.detectTyping();        
    }
    this.saveAndCreateNewpage = function saveAndCreateNewpage(){
        // Get translatedTextWrapper with current text
        var currentTranslatedTextWrapper = document.querySelector(".translatedTextWrapper");
        // Clear the content for a new page, then add it to the array.
        currentTranslatedTextWrapper.innerHTML = "";
        that.savedPages.push(currentTranslatedTextWrapper.innerHTML);
        // Rebuild page list
        that.buildPageList();
    }
    this.buildPageList = function buildPageList(){
        var pageListElement = document.querySelector(".listedPages ul");
        pageListElement.innerHTML = "";

        for(var s= 0; s<=that.savedPages.length-1; s++){
            if(that.currentTheme == 'light'){
                if ((s+1) == that.currentPage){
                    pageListElement.innerHTML += "<li class='isSelectedLight' onclick='translator.goToPage("+s+", event);'>Page: "+(s+1)+"</li>";
                } else {
                    pageListElement.innerHTML += "<li onclick='translator.goToPage("+s+", event);'>Page: "+(s+1)+"</li>";
                }
                
            } else if(that.currentTheme == 'dark'){
                if((s+1) == that.currentPage){
                    pageListElement.innerHTML += "<li class='isSelectedDark' onclick='translator.goToPage("+s+", event);'>Page: "+(s+1)+"</li>";
                } else {
                    pageListElement.innerHTML += "<li onclick='translator.goToPage("+s+", event);'>Page: "+(s+1)+"</li>";
                }
            }
        }
    }

    this.goToPage = function gotoPage(page,e){
        that.currentPage = (page+1);
        that.buildPageList();

        document.querySelector(".translatedTextWrapper").innerHTML = that.savedPages[page];
    }
    this.setFont = function (font) {
        this.font = font;
    };

    this.detectTyping = function(e){
        var keynum;
        var translatedTextWrapperElement = document.querySelector('.translatedTextWrapper');
        var nodeList = document.querySelectorAll('.trackedChar');
        // Make this path even more dynamic with the future multple images to be loaded.
        var fontImageDirectory = String('fonts/' + (this.font) + '/img/');
        var imageWidth = '17';

        if (window.event) {
            keynum = e.keyCode;
            // console.log(keynum)
        }
        // Check certain keys to determine what to print out
        // console.log('keystroke: ', keynum);
        if(keynum == 8 || keynum == 46) {
            // console.log('hitting backspace.');
            nodeList[nodeList.length-1].remove();
            
        }else if(keynum == 13) {
            // User has pressed enter, add a new line break
            translatedTextWrapperElement.innerHTML += '<div class="trackedChar typedNewLine"></div>';
        }else if(keynum == 113 || keynum == 81){
            //Q
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'q.png">';
        }
        else if(keynum == 119 || keynum == 87){
            //W
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'w.png">';
        }
        else if(keynum == 101 || keynum == 69){
            //E
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'e.png">';
        }
        else if(keynum == 114 || keynum == 82){
            //R
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'r.png">';
        }
        else if(keynum == 116 || keynum == 84){
            //T
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'t.png">';
        }
        else if(keynum == 121 || keynum == 89){
            //Y
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'y.png">';
        }
        else if(keynum == 117 || keynum == 85){
            //U
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'u.png">';
        }
        else if(keynum == 105 || keynum == 73){
            //I
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'i.png">';
        }
        else if(keynum == 111 || keynum == 79){
            //O
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'o.png">';
        }
        else if(keynum == 112 || keynum == 80){
            //P
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'p.png">';
        }
        else if(keynum == 97 || keynum == 65){
            //A
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'a.png">';
        }
        else if(keynum == 115 || keynum == 83){
            //S
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'s.png">';
        }
        else if(keynum == 100 || keynum == 68){
            //D
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'d.png">';
        }
        else if(keynum == 102 || keynum == 70){
            //F
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'f.png">';
        }
        else if(keynum == 103 || keynum == 71){
            //G
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'g.png">';
        }
        else if(keynum == 104 || keynum == 72){
            //H
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'h.png">';
        }
        else if(keynum == 106 || keynum == 74){
            //J
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'j.png">';
        }
        else if(keynum == 107 || keynum == 75){
            //K
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'k.png">';
        }
        else if(keynum == 108 || keynum == 76){
            //L
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'l.png">';
        }else if(keynum == 122 || keynum == 90){
            //Z
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'z.png">';
        }
        else if(keynum == 120 || keynum == 88){
            //X
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'x.png">';
        }
        else if(keynum == 99 || keynum == 67){
            //C
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'c.png">';
        }
        else if(keynum == 118 || keynum == 86){
            //V
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'v.png">';
        }
        else if(keynum == 98 || keynum == 66){
            //B
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'b.png">';
        }
        else if(keynum == 110 || keynum == 78){
            //N
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" height='+imageWidth+' src="'+fontImageDirectory+'n.png">';
        }
        else if(keynum == 109 || keynum == 77){
            //M
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width='+imageWidth+' src="'+fontImageDirectory+'m.png">';
        }
        else if(keynum == 32) {
            // space bar
            translatedTextWrapperElement.innerHTML += '<img class="trackedChar" width="30" src="'+fontImageDirectory+'default_space_block.png">';
        }
    }
}

var translator = new Translator();
translator.setFont('default');
translator.init();

