function GetTeamFromId(game_data, participant_id){

    //Reminder: team code of 100 corresponds to blue team (bottom of map team)
                //team code of 200 corresponds to red team (top of map team)

    const parts = game_data.Summary.Player.participants

    for (var part of parts){
        if (part.participantId == participant_id){
            return part.teamId
        }
    }
}

export {GetTeamFromId}