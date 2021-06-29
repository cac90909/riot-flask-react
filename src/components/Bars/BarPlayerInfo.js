import * as d3 from 'd3'

function BarPlayerInfo({barDimensions, xScale, yScale, player_info}){


    //I think I can use BarCircles and other bar js files for both the left and right bar. I think I would just need to pass them seperate scales that would essentially "mirror" each other's layouts

    const five_array = [0,200,400,600,800]

    const circles = five_array.map((d,i) => (
        <circle
        key={i}
        r = {20}
        cx = {xScale(500)}
        cy = {yScale(d+100)}
        style = {{fill:"blue"}}
        >
        </circle>
    ))

    return <>{circles}</>
}

export {BarPlayerInfo}

