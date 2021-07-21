import React, {useState, useEffect} from 'react';

import {FrameGraph} from './Graph/FrameGraph'
import {GraphDimensions} from "./Graph/GraphDimensions"

import {LeftBar} from './Bars/LeftBar'
import {RightBar} from './Bars/RightBar'
import {BarDimensions} from "./Bars/BarDimensions"

import { EventLog } from "./Logs/EventLog"
import { AnalysisLog } from "./Logs/AnalysisLog"
import { LogDimensions} from "./Logs/LogDimensions"

import { GetFramePlayerPosition } from './Data/GetFramePlayerPosition.js';
import { GetFramePlayerMetrics } from './Data/GetFramePlayerMetrics';
import {GetNextIndex} from './Data/GetNextIndex'
import {GetPreviousIndex} from './Data/GetPreviousIndex'
import {GetGameTime} from './Data/GetGameTime'


function Game({game_data, champ_data, item_data, ss_data}) {
    console.log("Game.js is rendering")


    const game_data_timestamps_keys = Object.keys(game_data.Timestamps)
    var key = game_data_timestamps_keys[0] 


    const [frame_list, changeFrameList] = useState(game_data_timestamps_keys)
    const [frame, changeFrame] = useState(key)


    var frame_pos_data = GetFramePlayerPosition({game_data, frame})
    var frame_player_metrics = GetFramePlayerMetrics({game_data, frame})

    var last_frame = game_data.Events[game_data.Events.length-1].timestamp //duration is in seconds
    var game_duration = game_data.Summary.Game.gameDuration

    var frame_index = frame_list.indexOf(frame)
    var last_frame_index = frame_list.length - 1

    console.log("Current in game time:", GetGameTime(frame, game_duration, last_frame))
    
    return(
        <div>
            <div className="headerGameInfo">
                <p>Game: {game_data.Summary.Game.gameId}</p>
                <p>Frame: {frame_index + "/" + last_frame_index}</p>
                <p>Time: {GetGameTime(frame, game_duration, last_frame)} </p>
            </div>
            <div className="topHalf">
                <LeftBar game_data = {game_data} champ_data={champ_data} item_data={item_data} ss_data={ss_data} frame={frame} frame_list={frame_list} barDimensions={BarDimensions()}/>
                <FrameGraph game_data = {game_data} champ_data={champ_data} frame={frame} frame_list={frame_list} graphDimensions={GraphDimensions()} />
                <RightBar game_data = {game_data} champ_data={champ_data} item_data={item_data} ss_data={ss_data} frame={frame} frame_list={frame_list} barDimensions={BarDimensions()}/> 
            </div>
            <div className = "Buttons">
                <button id='prevFrame' onClick={() => changeFrame(GetPreviousIndex({frame, frame_list}))} style={{marginRight : 10}}>&lt;-- Frame</button>
                <button id='nextFrame' onClick={() => changeFrame(GetNextIndex({frame, frame_list})) } style={{marginLeft : 10}}>Frame --&gt;</button>
            </div>
            <div className="bottomHalf">
                <EventLog game_data={game_data} frame = {frame} frame_list={frame_list} dimensions={LogDimensions()}/>
                <AnalysisLog game_data={game_data} frame = {frame} frame_list={frame_list} dimensions={LogDimensions()}/>
            </div>
        </div>
    )
}

export {Game}


