import React, {useEffect, useState} from "react"
import * as d3 from 'd3'
import {BarCircles} from "./BarCircles"


function LeftBar({barDimensions}){
    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="leftBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <BarCircles/>
                <text style = {{fill: "Black", textAnchor: "middle", fontSize: 12}}>hi </text>
            </g>
        </svg>
    
    )
    
}

export {LeftBar}