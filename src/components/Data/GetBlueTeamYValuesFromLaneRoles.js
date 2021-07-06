function GetBlueTeamYValuesFromLaneRoles({game_data, barDimensions}, team_1_lanes_roles){

    const positions = ["TOP", "JUNGLE", "MIDDLE", "BOTTOM", "BOTTOM"]
    const roles = ["SOLO", "NONE", "SOLO", "DUO_CARRY", "DUO_SUPPORT"]

    const dim = barDimensions.barPlayerInfoDimensions.y_array

    const y_values = []

    for (var pos of team_1_lanes_roles){
        for(let i=0; i<5; i++){
            if(pos[0] == positions[i] && pos[1] == roles[i]){
                y_values.push(dim[i])
            }
        }
    }

    return y_values

}

export {GetBlueTeamYValuesFromLaneRoles}