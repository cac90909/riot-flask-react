function GetGameDuration({game_data}){

    var game_duration = game_data.Summary.Game.gameDuration
    return game_duration
}

export {GetGameDuration}