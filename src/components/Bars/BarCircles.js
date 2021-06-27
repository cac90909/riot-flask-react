import {BarDimensions} from "./BarDimensions"
import * as d3 from 'd3'

function BarCircles(){

    const bar_dimensions = BarDimensions()

    const height_per_circle = (bar_dimensions.outerHeight)/5
    //need to figure out a way to handle x and y coordinates for my circles. What are their coordinates lol? Jk. Just had an idea. I definetly do need a scale though. 

    console.log(bar_dimensions)

    

    const five_array = Array(5).fill(0)

    const circles = five_array.map((d,i) => (
        <circle
        key={i}
        >




        </circle>
    ))

    return <div>hi</div>
}

export {BarCircles}