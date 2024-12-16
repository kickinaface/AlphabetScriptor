function AlphabetScriptor(){
    var numNodes = 0;
    var readerWrappers;
    var that = this;
    var savedReaderWrappers = [];
    that.pathEdit = '';
    that.imageWidth = 17; // 40
    that.fontType = 'default' //'traditional';

    this.init = function init(){
        document.addEventListener('DOMContentLoaded', function (e){
            //console.log('editors main')
            // Get all the readerWrapper classes to be translated.
            readerWrappers = document.querySelectorAll('.readerWrapper');
            // Number of (.readerWrapper) nodes
            numNodes = readerWrappers.length-1;
            // Loop through each node in the nodelist and build the symbols out for each node.
            for(var r = 0; r<=numNodes; r++){
                savedReaderWrappers.push(readerWrappers[r]);
                buildTextEachNode(readerWrappers[r], r);
            }
        });
    };

    this.updateFontSize = function updateFontSize(newSize){
        var translationWrapper = document.querySelector('.translationWrapper');
        //      
        translationWrapper.innerHTML = '';
        document.querySelector('.loading').style.display = 'block';
        that.imageWidth = newSize;
        //
        setTimeout(function(){
            for(var r = 0; r<=numNodes; r++){
                buildTextEachNode(savedReaderWrappers[r], r);
            }
        },50)
    };

    function buildTextEachNode(readerWrapper, currentNode){
        //Get the textual value of the entire current node.
        var readerWrapperText = String(readerWrapper.textContent);
        //Get the wrapper div to append the stored HTML content string later.
        var translationWrapper = document.querySelector('.translationWrapper');
        // Each time, set new text to be added to current node
        var storedPreLoadedText = '';
        //console.log('rendering node: ', currentNode);
        //Loop through text and replace each character for the symbol but include custom images
        for(var t = 0; t<=readerWrapperText.length-1; t++){
            if(readerWrapper.innerHTML.includes('<img ') == true){
                //Add specific image in the document.
                storedPreLoadedText+=readerWrapper.innerHTML;
                break;
            }else if(readerWrapper.innerHTML.includes('<a href') == true){
                // Add specific link to document
                storedPreLoadedText+="<a href="+readerWrapper.querySelector('a').href+">";
                storedPreLoadedText += convertTextToImage(readerWrapperText[t]);
                storedPreLoadedText+="</a>";
            } else {
                // Use the convert function to add/build images to string for later appending.
                storedPreLoadedText += convertTextToImage(readerWrapperText[t]);
            }
        }
        // Add extra space between nodes
        storedPreLoadedText += "</br></br></br>";
        //Add the stored text from the looping function into the document wrapper div
        translationWrapper.innerHTML += storedPreLoadedText;
        // When done, remove the node
        readerWrappers[currentNode].remove();
        // When compelte remove loader message and output to the user.
        if(currentNode == numNodes){
            //console.log('rendering compelte');
            document.querySelector('.loading').style.display = 'none';
        }
    }

    function convertTextToImage(letter){
        // Adjust image witdh and height with this vaiable
        var imageWidth = that.imageWidth;
        // Define font path for symbols to be loaded, could use other fonts
        // Passages folder needs specific path (../) because it decends into the application
        var fontPath = (that.pathEdit)+'js/fonts/'+(that.fontType)+'/';
        return toggleFontType(that.fontType, fontPath, letter, imageWidth);
        // Check each letter and return the symbol back for later storing.
    };

    function toggleFontType(font, fontPath, letter, imageWidth){
        if(font == 'default'){
             // Check each letter and return the symbol back for later storing.
            if(letter == "a" || letter == "A"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"a.png width="+imageWidth+"/>";
            } else if(letter == "b" || letter =="B"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"b.png height="+imageWidth+"/>";
            } else if(letter == "c" || letter == "C"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"c.png height="+imageWidth+"/>";
            } else if(letter == "d" || letter == "D"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"d.png height="+imageWidth+"/>";
            } else if(letter == "e" || letter == "E"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"e.png height="+imageWidth+"/>";
            } else if(letter == "f" || letter == "F"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"f.png height="+imageWidth+"/>";
            } else if(letter == "g" || letter == "G"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"g.png height="+imageWidth+"/>";
            } else if(letter == "h" || letter == "H"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"h.png height="+imageWidth+"/>";
            } else if(letter == "i" || letter == "I"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"i.png height="+imageWidth+"/>";
            } else if(letter == "j" || letter == "J"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"j.png height="+imageWidth+"/>";
            } else if(letter == "k" || letter == "K"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"k.png height="+imageWidth+"/>";
            } else if(letter == "l" || letter == "L"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"l.png height="+imageWidth+"/>";
            } else if(letter == "m" || letter == "M"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"m.png height="+imageWidth+"/>";
            } else if(letter == "n" || letter == "N"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"n.png height="+imageWidth+"/>";
            } else if(letter == "o" || letter == "O"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"o.png height="+imageWidth+"/>";
            } else if(letter == "p" || letter == "P"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"p.png width="+imageWidth+"/>";
            } else if(letter == "q" || letter == "Q"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"q.png width="+imageWidth+"/>";
            } else if(letter == "r" || letter == "R"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"r.png height="+imageWidth+"/>";
            } else if(letter == "s" || letter == "S"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"s.png height="+imageWidth+"/>";
            } else if(letter == "t" || letter == "T"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"t.png height="+imageWidth+"/>";
            } else if(letter == "u" || letter == "U"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"u.png height="+imageWidth+"/>";
            } else if(letter == "v" || letter == "V"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"v.png height="+imageWidth+"/>";
            } else if(letter == "w" || letter == "W"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"w.png height="+imageWidth+"/>";
            } else if(letter == "x" || letter == "X"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"x.png width="+imageWidth+"/>";
            } else if(letter == "y" || letter == "Y"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"y.png width="+imageWidth+"/>";
            } else if(letter == "z" || letter == "Z"){
                return "<img loading='lazy' class='textImage' src="+fontPath+"z.png width="+imageWidth+"/>";
            } else if(letter == " " || letter == " "){
                return "<img loading='lazy' class='textImage' src="+fontPath+"default_space_block.png width="+imageWidth+"/>";
            } else{
                return "";
            }
        } else if(font == "traditional"){
            if(letter == "a" || letter == "A"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"a.png />";
            } else if(letter == "b" || letter =="B"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"b.png />";
            } else if(letter == "c" || letter == "C"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"c.png />";
            } else if(letter == "d" || letter == "D"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"d.png />";
            } else if(letter == "e" || letter == "E"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"e.png />";
            } else if(letter == "f" || letter == "F"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"f.png />";
            } else if(letter == "g" || letter == "G"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"g.png />";
            } else if(letter == "h" || letter == "H"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"h.png />";
            } else if(letter == "i" || letter == "I"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"i.png />";
            } else if(letter == "j" || letter == "J"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"j.png />";
            } else if(letter == "k" || letter == "K"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"k.png />";
            } else if(letter == "l" || letter == "L"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"l.png />";
            } else if(letter == "m" || letter == "M"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"m.png />";
            } else if(letter == "n" || letter == "N"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"n.png />";
            } else if(letter == "o" || letter == "O"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"o.png />";
            } else if(letter == "p" || letter == "P"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"p.png />";
            } else if(letter == "q" || letter == "Q"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"q.png />";
            } else if(letter == "r" || letter == "R"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"r.png />";
            } else if(letter == "s" || letter == "S"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"s.png />";
            } else if(letter == "t" || letter == "T"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"t.png />";
            } else if(letter == "u" || letter == "U"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"u.png />";
            } else if(letter == "v" || letter == "V"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"v.png />";
            } else if(letter == "w" || letter == "W"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"w.png />";
            } else if(letter == "x" || letter == "X"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"x.png />";
            } else if(letter == "y" || letter == "Y"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"y.png />";
            } else if(letter == "z" || letter == "Z"){
                return "<img loading='lazy' class='textImage' style='height:"+(imageWidth)+"px;' src="+fontPath+"z.png />";
            } else if(letter == " " || letter == " "){
                return "<img loading='lazy' class='textImage' style='width:"+(imageWidth-15)+"px;' src="+fontPath+"default_space_block.png />";
            } else{
                return "";
            }
        }
    };
}

var alphabetScriptor = new AlphabetScriptor();
alphabetScriptor.init();
