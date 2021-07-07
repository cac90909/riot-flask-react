import React from "react"
import * as d3 from 'd3'

import {BarPlayerInfo} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"
import {BarPlayerScores} from "./BarPlayerScores"



function LeftBar({game_data, champ_data, frame, frame_list, barDimensions}){

    console.log("LeftBar.js is rendering")

    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, barDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([barDimensions.outerHeight, 0])


    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="leftBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <BarPlayerInfo game_data={game_data} champ_data ={champ_data} barDimensions={barDimensions} 
                xScale={xScale} yScale={yScale} className ="leftBarPlayerInfo"/>
                <BarPlayerMetrics game_data = {game_data} champ_data={champ_data} frame={frame} 
                frame_list={frame_list} barDimensions={barDimensions} xScale={xScale} yScale={yScale} 
                className ="leftBarPlayerMetrics"/>
                <BarPlayerScores game_data = {game_data} champ_data={champ_data} frame={frame} 
                frame_list={frame_list} barDimensions={barDimensions} xScale={xScale} yScale={yScale} 
                className ="leftBarPlayerScores"/>
            </g>
        </svg>
    
    )
    
}

export {LeftBar}