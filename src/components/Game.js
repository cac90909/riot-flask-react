import React, {useState, useEffect} from 'react';
import {FrameGraph} from './FrameGraph'


function Game({game_data}) {
    console.log("Game.js is rendering")


    const game_data_timestamps_keys = Object.keys(game_data.Timestamps)
    var key = game_data_timestamps_keys[0] 

    const [frame_list, changeFrameList] = useState(game_data_timestamps_keys)
    const [frame, changeFrame] = useState(key)


    function nextKey(){
        let currentIndex = frame_list.indexOf(frame)
        if (currentIndex === frame_list.length) {
            console.log("Going above array length. Can't do that")}
       else {
            let nextIndex = frame_list[currentIndex+1]
            console.log("Setting index to nextIndex:", nextIndex)
            changeFrame(nextIndex)
       }
    }

    function previousKey(){
        let currentIndex = frame_list.indexOf(frame)
        if (currentIndex === 0) {
            console.log("Going below array length. Cant do that")}
        else{
            let previousIndex = frame_list[currentIndex-1]
            console.log("Setting index to previousIndex:", previousIndex)
            changeFrame(previousIndex)
        }
    }

    var timestamp_data = game_data.Timestamps[frame]
    var frame_pos_data = []
    
    for (var player in timestamp_data){ 
        let player_pos_info = timestamp_data[player].position
        frame_pos_data.push(player_pos_info)        
    }



    return(
        <div>
            <p>Title</p>
            <FrameGraph frame_pos_data={frame_pos_data}/>
            <button id='prevFrame' onClick={() => previousKey()} style={{marginRight : 10}}>&lt;-- Frame</button>
            <button id='nextFrame' onClick={() => nextKey() } style={{marginLeft : 10}}>Frame --&gt;</button>
        </div>
    )
}

export {Game}


