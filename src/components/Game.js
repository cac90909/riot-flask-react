import React from 'react';

function Game({game_data}) {
    console.log("Game.js is rendering")
    console.log("game_data: ", game_data)
    console.log("game_data.Events: ", game_data.Events)
    console.log("game_data.Events[0]: ", game_data.Events[0])
    console.log("game_data.Events[0].timestamp: ", game_data.Events[0].timestamp)
    return <div>
        <p>hi</p>
        <p>hi again</p>
        </div>
}

export {Game}
