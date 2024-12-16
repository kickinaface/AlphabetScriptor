var saveBtn = document.getElementById("saveBtn");
var getBtn = document.getElementById("getBtn");
//
saveBtn.addEventListener("click", function(e){
    alert("save to json");
    ManageStorage.saveData({"savedData":[{"title":"New Title"}]});
    console.log("data was saved");
});

getBtn.addEventListener("click", function(e){
    alert("get saved json");
    ManageStorage.readData().then(function(a){
        console.log(a);
    }).catch(function(e){
        console.log("There was an error.",e);
    })
});

