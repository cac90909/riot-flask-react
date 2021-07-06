import {GetLaneRoleFromId} from "./GetLaneRoleFromId"

function GetBlueTeamLaneRoles({game_data}, team_1_ids){

    const team_1_lane_roles = []
    for (var id of team_1_ids){
        team_1_lane_roles.push(GetLaneRoleFromId({game_data}, id))
    }

    return team_1_lane_roles
}

export {GetBlueTeamLaneRoles}