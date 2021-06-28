function GetNextIndex({frame, frame_list}){

    let currentIndex = frame_list.indexOf(frame)
    if (currentIndex === frame_list.length) {
        console.log("Going above array length. Can't do that")}
    else {
        var nextIndex = frame_list[currentIndex+1]
        console.log("Setting index to nextIndex:", nextIndex)
    }

    return nextIndex
    
}
export {GetNextIndex}