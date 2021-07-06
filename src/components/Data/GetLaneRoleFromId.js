function GetLaneRoleFromId({game_data}, participant_id){

    const players = game_data.Summary.Player.participants

    for (var player of players){
        if (player.participantId == participant_id){
            return [player.timeline.lane, player.timeline.role]
        }
    }
}

export {GetLaneRoleFromId} 