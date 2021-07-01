import * as d3 from 'd3'
import "./ChampImage.css"

function BarPlayerInfo({barDimensions, xScale, yScale, player_info}){



    console.log("player_info inside of BarPlayerInfo:", player_info)

    const five_array = [0,200,400,600,800]

    const circles = player_info.map((d,i) => (
        <circle
        key={i}
        className = {d.ChampionName+"Circle"}
        r = {20}
        cx = {xScale(500)}
        cy = {yScale(five_array[i]+100)}
        style = {{fill:"blue"}}
        {...console.log("Current player info:", d)}
        >
        </circle>
        
    ))



    return <>{circles}</>
}

export {BarPlayerInfo}

