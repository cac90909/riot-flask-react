import React, {useState, useEffect} from 'react';
import {FrameGraph} from './Graph/FrameGraph'
import {LeftBar} from './Bars/LeftBar'
import {RightBar} from './Bars/RightBar'
import {GraphDimensions} from "./Graph/GraphDimensions"
import {BarDimensions} from "./Bars/BarDimensions"


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

    const graphDimensions = GraphDimensions()
    const barDimensions = BarDimensions()



    return(
        <div>
            <div className="topHalf">
                {/*Next, I need to create another svg rectangle that is going to display each character (5 circles) and relev information for each character at the given frame*/}
                <LeftBar barDimensions={barDimensions}/>
                <FrameGraph frame_pos_data={frame_pos_data} graphDimensions={graphDimensions} />
                <RightBar barDimensions={barDimensions}/> {/*Need to flesh out this indicator for to display the info that I am wanting*/}
            </div>
            <div className = "Buttons">
                <button id='prevFrame' onClick={() => previousKey()} style={{marginRight : 10}}>&lt;-- Frame</button>
                <button id='nextFrame' onClick={() => nextKey() } style={{marginLeft : 10}}>Frame --&gt;</button>
            </div>
        </div>
    )
}

export {Game}


