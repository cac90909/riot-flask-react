function GetPlayerScoreFromId({game_data}, frame_num, participant_id){

    function HasHappend(event){
        if (event.timestamp < frame_num){
            return event
        }
    }

    function IsKill(event){
        if (event.type == 'CHAMPION_KILL'){
            return event
        }
    }

    const filtered_events = game_data.Events.filter(HasHappend).filter(IsKill)

    var kills = 0
    var deaths = 0
    var assists = 0

    for (var event of filtered_events){
        if (event.killerId == participant_id){
            kills = kills + 1
        }
        if (event.victimId == participant_id){
            deaths = deaths + 1
        }
        if (event.assistingParticipantIds.includes(participant_id)){
            assists = assists + 1
        }
    }

    const score_array = [kills,deaths,assists]

    return score_array

}

export {GetPlayerScoreFromId}