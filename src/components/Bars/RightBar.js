import React, {useEffect, useState} from "react"
import * as d3 from 'd3'
import {BarCircles} from "./BarPlayerInfo"
import {BarPlayerMetrics} from "./BarPlayerMetrics"
import {BarHeaderLabels} from "./BarHeaderLabels"


function RightBar({barDimensions, frame_player_data}){
    return (
        <svg width = {barDimensions.outerWidth} height = {barDimensions.outerHeight} className="rightBar">
            <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`}>
                <text style = {{fill: "Black", textAnchor: "middle", fontSize: 12}}>hi</text>
            </g>
        </svg>
    )
}

export {RightBar}