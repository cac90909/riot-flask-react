import React from 'react';

/*https://codewithnico.com/react-wait-axios-to-render/ is a very good link to follow if the async stuff is being weird*/

function Game({game_data}) {
    console.log("Game.js is rendering")
    console.log("game_data object  in Game.js: ", game_data)
    
    var timestamp_data = game_data.Timestamps[0]

    for (var player in timestamp_data){
        for (var extra_layer in timestamp_data[player]){
            let player_pos_info = timestamp_data[player][extra_layer].position
            console.log(player_pos_info)
        }
    }


    return <div>
        <p>hi</p>
        <p>hi again</p>
        </div>
}

export {Game}


/*As of now, I know how to access the data I want. Now, I am going to use that data to display some basic plots. I am planning on using the d3.js library for these visualizations.
Check out these 3 videos for examples on how to use the library:
https://www.youtube.com/watch?v=aHJCt2adSWA&ab_channel=Academind
https://www.youtube.com/watch?v=zXBdNDnqV2Q&ab_channel=ReactConferencesbyGitNation
https://www.youtube.com/watch?v=AhD-oziq53w&ab_channel=LivelyLab */

