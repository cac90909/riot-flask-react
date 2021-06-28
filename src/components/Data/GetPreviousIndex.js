function GetPreviousIndex({frame, frame_list}){
    
    let currentIndex = frame_list.indexOf(frame)
        if (currentIndex === 0) {
            console.log("Going below array length. Cant do that")}
        else{
            var previousIndex = frame_list[currentIndex-1]
            console.log("Setting index to previousIndex:", previousIndex)
        }

    return previousIndex
}

export {GetPreviousIndex}