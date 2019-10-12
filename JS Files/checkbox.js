function setupCheckbox(ElenName){
       //click event for checkboxes
        var count = 0; 
        ElenName.find(".Yes").on("click",function(){
            alert("Yes" +count)
        });
}