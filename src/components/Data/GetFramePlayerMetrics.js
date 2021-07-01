function GetFramePlayerMetrics({game_data, frame}){
    
    var timestamp_data = game_data.Timestamps[frame]
    const player_metrics = []
    
    for (var player in timestamp_data){

        var levell = timestamp_data[player].level
        var current_gold = timestamp_data[player].currentGold
        var css = (timestamp_data[player].jungleMinionsKilled + timestamp_data[player].minionsKilled)
        var part_id = timestamp_data[player].participantId

        var temp = {
            ParticipantId: part_id,
            Level: levell,
            CurrentGold: current_gold,
            CS: css
        }

        player_metrics.push(temp)


    }

    return player_metrics
}

export {GetFramePlayerMetrics}