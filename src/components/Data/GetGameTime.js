function GetGameTime(frame, game_duration, last_frame){

    var seconds = ((frame*game_duration)/last_frame)
    var date = new Date(0);
    date.setSeconds(seconds); // specify value for SECONDS here
    var timeString = date.toISOString().substr(11, 8);
    return timeString

}

export {GetGameTime}