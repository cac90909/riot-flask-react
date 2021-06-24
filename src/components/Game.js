import React from 'react';
import {Visual} from './Visual'


function Game({game_data}) {
    console.log("Game.js is rendering")
    console.log("game_data object in Game.js: ", game_data)
    
    var timestamp_data = game_data.Timestamps[0]

    var example_pos_data = []
    
    for (var player in timestamp_data){ //to make this to scale and not just be looking at the same timestamp, the structure I want to adopt would entail creating a for loop to iterate over every timestamp.
                                        //then, i would use a map on every individual timestamp object (timestamps are stored in an array im pretty sure). Inside of the map, I would access each timestamp's
                                        //player positioning attributes. Then I would append those attributes to the created map (remember, map returns an array). The returned map array would represent each player's positioning
                                        //data for the given timeframe. I would loop over every timeframe and append each iteration's positioning map to a storage array or object.
        let player_pos_info = timestamp_data[player].position
        //console.log('Player',extra_layer,': ', player_pos_info)
        example_pos_data.push(player_pos_info)
        
    }

    console.log(example_pos_data)


    return <div>
        <p>hi</p>
        <p>hi again</p>
        <Visual pos_data={example_pos_data}/>   
        </div>
}

export {Game}


