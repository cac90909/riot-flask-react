function GetSummonerNameFromId({game_data}, participant_id){

    const players = game_data.Summary.Player.participantIdentities

    for (var part of players){
        if (part.participantId == participant_id){
            return part.player.summonerName
        }
    }

}

export {GetSummonerNameFromId}