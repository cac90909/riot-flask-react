import {GetTeamFromId} from "./GetTeamFromId"

function GetRedTeamIds({game_data}){

    const ids = [1,2,3,4,5,6,7,8,9,10]
    var team_2_ids = []

    for (var id of ids){
        if( GetTeamFromId(game_data, id) == 200){
            team_2_ids.push(id)
        }
    }

    return team_2_ids
}

export {GetRedTeamIds}