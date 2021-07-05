function GetChampIdFromPlayerId({game_data}, participant_id){

    const path = game_data.Summary.Player.participants

    for (var player of path){
        if (player.participantId == participant_id){
            return player.championId
        }
    }

}

export {GetChampIdFromPlayerId}