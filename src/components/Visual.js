import React, {useEffect, useRef} from 'react'
import * as d3 from 'd3'
import './Visual.css'
import {AxisBottom} from "./AxisBottom"
import {AxisLeft} from "./AxisLeft"

function Visual({pos_data}){
    console.log("Visual.js is rendering")
    console.log("pos_data object in Visual.js", pos_data)

    const w = 512
    const h = 512
    const margin = {top:0, right: 0, bottom: 0, left: 0}

    const width = w - margin.left - margin.right
    const height = h - margin.top - margin.bottom

    //console.log("x values in Visual.js", pos_data_x)
    //console.log("y values in Visual.js", pos_data_y)

    const xScale = d3.scaleLinear()
        .domain(d3.extent(pos_data, d => d.x))
        .range([0, width])
    
    const yScale = d3.scaleLinear()
        .domain(d3.extent(pos_data, d => d.y))
        .range([height, 0])

    const circles = pos_data.map((d,i) =>(
        <circle
            key = {i}
            r = {5}
            cx = {xScale(d.x)}
            cy = {yScale(d.y)}
            style = {{fill: "lightblue"}}
        />
        )
    )
    
    //link for the artice detailing this scatterplot: https://dev.to/julienassouline/let-s-get-started-with-react-and-d3-2nd7

    return (
    <div>
        <svg width = {w} height = {h} >
            <g transform={`translate(${margin.left},${margin.top})`}>
                <AxisLeft yScale={yScale} width={width}/>
                <AxisBottom xScale={xScale} height={height}/>
                {circles}
            </g>
        </svg>
    </div>
    )
}

export {Visual}