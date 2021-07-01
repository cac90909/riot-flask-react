import React, {useState, useEffect} from 'react';

import {FrameGraph} from './Graph/FrameGraph'
import {GraphDimensions} from "./Graph/GraphDimensions"

import {LeftBar} from './Bars/LeftBar'
import {RightBar} from './Bars/RightBar'
import {BarDimensions} from "./Bars/BarDimensions"

import { GetFramePlayerPosition } from './Data/GetPlayerPos';
import { GetFramePlayerMetrics } from './Data/GetFramePlayerMetrics';
import {GetNextIndex} from './Data/GetNextIndex'
import {GetPreviousIndex} from './Data/GetPreviousIndex'


function Game({game_data, champ_data}) {
    console.log("Game.js is rendering")


    const game_data_timestamps_keys = Object.keys(game_data.Timestamps)
    var key = game_data_timestamps_keys[0] 


    console.log("Frame log here ->", game_data_timestamps_keys)

    const [frame_list, changeFrameList] = useState(game_data_timestamps_keys)
    const [frame, changeFrame] = useState(key)


    var frame_pos_data = GetFramePlayerPosition({game_data, frame})
    var frame_player_metrics = GetFramePlayerMetrics({game_data, frame})

    var last_frame = game_data.Events[game_data.Events.length-1].timestamp //duration is in seconds
    var game_duration = game_data.Summary.Game.gameDuration

    console.log("game_duration:", game_duration)

    var frames_per_second = last_frame/game_duration

    function GetTimeFromSeconds(frame, game_duration, last_frame){

        var seconds = ((frame*game_duration)/last_frame)
        var date = new Date(0);
        date.setSeconds(seconds); // specify value for SECONDS here
        var timeString = date.toISOString().substr(11, 8);
        return timeString

    }
    
    return(
        <div>
            <div className="currentFrame">
                <p>Frame: {frame}</p>
                <p>Time: {GetTimeFromSeconds(frame, game_duration, last_frame)} </p>
            </div>
            <div className="topHalf">
                <LeftBar barDimensions={BarDimensions()} game_data = {game_data} champ_data={champ_data} frame_player_metrics={frame_player_metrics}/>
                <FrameGraph frame_pos_data={frame_pos_data} graphDimensions={GraphDimensions()} />
                <RightBar barDimensions={BarDimensions()}/> 
            </div>
            <div className = "Buttons">
                <button id='prevFrame' onClick={() => changeFrame(GetPreviousIndex({frame, frame_list}))} style={{marginRight : 10}}>&lt;-- Frame</button>
                <button id='nextFrame' onClick={() => changeFrame(GetNextIndex({frame, frame_list})) } style={{marginLeft : 10}}>Frame --&gt;</button>
            </div>
        </div>
    )
}

export {Game}


