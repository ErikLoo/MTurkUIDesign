function setupCheckbox(ElenName){
       //click event for checkboxes
        //initialize the value
        ElenName.find(".No").eq(0).prop("checked",false);
        ElenName.find(".Yes").eq(0).prop("checked",false);

        ElenName.find(".aria-widget-slider").eq(1).hide(); 
        //the slider is by default hidden

        ElenName.find(".Yes").on("click",function(){
            // alert("Yes" +count)
            //uncheck No box
            ElenName.find(".No").eq(0).prop("checked",false);
            //show the slider
            ElenName.find(".aria-widget-slider").eq(1).slideDown(300)
        });

        ElenName.find(".No").on("click",function(){
            // alert("No" +count)
            //uncheck No box
            ElenName.find(".Yes").eq(0).prop("checked",false);
            //hide the slider
            ElenName.find(".aria-widget-slider").eq(1).slideUp(300)
        });
}