import { GetPlayerMetricsFromFrameAndId} from '../Data/GetPlayerMetricsFromFrameAndId'


function BarPlayerMetrics({game_data, team_ids, team_lanes, team_y_values, frame, barDimensions, xScale, yScale, team}){
    
    const current_frame = game_data.Timestamps[frame]

    const dim = barDimensions.barComponentDimensions
    const text_line_padding = 15 
    const text_block_padding = 30
    
    var x_padding = null
    var x = null
    if (team == "Blue"){
        x_padding = 65
        x = dim.blue_team_x
    }
    if (team == "Red"){
        x_padding = -65
        x = dim.red_team_x
    }

    const metrics = team_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            <text
            key = {team_ids[i] + "Level"}
            x= {xScale(x)+x_padding}
            y ={yScale(d  - text_block_padding)}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}> 
            {/*at some point, I want to team-color-code the metrics. Red team - red font. Blue team -  blue font*/}
            {"Level: " + GetPlayerMetricsFromFrameAndId(current_frame, team_ids[i]).level}
            </text>
            <text
            key = {d.ParticipantId + "CurrentGold"}
            x= {xScale(x)+x_padding}
            y ={yScale(d - text_block_padding)+text_line_padding}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"Gold: "+ GetPlayerMetricsFromFrameAndId(current_frame, team_ids[i]).currentGold}
            </text>
            <text
            key = {d.ParticipantId + "CS"}
            x= {xScale(x)+x_padding}
            y ={yScale(d - text_block_padding)+(text_line_padding*2)}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"CS: " + (GetPlayerMetricsFromFrameAndId(current_frame, team_ids[i]).minionsKilled + 
                       GetPlayerMetricsFromFrameAndId(current_frame, team_ids[i]).jungleMinionsKilled)}
            </text>
        </g>
    )


)
    return <>{metrics}</>
}

export {BarPlayerMetrics}