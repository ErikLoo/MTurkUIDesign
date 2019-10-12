function setupCheckbox(ElenName){
       //click event for checkboxes
        ElenName.find(".Yes").on("click",function(){
            alert("Yes" +count)
            //uncheck No box
            ElenName.find(".No").attr("checked",false)
        });
}