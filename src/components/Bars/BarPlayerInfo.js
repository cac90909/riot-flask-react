import * as d3 from 'd3'
import "./ChampImage.css"

function BarPlayerInfo({barDimensions, xScale, yScale, player_info}){

    const positions = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "BOTTOM"]
    const roles = ["SOLO", "NONE", "SOLO", "DUO_CARRY", "DUO_SUPPORT"]

    function GetChampImageLinkAtPositionX(position, role, player_info){
        for (var player in player_info){
            if (player_info[player].Lane == position && player_info[player].Role == role){
                return player_info[player].ImageLink
            }
        }
    }

    const dim = barDimensions.barPlayerInfoDimensions

    const circles = positions.map((pos,i) => (
    <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
        <rect
        x = {xScale(dim.x)}
        y = {yScale(dim.y_array[i])}
        width={dim.border_w}
        height={dim.border_h}
        style = {{fill:"blue"}}
        > 
        </rect>
        <image 
        key = {player_info[i].ParticipantId}
        href= {GetChampImageLinkAtPositionX(pos, roles[i], player_info)}
        width={dim.image_w} 
        height = {dim.image_h} 
        x={xScale(dim.x)+dim.image_padding} 
        y={yScale(dim.y_array[i])+dim.image_padding}>
        </image>
    </g>
    ))



    return <>{circles}</>
}

export {BarPlayerInfo}

