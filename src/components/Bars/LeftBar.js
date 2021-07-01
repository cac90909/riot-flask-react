import React, {useEffect, useState} from "react"
import * as d3 from 'd3'

import {BarPlayerInfo} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"
import {BarHeaderLabels} from "./BarHeaderLabels"

import {GetPlayerInfo} from "../Data/GetPlayerInfo"


function LeftBar({barDimensions, game_data, champ_data}){

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
                <BarHeaderLabels barDimensions={barDimensions} xScale={xScale} yScale={yScale} className="leftBarHeaderLabels" />
                <BarPlayerInfo barDimensions={barDimensions} xScale={xScale} yScale={yScale} player_info={player_info_team_1} className ="leftBarPlayerInfo"/>
                <BarPlayerMetrics barDimensions={barDimensions} xScale={xScale} yScale={yScale} className ="leftBarPlayerMetrics"/>
            </g>
        </svg>
    
    )
    
}

export {LeftBar}