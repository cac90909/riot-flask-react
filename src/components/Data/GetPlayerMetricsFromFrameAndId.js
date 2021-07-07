function GetPlayerMetricsFromFrameAndId(frame, participant_id){

    for (var player of frame){
        if (player.participantId == participant_id){
            return player
        }
    }
}

export {GetPlayerMetricsFromFrameAndId}