function GetTeamYValuesFromLanes({game_data, barDimensions}, team_lanes){

    const positions = ["TOP", "JUNGLE", "MIDDLE", "ADC", "SUPPORT"]

    const dim = barDimensions.barComponentDimensions.y_array


    const y_values = []

    for (var pos of team_lanes){
        for(let i=0; i<5; i++){
            if(pos == positions[i]){
                y_values.push(dim[i])
            }
        }
    }

    return y_values

}

export {GetTeamYValuesFromLanes}