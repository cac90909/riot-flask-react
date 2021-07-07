import { GetBlueTeamLaneRoles } from '../Data/GetBlueTeamLaneRoles'
import { GetBlueTeamIds } from '../Data/GetBlueTeamIds'
import { GetBlueTeamYValuesFromLaneRoles } from "../Data/GetBlueTeamYValuesFromLaneRoles"
import { GetLaneRoleFromId } from '../Data/GetLaneRoleFromId'
import { GetTeamFromId } from '../Data/GetTeamFromId'
import { GetChampImageLinkFromId } from '../Data/GetChampImageLinkFromId'
import {GetSummonerNameFromId} from '../Data/GetSummonerNameFromId'
import { GetPlayerMetricsFromFrameAndId} from '../Data/GetPlayerMetricsFromFrameAndId'


function BarPlayerMetrics({game_data, champ_data, frame, frame_list, barDimensions, xScale, yScale}){
    
    const current_frame = game_data.Timestamps[frame]

    const dim = barDimensions.barPlayerInfoDimensions
    const text_line_padding = 15 
    const text_block_padding = 30

    const team_1_ids = GetBlueTeamIds({game_data})
    const team_1_lanes_roles = GetBlueTeamLaneRoles({game_data}, team_1_ids)
    const team_1_y_values = GetBlueTeamYValuesFromLaneRoles({game_data, barDimensions}, team_1_lanes_roles)

    const metrics = team_1_y_values.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
            <text
            key = {team_1_ids[i] + "Level"}
            x= {xScale(dim.x)+100}
            y ={yScale(d  - text_block_padding)}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"Level: " + GetPlayerMetricsFromFrameAndId(current_frame, team_1_ids[i]).level + "- - - - "
            + "Name: " + GetSummonerNameFromId({game_data}, team_1_ids[i])}
            </text>
            <text
            key = {d.ParticipantId + "CurrentGold"}
            x= {xScale(dim.x)+100}
            y ={yScale(d - text_block_padding)+text_line_padding}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"Current Gold: "+ GetPlayerMetricsFromFrameAndId(current_frame, team_1_ids[i]).currentGold}
            </text>
            <text
            key = {d.ParticipantId + "CS"}
            x= {xScale(dim.x)+100}
            y ={yScale(d - text_block_padding)+(text_line_padding*2)}
            style = {{fill: "Black", textAlign: "left", fontSize: 12}}>
            {"CS: " + (GetPlayerMetricsFromFrameAndId(current_frame, team_1_ids[i]).minionsKilled + 
                       GetPlayerMetricsFromFrameAndId(current_frame, team_1_ids[i]).jungleMinionsKilled)
                       + " - - - - "}
            {"id:" + GetPlayerMetricsFromFrameAndId(current_frame, team_1_ids[i]).participantId}
            </text>
        </g>
    )


)
    return <>{metrics}</>
}

export {BarPlayerMetrics}