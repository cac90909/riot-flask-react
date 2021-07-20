import { GetChampImageLinkFromId } from '../Data/GetChampImageLinkFromId'
import {GetSummonerNameFromId} from '../Data/GetSummonerNameFromId'

function BarPlayerInfo({game_data, champ_data, barDimensions, team_1_ids, team_1_lanes_roles, team_1_y_values, xScale, yScale}){


    const dim = barDimensions.barPlayerInfoDimensions
    const text_padding = 10

    const circles = team_1_y_values.map((pos,i) => (
    <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
        <text
        key = {"BlueTeamBarPlayerInfoText" + team_1_lanes_roles[i][0] + team_1_lanes_roles[i][1]}
        x= {xScale(dim.x)}
        y ={yScale(pos)-text_padding}
        style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
        {GetSummonerNameFromId({game_data}, team_1_ids[i])}
        </text>
        <rect
        x = {xScale(dim.x)}
        y = {yScale(pos)}
        width={dim.border_w}
        height={dim.border_h}
        style = {{fill:"blue"}}
        > 
        </rect>
        <image 
        key = {"BlueTeamBarPlayerInfoImage" + team_1_lanes_roles[i][0] + team_1_lanes_roles[i][1]}
        href= {GetChampImageLinkFromId({game_data, champ_data}, team_1_ids[i])}
        width={dim.image_w} 
        height = {dim.image_h} 
        x={xScale(dim.x)+dim.image_padding} 
        y={yScale(pos)+dim.image_padding}>
        </image>
    </g>
    ))



    return <>{circles}</>
}

export {BarPlayerInfo}

