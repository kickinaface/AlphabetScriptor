document.addEventListener("DOMContentLoaded", function(e){
    var contentWrappers = document.getElementsByClassName("contentWrapper");
    //
    function transformTextToImages(){
        for(var i =0; i<= contentWrappers.length-1; i++){
            var contentWrapper = contentWrappers[i];
            var charactersInElement = contentWrappers[i].innerHTML.trim();
            var totalCharactersInElement = contentWrappers[i].innerHTML.length;
            var fontSize = contentWrapper.dataset.size;
            var font = contentWrapper.dataset.font;
            contentWrapper.style.fontSize = fontSize+"px";
            contentWrapper.innerHTML = renderFontImages(charactersInElement, totalCharactersInElement, font, fontSize);
        }
        function renderFontImages(charactersInElement, totalCharacters, font, fontSize){
            var outputString = "";
            if(!font || !fontSize){
                outputString = "<span style='color:red;'>You must define a font and font size.</span>";
            } else {
                for(var i = 0; i <= totalCharacters-1; i++){
                    var fontPath;
                    if(font == "traditional"){
                        fontPath = "./images/traditional/";
                    } else {
                        fontPath = "./images/default/";
                    }
                    outputString += renderLetter(font, fontPath, charactersInElement[i], fontSize);
                }
            }
            return outputString;
        }
    }
    transformTextToImages();
});

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
        } else if(letter == " " || letter == " "){
            return "&nbsp;&nbsp; ";
        } else{
            return "";
        }
    }
};