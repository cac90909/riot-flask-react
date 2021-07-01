function GetFramePlayerPosition({game_data, frame}){

    var timestamp_data = game_data.Timestamps[frame]
    var frame_pos_data = []
    
    for (var player in timestamp_data){ 
        let player_pos_info = timestamp_data[player].position
        frame_pos_data.push(player_pos_info)   
    }
    
    return frame_pos_data
}

export {GetFramePlayerPosition}