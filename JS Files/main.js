

var startTime;
var endTime;
var myVid;
var activity; 
var slider; 
var output; 

var beginTime; 
var endTime; 


function setAttribute(inputBox,myVid){
    inputBox[inputBox.length-1].setAttribute('value',myVid.currentTime);
}

function init(){
    startTime = document.getElementsByName("startTimeTag") //return an array of elements
    endTime = document.getElementsByName("endTimeTag"); //reutrn an array of elements
    myVid = document.getElementById("vid2"); //return a specific elements
    activity = document.getElementsByName("activityTag");
    slider = document.getElementById("myRange");
    output = document.getElementById("demo");

}

function clear(){
    activity[activity.length-1].value='';
    startTime[startTime.length-1].setAttribute('value',"Click on this box to set time");
    endTime[startTime.length-1].setAttribute('value',"Click on this box to set time");
}

function isValid(){
    var sTime = startTime[startTime.length-1].value;
    var eTime = endTime[endTime.length-1].value; 
    var activityName = activity[activity.length-1].value; 

    if(sTime==eTime){
        alert("Invalid entry:Please select a valid time");
        return false; 
    }

    if(parseFloat(sTime,10)>=parseFloat(eTime,10)){
        alert("Invalid entry:endTime less than starting time!");
        return false; 
    }

    if(activityName.length<3){
        alert("Invalid entry:activity name should not be empty!");
        return false;
    }

    return true; 

}
//alert user if activity is empty!!!
            
//alert user if startTime is more than End time!!!

function fooStart(event){
    setAttribute(startTime,myVid);
}

function fooEnd(event){
    setAttribute(endTime,myVid);
}

function setup(){

// alert("startTime.length: " + startTime.length);
init(); 

// slider.oninput = function() {
//     output.innerHTML = this.value;

//     var vidDuration = myVid.duration; 
//     var setStartTime = this.value/100*vidDuration;
//     myVid.currentTime = setStartTime; 

//     beginTime = setStartTime; 
//   }

if(startTime.length>1)
{
    startTime[startTime.length-1].addEventListener("click",fooStart);
    
    startTime[startTime.length-2].removeEventListener("click",fooStart);//remove the event listener for the previous elements

}else{
    // startTime[startTime.length-1].addEventListener("click",function(){setAttribute(startTime,myVid);});
    startTime[startTime.length-1].addEventListener("click",fooStart);

}

if(endTime.length>1){
    endTime[endTime.length-1].addEventListener("click", fooEnd);

    endTime[endTime.length-2].removeEventListener("click",fooEnd); //remove the event listener for the previous elements

}else{
    endTime[endTime.length-1].addEventListener("click",fooEnd);
}
}

setup(); 