function setupCheckbox(){
        
    // get the current vid
    video = document.getElementById('vid1');

    $(".v_100").prop("checked",false);
    $(".v_75").prop("checked",false);
    $(".v_50").prop("checked",false);


     $(".v_100").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        $(".v_75").prop("checked",false);
        $(".v_50").prop("checked",false);
        video.playbackRate = 1.0;
        //show the slider
    });


    $(".v_75").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        $(".v_100").prop("checked",false);
        $(".v_50").prop("checked",false);
        video.playbackRate = 0.75;

        //show the slider
    });

    $(".v_50").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        $(".v_75").prop("checked",false);
        $(".v_100").prop("checked",false);
        video.playbackRate = 0.5;

        //show the slider
    });

}