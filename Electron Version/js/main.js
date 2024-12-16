var animationCount = 5;
var currentCount = 0;
var isModalOpen = false;
var learnPageProgress = null;
var isTitleShowing = true;
var isListTitleShowing = false;
var sendObjectToTypeWriter = null;
//
function showModal(element){
    element.style.opacity = 0;
    element.style.display = "block";
   
    var animateIn = setInterval(function(){
        // Modal animation fade in
        if(currentCount!=animationCount){
            currentCount++;
            element.style.opacity = (0.2 * currentCount);
        } else {
            isModalOpen = true;
            currentCount = 0;
            clearInterval(animateIn);
        }
    }, 60);
}
function closeModal(element){
    var element = element.parentElement.parentElement.parentElement;
    var animateOut = setInterval(function(){
        // Modal close animation fade out
        if(isModalOpen == true){
            if(currentCount!=animationCount){
                currentCount++;
                element.style.opacity =(1/currentCount);
            }else {
                element.style.display = "none";
                element.style.opacity = 1;
                currentCount = 0;
                isModalOpen = false;
                element.querySelector(".modalMessages").innerHTML = "";
                if(element.querySelector("textarea") != null){
                    element.querySelector("textarea").value = "";
                    element.querySelector("textarea").style.height= "150px";
                }
                clearInterval(animateOut);
            }
        }
    }, 60);
}
function auto_grow(element){
    element.style.height = "5px";
    element.style.height = (element.scrollHeight) + "px";
}

function scrollToContent(element, listItem){
    // Place learn page progress last clicked in storage for later.
    learnPageProgress = [element, listItem];
    // Reset all the li and h3 title values in the navigation list
    resetLearnNavListItems();
    // After removing the old values highlight the selected.
    listItem.classList.add("learnNavBtnSelected");
    // Scroll the document to the appropriate position.
    $('html, body').animate({
        scrollTop: $(element).offset().top+-80
    }, 1500);
}

function resetLearnNavListItems(){
    var allListITems = document.querySelectorAll(".learningNavigation li");
    for(var i = 0; i<= allListITems.length-1; i++){
        allListITems[i].classList.remove("learnNavBtnSelected");
    }
    var allTitleListItems1 = document.querySelectorAll(".learningNavigation h3");
    for(var i = 0; i<= allTitleListItems1.length-1; i++){
        allTitleListItems1[i].classList.remove("learnNavBtnSelected");
    }
    var allTitleListItems2 = document.querySelectorAll(".learningNavigation h4");
    for(var i = 0; i<= allTitleListItems2.length-1; i++){
        allTitleListItems2[i].classList.remove("learnNavBtnSelected");
    }
}

function toggleTitle(){
    var collapseTitle = document.querySelector(".collapseTitle");
    if(isTitleShowing == true){
        collapseTitle.style.display = "none";
        isTitleShowing = false;
        isListTitleShowing = false;
    } else {
        collapseTitle.style.display = "block";
        isTitleShowing = true;
        isListTitleShowing = true;
    }
}

function toggleListTitle(){
    var collapseListTitle = document.querySelector(".collapseListTitle");
    if(isListTitleShowing == true){
        collapseListTitle.style.display = "none";
        isListTitleShowing = false
        isTitleShowing = false;
    } else {
        collapseListTitle.style.display = "block";
        isListTitleShowing = true;
        isTitleShowing = true;
    }
}
