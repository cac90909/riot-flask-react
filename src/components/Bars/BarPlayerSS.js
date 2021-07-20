import { GetSSImageLinkFromId } from "../Data/GetSSImageLinkFromId"

function BarPlayerSS({game_data, champ_data, ss_data, barDimensions, team_ids, team_lanes, team_y_values, xScale, yScale, team}){

    const dim = barDimensions.barComponentDimensions
    const y_padding = [-10,30]
    const image_padding = 2
    
    var x_padding =  (team == "Blue") ? 135 : -135
    var x = (team == "Blue") ? dim.blue_team_x : dim.red_team_x

    const summoners = team_y_values.map((d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            <rect
            x = {xScale(x)+x_padding}
            y = {yScale(d) + y_padding[0]}
            width={31}
            height={31}
            style = {{fill:"grey"}}
            > 
            </rect>
            <rect
            x = {xScale(x)+x_padding}
            y = {yScale(d)+ y_padding[1]}
            width={31}
            height={31}
            style = {{fill:"grey"}}
            > 
            </rect>
            <image 
            key = {team +"TeamBarPlayerSSImage" + "Player" + team_lanes[i] + "SS1" }
            href= {GetSSImageLinkFromId({game_data, ss_data}, team_ids[i])[0]}
            width={27} 
            height = {27} 
            x={xScale(x)+x_padding + image_padding} 
            y={yScale(d)+ y_padding[0] + image_padding}>
            </image>
            <image 
            key = {team + "TeamBarPlayerSSImage" + "Player" + team_lanes[i] + "SS2"}
            href= {GetSSImageLinkFromId({game_data, ss_data}, team_ids[i])[1]}
            width={27} 
            height = {27} 
            x={xScale(x)+x_padding + image_padding} 
            y={yScale(d)+ y_padding[1] + image_padding}>
            </image>
        </g>
        )
    )

    return <>{summoners}</>
}

export {BarPlayerSS}