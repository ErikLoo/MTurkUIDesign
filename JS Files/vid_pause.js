

// properties of vid 1
// default the pause timer to 300 secs
var pause_timer = 300;

var time_start_pause = 0; 
var time_start_play = 0;

var myTimer; 
var myCountUpTimer; 
var time_passed = 0;

var vid_1_pause_array = [6.07, 27.24, 32.01, 38.18, 44.4, 52.76, 67.73, 71.56, 75.93, 78.91, 84.55, 89.21, 107.85];
// var vid_1_duration_array = [4.1, 2.01, 3.51, 4.01, 4.8, 6.0, 5.95, 1.85, 3.7, 1.41, 4.95, 2.15, 5.44];
var vid_1_duration_array = [300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300, 300];

// properties of vid 2
var vid_2_pause_array = [14.61, 17.37, 28.87, 35.9, 44.47, 48.76, 52.09, 60.77, 63.29, 69.15, 82.04, 85.22, 104.4, 119.69, 125.55, 131.26, 147.12];
var vid_2_duration_array = [3.86, 1.42, 4.66, 3.23, 6.29, 3.65, 2.56, 1.38, 1.43, 5.16, 2.24, 1.66, 8.8, 4.34, 4.38, 2.83, 6.26];

var pause_array = vid_1_pause_array;
var duration_array = vid_1_duration_array;
// // If pause <=1
// var pause_array = [5.98, 11.46, 17.63, 24.05, 27.14, 31.92, 38.08, 44.3, 52.66, 60.99, 71.47, 78.81, 94.48, 107.75, 112.31, 115.93]

var thumb_array = [7,8,12,14,20,22,28,30,33,34,36,37,40,41,48,54,59,60];
var pause_index = 0
var n_frames=5; 
var old_f_num =0;
// var frame_array = [20,30,40];
//the vid pause is in ms
// puase duration will be calculated


// var paused_time = 0;
// time per frame in ms
var time_per_frame =0;

// console.log(time_per_frame)

var video = document.getElementById('vid1');
video.controls = true; 
var pause_dur = 1000;
var pause_on = true; 
// listen on the event
var count = 0
var during_puase = false; 
var pausing_function = function(){
    v_current_t = video.currentTime;
    // console.log(pause_on);
    if(Math.abs(v_current_t-old_f_num)>0.3 && isIn(v_current_t, pause_array) == true)
    {
        if (video.paused!=true && pause_on==true){
            video.pause();
            during_puase = true; 
            start_the_timer();
            vid_dur = video.duration;
            play_rate = 0.75;
            addition_t = (1/play_rate-1)*vid_dur;
            // pause_dur = addition_t/pause_array.length*1000;
            // console.log("pause_dur: " + pause_dur_t);
            total_dur = pause_array[pause_array.length-1] - pause_array[0];
            var end_time = pause_array[pause_index];
            var start_time = 0;
            if (pause_index!=0){
                start_time = pause_array[pause_index-1];
            }
            // pause the video proprotionally to the gap length
            // pause_dur = addition_t*(end_time-start_time)/total_dur*1000;
            pause_dur = duration_array[count]*1000
            // frame_array = generate_frame_array(start_time,end_time,n_frames);
            console.log("System pause at: " + video.currentTime + " for " + pause_dur/1000 + " seconds.");
            // remove the event listener after you paused the playback
            
            // update_src();    
            // showSnackBar();
    
            myTimer = setTimeout(function(){
                
            //     // if the pause button has been pressed do not proceed 
                if (intent_to_pause_during_thumb==false){
                    hideSnackBar();
                    // showSnackBar2();
                    // video.currentTime = video.currentTime;
                    console.log("System resume playing after pausing for " + pause_dur/1000 + "secs");
                    video.play();
                    during_puase = false; 
                    clearInterval(myCountUpTimer);
                }else{
                    console.log("System continue pausing");
                }
            }, pause_dur);
            // remove the listener if the pause array is finished

        }
    }
    pause_on = true; 

};
// call pausing fucntion when the timeupdate event has taken place
video.addEventListener("timeupdate", pausing_function);
// var text1 = video.addTextTrack("captions");
// text1.addCue(new TextTrackCue("Test text", 1.000, 4.000, "", "", "", true));
function  start_the_timer(){
    time_passed=0;
    var total_time = duration_array[count]; 
    myCountUpTimer = setInterval(function() {
        time_passed++; 
        if (intent_to_pause_during_thumb==false){
            $("#time_left").text("Resume playing in " + (total_time-time_passed).toString() +" secs"); 
        }
        showSnackBar();
        console.log("Time passed: " + time_passed + " s");

      }, 1000);
    
}

function update_src(){
    $("#snackbar").width($("#left").width());
    var thumbnails = $("#snackbar").find("img");
    var current_t = video.currentTime;
    var start_time = pause_array[pause_index-1];
    console.log("start t: " + start_time + "| current t: " + current_t);
    // var img_name = "thumbnails/7.JPG"
    var t_count = 0;

}

function isIn(number,array){
    // console.log(number)
    // return true if the current time is within 0.2 of the set value
    var range = 0.5
    var offset = 0.4
    for (i = 0; i < array.length; i++) {
        if (number>array[i]-offset && number<=array[i]+0.1){
            pause_index = i;
            old_f_num = number;
            count = i; 
            // video.currentTime = array[i]-0.2;
            return true;
        }
      }
    
    old_f_num = number;

    return false;
}

function getNextRewindTime(current_t,array){
    // console.log(number)
    // return the vid segment the current time is in
    var closest_pause = 0;
    var index = 0;
    for (i = 0; i < array.length; i++) {
        if (current_t-array[i]<0){
            if (i!=0){
                closest_pause = array[i-1];
                index = i-1
                break;
            }else{
                return 0; 
            }
        }
      }
    
      if (current_t - closest_pause >2){
        return closest_pause;
      }else{
        if (index==0){
            return 0;
        }
        return array[index-1];
      }
}

function generate_frame_array(start_t,end_t,n_frames){
    var duration = end_t-start_t;
    var time_space = duration/n_frames;
    var frame_array = []
    for (i=0;i<n_frames;i++){
        frame_array.push(start_t+i*time_space);
    }
    // console.log(start_t + "|" + end_t + "|" + n_frames);
    return frame_array;
}

function generate_frame_array_time_per_frame(start_t,end_t,time_per_frame){
    var duration = end_t-start_t;
    var frame_array = [];
    var n_frames = parseInt(duration/time_per_frame);
    for (i=0;i<n_frames;i++){
        frame_array.push(start_t+i*time_per_frame);
    }
    // console.log(start_t + "|" + end_t + "|" + n_frames);
    return frame_array;
}

var intent_to_pause_during_thumb = false; 

function rewind(){
    video = document.getElementById('vid1');
    c_time = video.currentTime;

    c_time_1 = getNextRewindTime(c_time,pause_array);
    c_time_2 = c_time - 5

    pause_on = false; 
    video.currentTime = Math.max(c_time_1,c_time_2); 

    // console.log(count);
    console.log("Rewinded to t = " +Math.max(c_time_1,c_time_2)+ " sec");
    // console.log("Rewind by 2 secs");

    // video.play();

}

function forward(){
    video = document.getElementById('vid1');
    c_time = video.currentTime;
    c_time = c_time + 2;
    if (c_time!=0){
        video.currentTime = c_time;
    }
    console.log("Forward by 2 secs");
}


function play(){
    // video = document.getElementById('vid1');
    // c_time = video.currentTime;
    // c_time = c_time + 2
    // if (c_time!=0){
    //     video.currentTime = c_time
    // }
    // console.log("Resume playing")
    intent_to_pause_during_thumb = false; 
    hideSnackBar();
    var x = document.getElementById("snackbar");

    // if (x.className == "show"){
    //     video.currentTime = video.currentTime + 0.5;

    // }
   
    // clearTimeout(myVar);
    if (during_puase){
        clearTimeout(myTimer);
        clearInterval(myCountUpTimer);
        duration_array[count] = time_passed; 
        console.log(time_passed + " s has passed");
        console.log("pause duration updated");
        during_puase = false; 
    }
    console.log('Resume playing');
     
    video.play ();
}

function pause(){
    video = document.getElementById('vid1');

    // var x = document.getElementById("snackbar");
    // x.className = "show";

    // if (video.paused){
    //     video.play()
    //     console.log("Resume playing")
    // }else{
    //     video.pause()
    // console.log("Paused by user")
    // }
    var x = document.getElementById("snackbar");
  if (video.paused){
    console.log("intent to pause during pause")
    intent_to_pause_during_thumb = true;
    $("#time_left").text("Manually paused"); 

  }else{
    intent_to_pause_during_thumb = false; 
  }

    video.pause();    
    clearTimeout(myTimer);
    
}    