import React, {useState, useEffect} from 'react';

import {FrameGraph} from './Graph/FrameGraph'
import {GraphDimensions} from "./Graph/GraphDimensions"

import {LeftBar} from './Bars/LeftBar'
import {RightBar} from './Bars/RightBar'
import {BarDimensions} from "./Bars/BarDimensions"

import { GetPlayerPos } from './Data/GetPlayerPos';
import {GetNextIndex} from './Data/GetNextIndex'
import {GetPreviousIndex} from './Data/GetPreviousIndex'


function Game({game_data, champ_data}) {
    console.log("Game.js is rendering")


    const game_data_timestamps_keys = Object.keys(game_data.Timestamps)
    var key = game_data_timestamps_keys[0] 

    const [frame_list, changeFrameList] = useState(game_data_timestamps_keys)
    const [frame, changeFrame] = useState(key)


    var frame_pos_data = GetPlayerPos({game_data, frame})
    var frame_player_data = 12

    return(
        <div>
            <div className="topHalf">
                <LeftBar barDimensions={BarDimensions()} game_data = {game_data} champ_data={champ_data}/> {/*trying to figure out what should be passed to left bar vs just created/called in left bar */}
                <FrameGraph frame_pos_data={frame_pos_data} graphDimensions={GraphDimensions()} />
                <RightBar barDimensions={BarDimensions()} frame_player_data={frame_player_data}/> {/*Need to flesh out this indicator for to display the info that I am wanting*/}
            </div>
            <div className = "Buttons">
                <button id='prevFrame' onClick={() => changeFrame(GetPreviousIndex({frame, frame_list}))} style={{marginRight : 10}}>&lt;-- Frame</button>
                <button id='nextFrame' onClick={() => changeFrame(GetNextIndex({frame, frame_list})) } style={{marginLeft : 10}}>Frame --&gt;</button>
            </div>
        </div>
    )
}

export {Game}


