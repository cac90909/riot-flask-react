import * as d3 from 'd3'

function BarCircles({barDimensions, xScale, yScale}){

    const bar_circle_container_width = barDimensions.outerWidth/2
    const x_point = bar_circle_container_width/2
    
    const height_per_circle = barDimensions.outerHeight/5
    const first_y_point = barDimensions.outerHeight - (height_per_circle/2)

    const five_array = [0,200,400,600,800]

    console.log("TESTETESTSET", five_array)

    const circles = five_array.map((d,i) => (
        <circle
        key={i}
        r = {10}
        cx = {xScale(250)}
        cy = {yScale(d+100)}
        style = {{fill:"blue"}}
        >
        </circle>
    ))

    return <>{circles}</>
}

export {BarCircles}

