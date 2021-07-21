import { GetChampImageLinkFromId } from '../Data/GetChampImageLinkFromId'
import {GetSummonerNameFromId} from '../Data/GetSummonerNameFromId'

function BarPlayerInfo({game_data, champ_data, barDimensions, team_ids, team_lanes, team_y_values, xScale, yScale, team}){


    const dim = barDimensions.barComponentDimensions
    const text_padding = 10
    var image_dim = 50
    var border_dim = 55
    var image_padding = 2.5


    var color = null
    var x = null
    if (team == "Red"){
        color = "Red"
        x = dim.red_team_x
    }
    if (team == "Blue"){
        color = "Blue"
        x = dim.blue_team_x
    }


    

    const circles = team_y_values.map( (d,i) => (
    <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
        <text
        key = {color +"TeamBarPlayerInfoText" + team_lanes[i][0] + team_lanes[i][1]}
        x= {xScale(x)}
        y ={yScale(d)-text_padding}
        style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
        {GetSummonerNameFromId({game_data}, team_ids[i])}
        </text>
        <rect
        x = {xScale(x)}
        y = {yScale(d)}
        width={border_dim}
        height={border_dim}
        style = {{fill:color}}
        > 
        </rect>
        <image 
        className = "response"
        key = {color + "BlueTeamBarPlayerInfoImage" + team_lanes[i][0] + team_lanes[i][1]}
        href= {GetChampImageLinkFromId({game_data, champ_data}, team_ids[i])}
        width={image_dim} 
        height = {image_dim} 
        x={xScale(x)+image_padding} 
        y={yScale(d)+image_padding}>
        </image>
    </g>
    ))



    return <>{circles}</>
}

export {BarPlayerInfo}

