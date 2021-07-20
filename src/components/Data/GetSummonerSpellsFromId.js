function GetSummonerSpellsFromId({game_data}, id){

    for ( var player of game_data.Summary.Player.participants){
        if (id == player.participantId){
            return [player.spell1Id, player.spell2Id]
        }
    }

}

export { GetSummonerSpellsFromId }