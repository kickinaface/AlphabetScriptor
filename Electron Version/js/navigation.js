function Navigation(){
    var navLinks;
    var animationCount = 5;
    var currentCount = 0;
    var windowIsLoaded = false;
    this.init = function(){
        buildNavigation();
    }

    function buildNavigation(){
        navLinks = document.querySelectorAll(".navigation ul li");
        navLinks.forEach(function(element, i){
            element.addEventListener("click", function(e){
                var navLink = e.target.innerHTML;
                //Hide all content first then display the clicked one.
                hideAllContent();
                if(navLink == "HOME"){
                    animateWindowContent(document.querySelector(".homePage"));
                    resetLearnNavListItems();
                    window.scrollTo(0,0);
                    var redirectToTypeWriter = sessionStorage.getItem("redirectToTypeWriter");
                    if(redirectToTypeWriter == "true"){
                        setTimeout(function(){
                            navLinks[3].click();
                            sessionStorage.removeItem("redirectToTypeWriter");
                            setTimeout(function(){
                                    $("html, body").animate({ scrollTop: $(document).height()-$(window).height() });
                            },500);
                        },500);
                    }
                }else if(navLink == "LEARN"){
                    animateWindowContent(document.querySelector(".learnPage"));
                    resetLearnNavListItems();
                    if(learnPageProgress != null){
                        learnPageProgress[1].click();
                    } 
                } else if(navLink == "LIST"){
                    // If already using editor, dont animate the page in, allow blocks to load.
                    var redirectToEditor = sessionStorage.getItem("redirectToEditor");
                    if(redirectToEditor == "true"){
                        document.querySelector(".editorPage").style.opacity = 1;
                        document.querySelector(".editorPage").style.display = "block";
                    } else {
                        animateWindowContent(document.querySelector(".editorPage"));
                    }
                } else if(navLink == "TYPE WRITER"){
                    typeWriter.init();
                    animateWindowContent(document.querySelector(".typeWriterPage"));
                    
                } else if(navLink == "RESET"){
                    sessionStorage.setItem("redirectToTypeWriter", true);
                    window.location.reload();
                    
                }
                hideAllHighlightedLinks();
                // Style the clicked link
                // e.target.style.textDecoration="underline"; 
                e.target.style.fontWeight="bold";
                e.target.style.backgroundColor="white";
                e.target.style.color="black";
            });
        });
        // Click home page on first start
        navLinks[0].click();
    }

    this.showReleaseNotes = function showReleaseNotes(){
        hideAllContent();
        animateWindowContent(document.querySelector(".releaseNotesPage"));
    }

    function hideAllContent(){
        var contentGroups = document.querySelectorAll(".contentGroup");
        contentGroups.forEach(function(e, i){
            e.style.display ="none";
        });
    }

    function hideAllHighlightedLinks(){
        navLinks.forEach(function(e, i){
            // e.style.textDecoration="none"; 
            e.style.fontWeight="normal";
            e.style.background="black";
            e.style.color="white";
        });
    }

    function animateWindowContent(element){
        element.style.opacity = 0;
        element.style.display = "block";
        var animateIn = setInterval(function(){
            // Modal animation fade in
            if(currentCount!=animationCount){
                currentCount++;
                element.style.opacity = (0.2 * currentCount);
            } else {
                windowIsLoaded = true;
                currentCount = 0;
                clearInterval(animateIn);
            }
        }, 60);
    }
}

var navigation = new Navigation();

document.addEventListener("DOMContentLoaded", function(e){
    navigation.init();
});