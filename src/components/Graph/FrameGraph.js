import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import '../Visual.css'
import {AxisBottom} from "./AxisBottom"
import {AxisLeft} from "./AxisLeft"
import {MapCircles} from "./MapCircles"
import {MapCirclesText} from "./MapCirclesText"

function FrameGraph({frame_pos_data, graphDimensions}){
    console.log("A new FrameGraph is rendering from components/Graph/FrameGraph.js")


    const xScale = d3.scaleLinear()
        .domain([0, 15000]) 
        .range([0, graphDimensions.outerWidth])
    
    const yScale = d3.scaleLinear()
        .domain([0, 15000]) 
        .range([graphDimensions.outerHeight, 0])


    return (
        <svg width = {graphDimensions.outerWidth} height = {graphDimensions.outerHeight} className="positionGraph" >
            <g transform={`translate(${graphDimensions.margins.left},${graphDimensions.margins.top})`}>
                <AxisLeft yScale={yScale} width={graphDimensions.innerWidth}/>
                <AxisBottom xScale={xScale} height={graphDimensions.innerHeight}/>
                <MapCircles pos_data={frame_pos_data} xScale={xScale} yScale={yScale}/>
                <MapCirclesText pos_data={frame_pos_data} xScale={xScale} yScale={yScale}/>
            </g>
        </svg>
    )
}

export {FrameGraph}