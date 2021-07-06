import {GetTeamFromId} from "./GetTeamFromId"

function GetBlueTeamIds({game_data}){

    const ids = [1,2,3,4,5,6,7,8,9,10]
    var team_1_ids = []

    for (var id of ids){
        if( GetTeamFromId(game_data, id) == 100){
            team_1_ids.push(id)
        }
    }

    return team_1_ids
}

export {GetBlueTeamIds}