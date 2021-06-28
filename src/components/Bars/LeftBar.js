import React, {useEffect, useState} from "react"
import * as d3 from 'd3'
import {BarPlayerInfo} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"
import {BarHeaderLabels} from "./BarHeaderLabels"


function LeftBar({barDimensions, frame_player_data}){

    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, barDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([barDimensions.outerHeight, 0])



    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="leftBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <BarHeaderLabels barDimensions={barDimensions} xScale={xScale} yScale={yScale} className="leftBarHeaderLabels" />
                <BarPlayerInfo barDimensions={barDimensions} xScale={xScale} yScale={yScale} className ="leftBarCircles"/>
                <BarPlayerMetrics barDimensions={barDimensions} xScale={xScale} yScale={yScale} className ="leftBarPlayerMetrics"/>
            </g>
        </svg>
    
    )
    
}

export {LeftBar}