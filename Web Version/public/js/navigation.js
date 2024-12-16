document.addEventListener("DOMContentLoaded", function(e){
    var navigation = document.querySelectorAll('.navigation ul li');
    // var hash = window.location.hash;

    // Assign click event listeners to each button
    for(var i=0; i<=navigation.length-1; i++){
        navigation[i].addEventListener("click", function(event){
            navClickEvent(event);
        });
    }
    // Method that handles the button's click event
    function navClickEvent(e){
        var navLink = e.target.innerHTML.toLowerCase();
        window.location = ('/'+navLink);
    }

    // Handle hash tags for URL references
    // if(hash != ''){
    //     var top = document.getElementById(hash).offsetTop;
    //     window.scrollTo(0, top);
    // }

    var learnPageNavigation1 = document.querySelectorAll(".navigationShelf li h2");
    var learnPageNavigation2 = document.querySelectorAll(".navigationShelf li h3");
    var learnPageNavigation3 = document.querySelectorAll(".navList ul li ul li");

    for(var l = 0; l<=learnPageNavigation1.length-1; l++){
        learnPageNavigation1[l].addEventListener("click", function(event){
            handleVisitLearnPageContent(event);
        })
    }
    for(var m = 0; m<=learnPageNavigation2.length-1; m++){
        learnPageNavigation2[m].addEventListener("click", function(event){
            handleVisitLearnPageContent(event);
        })
    }
    for(var n = 0; n<=learnPageNavigation3.length-1; n++){
        learnPageNavigation3[n].addEventListener("click", function(event){
            handleVisitLearnPageContent(event);
        })
    }

    function handleVisitLearnPageContent(e){
        var navButtonText = e.target.innerHTML;
        console.log('you clicked: ', e.target.innerHTML);
        if(navButtonText == "Alphabet"){
            window.scrollTo(0, 0);
        } else if(navButtonText == "Font Formats:"){
            window.scrollTo(0, 188);
        } else if(navButtonText == "Traditional"){
            window.scrollTo(0, 288);
        } else if(navButtonText == "Default"){
            window.scrollTo(0, 446);
        } else if(navButtonText == "Download"){
            window.scrollTo(0, 892);
        } else if(navButtonText == "Download .zip file"){
            window.location = '/download';
        } else if(navButtonText == "Application Setup"){
            window.scrollTo(0, 1060);
        } else if(navButtonText == "Run the App"){
            window.scrollTo(0, 1159);
        } else if(navButtonText == "How To: Editor"){
            window.scrollTo(0, 1506);
        } else if(navButtonText == 'Change "index.html"'){
            window.scrollTo(0, 1680);
        } else if(navButtonText == "Editor's Features"){
            window.scrollTo(0, 2383);
        } else if(navButtonText == "Reading Modes"){
            window.scrollTo(0, 2522);
        } else if(navButtonText == "Text Alignment"){
            window.scrollTo(0, 2611);
        } else if(navButtonText == "Text Size"){
            window.scrollTo(0, 2670);
        } else if(navButtonText == "Font Formats"){
            window.scrollTo(0, 2740);
        } else if(navButtonText == "How To: Type Writer"){
            window.scrollTo(0, 3136);
        } else if(navButtonText == "Controls"){
            window.scrollTo(0, 3324);
        } else if(navButtonText == "Dark/Light"){
            window.scrollTo(0, 3423);
        } else if(navButtonText == "Text Alignment"){
            window.scrollTo(0, 3430)
        }else if(navButtonText == "Add Page"){
            window.scrollTo(0, 3485);
        } else if(navButtonText == "Remove Page"){
            window.scrollTo(0, 3547);
        } else if(navButtonText == "Save Page"){
            window.scrollTo(0, 3609)
        } else if(navButtonText == "Export Workspace"){
            window.scrollTo(0, 3671);
        } else if(navButtonText == "Import Workspace"){
            window.scrollTo(0, 3766);
        } else if(navButtonText == "Thank You!"){
            window.scrollTo(0, 4176);
        }
    }

    // Toggle learning dropdown menu
    var shelfControl = document.querySelector(".shelfControl");
    var navigationShelf = document.querySelector(".navigationShelf");
    var isLearningShelfOpen = true;
    shelfControl.addEventListener("click", function(e){
        if(isLearningShelfOpen == true){
            navigationShelf.style.display = "none";
            isLearningShelfOpen = false;
            this.style.background = "none";
        } else {
            navigationShelf.style.display = "block";
            isLearningShelfOpen = true;
            this.style.background = "white";
        }
    });
});