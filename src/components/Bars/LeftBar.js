import React, {useEffect, useState} from "react"
import * as d3 from 'd3'

import {BarPlayerInfo} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"

import {GetPlayerInfo} from "../Data/GetPlayerInfo"
import { GetFramePlayerMetrics } from "../Data/GetFramePlayerMetrics"


function LeftBar({game_data, champ_data, frame, frame_list, barDimensions}){

    console.log("LeftBar.js is rendering")

    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, barDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([barDimensions.outerHeight, 0])

    
    var player_info = GetPlayerInfo({game_data, champ_data})
    var player_info_team_1 = player_info.splice(0,5)

    


    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="leftBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <BarPlayerInfo game_data={game_data} champ_data ={champ_data} barDimensions={barDimensions} xScale={xScale} yScale={yScale} className ="leftBarPlayerInfo"/>
                {/*<BarPlayerMetrics barDimensions={barDimensions} xScale={xScale} yScale={yScale} player_info = {player_info_team_1} frame_player_metrics={frame_player_metrics_team_1} className ="leftBarPlayerMetrics"/>*/}
            </g>
        </svg>
    
    )
    
}

export {LeftBar}