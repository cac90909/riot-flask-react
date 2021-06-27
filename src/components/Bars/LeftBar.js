import React, {useEffect, useState} from "react"
import * as d3 from 'd3'
import {BarCircles} from "./BarCircles"
import {BarPlayerInfo} from "./BarPlayerInfo"


function LeftBar({barDimensions}){

    const xScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([0, barDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 1000]) 
        .range([barDimensions.outerHeight, 0])


    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="leftBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <BarCircles barDimensions={barDimensions} xScale={xScale} yScale={yScale} className ="leftBarCircles"/>
                <BarPlayerInfo barDimensions={barDimensions} xScale={xScale} yScale={yScale} className ="leftBarPlayerInfo"/>
            </g>
        </svg>
    
    )
    
}

export {LeftBar}