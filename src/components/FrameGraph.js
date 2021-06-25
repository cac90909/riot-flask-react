import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './Visual.css'
import {AxisBottom} from "./AxisBottom"
import {AxisLeft} from "./AxisLeft"
import {Circles} from "./Circles"
import {CirclesText} from "./CirclesText"

function FrameGraph({frame_pos_data}){
    console.log("Visual.js is rendering")
    console.log("frame_pos_data object in Visual.js", frame_pos_data)

    const w = 512
    const h = 512
    const margin = {top:0, right: 0, bottom: 0, left: 0}

    const width = w - margin.left - margin.right
    const height = h - margin.top - margin.bottom

    const xScale = d3.scaleLinear()
        .domain([0, 15000]) 
        .range([0, width])
    
    const yScale = d3.scaleLinear()
        .domain([0, 15000]) 
        .range([height, 0])


    return (
    <div>
        {/*Next, I need to create another svg rectangle that is going to display each character (5 circles) and relev information for each character at the given frame*/}
        <svg width = {w} height = {h} >
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisLeft yScale={yScale} width={width}/>
                <AxisBottom xScale={xScale} height={height}/>
                <Circles pos_data={frame_pos_data} xScale={xScale} yScale={yScale}/>
                <CirclesText pos_data={frame_pos_data} xScale={xScale} yScale={yScale}/>
            </g>
        </svg>
    </div>
    )
}

export {FrameGraph}