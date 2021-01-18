function setupCheckbox(){
        
    // get the current vid
    // video = document.getElementById('vid1');

    $(".v_100").prop("checked",true);
    $(".v_75").prop("checked",false);
    $(".v_50").prop("checked",false);


     $(".v_100").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        video = document.getElementById('vid1');

        $(".v_75").prop("checked",false);
        $(".v_50").prop("checked",false);

        if( $(".v_100").prop("checked")){
            video.playbackRate = 1.0;
            console.log("set playback to " + 1.0)

        }
        //show the slider
    });


    $(".v_75").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        video = document.getElementById('vid1');

        $(".v_100").prop("checked",false);
        $(".v_50").prop("checked",false);
        if( $(".v_75").prop("checked")){
            video.playbackRate = 0.75;
            console.log("set playback to " + 0.75)

        }
        //show the slider
    });

    $(".v_50").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        video = document.getElementById('vid1');

        $(".v_75").prop("checked",false);
        $(".v_100").prop("checked",false);
        if( $(".v_50").prop("checked")==true){
            video.playbackRate = 0.5;
            console.log("set playback to " + 0.5)
        }
        //show the slider
    });


    $(".pause_on").prop("checked",true);
    // by default set the pause to be on
    $(".pause_off").prop("checked",false);

     $(".pause_on").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
      if ($(".pause_on").prop("checked")){
        $(".pause_off").prop("checked",false);
        pause_control(true); 
    }else{
        $(".pause_off").prop("checked",true);
        // console.log("disable Pause");
        pause_control(false); 

      }

    });


    $(".pause_off").on("click",function(){
        // alert("Yes" +count)
        //uncheck No box
        if ($(".pause_off").prop("checked")){
            $(".pause_on").prop("checked",false);
            pause_control(false); 

          }else{
            $(".pause_on").prop("checked",true);
            pause_control(true); 

          }
    });

}