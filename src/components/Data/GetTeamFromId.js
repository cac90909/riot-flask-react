function GetTeamFromId(game_data, participant_id){

    const parts = game_data.Summary.Player.participants

    for (var part of parts){
        if (part.participantId == participant_id){
            return part.teamId
        }
    }
}

export {GetTeamFromId}