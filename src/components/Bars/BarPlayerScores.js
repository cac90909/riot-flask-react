import { GetChampIdFromPlayerId } from "../Data/GetChampIdFromPlayerId";
import { GetPlayerScoreFromId } from "../Data/GetPlayerScoreFromId";
import { GetSummonerNameFromId } from "../Data/GetSummonerNameFromId";
import { SwapChampIdForChampName } from "../Data/SwapChampIdForChampName";

function BarPlayerScores({game_data, champ_data, frame, frame_list, barDimensions, xScale, yScale}){

    const test_array = [1,2,3,4,5]

    const example_p_id = 1
    const example_frame = frame_list[frame_list.length-1]
    const example_player_score = GetPlayerScoreFromId({game_data}, example_frame, example_p_id)
    const example_summoner_name = GetSummonerNameFromId({game_data}, example_p_id)
    const example_champ_id = GetChampIdFromPlayerId({game_data}, example_p_id)
    const example_champ_name = SwapChampIdForChampName({champ_data}, example_champ_id)


    console.log('')
    console.log("Testing 'GetPlayerScoreFromId' inside of 'BarPlayerScores'. Summoner Name: ", example_summoner_name, 
                "Champion Name: ", example_champ_name, "End of Game Score Line: ", example_player_score)
    console.log('')

    const scores = test_array.map( (d,i) => (
        <g transform={`translate(${barDimensions.margins.left},${barDimensions.margins.top})`} key={i}>
        </g>


    )
)


  return <>{scores}</>
}

export {BarPlayerScores}